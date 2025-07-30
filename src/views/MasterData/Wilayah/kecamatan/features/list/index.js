import Breadcrumbs from "@components/breadcrumbs/custom";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";

// ** Icons Imports
import Table from "@customcomponents/Table";
import { Edit, PlusSquare, Trash2 } from "react-feather";
import {
  useDeleteSubdistrictMutation,
  useSubdistrictsQuery,
} from "../../../domains/kecamatan";
import Filter from "./component/Filter";
import ModalSubdistrict from "./component/ModalSubdistrict";
import sweetalert from "@utils/sweetalert";

const Kecamatan = () => {
  const [modalSubdistrictState, setModalSubdistrictState] = useState({
    open: false,
    defaultValues: null,
  });

  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  const { data, isFetching, isLoading } = useSubdistrictsQuery(tableAttr);

  const [deleteMutation] = useDeleteSubdistrictMutation();

  const handleDelete = React.useCallback(
    (id, name) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          text: "",
          type: "warning",
          html: `<div>
                  <div style="margin-bottom: 0.5rem;">Apakah anda yakin menghapus kecamatan ini?</div>
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
              sweetalert.showValidationMessage(`Gagal hapus data kecamatan`);
            }
          },
          allowOutsideClick: () => !sweetalert.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            sweetalert.fire(
              "Berhasil",
              "Berhasil menghapus data kecamatan",
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
        Header: "Kode Kecamatan",
        accessor: "id",
        width: 170,
      },
      {
        Header: "Nama Kecamatan",
        accessor: "nama",
        width: 170,
      },
      {
        Header: "Nama Kabupaten",
        accessor: "City.nama",
        width: 170,
      },
      {
        Header: "Nama Provinsi",
        accessor: "City.Provinsi.nama",
        width: 170,
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
                  setModalSubdistrictState({
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
      <Breadcrumbs title="Kecamatan" data={[{ title: "Kecamatan" }]} />
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
              <CardTitle>Daftar Kecamatan</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setModalSubdistrictState({
                    open: true,
                    defaultValues: null,
                  });
                }}
              >
                <PlusSquare size={16} />
                Tambah Kecamatan
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
      <ModalSubdistrict
        open={modalSubdistrictState.open}
        onClose={() => {
          setModalSubdistrictState({ open: false, defaultValue: null });
        }}
        data={modalSubdistrictState.defaultValues}
      />
    </Fragment>
  );
};

export default Kecamatan;
