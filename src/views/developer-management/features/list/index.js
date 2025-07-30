// ** React Imports
import { Fragment, useCallback, useMemo, useState } from "react";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";
import { useDeleteDeveloperMutation, useDevelopersQuery } from "../../domains";
import Filter from "./components/Filter";

// ** Third Party Components
import Table from "@customcomponents/Table";
import sweetalert from "@utils/sweetalert";
import { Edit2, Eye, PlusSquare, Trash2 } from "react-feather";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import ModalDeveloper from "./components/ModalDeveloper";

const List = () => {
  // ** local state
  const [modalDeveloperState, setModalDeveloperState] = useState({
    open: false,
    defaultValues: null,
    type: null,
  });
  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  // ** queries
  const { data, isFetching, isLoading } = useDevelopersQuery(tableAttr);

  const [deleteMutation] = useDeleteDeveloperMutation();

  const handleDeleteDeveloper = useCallback(
    (userId, name) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          html: `<div>
                  <span>Apakah anda yakin akan hapus pengembang ini? Jika anda hapus maka <strong>user</strong> yang berhubungan dengan pengambang ini akan terhapus!</span>
                  <br />
                  <br />
                  <strong>${name}</strong>
                </div>`,
          type: "warning",
          icon: "info",
          confirmButtonText: "Ya",
          showCancelButton: true,
          cancelButtonText: "Batal",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            try {
              await deleteMutation(userId).unwrap();
              return true;
            } catch (error) {
              sweetalert.showValidationMessage(`Request failed: ${error}`);
            }
          },
          allowOutsideClick: () => !sweetalert.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            sweetalert.fire(
              "Berhasil",
              "Berhasil menghapus pengembang...",
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
        Header: "Nama Pengembang",
        accessor: "nama",
        width: 320,
      },
      {
        Header: "Valid",
        accessor: "isValid",
        align: "center",
        width: 120,
        Cell: ({ value }) => {
          if (value === true) return <Badge color="success">Valid</Badge>;
          if (value === false) return <Badge color="danger">Invalid</Badge>;
          return <Badge color="secondary">Belum</Badge>;
        },
      },
      {
        Header: "Email",
        accessor: "email",
        width: 250,
      },
      {
        Header: "Nama Perusahaan",
        accessor: "namaPerusahaan",
        width: 250,
      },
      {
        Header: "NPWP",
        accessor: "npwp",
        width: 180,
      },
      {
        Header: "No HP",
        accessor: "telpPenanggungJawab",
      },
      {
        Header: "Aksi",
        accessor: "id",
        align: "center",
        sticky: "right",
        width: 200,
        showTitle: false,
        Cell: ({ value, row }) => {
          const isUserManualCreated =
            row.original.IdPengembangSikumbang === null;
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                className="btn-icon flex-shrink-0"
                color="primary"
                size="sm"
                outline
                onClick={() =>
                  setModalDeveloperState({
                    open: true,
                    defaultValues: row.original,
                    type: "detail",
                  })
                }
                title="Detail"
              >
                <Eye size={16} />
              </Button>
              {isUserManualCreated ? (
                <>
                  <Button
                    className="btn-icon flex-shrink-0"
                    color="primary"
                    size="sm"
                    outline
                    onClick={() =>
                      setModalDeveloperState({
                        open: true,
                        defaultValues: row.original,
                        type: "update",
                      })
                    }
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    className="btn-icon flex-shrink-0"
                    color="danger"
                    size="sm"
                    outline
                    onClick={() =>
                      handleDeleteDeveloper(value, row.original.nama)
                    }
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </Button>
                </>
              ) : null}
            </div>
          );
        },
      },
    ],
    []
  );

  const handleTableAttrChange = useCallback((params = {}) => {
    const { filtered = null, page, pageSize, ...rest } = params;

    setTableAttr((val) => ({
      ...val,
      page: page || val.page,
      pageSize: pageSize || val.pageSize,
      filtered,
      ...rest,
    }));
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        title="Daftar Pengembang"
        data={[{ title: "Daftar Pengembang" }]}
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
              <CardTitle>Daftar Pengembang</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setModalDeveloperState({
                    open: true,
                    defaultValues: null,
                    type: "create",
                  });
                }}
              >
                <PlusSquare size={16} /> Tambah Pengembang
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
              sticky
              resizeable
            />
          </Card>
        </Col>
      </Row>
      <ModalDeveloper
        open={modalDeveloperState.open}
        onClose={() => {
          setModalDeveloperState({ open: false, defaultValue: null });
        }}
        type={modalDeveloperState.type}
        defaultValues={modalDeveloperState.defaultValues}
      />
    </Fragment>
  );
};

export default List;
