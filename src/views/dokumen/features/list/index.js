import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Edit, Eye, PlusSquare, Trash2 } from "react-feather";
import Breadcrumbs from "@components/breadcrumbs/custom";
import {
  useDeleteKategoriDokumenMutation,
  useKategoriDokumensQuery,
} from "../../domains/masterkategoridokumen";
import Filter from "./component/Filter";
import ModalKategoriDokumen from "./component/ModalKategoriDokumen";
import Table from "@customcomponents/Table";
import sweetalert from "@utils/sweetalert";

const List = () => {
  const [modalKategoriDokumenState, setModalKategoriDokumenState] = useState({
    open: false,
    defaultValues: null,
  });

  const [tableAttr, setTableAttr] = useState({
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  const { data, isFetching, isLoading } = useKategoriDokumensQuery(tableAttr);

  const columns = useMemo(
    () => [
      {
        Header: "Nama Kategori",
        accessor: "name",
        width: 300,
        Cell: ({ row }) => {
          return row?.original?.name || "-";
        },
      },
      {
        Header: "Direktorat",
        accessor: "DirektoratId",
        width: 400,
        Cell: ({ row }) => {
          switch (row?.original?.DirektoratId) {
            case 1:
              return "Rumah Susun";
            case 2:
              return "Rumah Khusus";
            case 3:
              return "Rumah Swadaya";
            case 4:
              return "Rumah Umum dan Komersial";
          }
        },
      },
      {
        Header: "Deskripsi",
        accessor: "description",
        width: 800,
      },
      {
        Header: "Aksi",
        align: "center",
        sticky: "right",
        width: 180,
        Cell: (props) => {
          let { row } = props;
          const isDefaultDocumentDirectorat =
            row.original.name.includes("Kategori default");
          return (
            <div className="d-flex justify-content-center">
              <Link
                to={`/dokumen/list/detail/${row.original.id}`}
                // target="_blank"
                rel="noopener noreferrer"
                title="Detail"
              >
                <Button
                  className="btn-icon me-2"
                  // color="success"
                  size="sm"
                  title="Lihat"
                >
                  <Eye size={15} />
                </Button>
              </Link>
              {!isDefaultDocumentDirectorat ? (
                <Button
                  className="btn-icon me-2"
                  color="primary"
                  size="sm"
                  title="Edit"
                  onClick={() =>
                    setModalKategoriDokumenState({
                      open: true,
                      defaultValues: row.original,
                    })
                  }
                >
                  <Edit size={15} />
                </Button>
              ) : null}
              {!isDefaultDocumentDirectorat ? (
                <Button
                  className="btn-icon"
                  color="danger"
                  size="sm"
                  title="Hapus"
                  onClick={() =>
                    handleDelete(
                      row.original.id,
                      row.original.name || row.original.description
                    )
                  }
                >
                  <Trash2 size={15} />
                </Button>
              ) : null}
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

  const [deleteMutation] = useDeleteKategoriDokumenMutation();

  const handleDelete = React.useCallback(
    (id, name) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          text: "",
          type: "warning",
          html: `<div>
                  <div style="margin-bottom: 0.5rem;">Apakah anda yakin menghapus dokumen ini?</div>
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
              sweetalert.showValidationMessage(`Gagal hapus data dokumen`);
            }
          },
          allowOutsideClick: () => !sweetalert.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            sweetalert.fire(
              "Berhasil",
              "Berhasil menghapus data dokumen",
              "success"
            );
          }
        });
    },
    [deleteMutation]
  );

  return (
    <Fragment>
      <Breadcrumbs title="Dokumen" data={[{ title: "Dokumen" }]} />
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
              <CardTitle>Daftar Kategori Dokumen</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setModalKategoriDokumenState({
                    open: true,
                    defaultValues: null,
                  });
                }}
              >
                <PlusSquare size={16} />
                Tambah Kategori Dokumen
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
              resizeable
              sticky
            />
          </Card>
        </Col>
      </Row>
      <ModalKategoriDokumen
        open={modalKategoriDokumenState.open}
        onClose={() => {
          setModalKategoriDokumenState({ open: false, defaultValue: null });
        }}
        data={modalKategoriDokumenState.defaultValues}
      />
    </Fragment>
  );
};

export default List;
