import { ApiResponse, Environment } from "@eco-flow/types";
import React, { useEffect } from "react";
import { Button, Divider, FlexboxGrid, Panel, Stack, Table } from "rsuite";
import CellActionButton from "./CellActionButton.component";
import EditableCell from "./EditableCell.component";
import { useNotification } from "@eco-flow/components-lib";
import commitEnvs from "../../../service/environments/commitEnvs.service";
const { Column, HeaderCell, Cell } = Table;

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
  const [data, setData] = React.useState<EnvsLists[]>(
    envList.map((val, index) => {
      return { id: index, name: val.name, value: val.value };
    })
  );
  const [isLoading, setLoading] = React.useState(false);
  const [isDeleted, setDeleted] = React.useState(false);
  const [response, setResponse] = React.useState<ApiResponse>({});

  useEffect(() => {
    setLoading(false);
    if (response.error) errorNotification.show();

    if (response.success) {
      setDeleted(false);
      console.log(response.payload.newEnvs);

      setData(
        response.payload.newEnv.map((val: any, index: number) => {
          return { id: index, name: val.name, value: val.value };
        })
      );
      successNotification.show();
    }
  }, [response]);

  const errorNotification = useNotification({
    placement: "topEnd",
    type: "error",
    header: "Error updating Envs",
    children: <>{response.error ? response.payload : ""}</>,
  });

  const successNotification = useNotification({
    placement: "topEnd",
    type: "success",
    header: "Envs updated successfully.",
    children: <>{response.success ? response.payload.msg : ""}</>,
  });

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
              disabled={isSystemEnvs}
              appearance="primary"
              color="cyan"
              onClick={handleAddNewEnvs}
            >
              New Env
            </Button>
            <Button
              disabled={(data.length === 0 && !isDeleted) || isLoading}
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
          />
        </Column>
      </Table>
    </Panel>
  );
}
