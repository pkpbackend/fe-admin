import { DIREKTORAT, LABEL_DIREKTORAT } from "@constants";
import { getUser } from "@utils/LoginHelpers";
import { find as findObject } from "lodash";
import moment from "moment";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { BookOpen, Info } from "react-feather";
import { useNavigate } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { stringRoute } from "@utils/ObjectHelpers";
import _ from "lodash";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";

import {
  useNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from "../../api/domains/notification";
import { useSearchParams } from "react-router-dom";
import Table from "@customcomponents/Table";
import sweetalert from "@utils/sweetalert";

const arrProgram = [
  {
    attr: "rusun",
    id: DIREKTORAT.RUSUN,
  },
  {
    attr: "rusus",
    id: DIREKTORAT.RUSUS,
  },
  {
    attr: "swadaya",
    id: DIREKTORAT.SWADAYA,
  },
  {
    attr: "ruk",
    id: DIREKTORAT.RUK,
  },
  {
    attr: "seluruh direktorat",
    id: DIREKTORAT.SELURUH_DIREKTORAT,
  },
];

const Notifikasi = () => {
  const [searchParams] = useSearchParams();
  const user = getUser().user;
  const navigate = useNavigate();
  const [tableAttr, setTableAttr] = useState({
    page: 1,
    pageSize: 10,
  });
  const [readNotificationMutation] = useReadNotificationMutation();
  const [readAllNotificationMutation] = useReadAllNotificationMutation();
  const { data, isLoading, isFetching } = useNotificationsQuery({
    ...tableAttr,
    filtered: [
      {
        id: `${searchParams.get("type") === "komentar" ? "eq" : "ne"}$type`,
        value: "komentar",
      },
    ],
  });

  const memoizedReadNotification = useCallback(
    (item) => {
      const readData = async () => {
        if (item.id) {
          await readNotificationMutation({ id: item.id }).unwrap();
        }
        if (searchParams.get("type") === "komentar") {
          if ((item?.text).includes("usulan")) {
            let { DirektoratId, id: UsulanId } = item.Usulan;
            if (DirektoratId && UsulanId) {
              let getProgram = findObject(
                arrProgram,
                (item) => Number(item.id) === Number(DirektoratId)
              );
              if (getProgram) {
                window.location.reload();
                window.location = stringRoute({
                  redirect: `/pengusulan#/pengusulan/${UsulanId}`,
                });
              }
            }
          } else if ((item?.text).includes("serah terima")) {
            let { DirektoratId } = item;
            let { id: SerahTerimaId } = item?.attribute;
            if (DirektoratId) {
              let getProgram = findObject(
                arrProgram,
                (item) => Number(item.id) === Number(DirektoratId)
              );
              if (getProgram) {
                window.location.reload();
                window.location = stringRoute({
                  redirect: `/serah-terima#/serah-terima/${SerahTerimaId}`,
                });
              }
            }
          }
        } else {
          if (item.type === "usulan" || item.type === "vermin") {
            if (item.Usulan) {
              let { DirektoratId, id: UsulanId } = item.Usulan;
              if (DirektoratId && UsulanId) {
                let getProgram = findObject(
                  arrProgram,
                  (item) => Number(item.id) === Number(DirektoratId)
                );
                if (getProgram) {
                  window.location.reload();
                  window.location = stringRoute({
                    redirect: `/pengusulan#/pengusulan/${UsulanId}`,
                  });
                }
              }
            }
          } else if (item.type === "serahterima") {
            let { DirektoratId } = item;
            let { id: SerahTerimaId } = item?.attribute;
            if (DirektoratId) {
              let getProgram = findObject(
                arrProgram,
                (item) => Number(item.id) === Number(DirektoratId)
              );
              if (getProgram) {
                window.location.reload();
                window.location = stringRoute({
                  redirect: `/serah-terima#/serah-terima/${SerahTerimaId}`,
                });
              }
            }
          } else if (item.type === "pemanfaatan") {
            let { DirektoratId } = item;
            let { id: PemanfaatanId } = item?.attribute;
            if (DirektoratId) {
              let getProgram = findObject(
                arrProgram,
                (item) => Number(item.id) === Number(DirektoratId)
              );
              if (getProgram) {
                window.location.reload();
                window.location = stringRoute({
                  redirect: `/pemanfaatan#/pemanfaatan/${PemanfaatanId}`,
                });
              }
            }
          }
        }
      };

      readData();
    },
    [navigate, readNotificationMutation]
  );

  const handleReadAllNotification = async () => {
    const result = await sweetalert.fire({
      title: "Baca Semua Notifikasi",
      text: "Apakah anda yakin ingin membaca semua notifikasi?",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      preConfirm: async () => {
        try {
          await readAllNotificationMutation(user.id).unwrap();
          return true;
        } catch (error) {
          sweetalert.showValidationMessage(`${error?.data?.message}`);
        }
      },
    });
    if (result.isConfirmed) {
      sweetalert.fire("Sukses", "Berhasil baca semua notifikasi", "success");
    }
  };

  const columns = useMemo(
    () =>
      searchParams.get("type") === "komentar"
        ? [
            {
              Header: "*",
              id: "id",
              width: 70,
              sticky: "left",
              align: "center",
              accessor: (row) => {
                if (!row.read) {
                  return (
                    <span
                      className="d-inline-block bg-danger border border-light rounded-circle"
                      style={{ width: 12, height: 12 }}
                    >
                      <span className="visually-hidden">Belum dibaca</span>
                    </span>
                  );
                } else {
                  return null;
                }
              },
            },
            {
              Header: "#",
              id: "no",
              width: 100,
              accessor: (row, index) => (tableAttr.page - 1) * 10 + (index + 1),
            },
            {
              Header: "Tipe",
              accessor: "type",
              width: 140,
            },
            {
              Header: "Notifikasi",
              width: 1000,
              accessor: (row) => {
                let textMessage = row.text || "";
                return textMessage;
              },
            },
            {
              Header: "Tgl Notifikasi",
              width: 200,
              accessor: (row) => {
                return row.createdAt
                  ? moment(row.createdAt).format("DD/MM/YYYY hh:mm:ss")
                  : "-";
              },
            },
            {
              Header: "Aksi",
              sticky: "right",
              align: "center",
              showTitle: false,
              accessor: (row) => {
                return (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => {
                      memoizedReadNotification(row);
                    }}
                  >
                    <Info size={16} /> Cek
                  </Button>
                );
              },
            },
          ]
        : [
            {
              Header: "*",
              id: "id",
              width: 70,
              sticky: "left",
              align: "center",
              accessor: (row) => {
                if (!row.read) {
                  return (
                    <span
                      className="d-inline-block bg-danger border border-light rounded-circle"
                      style={{ width: 12, height: 12 }}
                    >
                      <span className="visually-hidden">Belum dibaca</span>
                    </span>
                  );
                } else {
                  return null;
                }
              },
            },
            {
              Header: "#",
              id: "no",
              width: 100,
              accessor: (row, index) => (tableAttr.page - 1) * 10 + (index + 1),
            },
            {
              Header: "Tipe",
              accessor: "type",
              width: 220,
              accessor: (row) => {
                return row?.type === "pemanfaatan"
                  ? "Capaian Pembangunan"
                  : row?.type === "usulan"
                  ? "Pengusulan"
                  : row?.type === "serahterima"
                  ? "Serah Terima"
                  : row?.type === "pembangunan" && "Progress Pelaksanaan";
              },
            },
            {
              Header: "Notifikasi",
              width: 500,
              accessor: (row) => {
                let textMessage = "";
                if (row.type === "usulan") {
                  textMessage = "Usulan Baru";
                } else if (row.type === "revisiUsulan") {
                  textMessage = "Usulan telah di revisi";
                } else if (row.type === "vermin") {
                  if (row.Usulan) {
                    if (Number(row.Usulan.statusVermin) === 1) {
                      textMessage = "Vermin tervalidasi lengkap";
                    } else if (
                      Number(row.Usulan.statusVermin) === 0 &&
                      row.Usulan.statusVermin !== null
                    ) {
                      textMessage = "Vermin tervalidasi tidak lengkap";
                    } else {
                      textMessage = "Vermin telah diubah belum ditentukan";
                    }
                  }
                } else if (row.type === "serahterima") {
                  textMessage = row.text || "";
                } else if (row.type === "pemanfaatan") {
                  textMessage =
                    row.text
                      ?.split(" ")
                      .map((x) =>
                        x?.toLowerCase() === "pemanfaatan"
                          ? "Capaian Pembangunan"
                          : x?.toLowerCase() === "pembangunan"
                          ? "Progress Pelaksanaan"
                          : x
                      )
                      ?.join(" ") || "";
                }
                return textMessage;
              },
            },
            {
              Header: "Lokasi",
              width: 650,
              accessor: (row) => {
                let alamatLokasi = "";
                if (row.Usulan) {
                  if (row.Usulan.alamatLokasi) {
                    alamatLokasi = row.Usulan.alamatLokasi;
                  }
                  if (alamatLokasi === "") {
                    alamatLokasi = `${
                      LABEL_DIREKTORAT[row.Usulan?.DirektoratId]
                        ? `${LABEL_DIREKTORAT[row.Usulan?.DirektoratId]} | `
                        : ""
                    }
              Provinsi [${
                row.Usulan?.Provinsi ? row.Usulan?.Provinsi?.nama : "-"
              }] | 
              Kabupaten [${row.Usulan?.City ? row.Usulan?.City?.nama : "-"}]`;
                  }
                } else if (row?.attribute) {
                  if (alamatLokasi === "") {
                    alamatLokasi = `${
                      row.attribute?.type
                        ? `${_.startCase(_.toLower(row.attribute?.type))} | `
                        : ""
                    }
              Provinsi [${
                row.attribute?.Provinsi ? row.attribute?.Provinsi?.nama : "-"
              }] | 
              Kabupaten [${
                row.attribute?.City ? row.attribute?.City?.nama : "-"
              }]`;
                  }
                }
                return alamatLokasi;
              },
            },
            {
              Header: "Tgl Notifikasi",
              width: 200,
              accessor: (row) => {
                return row.createdAt
                  ? moment(row.createdAt).format("DD/MM/YYYY hh:mm:ss")
                  : "-";
              },
            },
            {
              Header: "Aksi",
              sticky: "right",
              align: "center",
              showTitle: false,
              accessor: (row) => {
                return (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => {
                      memoizedReadNotification(row);
                    }}
                  >
                    <Info size={16} /> Cek
                  </Button>
                );
              },
            },
          ],
    [memoizedReadNotification, tableAttr.page]
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
        title="Notifikasi"
        data={[
          {
            title:
              searchParams.get("type") === "komentar"
                ? "Notifikasi Komentar"
                : "Notifikasi",
          },
        ]}
      />
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>
                {searchParams.get("type") === "komentar"
                  ? "Notifikasi Komentar"
                  : "Notifikasi"}
              </CardTitle>
              {data?.totalUnread > 0 ? (
                <Button
                  onClick={() => {
                    handleReadAllNotification();
                  }}
                  color="primary"
                >
                  <BookOpen size={16} /> Baca Semua
                </Button>
              ) : null}
            </CardHeader>
            <CardBody className="p-0">
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Notifikasi;
