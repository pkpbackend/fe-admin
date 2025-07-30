// ** React Imports
import { Fragment, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";
import { useRespondensQuery } from "../../domains";
import Chart from "./components/Chart";

// ** Third Party Components
import Table from "@customcomponents/Table";
import { Eye } from "react-feather";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";

const List = () => {
  // ** local state
  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  // ** queries
  const { data, isFetching, isLoading } = useRespondensQuery(tableAttr);

  const columns = useMemo(
    () => [
      {
        Header: "Direktorat",
        accessor: "Direktorat.name",
      },
      {
        Header: "Nama",
        accessor: "name",
      },
      {
        Header: "Pekerjaan",
        accessor: "pekerjaan",
      },
      {
        Header: "Pendidikan Terakhir",
        accessor: "pendidikanTerakhir",
      },
      {
        Header: "No. Telp",
        accessor: "phoneNumber",
      },
      {
        Header: "Waktu Input",
        accessor: "createdAt",
      },
      {
        Header: "Aksi",
        accessor: "id",
        align: "center",
        showTitle: false,
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex justify-content-center">
              <Link
                to={`/survey/list/detail/${value}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Detail"
              >
                <Button
                  className="btn-icon me-2"
                  color="primary"
                  size="sm"
                  outline
                >
                  <Eye size={16} />
                </Button>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleTableAttrChange = useCallback((params = {}) => {
    const { filtered = null, page, pageSize } = params;

    setTableAttr((val) => ({
      ...val,
      page: page || val.page,
      pageSize: pageSize || val.pageSize,
      filtered,
    }));
  }, []);

  return (
    <Fragment>
      <Breadcrumbs title="Survey" data={[{ title: "Survey" }]} />
      <Row className="gy-3">
        <Col sm="12">
          <Chart />
        </Col>
        {/* <Col sm="12">
          <Filter
            handleTableAttrChange={handleTableAttrChange}
            loading={isFetching || isLoading}
          />
        </Col> */}
        <Col sm="12">
          <Card className="card-snippet">
            <CardHeader>
              <CardTitle>Survey Responden</CardTitle>
            </CardHeader>
            <Table
              columns={columns}
              data={data?.data}
              isFetching={isFetching || isLoading}
              onPaginationChange={(props) => {
                handleTableAttrChange({ ...tableAttr, ...props });
              }}
              page={tableAttr.page}
              totalPages={data?.totalPages}
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default List;
