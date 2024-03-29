import { useEffect, useState } from "react";
import { Panel, Timeline } from "rsuite";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../utils/socket.io/socket.io";
import AuditLogsHeader from "./AuditLogsHeader/AuditLogsHeader.component";
import fetchAuditLogs from "../../service/auditLog/fetchAuditLogs.service";
import { AuditLogSchemaStruct } from "@ecoflow/types";

export default function AuditLogsContent() {
  const [isLoading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchLogs = (page: number) => {
    fetchAuditLogs(page).then((response) => {
      if (response.success) {
        setTotal(response.payload.totalDocs);
        setLogs(response.payload.logs);
        setLoading(false);
      }
    });
  };

  const handlePageChnage = (page: number) => {
    setLoading(true);
    fetchLogs(page);
  };

  useEffect(() => {
    const socket = connectSocketIO(["auditLog"]);
    socket.on("auditLogAdded", ({ logs, totalDocs }) => {
      setTotal(totalDocs);
      setLogs(logs);
    });
    setLoading(true);
    fetchLogs(1);
    return disconnectSocketIO(socket);
  }, []);

  return (
    <Panel bodyFill>
      <AuditLogsHeader total={total} onChange={handlePageChnage} />
      <Panel style={{ padding: "20px 30px" }}>
        <Timeline isItemActive={Timeline.ACTIVE_FIRST}>
          {logs.map((log: AuditLogSchemaStruct, index) => {
            return (
              <Timeline.Item key={index}>
                <p>{log.timeSpan as unknown as string}</p>
                <p>{log.message}</p>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Panel>
    </Panel>
  );
}
