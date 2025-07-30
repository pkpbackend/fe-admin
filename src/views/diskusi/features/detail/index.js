import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs/custom";
import moment from "moment";
import { User } from "react-feather";

import "moment/locale/id";

import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
  Spinner,
} from "reactstrap";

import {
  useDetailHelpdeskQuery,
  useHelpdeskChatsQuery,
  useCloseHelpdeskDiscussionTicketMutation,
} from "../../../../api/domains/diskusi";
import Rating from "../../../../components/Rating";
import FormCreateChat from "./components/FormCreateChat";
import ModalDetailUser from "./components/ModalDetailUser";
import "./detail.scss";
import sweetalert from "@utils/sweetalert";

moment.locale("id");

const DetailDiskusi = () => {
  const params = useParams();
  const location = useLocation();
  const isAdminDiscussionPage = location.pathname.includes(
    "/diskusi/admin/list"
  );

  const [showDetailUser, setShowDetailUser] = useState(false);
  const id = params?.id;
  const { data, isLoading, isFetching } = useDetailHelpdeskQuery(id, {
    skip: !id,
  });

  const {
    data: chats,
    isLoading: isLoadingChats,
    isFetching: isFetchingChats,
  } = useHelpdeskChatsQuery(
    { id: id, page: 1, pageSize: 2e9 },
    { skip: !data?.id }
  );

  const [closeTicketMutation] = useCloseHelpdeskDiscussionTicketMutation();

  async function handleCloseTicket() {
    sweetalert
      .fire({
        title: "Konfirmasi!",
        text: "Apakah anda yakin ingin menyelesaikan Diskusi?",
        showLoaderOnConfirm: true,
        showCancelButton: true,
        cancelButtonText: "Batal",
        confirmButtonText: "Iya",
        preConfirm: async () => {
          try {
            await closeTicketMutation(id).unwrap();
            return true;
          } catch (error) {
            sweetalert.showValidationMessage(`${error ?? "Terjadi kesalahan"}`);
          }
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          sweetalert.fire("Berhasil", "Tiket berhasil ditutup", "success");
        }
      });
  }

  return (
    <>
      <div>
        <Breadcrumbs
          title="Detail Diskusi"
          data={[
            {
              title: `Diskusi ${isAdminDiscussionPage ? "Admin" : "Publik"}`,
              link: `/diskusi/${
                isAdminDiscussionPage ? "admin" : "publik"
              }/list`,
            },
            { title: "Detail" },
          ]}
        />

        <Row style={{ flexWrap: "wrap-reverse" }}>
          <Col xs={12} sm={12} md={9}>
            <Card className="card-snippet">
              <CardBody>
                {isLoading ||
                isFetching ||
                isLoadingChats ||
                isFetchingChats ? (
                  <>
                    <Spinner />
                  </>
                ) : (
                  <>
                    {chats?.length > 0 ? (
                      <div className={"chat-wrapper"}>
                        {chats?.map((chat) => (
                          <div key={chat.id} className={"chat-item"}>
                            <div className={"chat-title-wrapper"}>
                              <div className={"chat-username"}>
                                <Avatar
                                  icon={<User size={18} />}
                                  color="secondary"
                                />
                                <span>
                                  {chat?.HelpdeskUser?.internalUserId
                                    ? chat?.HelpdeskUser.internalUserDetail.nama
                                    : chat?.HelpdeskUser?.name ?? "User"}
                                </span>
                              </div>
                              <div className={"chat-date"}>
                                {chat.createdAt
                                  ? moment(chat.createdAt).format("ll, LT")
                                  : "-"}
                              </div>
                            </div>
                            <div className={"chat-body"}>{chat.chat}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Alert style={{ padding: "2rem" }} color="secondary">
                        Belum ada diskusi
                      </Alert>
                    )}
                    {data && data.status === false ? (
                      <FormCreateChat helpeskId={data?.id} />
                    ) : null}
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={3}>
            <Card className="card-snippet">
              <CardBody>
                {isLoading || isFetching ? (
                  <Spinner />
                ) : (
                  <>
                    <div className="descriptions">
                      <div className="description-item">
                        <div className="description-label">Direktorat</div>
                        <div className="description-content">
                          {data?.Direktorat?.name ?? "-"}
                        </div>
                      </div>
                      <div className="description-item">
                        <div className="description-label">Topik</div>
                        <div className="description-content">
                          {data?.topikDiskusi?.name}
                        </div>
                      </div>
                      <div className="description-item">
                        <div className="description-label">Judul</div>
                        <div className="description-content">{data?.title}</div>
                      </div>
                      <div className="description-item">
                        <div className="description-label">Status</div>
                        <div className="description-content">
                          {data?.status ? "Selesai" : "Belum Selesai"}
                        </div>
                      </div>
                      {data?.status && !isAdminDiscussionPage ? (
                        <div className="description-item">
                          <div className="description-label">Rating</div>
                          <div className="description-content">
                            <Rating
                              readonly
                              initialRating={data?.rating ?? 0}
                            />
                          </div>
                        </div>
                      ) : null}
                      {isAdminDiscussionPage ? null : (
                        <div className="description-item">
                          <div className="description-label">User</div>
                          <div className="description-content">
                            <Button
                              color="primary"
                              outline
                              style={{ marginTop: "0.5rem" }}
                              onClick={() => {
                                setShowDetailUser(true);
                              }}
                            >
                              Detail
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardBody>
              {isLoading || isFetching || data?.status ? null : (
                <CardFooter>
                  <Button
                    block
                    color="danger"
                    outline
                    onClick={handleCloseTicket}
                  >
                    Tutup Tiket
                  </Button>
                </CardFooter>
              )}
            </Card>
          </Col>
        </Row>
      </div>
      {data ? (
        <>
          {isAdminDiscussionPage ? null : (
            <ModalDetailUser
              open={showDetailUser}
              onClose={() => setShowDetailUser(false)}
              data={data?.user}
            />
          )}
        </>
      ) : null}
    </>
  );
};

export default DetailDiskusi;
