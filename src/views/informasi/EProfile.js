import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import qs from "query-string";

import { SCOPE_REGION_ROLE } from "@constants";
import { getDemand, getSupply } from "@api/ApiCallEProfile";
import EProfileDetail from "./EProfileDetail";
import SpinnerLoading from "@customcomponents/SpinnerLoading";
import { objToParams } from "@utils/ObjectHelpers";
import ApiCall from "@api/ApiCallGlobal";

function RenderJumlahRtlh(props) {
  const { kodeDagri } = props;
  const [jumlahRTLH, setJumlahRTLH] = useState(0);

  useEffect(() => {
    async function fetchJumlahRTLH() {
      const res = await ApiCall.getJumlahRtlh({
        params: qs.stringify({ CityId: `${kodeDagri}`.replace(".", "") }),
      });

      setJumlahRTLH(res.data?.count);
    }

    fetchJumlahRTLH();
  }, [kodeDagri]);

  return (
    <td className={"text-right"}>
      {parseFloat(jumlahRTLH).toLocaleString(undefined, {
        minimumFractionDigits: 0,
      })}
    </td>
  );
}

const EProfile = (props) => {
  let { user } = props;
  const [toggle, setToggle] = useState({
    modal: false,
    modalType: "",
    modalTitle: null,
    modalData: {},
  });

  const [isEProfile, setIsEProfile] = useState(false);
  const [profilDemand, setProfilDemand] = useState([]);
  const [profilSupply, setProfilSupply] = useState([]);
  const [profilSupplyLoading, setProfilSupplyLoading] = useState(true);
  const [profilDemandLoading, setProfilDemandLoading] = useState(true);

  useEffect(() => {
    let { Role } = user;
    if (
      Role.ScopeRegionRoleId !== SCOPE_REGION_ROLE.SELURUH_INDONESIA &&
      Role.ScopeRegionRoleId !== SCOPE_REGION_ROLE.USULAN_SENDIRI
    ) {
      // should be changes
      let params = { tahun: new Date().getFullYear() };
      let regi = user.region
        ? typeof user.region === "string"
          ? JSON.parse(user.region)
          : user.region
        : null;

      if (Role.ScopeRegionRoleId === SCOPE_REGION_ROLE.PER_PROVINSI) {
        params = {
          ...params,
          prov: user.ProvinsiId,
        };
      } else if (
        Role.ScopeRegionRoleId === SCOPE_REGION_ROLE.PER_PROVINSI_TERPILIH
      ) {
        if (regi?.provinsi) {
          let regiArray = "";

          for (const region of regi.provinsi) {
            regiArray += region.value + ", ";
          }

          params = {
            ...params,
            prov: regiArray.substring(0, regiArray.length - 2),
          };
        }
      } else if (Role.ScopeRegionRoleId === SCOPE_REGION_ROLE.PER_KABUPATEN) {
        params = {
          ...params,
          kab: `${String(user.CityId).substring(0, 2)}.${String(
            user.CityId
          ).substring(2, 4)}`,
        };
      } else if (
        Role.ScopeRegionRoleId === SCOPE_REGION_ROLE.PER_KABUPATEN_TERPILIH
      ) {
        if (regi?.kabupaten) {
          let regiArray = "";

          for (const region of regi.kabupaten) {
            regiArray += region.value + ", ";
          }

          params = {
            ...params,
            kab: regiArray.substring(0, regiArray.length - 2),
          };
        }
      }

      if (params.prov && params.tahun) {
        setIsEProfile("provinsi");

        getDemand(params)
          .then((res) => {
            setProfilDemand(res);
          })
          .catch((err) => {})
          .finally(() => {
            setProfilDemandLoading(false);
          });

        getSupply(params)
          .then((res) => {
            setProfilSupply(res);
          })
          .catch((err) => {})
          .finally(() => {
            setProfilSupplyLoading(false);
          });
      }

      if (params.kab && params.tahun) {
        setIsEProfile("kabupaten");

        getDemand(params)
          .then((res) => {
            setProfilDemand(res);
          })
          .catch((err) => {})
          .finally(() => {
            setProfilDemandLoading(false);
          });

        getSupply(params)
          .then((res) => {
            setProfilSupply(res);
          })
          .catch((err) => {})
          .finally(() => {
            setProfilSupplyLoading(false);
          });
      }
    }
  }, []);

  const ProfilDemand = profilDemand.map((item, index) => {
    let meong = [
      <tr
        key={index}
        onClick={() =>
          isEProfile === "provinsi"
            ? setToggle({
                modal: true,
                modalType: "demand",
                modalTitle: `Detail Demand Perumahan - [${item.province_name}]`,
                modalData: item,
              })
            : () => {}
        }
        style={{ cursor: "pointer" }}
      >
        <th scope="row">
          {isEProfile === "provinsi" ? item.province_name : item.kabupaten_name}
        </th>
        <td className={"text-right"}>
          {Number(item.meong.backlog.kepemilikan).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.backlog.penghunian).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.rtlh).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <RenderJumlahRtlh kodeDagri={item.kabupaten_code} />
        <td className={"text-right"}>
          {Number(item.meong.hunian.unit).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.hunian.persen).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
      </tr>,
    ];

    return meong;
  });

  const ProfilSupply = profilSupply.map((item, index) => {
    let meong = [
      <tr
        key={index}
        onClick={() =>
          isEProfile === "provinsi"
            ? setToggle({
                modal: true,
                modalType: "supply",
                modalTitle: `Detail Supply Perumahan - [${item.province_name}]`,
                modalData: item,
              })
            : () => {}
        }
        style={{ cursor: "pointer" }}
      >
        <th scope="row">
          {isEProfile === "provinsi" ? item.province_name : item.kabupaten_name}
        </th>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbn.pk.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbn.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbn.pb.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbn.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdprov.pk.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdprov.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdprov.pb.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdprov.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdkab.pk.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdkab.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdkab.pb.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdkab.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdes.pk.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdes.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdes.pb.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.apbdes.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dak.pk.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dak.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dak.pb.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dak.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dau.pk.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dau.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dau.pb.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.dau.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(
            item.meong.pemerintah.otonomi_khusus.pk.volume
          ).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.otonomi_khusus.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(
            item.meong.pemerintah.otonomi_khusus.pb.volume
          ).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.otonomi_khusus.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.yayasan.pk.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.yayasan.pk.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.yayasan.pb.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.yayasan.pb.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.kegiatan_lainnya.volume).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pemerintah.kegiatan_lainnya.biaya).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>

        <td className={"text-right"}>
          {Number(item.meong.imb.perumahan.mbr).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.imb.perumahan.non_mbr).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.imb.perorangan.mbr).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.imb.perorangan.non_mbr).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>

        <td className={"text-right"}>
          {Number(item.meong.pengembang.rumah_umum.realisasi).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pengembang.rumah_umum.harga).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(
            item.meong.pengembang.rumah_komersial.realisasi
          ).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.pengembang.rumah_komersial.harga).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>

        <td className={"text-right"}>
          {Number(item.meong.perbankan.rumah_umum.realisasi).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.perbankan.rumah_umum.harga).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
        <td className={"text-right"}>
          {Number(
            item.meong.perbankan.rumah_komersial.realisasi
          ).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        </td>
        <td className={"text-right"}>
          {Number(item.meong.perbankan.rumah_komersial.harga).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 0,
            }
          )}
        </td>
      </tr>,
    ];

    return meong;
  });

  return (
    <Fragment>
      {isEProfile && (
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                Panel Informasi Demand Perumahan e-Profil (integrasi data dengan{" "}
                <a
                  target="_blank"
                  href="http://profil.perumahan.pu.go.id/index.php"
                  rel="noreferrer"
                >
                  e-Profil Perumahan
                </a>
                )
              </CardHeader>
              <CardBody>
                {profilDemandLoading ? (
                  <SpinnerLoading />
                ) : (
                  <Row>
                    <Col md="12">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th rowSpan="2">Provinsi / Kabupaten</th>
                            <th colSpan="2">Backlog</th>
                            <th colSpan="2">RTLH</th>
                            <th colSpan="2">Hunian</th>
                          </tr>
                          <tr>
                            <th>Kepemilikan</th>
                            <th>Penghunian</th>
                            <th>Pemda</th>
                            <th>e-Rtlh</th>
                            <th>Unit</th>
                            <th>Persen</th>
                          </tr>
                        </thead>
                        <tbody>{ProfilDemand}</tbody>
                      </Table>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {isEProfile && (
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                Panel Informasi Supply Perumahan e-Profil (integrasi data dengan{" "}
                <a
                  target="_blank"
                  href="http://profil.perumahan.pu.go.id/index.php"
                  rel="noreferrer"
                >
                  e-Profil Perumahan
                </a>
                )
              </CardHeader>
              <CardBody style={{ overflowX: "auto" }}>
                {profilSupplyLoading ? (
                  <SpinnerLoading />
                ) : (
                  <Row>
                    <Col md="12">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th rowSpan="4">Provinsi / Kabupaten</th>
                            <th colSpan="34">Pemerintah</th>
                            <th colSpan="4">IMB</th>
                            <th colSpan="4">Pengembang</th>
                            <th colSpan="4">Perbankan</th>
                          </tr>
                          <tr>
                            <th colSpan="4">APBN</th>
                            <th colSpan="4">APBD Prov</th>
                            <th colSpan="4">APBD Kab</th>
                            <th colSpan="4">APBD Des</th>
                            <th colSpan="4">DAK</th>
                            <th colSpan="4">DAU</th>
                            <th colSpan="4">Otonomi Khusus</th>
                            <th colSpan="4">Yayasan / CSR</th>
                            <th rowSpan="2" colSpan="2">
                              Kegiatan Lainnya
                            </th>
                            <th rowSpan="2" colSpan="2">
                              Perumahan
                            </th>
                            <th rowSpan="2" colSpan="2">
                              Perorangan
                            </th>

                            <th rowSpan="2" colSpan="2">
                              Umum
                            </th>

                            <th rowSpan="2" colSpan="2">
                              Komersial
                            </th>

                            <th rowSpan="2" colSpan="2">
                              Umum
                            </th>

                            <th rowSpan="2" colSpan="2">
                              Komersial
                            </th>
                          </tr>
                          <tr>
                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>

                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>

                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>

                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>

                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>

                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>

                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>

                            <th colSpan="2">PK</th>
                            <th colSpan="2">PB</th>
                          </tr>
                          <tr>
                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>
                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>Volume</th>
                            <th>Biaya</th>

                            <th>MBR</th>
                            <th>Non MBR</th>

                            <th>MBR</th>
                            <th>Non MBR</th>

                            <th>Realisasi</th>
                            <th>Harga</th>

                            <th>Realisasi</th>
                            <th>Harga</th>

                            <th>Realisasi</th>
                            <th>Harga</th>

                            <th>Realisasi</th>
                            <th>Harga</th>
                          </tr>
                        </thead>
                        <tbody>{ProfilSupply}</tbody>
                      </Table>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <Modal
        isOpen={toggle.modal}
        toggle={() => {
          setToggle({
            ...toggle,
            modal: !toggle.modal,
          });
        }}
        size={"xl"}
      >
        <ModalHeader
          toggle={() => {
            setToggle({
              ...toggle,
              modal: !toggle.modal,
            });
          }}
          className="bg-darkblue"
        >
          {toggle.modalTitle ? toggle.modalTitle : "Detail E-Profile"}
        </ModalHeader>
        <ModalBody>
          <EProfileDetail toggle={toggle} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default EProfile;
