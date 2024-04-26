import { ApiResponse, Environment } from "@ecoflow/types";
import { useEffect, useState } from "react";
import { Button, FlexboxGrid, Panel, Stack, Table } from "rsuite";
import CellActionButton from "./CellActionButton.component";
import EditableCell from "./EditableCell.component";
import commitEnvs from "../../../service/environments/commitEnvs.service";
import { useAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import { userPermissions } from "../../../store/users.store";
const { Column, HeaderCell } = Table;

interface EnvsTablesProps {
  envList: Environment[];
  isSystemEnvs?: boolean;
}

interface EnvsLists extends Environment {
  id: number;
  status?: "EDIT" | null;
}

export default function EnvsTables({
  envList = [],
  isSystemEnvs = false,
}: EnvsTablesProps) {
  const [oldData, setOldDatas] = useState<EnvsLists[]>([
    ...envList.map((val, index) => {
      return { id: index, name: val.name, value: val.value };
    }),
  ]);
  const [data, setData] = useState<EnvsLists[]>([
    ...envList.map((val, index) => {
      return { id: index, name: val.name, value: val.value };
    }),
  ]);
  const [isLoading, setLoading] = useState(false);
  const [isDeleted, setDeleted] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({});
  const successNoti = useAtom(successNotification)[1];
  const errorNoti = useAtom(errorNotification)[1];

  const [permissionsList] = useAtom(userPermissions);

  useEffect(() => {
    setLoading(false);
    if (response.error)
      errorNoti({
        show: true,
        header: "Error updating Envs",
        message: response.payload,
      });

    if (response.success) {
      setDeleted(false);
      setData(
        response.payload.newEnvs.map((val: any, index: number) => {
          return { id: index, name: val.name, value: val.value };
        })
      );
      setOldDatas(
        response.payload.newEnvs.map((val: any, index: number) => {
          return { id: index, name: val.name, value: val.value };
        })
      );
      successNoti({
        show: true,
        header: "Envs updated successfully.",
        message: response.payload.msg,
      });
    }
  }, [response]);

  const handlecommitEnvs = () => {
    setLoading(true);
    if (data.length === 0 && !isDeleted) {
      setResponse({
        error: true,
        payload: "No Envs Available to commit.",
      });
      return;
    }

    if (data.filter((value) => value.status === "EDIT").length > 0) {
      setResponse({
        error: true,
        payload: "Save all Envs before commiting Envs.",
      });
      return;
    }

    commitEnvs(isSystemEnvs ? "system" : "user", data).then(setResponse);
  };

  const handleAddNewEnvs = () => {
    const blankEnv: EnvsLists = {
      id: data.length,
      name: "",
      value: "",
      status: "EDIT",
    };

    const newEnvAdd = [...data, blankEnv];
    setData(newEnvAdd);
  };

  const handleDelete = (id: number) => {
    const nextData = [...data];
    setDeleted(true);
    setData(nextData.filter((data) => data.id !== id));
  };

  const handleChange = (id: number, key: string | number, value: string) => {
    const nextData = [...data];
    (nextData.find((item: { id: number }) => item.id === id)! as any)[key] =
      value;
    setData(nextData);
  };

  const handleEditState = (id: number) => {
    const nextData = [...data];
    const activeItem = nextData.find((item: { id: any }) => item.id === id)!;
    if (
      activeItem.name.trim().length === 0 &&
      activeItem.value.trim().length === 0
    ) {
      setData(nextData.filter((val) => val.id !== id));
      return;
    }
    activeItem.status = activeItem.status ? null : "EDIT";
    setData(nextData);
  };

  return (
    <Panel bordered style={{ margin: "0 2rem" }}>
      <FlexboxGrid
        justify="space-between"
        align="middle"
        style={{ paddingBottom: 20 }}
      >
        <FlexboxGrid.Item>Environments</FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <Stack spacing={10}>
            <Button
              disabled={
                isSystemEnvs ||
                (!permissionsList.administrator && !permissionsList.createEnvs)
              }
              appearance="primary"
              color="cyan"
              onClick={handleAddNewEnvs}
            >
              New Env
            </Button>
            <Button
              disabled={
                (data.length === 0 && !isDeleted) ||
                isLoading ||
                (!permissionsList.administrator &&
                  !permissionsList.createEnvs &&
                  !permissionsList.updateEnvs)
              }
              loading={isLoading}
              appearance="primary"
              color="green"
              onClick={handlecommitEnvs}
            >
              Commit
            </Button>
          </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Table
        height={420}
        style={{ borderRadius: 5, backgroundColor: "var(--rs-bg-card)" }}
        data={data}
        wordWrap="break-word"
        loading={isLoading}
      >
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <EditableCell
            dataKey="name"
            placeholder="Name"
            onChange={handleChange}
            isSystemEnvs={isSystemEnvs}
          />
        </Column>

        <Column flexGrow={2.5}>
          <HeaderCell>Value</HeaderCell>
          <EditableCell
            dataKey="value"
            placeholder="Value"
            onChange={handleChange}
          />
        </Column>

        <Column width={200}>
          <HeaderCell align="center">...</HeaderCell>
          <CellActionButton
            dataKey="id"
            onClickEdit={handleEditState}
            onClickDelete={handleDelete}
            isSystemEnvs={isSystemEnvs}
            oldDatas={oldData}
          />
        </Column>
      </Table>
    </Panel>
  );
}
