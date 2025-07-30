// ** React Imports
import { useNavigate, useParams } from "react-router";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";
import ComponentSpinner from "../../../../@core/components/spinner/Loading-spinner";

// ** Third Party Components
import { Check, Edit2, Trash2, X } from "react-feather";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Row,
  Table,
  UncontrolledAccordion,
} from "reactstrap";

import sweetalert from "@utils/sweetalert";
import { DIREKTIF } from "../../../../constants";
import { useDeleteRoleMutation, useRoleQuery } from "../../domains";
import PermissionAccessMenu from "./components/PermissionAccessMenu";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [deleteMutation] = useDeleteRoleMutation();

  const { data, isLoading, isFetching, error } = useRoleQuery(params?.id, {
    skip: !params?.id,
  });

  function handleDelete() {
    sweetalert
      .fire({
        title: "Konfirmasi Hapus",
        text: "Setelah anda hapus maka data yang bersangukatan dengan role ini akan ikut terhapus juga!",
        icon: "info",
        confirmButtonText: "Ya",
        showCancelButton: true,
        cancelButtonText: "Batal",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await deleteMutation(data.id);
            return true;
          } catch (error) {
            sweetalert.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !sweetalert.isLoading(),
      })
      .then((result) => {
        if (result.isConfirmed) {
          sweetalert.fire("Berhasil", "Berhasil menghapus role...", "success");
          navigate(`/role-management/list`);
        }
      });
  }

  if (error?.status === 404) {
    sweetalert
      .fire({
        title: "404 Not Found",
        text: "Data role tidak ditemukan",
        icon: "error",
        confirmButtonText: "Kembali",
        allowOutsideClick: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/role-management/list");
        }
      });
  }

  return (
    <div>
      <Breadcrumbs
        title="Detail Role"
        data={[
          { title: "Daftar Role", link: "/role-management/list" },
          { title: "Detail Role" },
        ]}
      />
      <div>
        <Row className="gy-3">
          <Col sm={12}>
            <div className="d-flex justify-content-end">
              <Button
                tag="span"
                color="danger"
                onClick={() => {
                  handleDelete();
                }}
              >
                <Trash2 size={16} />
                Hapus Role
              </Button>
              <Button
                tag="span"
                color="primary"
                className="ms-3"
                onClick={(e) => {
                  navigate(`/role-management/list/edit/${data?.id}`);
                }}
              >
                <Edit2 size={16} />
                Edit Role
              </Button>
            </div>
          </Col>
          <Col sm={6}>
            <UncontrolledAccordion defaultOpen="role-information">
              <AccordionItem className="shadow">
                <AccordionHeader targetId="role-information">
                  Informasi Role
                </AccordionHeader>
                <AccordionBody accordionId="role-information">
                  {isLoading || isFetching ? (
                    <div className="p-4">
                      <ComponentSpinner />
                    </div>
                  ) : (
                    <>
                      {data && (
                        <Table size="sm" responsive hover>
                          <tbody>
                            <tr>
                              <td className="fw-bolder">Nama Role</td>
                              <td>{data.nama || "-"}</td>
                            </tr>
                            <tr>
                              <td className="fw-bolder">Cangkupan Usulan</td>
                              <td>{data?.ScopeRegionRole?.name || "-"}</td>
                            </tr>
                            <tr>
                              <td className="fw-bolder">
                                Type Pengisian Usulan
                              </td>
                              <td>{DIREKTIF[data.direktif]?.label || "-"} </td>
                            </tr>
                            <tr>
                              <td className="fw-bolder">Direktorat</td>
                              <td>{data?.Direktorat?.name || "-"}</td>
                            </tr>
                            <tr>
                              <td className="fw-bolder">Admin</td>
                              <td colSpan="3">
                                {data.admin ? (
                                  <Check
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-success"
                                  />
                                ) : (
                                  <X
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-danger"
                                  />
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bolder">Akses Dashboard</td>
                              <td colSpan="3">
                                <div>
                                  <div className="d-flex align-items-center mb-1">
                                    {data.dashboard === 1 ? (
                                      <Check
                                        size={20}
                                        strokeWidth={2.5}
                                        className="text-success"
                                      />
                                    ) : (
                                      <X
                                        size={20}
                                        strokeWidth={2.5}
                                        className="text-danger"
                                      />
                                    )}
                                  </div>
                                  {data.dashboard === 1 && (
                                    <>
                                      <div className="d-flex align-items-center">
                                        {data.defaultLogin === 1 ? (
                                          <Check
                                            size={20}
                                            strokeWidth={2.5}
                                            className="text-success"
                                          />
                                        ) : (
                                          <X
                                            size={20}
                                            strokeWidth={2.5}
                                            className="text-danger"
                                          />
                                        )}
                                        <span className="ms-2">
                                          Default Login ke Dashboard
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      )}
                    </>
                  )}
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
          <Col sm={6}>
            <PermissionAccessMenu accessMenuList={data?.accessMenu} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Detail;
