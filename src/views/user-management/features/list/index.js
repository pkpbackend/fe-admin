// ** React Imports
import { Fragment, useCallback, useMemo, useState } from "react";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";
import { useDeleteUserMutation, useUsersQuery } from "../../domains";
import Filter from "./components/Filter";
import ModalUser from "./components/ModalUser";

// ** Third Party Components
import Table from "@customcomponents/Table";
import { Edit, PlusSquare, Trash2 } from "react-feather";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";
import sweetalert from "@utils/sweetalert";

const List = () => {
  // ** local state
  const [modalUserState, setModalUserState] = useState({
    open: false,
    defaultValues: null,
  });
  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  // ** queries
  const { data, isFetching, isLoading } = useUsersQuery(tableAttr);
  const [deleteMutation] = useDeleteUserMutation();

  const handleDeleteUser = useCallback(
    (userId, name) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          html: `<div>
                  <span>Apakah anda yakin ingin hapus user ini?</span>
                  <br />
                  <br />
                  <strong>${name}</strong>
                </div>
                `,
          type: "warning",
          icon: "info",
          confirmButtonText: "Ya",
          confirmButtonColor: "#d33",
          showCancelButton: true,
          cancelButtonText: "Batal",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return deleteMutation(userId)
              .then(() => true)
              .catch((error) => {
                sweetalert.showValidationMessage(`Request failed: ${error}`);
              });
          },
          allowOutsideClick: () => !sweetalert.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            sweetalert.fire(
              "Berhasil",
              "Berhasil menghapus user...",
              "success"
            );
          }
        });
    },
    [deleteMutation]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Nama",
        accessor: "nama",
        sticky: "left",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "Role.nama",
      },
      {
        Header: "Aksi",
        accessor: "id",
        align: "center",
        showTitle: false,
        sticky: "right",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex justify-content-center">
              <Button
                className="btn-icon me-2"
                color="primary"
                size="sm"
                onClick={() =>
                  setModalUserState({ open: true, defaultValues: row.original })
                }
                title="Edit"
              >
                <Edit size={16} />
              </Button>
              <Button
                className="btn-icon"
                color="danger"
                size="sm"
                outline
                onClick={() => handleDeleteUser(value, row.original.nama)}
                title="Hapus"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          );
        },
      },
    ],
    [handleDeleteUser]
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
        title="User Management"
        data={[{ title: "User Management" }]}
      />
      <Row className="gy-3">
        <Col sm="12">
          <Filter
            handleTableAttrChange={handleTableAttrChange}
            loading={isFetching || isLoading}
          />
        </Col>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Daftar User</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setModalUserState({ open: true, defaultValues: null });
                }}
              >
                <PlusSquare size={16} /> Tambah User
              </Button>
            </CardHeader>
            <Table
              columns={columns}
              data={data?.data}
              isFetching={isFetching || isLoading}
              tableAttr={tableAttr}
              onPaginationChange={(props) => {
                handleTableAttrChange({ ...tableAttr, ...props });
              }}
              page={tableAttr.page}
              totalPages={data?.totalPages}
              sticky
            />
          </Card>
        </Col>
      </Row>
      <ModalUser
        open={modalUserState.open}
        onClose={() => {
          setModalUserState({ open: false, defaultValue: null });
        }}
        defaultValues={modalUserState.defaultValues}
      />
    </Fragment>
  );
};

export default List;
