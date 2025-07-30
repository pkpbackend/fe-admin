import _ from "lodash";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Filter from "./component/Filter";

// ** Icons Imports
import { useHelpdeskQuery } from "@api/domains/diskusi";
import { TITLE } from "@constants/app";
import { Eye, PlusSquare } from "react-feather";
import ModalFormAdminCreateTicket from "./component/ModalFormAdminCreateTicket";
import { useSelector } from "react-redux";
import Table from "@customcomponents/Table";

const DISCUSSION_CREATE_TICKET_ACTION_CODE = "diskusi_ticket_admin";

const Diskusi = () => {
  const acl = useSelector((state) => state.auth.user?.Role?.accessMenu);
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/diskusi/admin/list");
  const navigate = useNavigate();

  const [tableAttr, setTableAttr] = useState({
    filtered: [{ id: "eq$isAdmin", value: isAdminPage ? 1 : 0 }],
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    document.title = `Diskusi ${isAdminPage ? "Admin" : "Publik"} - ${TITLE}`;
  }, [isAdminPage]);

  const [modalCreateTicketState, setModalCreateTicketState] = useState({
    open: false,
    data: null,
  });

  const { data, isFetching, isLoading } = useHelpdeskQuery(tableAttr);

  const columns = useMemo(
    () => [
      {
        Header: "Direktorat",
        accessor: "Direktorat.name",
        minWidth: 80,
        width: 80,
        Cell: ({ value }) => {
          return value || "-";
        },
      },
      {
        Header: "Topik",
        accessor: "topikDiskusi.name",
        minWidth: 80,
        width: 80,
        Cell: ({ value }) => {
          return value || "-";
        },
      },
      {
        Header: "Judul",
        accessor: "title",
      },
      {
        Header: "status",
        accessor: "status",
        align: "center",
        maxWidth: 40,
        Cell: ({ value }) => {
          return (
            <Badge color={value ? "success" : "warning"} pill>
              {value ? "Selesai" : "Belum Selesai"}
            </Badge>
          );
        },
      },
      {
        Header: "Aksi",
        maxWidth: 40,
        accessor: "id",
        align: "center",
        Cell: ({ value }) => {
          return (
            <Button
              className="btn-icon"
              size="sm"
              color="primary"
              onClick={(e) => {
                navigate(
                  `/diskusi/${isAdminPage ? "admin" : "publik"}/list/${value}`
                );
              }}
            >
              <Eye size={16} />
            </Button>
          );
        },
      },
    ],
    [navigate, isAdminPage]
  );

  const handleTableAttrChange = useCallback(
    (params = {}) => {
      const { filtered = null, page, pageSize } = params;
      setTableAttr((val) => ({
        ...val,
        page: page || val.page,
        pageSize: pageSize || val.pageSize,
        filtered: filtered
          ? _.uniqBy([...filtered, ...val.filtered], "id")
          : [{ id: "eq$isAdmin", value: isAdminPage ? 1 : 0 }],
      }));
    },
    [isAdminPage]
  );

  return (
    <Fragment>
      <Row className="gy-3">
        <Col sm="12">
          <Filter
            loading={isFetching || isLoading}
            handleTableAttrChange={handleTableAttrChange}
          />
        </Col>
        <Col md="12">
          <Card className="card-snippet">
            <CardHeader>
              <CardTitle>
                Daftar Diskusi {isAdminPage ? "Admin" : "Publik"}
              </CardTitle>
              {isAdminPage &&
                acl.includes(DISCUSSION_CREATE_TICKET_ACTION_CODE) && (
                  <Button
                    color="primary"
                    onClick={() =>
                      setModalCreateTicketState({
                        ...modalCreateTicketState,
                        modalTambah: true,
                        modalData: {
                          id: null,
                        },
                      })
                    }
                  >
                    <PlusSquare size={16} /> Buat Tiket
                  </Button>
                )}
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
            />
          </Card>
        </Col>
      </Row>
      <ModalFormAdminCreateTicket
        isOpen={modalCreateTicketState.modalTambah}
        onClose={() => setModalCreateTicketState({ open: false, data: null })}
      />
    </Fragment>
  );
};

export default Diskusi;
