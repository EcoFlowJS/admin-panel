import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { permissionFetched, userPermissions } from "../../store/users.store";

export default function AuditLogs() {
  const navigate = useNavigate();
  const [permissionsList] = useAtom(userPermissions);
  const [isPermissionFetched] = useAtom(permissionFetched);

  useEffect(() => {
    if (
      isPermissionFetched &&
      !permissionsList.administrator &&
      !permissionsList.auditLogs
    )
      navigate("/admin/403");
  }, [permissionsList, isPermissionFetched]);
  return <div>AuditLogs</div>;
}
