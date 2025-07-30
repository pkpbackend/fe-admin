import Breadcrumbs from "@components/breadcrumbs/custom";
import Table from "@customcomponents/Table";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Edit, PlusSquare, Trash2 } from "react-feather";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";
import {
  useDeleteProvinceMutation,
  useProvincesQuery,
} from "../../../domains/provinsi";
import Filter from "./component/Filter";
import ModalProvince from "./component/ModalProvince";
import sweetalert from "@utils/sweetalert";

const Provinsi = () => {
  const [modalProvinceState, setModalProvinceState] = useState({
    open: false,
    defaultValues: null,
  });

  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  const { data, isFetching, isLoading } = useProvincesQuery(tableAttr);

  const [deleteMutation] = useDeleteProvinceMutation();

  const handleDelete = React.useCallback(
    (id, name) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          text: "",
          type: "warning",
          html: `<div>
                  <div style="margin-bottom: 0.5rem;">Apakah anda yakin menghapus provinsi ini?</div>
                  <strong>"${name}"</strong>
                </div>`,
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Tidak",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            try {
              await deleteMutation(id).unwrap();
              return true;
            } catch (error) {
              sweetalert.showValidationMessage(`Gagal hapus data provinsi`);
            }
          },
          allowOutsideClick: () => !sweetalert.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            sweetalert.fire(
              "Berhasil",
              "Berhasil menghapus data provinsi",
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
        Header: "Kode Provinsi",
        accessor: "id",
      },
      {
        Header: "Nama Provinsi",
        accessor: "nama",
        width: 250,
      },
      {
        Header: "Kode Dagri",
        accessor: "kode_dagri",
      },
      {
        Header: "Kode BPS",
        accessor: "kode_bps",
      },
      {
        Header: "Kode RKAKL",
        accessor: "kode_rkakl",
      },
      {
        Header: "Koordinat",
        width: 250,
        Cell: (props) => {
          return (
            <span>
              {props.row.original.latitude}, {props.row.original.longitude}
            </span>
          );
        },
      },
      {
        Header: "Zoom",
        accessor: "zoom",
        disableSortBy: true,
      },
      {
        Header: "Aksi",
        align: "center",
        sticky: "right",
        width: 130,
        Cell: (props) => {
          let { row } = props;
          return (
            <div className="d-flex justify-content-center">
              <Button
                className="btn-icon me-2"
                color="primary"
                size="sm"
                title="Edit"
                onClick={() =>
                  setModalProvinceState({
                    open: true,
                    defaultValues: row.original,
                  })
                }
              >
                <Edit size={15} />
              </Button>
              <Button
                className="btn-icon"
                color="danger"
                size="sm"
                title="Hapus"
                onClick={() => handleDelete(row.original.id, row.original.nama)}
              >
                <Trash2 size={15} />
              </Button>
              &nbsp;
            </div>
          );
        },
      },
    ],
    [handleDelete]
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
      <Breadcrumbs title="Provinsi" data={[{ title: "Provinsi" }]} />
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
              <CardTitle>Daftar Provinsi</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setModalProvinceState({
                    open: true,
                    defaultValues: null,
                  });
                }}
              >
                <PlusSquare size={16} />
                Tambah Provinsi
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
      <ModalProvince
        open={modalProvinceState.open}
        onClose={() => {
          setModalProvinceState({ open: false, defaultValue: null });
        }}
        data={modalProvinceState.defaultValues}
      />
    </Fragment>
  );
};

export default Provinsi;
