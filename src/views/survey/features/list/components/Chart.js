import { useEffect, useState } from "react"
import {
  Row,
  Col,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
  Spinner,
} from "reactstrap"
import { useSummaryQuery } from "../../../domains"
// import { useSummaryQuery } from "../../../../domains"

const Chart = () => {
  const { data, isFetching, isLoading } = useSummaryQuery()

  // useEffect(() => {
  //   setTimeout(() => toggle(1), 1000)
  // }, [])

  return (
    <UncontrolledAccordion defaultOpen="survey-chart">
      <AccordionItem className="shadow">
        <AccordionHeader targetId="survey-chart">Survey Chart</AccordionHeader>
        <AccordionBody accordionId="survey-chart">
          {isFetching && <Spinner />}
          
          {(!isFetching && data) && (
            <>
              <h2 style={{ textAlign: "center" }}>
                INDEKS KEPUASAN PUBLIK
                <br />
                TERHADAP LAYANAN APLIKASI SIBARU
                <br />
                DIREKTORAT JENDERAL PENYEDIAAN PERUMAHAN KEMENTRIAN PUPR
                <br />
                <small style={{ fontSize: 16 }}>
                  Status: {data?.global?.periode?.end}
                </small>
              </h2>

              <Row>
                <Col sm={6}>
                  <div
                    style={{
                      background: "#273763",
                      color: "#fff",
                      width: 400,
                      height: 400,
                      borderRadius: 400,
                      textAlign: "center",
                      paddingTop: 100,
                    }}
                  >
                    <small
                      style={{
                        fontSize: 24,
                      }}
                    >
                      Nilai Indeks Kepuasan
                    </small>
                    <strong
                      style={{
                        display: "block",
                        fontSize: 110,
                      }}
                    >
                      {data?.global?.ikm?.toFixed(2)}
                    </strong>
                  </div>
                </Col>
                <Col sm={6}>
                  <h3 style={{ textAlign: "center" }}>RESPONDEN</h3>
                  <div style={{ background: "#f0f0f0", padding: 32 }}>
                    <table>
                      <tr>
                        <td>Jumlah</td>
                        <td>:</td>
                        <td>{data?.global?.jumlah} Orang</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>
                          L {data?.gender[1]} Orang / P {data?.gender[2]} Orang
                        </td>
                      </tr>
                      <tr>
                        <td valign="top">Pendidikan</td>
                        <td valign="top">:</td>
                        <td valign="top">
                          {data?.pendidikan && Object.keys(data?.pendidikan).map((key) => (
                            <div>
                              {key} = {data?.pendidikan[key]} Orang
                            </div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td>Periode Survey</td>
                        <td>:</td>
                        <td>
                          {data?.global?.periode?.start} s/d
                          &nbsp;{data?.global?.periode?.end}
                        </td>
                      </tr>
                    </table>
                  </div>
                </Col>
              </Row>

              <footer
                style={{ textAlign: "center", paddingTop: 40, paddingBottom: 20 }}
              >
                Terima kasih atas penilaian yang telah Anda berikan
                <br />
                Masukan Anda sangat bermanfaat bagi kemajuan unit kami agar dapat
                memperbaiki dan meningkatkan kualitas pelayanan bagi publik
              </footer>
            </>
          )}

          {/* <iframe
            title={'Chart Survey'}
            src={'/survey-tableau.html'}
            style={{
              display: 'block',
              textAlign: 'center',
              width: 1000,
              height: 850,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            frameBorder="0"
            scrolling="no"
          /> */}
        </AccordionBody>
      </AccordionItem>
    </UncontrolledAccordion>
  )
}

export default Chart
