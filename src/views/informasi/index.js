import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { DASHBOARD_URL } from "../../constants";
import AnnouncementWidget from "../../widgets/Announcement/AnnouncementWidget";
import EProfile from "./EProfile";

const Informasi = () => {
  const canAccessDashboard = useSelector(
    (state) => state.auth.user?.Role?.dashboard
  );
  const user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      {canAccessDashboard ? (
        <Row>
          <Col md="12">
            <Card style={{ borderRadius: 15, padding: 5 }}>
              <CardBody>
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <div>
                    <div style={{ fontSize: 16 }}>
                      <b>SIBARU DASHBOARD</b> adalah halaman untuk melihat data
                      statistik untuk Eksekutif Dirjen Perumahan
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => {
                        window.location = DASHBOARD_URL;
                      }}
                    >
                      Menuju DASHBOARD
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col md="12">
          <AnnouncementWidget />
        </Col>
      </Row>

      <EProfile user={user} />
    </Fragment>
  );
};

export default Informasi;
