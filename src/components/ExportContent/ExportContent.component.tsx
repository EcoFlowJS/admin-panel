import { IconWrapper } from "@ecoflow/components-lib";
import { useState } from "react";
import { BsFillFileEarmarkZipFill } from "react-icons/bs";
import { HiOutlineTemplate } from "react-icons/hi";
import { TiExport } from "react-icons/ti";
import { Button, FlexboxGrid, Panel, RadioTile, RadioTileGroup } from "rsuite";
import { ValueType } from "rsuite/esm/RadioTile/RadioTile";
import exportProject from "../../service/export/exportProject.service";
import { ApiResponse } from "@ecoflow/types";
import { useSetAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../store/notification.store";

export default function ExportContent() {
  const [exportSelector, setExportSelector] = useState<ValueType>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const setErrorNotification = useSetAtom(errorNotification);
  const setSuccessNotification = useSetAtom(successNotification);

  const handleExport = () => {
    setLoading(true);
    exportProject(exportSelector).then(
      (response) => {
        setLoading(false);
        setSuccessNotification({
          show: true,
          header: "Success Exported",
          message: `Export successful and downloading in progress.`,
        });

        if (exportSelector === "template" || exportSelector === "export") {
          const href = URL.createObjectURL(response);

          // create "a" HTML element with href to file & click
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute(
            "download",
            exportSelector === "template" ? "template.json" : "export.zip"
          ); //or any other extension
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        }
      },
      (reject: Blob) => {
        setLoading(false);
        const u = URL.createObjectURL(reject);
        const x = new XMLHttpRequest();
        x.open("GET", u, false);
        x.send();
        URL.revokeObjectURL(u);
        const { error, payload } = JSON.parse(x.responseText) as ApiResponse;
        if (error) {
          console.error(payload);
          setErrorNotification({
            show: true,
            header: "Export Error!",
            message: typeof payload === "string" ? payload : payload.toString(),
          });
        }
      }
    );
  };

  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item style={{ width: 450 }}>
          <Panel bordered header="Select a option:-">
            <RadioTileGroup
              aria-label="Export project content."
              onChange={setExportSelector}
              value={exportSelector}
              disabled={isLoading}
            >
              <RadioTile
                icon={<IconWrapper icon={HiOutlineTemplate} />}
                label="Export Template"
                value="template"
              >
                Create a json file containing the flow descriptions and the
                package except for the local packages.
              </RadioTile>
              <RadioTile
                icon={<IconWrapper icon={BsFillFileEarmarkZipFill} />}
                label="Export Project"
                value="export"
              >
                Create a archive containing whole project details including the
                system database configurations too.
              </RadioTile>
            </RadioTileGroup>
            <FlexboxGrid justify="center" style={{ paddingTop: 20 }}>
              <FlexboxGrid.Item>
                <Button
                  loading={isLoading}
                  startIcon={<IconWrapper icon={TiExport} />}
                  style={{ minWidth: 120 }}
                  onClick={handleExport}
                >
                  Export
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
