// ** React Imports
import { Fragment, useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";
import Filter from "./components/Filter";

// ** Third Party Components
import { Eye, PlusSquare } from "react-feather";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";

import Table from "@customcomponents/Table";
import { useRolesQuery } from "../../domains";

const List = () => {
  const navigate = useNavigate();

  // ** local state
  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  // ** queries
  const { data, isFetching, isLoading } = useRolesQuery(tableAttr);

  const columns = useMemo(
    () => [
      {
        Header: "Role",
        accessor: "nama",
      },
      {
        Header: "Direktorat",
        accessor: "Direktorat.name",
      },
      {
        Header: "Cangkupan Usulan",
        accessor: "ScopeRegionRole.name",
      },
      {
        Header: "Aksi",
        align: "center",
        accessor: "id",
        showTitle: false,
        Cell: ({ value }) => {
          return (
            <div className="d-flex justify-content-center">
              <Link
                to={`/role-management/list/detail/${value}`}
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
      <Breadcrumbs
        title="Role Management"
        data={[{ title: "Role Management" }]}
      />
      <Row className="gy-3">
        <Col sm="12">
          <Filter
            handleTableAttrChange={handleTableAttrChange}
            loading={isFetching || isLoading}
          />
        </Col>
        <Col sm="12">
          <Card className="card-snippet">
            <CardHeader>
              <CardTitle>Daftar Role</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  navigate("/role-management/list/add");
                }}
              >
                <PlusSquare size={16} /> Tambah Role
              </Button>
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
