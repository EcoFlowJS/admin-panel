import { Calendar, Col, Panel, Placeholder, Row } from "rsuite";
import "./style.less";
import { IconWrapper } from "@ecoflow/components-lib";
import { PiDatabase, PiPackageFill } from "react-icons/pi";
import { GrInstall } from "react-icons/gr";
import { useEffect, useState } from "react";
import fetchDashboardInfo from "../../service/dashboard/fetchDashboardInfo.service";
import { ApiResponse } from "@ecoflow/types";
import EnvNameTable from "./EnvNameTable/EnvNameTable.component";
import RoutesInfoTable from "./RoutesInfoTable/RoutesInfoTable.component";

export default function AdminDashboardContent() {
  const [isLoading, setLoading] = useState(true);
  const [dashboardStatus, setDashboardStatus] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    fetchDashboardInfo().then(
      ({ success, payload }: ApiResponse) => {
        setLoading(false);
        if (success) setDashboardStatus(payload);
      },
      ({ error, payload }: ApiResponse) => {
        setLoading(false);
        if (error) console.error(payload);
      }
    );
  }, []);

  return (
    <>
      <Row gutter={30} className="dashboard-header">
        <Col xs={8}>
          {isLoading ? (
            <Placeholder.Graph
              active
              style={{ height: 112, borderRadius: 6 }}
            />
          ) : (
            <Panel className="header-info bg-available-packages">
              <div className="icon">
                <IconWrapper icon={PiPackageFill} />
              </div>
              <div className="title">Available Package </div>
              <div className="value">
                {dashboardStatus?.availablePackage || 0}
              </div>
            </Panel>
          )}
        </Col>
        <Col xs={8}>
          {isLoading ? (
            <Placeholder.Graph
              active
              style={{ height: 112, borderRadius: 6 }}
            />
          ) : (
            <Panel className="header-info bg-installed-packages">
              <div className="icon">
                <IconWrapper icon={GrInstall} />
              </div>
              <div className="title">Installed Packages</div>
              <div className="value">
                {dashboardStatus?.installedPackage || 0}
              </div>
            </Panel>
          )}
        </Col>
        <Col xs={8}>
          {isLoading ? (
            <Placeholder.Graph
              active
              style={{ height: 112, borderRadius: 6 }}
            />
          ) : (
            <Panel className="header-info bg-db-connections">
              <div className="icon">
                <IconWrapper icon={PiDatabase} />
              </div>
              <div className="title">Database Connections</div>
              <div className="value">
                {dashboardStatus?.DBConnectionCount || 0}
              </div>
            </Panel>
          )}
        </Col>
      </Row>

      <Row gutter={30}>
        <Col xs={16}>
          <Calendar
            className="card"
            compact
            bordered
            style={{ backgroundColor: "var(--rs-bg-card)" }}
          />
        </Col>
        <Col xs={8}>
          <EnvNameTable
            loading={isLoading}
            data={dashboardStatus?.userEnvsNames || []}
          />
        </Col>
      </Row>

      <Row gutter={30}>
        <Col xs={24}>
          <RoutesInfoTable
            loading={isLoading}
            data={dashboardStatus?.routesStatus || []}
          />
        </Col>
      </Row>
    </>
  );
}
