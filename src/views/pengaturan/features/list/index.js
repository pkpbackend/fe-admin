import BreadCrumbs from "@components/breadcrumbs/custom";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledAccordion,
} from "reactstrap";
import FormAplikasi from "./component/FormAplikasi";
import FormEditor from "./component/FormEditor";
import FormLink from "./component/FormLink";
import FormRPJM from "./component/FormRPJM";
import FormSlider from "./component/FormSlider";
import SettingThemeSection from "./component/SettingThemeSection";
const PORTAL_LOGIN_ACTION_CODE = "portal_login";
const PORTAL_LANDING_ACTION_CODE = "portal_landing";
const PORTAL_SERVICE_DESCRIPTION_ACTION_CODE = "portal_service_description";
const PORTAL_FOOTER_ACTION_CODE = "portal_footer";

const Pengaturan = () => {
  const acl = useSelector((state) => state.auth.user?.Role?.accessMenu);

  const [toggle, setToggle] = useState({
    modalTambah: false,
    modalType: "",
    modalName: "",
  });

  // capitalize first letter from snake_case
  const capitalize = (str) => {
    return str
      .split("_")
      .map((word) => {
        if (word.length <= 3) return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  return (
    <Fragment>
      <BreadCrumbs title="Pengaturan" data={[{ title: "Pengaturan" }]} />
      <Row className="gy-3 mt-1">
        <Col md="12">
          <SettingThemeSection />
        </Col>
        {acl.includes(PORTAL_LOGIN_ACTION_CODE) ? (
          <Col md="12">
            <UncontrolledAccordion>
              <AccordionItem className="shadow">
                <AccordionHeader targetId="setting-portal-login-section">
                  Login
                </AccordionHeader>
                <AccordionBody accordionId="setting-portal-login-section">
                  <Row className="gy-3 gx-3">
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "editor",
                            modalKey: "disclaimer",
                            modalName: "Disclaimer",
                          })
                        }
                      >
                        Disclaimer
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "editor",
                            modalKey: "registrasi",
                            modalName: "Info Registrasi",
                          })
                        }
                      >
                        Info Registrasi
                      </Button>
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        ) : null}
        {acl.includes(PORTAL_LANDING_ACTION_CODE) ? (
          <Col md="12">
            <UncontrolledAccordion>
              <AccordionItem className="shadow">
                <AccordionHeader targetId="setting-portal-landing-section">
                  Landing
                </AccordionHeader>
                <AccordionBody accordionId="setting-portal-landing-section">
                  <Row className="gy-3 gx-3">
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "slider",
                            modalKey: "slider",
                            modalName: "Slider",
                          })
                        }
                      >
                        Home Slider
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "aplikasi",
                            modalKey: "aplikasi",
                            modalName: "Link Aplikasi",
                          })
                        }
                      >
                        Link Aplikasi
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "editor",
                            modalKey: "kontak",
                            modalName: "Kontak",
                          })
                        }
                      >
                        Kontak
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "rpjm",
                            modalKey: "rpjm",
                            modalName: "RPJM",
                          })
                        }
                      >
                        Informasi RPJM
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "editor",
                            modalKey: "tentang",
                            modalName: "Tentang",
                          })
                        }
                      >
                        Tentang
                      </Button>
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        ) : null}
        {acl.includes(PORTAL_SERVICE_DESCRIPTION_ACTION_CODE) ? (
          <Col md="12">
            <UncontrolledAccordion>
              <AccordionItem className="shadow">
                <AccordionHeader targetId="setting-portal-service-description-section">
                  Deskripsi Layanan
                </AccordionHeader>
                <AccordionBody accordionId="setting-portal-service-description-section">
                  <Row className="gy-3 gx-3">
                    {[
                      "layanan_pengajuan_bantuan",
                      "bantuan_perumahan",
                      "kpr",
                      "layanan_pendataan",
                      "profil_rumah_kewilayahan",
                      "rumah_tidak_layak_huni",
                      "rumah_terdampak_bencana",
                      "layanan_monitoring",
                      "pembangunan",
                      "pemanfaatan",
                      "layanan_serah_terima",
                      "layanan_konsultasi",
                      "dashboard_manajemen_data",
                      "layanan_direktorat",
                      "sekretariat_ditjen_perumahan",
                      "kepatuhan_intern",
                      "rumah_susun",
                      "rumah_khusus",
                      "rumah_swadaya",
                      "rumah_umum_dan_komersial",
                    ].map((key) => (
                      <Col
                        key={key}
                        md={4}
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <Button
                          block={true}
                          onClick={(e) =>
                            setToggle({
                              ...toggle,
                              modalTambah: true,
                              modalType: "editor",
                              modalKey: key,
                              modalName: `Deskripsi ${capitalize(key)}`,
                            })
                          }
                        >
                          {capitalize(key)}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        ) : null}
        {acl.includes(PORTAL_FOOTER_ACTION_CODE) ? (
          <Col md="12">
            <UncontrolledAccordion>
              <AccordionItem className="shadow">
                <AccordionHeader targetId="setting-portal-footer-section">
                  Footer
                </AccordionHeader>
                <AccordionBody accordionId="setting-portal-footer-section">
                  <Row className="gy-3 gx-3">
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "link",
                            modalKey: "situs",
                            modalName: "Situs Terkait",
                          })
                        }
                      >
                        Situs Terkait
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "link",
                            modalKey: "aplikasipupr",
                            modalName: "Aplikasi PUPR",
                          })
                        }
                      >
                        Aplikasi PUPR
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        block={true}
                        onClick={(e) =>
                          setToggle({
                            ...toggle,
                            modalTambah: true,
                            modalType: "link",
                            modalKey: "kontakkami",
                            modalName: "Kontak Kami",
                          })
                        }
                      >
                        Kontak Kami
                      </Button>
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        ) : null}
      </Row>

      <Modal
        isOpen={toggle.modalTambah}
        toggle={() => {
          setToggle({
            ...toggle,
            modalTambah: !toggle.modalTambah,
          });
        }}
        size={"xl"}
      >
        <ModalHeader
          toggle={() => {
            setToggle({
              ...toggle,
              modalTambah: !toggle.modalTambah,
            });
          }}
          className="bg-darkblue"
        >
          Konten {toggle.modalName}
        </ModalHeader>
        <ModalBody>
          {toggle.modalType == "editor" && (
            <FormEditor setToggle={setToggle} toggle={toggle} />
          )}
          {toggle.modalType == "slider" && (
            <FormSlider setToggle={setToggle} toggle={toggle} />
          )}
          {toggle.modalType == "aplikasi" && (
            <FormAplikasi setToggle={setToggle} toggle={toggle} />
          )}
          {toggle.modalType == "rpjm" && (
            <FormRPJM setToggle={setToggle} toggle={toggle} />
          )}
          {toggle.modalType == "link" && (
            <FormLink setToggle={setToggle} toggle={toggle} />
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Pengaturan;
