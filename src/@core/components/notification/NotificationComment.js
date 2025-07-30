import { DIREKTORAT, LABEL_DIREKTORAT } from "@constants";
import { stringRoute } from "@utils/ObjectHelpers";
import { find as findObject } from "lodash";
import moment from "moment";
import React, { Fragment } from "react";
import { MessageCircle, Clock } from "react-feather";
import { useNavigate } from "react-router";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import {
  useNotificationsQuery,
  useReadNotificationMutation,
} from "../../../api/domains/notification";

const NotificationComment = function () {
  let history = useNavigate();
  const [readNotificationMutation] = useReadNotificationMutation();

  const { data, isLoading, isFetching } = useNotificationsQuery({
    page: 1,
    pageSize: 20,
    filtered: [{ id: "eq$type", value: "komentar" }],
  });

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

  const handelClickItem = async function (props) {
    let item = props ? props.item : {};
    const text = item?.text || "";
    if (item.id) {
      await readNotificationMutation({ id: item.id }).unwrap();
    }
    if (text.includes("usulan")) {
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
    } else if (text.includes("serah terima")) {
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
  };

  return (
    <Fragment>
      <DropdownToggle nav>
        <MessageCircle size={27} className="me-75" />
        {data?.totalUnread ? (
          <Badge
            color="danger"
            className={`notification-badge${
              data?.totalUnread > 0 ? " get-notif" : ""
            }`}
          >
            {data?.totalUnread}
          </Badge>
        ) : (
          <></>
        )}
      </DropdownToggle>
      <DropdownMenu style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="d-flex justify-content-center p-3 border-bottom">
          <h4 className="mb-0">Notifikasi Komentar</h4>
        </div>
        <div className="el-notification">
          {(isLoading || isFetching) && (
            <div className="text-center element-page">
              <div className="spinner-grow" role="status" />
            </div>
          )}
          {data?.data?.length > 0 ? (
            <>
              {data?.data?.map((item, index) => {
                let textMessage = item.text || "";
                let ago = "";
                let alamatLokasi = "";
                if (item.Usulan) {
                  if (item.Usulan.alamatLokasi) {
                    alamatLokasi = item.Usulan.alamatLokasi;
                  }

                  if (alamatLokasi === "") {
                    alamatLokasi = `${
                      item.Usulan
                        ? LABEL_DIREKTORAT[item.Usulan.DirektoratId] + " | "
                        : ""
                    }Provinsi [${
                      item.Usulan.Provinsi ? item.Usulan.Provinsi.nama : "-"
                    }] | Kabupaten [${
                      item.Usulan.City ? item.Usulan.City.nama : "-"
                    }]`;
                  }
                }
                if (item.createdAt) {
                  ago = moment(item.createdAt).fromNow();
                }

                return (
                  <DropdownItem
                    key={`notification-${index}`}
                    className={`border-bottom message${
                      item.read === true ? " readed" : " unread"
                    }`}
                    style={{ minWidth: 300 }}
                    onClick={() => {
                      handelClickItem({
                        item,
                      });
                    }}
                  >
                    <div className="d-flex flex-column justify-content-start align-items-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 5,
                          }}
                        >
                          <span style={{ fontSize: 11 }}>{textMessage}</span>
                          <div
                            style={{
                              display: "flex",
                              columnGap: 5,
                              alignItems: "center",
                            }}
                          >
                            <Clock style={{ width: 13 }} />
                            <span style={{ fontSize: 11 }}>{ago}</span>
                          </div>
                        </div>
                        <span className="d-inline-block ms-50">
                          {!item.read ? (
                            <span
                              className="d-inline-block bg-danger border border-light rounded-circle"
                              style={{ width: 12, height: 12 }}
                            >
                              <span className="visually-hidden">
                                Belum dibaca
                              </span>
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </div>
                  </DropdownItem>
                );
              })}
            </>
          ) : (
            <p className="p-3 m-5 text-center" color="secondary">
              Tidak ada komentar
            </p>
          )}
        </div>
        <div
          className="border-top pt-50 pb-50"
          style={{
            minWidth: 300,
          }}
        >
          <Button
            block
            color="link"
            onClick={() => {
              history("/notifikasi?type=komentar");
            }}
          >
            Lihat Semua
          </Button>
        </div>
        {/* <div
          className="d-flex align-items-center border-top pt-50 pb-50"
          style={{
            minWidth: 300,
          }}
        >
          <Button
            color="link"
            onClick={() => {
              history("/notifikasi");
            }}
            style={{
              borderRight: '1px solid #8e8a9d',
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
              width: '50%'
            }}
          >
            Lihat Semua
          </Button>
          <Button
            color="link"
            style={{
              width: '50%'
            }}
          >
            Baca Semua
          </Button>
        </div>  */}
      </DropdownMenu>
      <style jsx="true">{css}</style>
    </Fragment>
  );
};

const css = `
.element-page {
    padding: 20px;
}
.element-page div {
    cursor: pointer;
}
.element-page div:hover {
    color: darkgrey;
}
.element-page div:active {
    color: darkred;
}
.unread {
  background: #f0f0f0 !important;
}
.dropdown-item {
    white-space: unset;
}
.el-notification {
  max-height: 350px;
  overflow-y: auto;
}
`;

export default NotificationComment;
