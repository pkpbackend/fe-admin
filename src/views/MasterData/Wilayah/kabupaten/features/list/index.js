import Breadcrumbs from "@components/breadcrumbs/custom";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";

// ** Icons Imports
import Table from "@customcomponents/Table";
import { Edit, PlusSquare, Trash2 } from "react-feather";
import {
  useCitiesQuery,
  useDeleteCityMutation,
} from "../../../domains/kabupaten";
import Filter from "./component/Filter";
import ModalCity from "./component/ModalCity";
import sweetalert from "@utils/sweetalert";

const Kabupaten = () => {
  const [modalCityState, setModalCityState] = useState({
    open: false,
    defaultValues: null,
  });

  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  const { data, isFetching, isLoading } = useCitiesQuery(tableAttr);

  const [deleteMutation] = useDeleteCityMutation();

  const handleDelete = React.useCallback(
    (id, name) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          text: "",
          type: "warning",
          html: `<div>
                  <div style="margin-bottom: 0.5rem;">Apakah anda yakin menghapus kabupaten ini?</div>
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
              sweetalert.showValidationMessage(`Gagal hapus data kabupaten`);
            }
          },
          allowOutsideClick: () => !sweetalert.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            sweetalert.fire(
              "Berhasil",
              "Berhasil menghapus data kabupaten",
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
        Header: "Kode Kabupaten",
        accessor: "id",
        width: 170,
      },
      {
        Header: "Nama Kabupaten",
        accessor: "nama",
        width: 200,
      },
      {
        Header: "Nama Provinsi",
        accessor: "Provinsi.nama",
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
                  setModalCityState({
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
      <Breadcrumbs title="Kabupaten" data={[{ title: "Kabupaten" }]} />
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
              <CardTitle>Daftar Kabupaten/Kota</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setModalCityState({
                    open: true,
                    defaultValues: null,
                  });
                }}
              >
                <PlusSquare size={16} />
                Tambah Kabupaten
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
      <ModalCity
        open={modalCityState.open}
        onClose={() => {
          setModalCityState({ open: false, defaultValue: null });
        }}
        data={modalCityState.defaultValues}
      />
    </Fragment>
  );
};

export default Kabupaten;
