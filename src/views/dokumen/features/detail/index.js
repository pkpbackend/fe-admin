import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router";
import { Edit, PlusSquare, Trash2 } from "react-feather";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  Row,
  UncontrolledAccordion,
  Spinner,
  Button,
} from "reactstrap";
import { JENIS_DATA_USULAN } from "@constants/usulan";
import Breadcrumbs from "@components/breadcrumbs/custom";
import { useKategoriDokumenQuery } from "../../domains/masterkategoridokumen";
import {
  useDokumensQuery,
  useDeleteDokumenMutation,
} from "../../domains/masterdokumen";
import Filter from "./component/Filter";
import ModalDokumen from "./component/ModalDokumen";
import Table from "@customcomponents/Table";
import sweetalert from "@utils/sweetalert";

const Detail = () => {
  const params = useParams();

  const [modalDokumen, setModalDokumen] = useState({
    open: false,
    defaultValues: null,
  });

  const { data, isFetching, isLoading } = useKategoriDokumenQuery(params?.id);

  const defaultFiltered = [
    { id: "MasterKategoriDokumenId", value: params?.id },
  ];
  const [tableAttr, setTableAttr] = useState({
    filtered: defaultFiltered,
    page: 1,
    pageSize: 10,
  });

  const {
    data: dataDokumens,
    isFetching: isFetchingDokumens,
    isLoading: isLoadingDokumens,
  } = useDokumensQuery(tableAttr);

  const handleTableAttrChange = useCallback((params = {}) => {
    const { filtered = [], page, pageSize } = params;

    const newFiltered = [...defaultFiltered, ...filtered];

    setTableAttr((val) => ({
      ...val,
      page: page || val.page,
      pageSize: pageSize || val.pageSize,
      filtered: newFiltered,
    }));
  }, []);

  const [deleteMutation] = useDeleteDokumenMutation();

  const handleDelete = useCallback(
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

  const columns = useMemo(
    () => [
      {
        Header: "Kode Dokumen",
        accessor: "id",
        width: 100,
      },
      {
        Header: "Nama Dokumen",
        accessor: "nama",
        width: 500,
      },
      {
        Header: "Model",
        accessor: "model",
        width: 150,
      },
      {
        Header: "Jenis Data",
        accessor: "jenisData",
        width: 300,
        Cell: ({ row }) => {
          let jenisData = JENIS_DATA_USULAN.non_ruk;
          if (data?.DirektoratId === 4) jenisData = JENIS_DATA_USULAN.ruk;
          return (
            <>
              {row.original.jenisData ? (
                <ul style={{ margin: 0, padding: 0 }}>
                  {JSON.parse(row.original.jenisData).map((value) => (
                    <li>
                      {jenisData[value - 1]
                        ? `${value} - ${jenisData[value - 1]?.label}`
                        : value}
                    </li>
                  ))}
                </ul>
              ) : (
                "-"
              )}
            </>
          );
        },
      },
      {
        Header: "Wajib",
        accessor: "required",
        width: 200,
      },
      {
        Header: "Maksimum (MB)",
        accessor: "maxSize",
        width: 150,
      },
      {
        Header: "Tipe File",
        accessor: "typeFile",
        width: 150,
      },
      {
        Header: "Urutan",
        accessor: "sort",
        width: 150,
      },
      // {
      //   Header: "Jenis Bantuan",
      //   accessor: "jenisBantuan",
      //   width: 200,
      // },
      {
        Header: "Aksi",
        align: "center",
        sticky: "right",
        width: 180,
        Cell: (props) => {
          let { row } = props;
          return (
            <div className="d-flex justify-content-center">
              <Button
                className="btn-icon me-2"
                color="primary"
                size="sm"
                title="Edit"
                onClick={() => {
                  setModalDokumen({
                    open: true,
                    defaultValues: {
                      ...row.original,
                      DirektoratId: data?.DirektoratId,
                    },
                  });
                }}
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
    [handleDelete, data]
  );

  const labelsDirektorat = [
    "Rumah Susun",
    "Rumah Khusus",
    "Rumah Swadaya",
    "Rumah Umum dan Komersial",
  ];

  return (
    <div>
      <Breadcrumbs
        title="Detail Dokumen"
        data={[
          { title: "Dokumen", link: "/dokumen/list" },
          { title: "Detail Dokumen" },
        ]}
      />
      <div>
        <Row className="gy-3">
          <Col sm={4}>
            <UncontrolledAccordion>
              <AccordionItem className="shadow">
                <AccordionHeader targetId="detail-kategori-dokumen">
                  Detail Kategori Dokumen
                </AccordionHeader>
                <AccordionBody accordionId="detail-kategori-dokumen">
                  {isLoading || isFetching ? (
                    <Spinner />
                  ) : (
                    <Row className="gy-3">
                      <Col sm={12}>
                        <strong>Nama</strong>
                        <br />
                        {data?.name || "-"}
                      </Col>

                      <Col sm={12}>
                        <strong>Deskripsi</strong>
                        <br />
                        {data?.description || "-"}
                      </Col>

                      <Col sm={12}>
                        <strong>Direktorat</strong>
                        <br />
                        {labelsDirektorat[data?.DirektoratId - 1] || "-"}
                      </Col>
                    </Row>
                  )}
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
          <Col sm={8}>
            <Filter
              handleTableAttrChange={handleTableAttrChange}
              loading={isFetchingDokumens || isLoadingDokumens}
            />
          </Col>

          <Col sm={12}>
            <UncontrolledAccordion defaultOpen="survey-information">
              <AccordionItem className="shadow">
                <AccordionHeader targetId="survey-information">
                  Daftar Dokumen
                </AccordionHeader>
                <AccordionBody accordionId="survey-information">
                  <div style={{ textAlign: "right", marginBottom: 10 }}>
                    <Button
                      color="primary"
                      onClick={() => {
                        setModalDokumen({
                          open: true,
                          defaultValues: {
                            DirektoratId: data?.DirektoratId,
                            MasterKategoriDokumenId: params?.id,
                          },
                        });
                      }}
                      style={{ display: "inline-block" }}
                    >
                      <PlusSquare size={16} />
                      Tambah Dokumen
                    </Button>
                  </div>
                  <Table
                    columns={columns}
                    data={dataDokumens?.data}
                    isFetching={isFetchingDokumens || isLoadingDokumens}
                    tableAttr={tableAttr}
                    onPaginationChange={(props) => {
                      handleTableAttrChange({ ...tableAttr, ...props });
                    }}
                    page={tableAttr.page}
                    totalPages={dataDokumens?.pages}
                    resizeable
                    sticky
                  />
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        </Row>
      </div>

      <ModalDokumen
        open={modalDokumen.open}
        onClose={() => {
          setModalDokumen({ open: false, defaultValues: null });
        }}
        data={modalDokumen.defaultValues}
      />
    </div>
  );
};

export default Detail;
