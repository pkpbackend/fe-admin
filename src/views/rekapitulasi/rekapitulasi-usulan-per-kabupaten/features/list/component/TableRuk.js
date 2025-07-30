import ComponentSpinner from "@components/spinner/Loading-spinner";
import { Fragment } from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert,
  Col,
  Row,
  Table,
  UncontrolledAccordion,
} from "reactstrap";
import ButtonExport from "./ButtonExport";
import "./table.scss";

const TableRuk = ({ data = [], loading, queryParams }) => {
  const nonKomunitas = data.filter(
    ({ type }) => Number(type) === 1 || Number(type) === 2
  );
  const komunitas = data.filter(
    ({ type }) => Number(type) === 3 || Number(type) === 4
  );
  return (
    <>
      <UncontrolledAccordion className="mb-4" defaultOpen={["nonKomunitas"]}>
        <AccordionItem className="border border-secondary-subtle">
          <AccordionHeader targetId="nonKomunitas">
            <div className="d-flex w-100 justify-content-between align-items-center pe-3">
              Rekapitulasi RUK Usulan Per Kabupaten Non Komunitas
              <Row className="gx-3">
                <Col xs="auto">
                  <ButtonExport
                    fileType="pdf"
                    disabled={!nonKomunitas || nonKomunitas?.length === 0}
                    queryParams={{
                      ...queryParams,
                      filtered: [
                        ...queryParams.filtered,
                        { id: "in$type", value: [1, 2] },
                      ],
                    }}
                  >
                    Download PDF
                  </ButtonExport>
                </Col>
                <Col xs="auto">
                  <ButtonExport
                    fileType="excel"
                    disabled={!nonKomunitas || nonKomunitas?.length === 0}
                    queryParams={{
                      ...queryParams,
                      filtered: [
                        ...queryParams.filtered,
                        { id: "in$type", value: [1, 2] },
                      ],
                    }}
                  >
                    Export Excel
                  </ButtonExport>
                </Col>
              </Row>
            </div>
          </AccordionHeader>
          <AccordionBody accordionId="nonKomunitas">
            {loading ? (
              <div className="p-3">
                <ComponentSpinner />
              </div>
            ) : (
              <>
                {nonKomunitas && nonKomunitas.length > 0 ? (
                  <Table responsive hover size="sm" striped id="table-ruk-non">
                    {nonKomunitas.map((item, i) => {
                      return (
                        <Fragment key={i}>
                          <tbody>
                            <tr>
                              <th colSpan="11">
                                Kabupaten : {item.nama} (Total Unit:{" "}
                                {item.totalUsulan})
                              </th>
                            </tr>
                            <tr>
                              <th>No Usulan</th>
                              <th>Tahun Bantuan Psu</th>
                              <th>Nama Perusahaan</th>
                              <th>Nama Perumahan</th>
                              <th>Alamat Perumahan</th>
                              <th>Lat</th>
                              <th>Long</th>
                              <th>Komponen Pengajuan</th>
                              <th>Daya Tampung</th>
                              <th>Unit</th>
                            </tr>
                            {item.Usulans?.map((item, index) => (
                              <tr key={index}>
                                <td>{item.noUsulan || "-"}</td>
                                <td>{item.tahunBantuanPsu || "-"}</td>
                                {/* <td>{item.Perusahaan ? item.Perusahaan.name : '-'}</td> */}
                                <td>
                                  {item.Pengembang
                                    ? item.Pengembang.namaPerusahaan
                                    : item.Perusahaan.name}
                                </td>
                                <td>{item.namaPerumahan || "-"}</td>
                                <td width={100}>{item.alamatLokasi || "-"}</td>
                                <td>{item.lat || "-"}</td>
                                <td>{item.lng || "-"}</td>
                                <td>
                                  {`${item.KomponenPengajuans.map(
                                    (item) => item.MasterKomponenPengajuan.name
                                  ).join(", ")}`}
                                </td>
                                <td>{item.dayaTampung || "-"}</td>
                                <td>{item.jumlahUsulan || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                          <br />
                        </Fragment>
                      );
                    })}
                  </Table>
                ) : (
                  <Alert className="fs-4 text-center" color="secondary ">
                    Tidak ada data
                  </Alert>
                )}
              </>
            )}
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
      <UncontrolledAccordion defaultOpen={["komunitas"]}>
        <AccordionItem className="border border-secondary-subtle">
          <AccordionHeader targetId="komunitas">
            <div className="d-flex w-100 justify-content-between align-items-center pe-3">
              Rekapitulasi RUK Usulan Per Kabupaten Komunitas
              <Row className="gx-3">
                <Col xs="auto">
                  <ButtonExport
                    fileType="pdf"
                    disabled={!komunitas || komunitas?.length === 0}
                    queryParams={{
                      ...queryParams,
                      filtered: [
                        ...queryParams.filtered,
                        { id: "in$type", value: [1, 2] },
                      ],
                    }}
                  >
                    Download PDF
                  </ButtonExport>
                </Col>
                <Col xs="auto">
                  <ButtonExport
                    fileType="excel"
                    disabled={!komunitas || komunitas?.length === 0}
                    queryParams={{
                      ...queryParams,
                      filtered: [
                        ...queryParams.filtered,
                        { id: "in$type", value: [3, 4] },
                      ],
                    }}
                  >
                    Export Excel
                  </ButtonExport>
                </Col>
              </Row>
            </div>
          </AccordionHeader>
          <AccordionBody accordionId="komunitas">
            {loading ? (
              <div className="p-3">
                <ComponentSpinner />
              </div>
            ) : (
              <>
                {komunitas && komunitas.length > 0 ? (
                  <Table responsive hover size="sm" striped id="table-ruk">
                    {komunitas.map((item, i) => {
                      return (
                        <Fragment key={i}>
                          <tbody>
                            <tr>
                              <th colSpan="11">
                                Kabupaten : {item.nama} (Total Unit:{" "}
                                {item.totalUsulan})
                              </th>
                            </tr>
                            <tr>
                              <th>No Usulan</th>
                              <th>Nama Perusahaan</th>
                              <th>Nama Komunitas</th>
                              <th>Nama Perumahan</th>
                              <th>Alamat Perumahan</th>
                              <th>Lat</th>
                              <th>Long</th>
                              <th>Komponen Pengajuan</th>
                              <th>Daya Tampung</th>
                              <th>Unit</th>
                            </tr>
                            {item.Usulans?.map((item, index) => (
                              <tr key={index}>
                                <td>{item.noUsulan || "-"}</td>
                                <td>
                                  {item.Perusahaan ? item.Perusahaan.name : "-"}
                                </td>
                                <td>{item.namaKomunitas || "-"}</td>
                                <td>{item.namaPerumahan || "-"}</td>
                                <td>{item.alamatLokasi || "-"}</td>
                                <td>{item.lat || "-"}</td>
                                <td>{item.lng || "-"}</td>
                                <td>
                                  {item.KomponenPengajuans.map((item) => {
                                    return `${item.MasterKomponenPengajuan.name}, `;
                                  })}{" "}
                                </td>
                                <td>{item.dayaTampung || "-"}</td>
                                <td>{item.jumlahUsulan || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                          <br />
                        </Fragment>
                      );
                    })}
                  </Table>
                ) : (
                  <Alert className="fs-4 text-center" color="secondary ">
                    Tidak ada data
                  </Alert>
                )}
              </>
            )}
          </AccordionBody>
        </AccordionItem>
      </UncontrolledAccordion>
    </>
  );
};

export default TableRuk;
