import { useNavigate, useParams } from "react-router"
import Breadcrumbs from "@components/breadcrumbs/custom"

import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  Row,
  UncontrolledAccordion,
} from "reactstrap"

import { useRespondenQuery } from "../../domains"

const Detail = () => {
  const params = useParams()
  const navigate = useNavigate()

  const { data, isFetching, isLoading } = useRespondenQuery(params?.id)

  return (
    <div>
      <Breadcrumbs
        title="Detail Responden"
        data={[
          { title: "Survey", link: "/survey/list" },
          { title: "Detail Responden" },
        ]}
      />
      <div>
        <Row className="gy-3">
          <Col sm={6}>
            <UncontrolledAccordion defaultOpen="survey-information">
              <AccordionItem className="shadow">
                <AccordionHeader targetId="survey-information">
                  Informasi Survey
                </AccordionHeader>
                <AccordionBody accordionId="survey-information">
                  <ol>
                    {data?.SurveyQuestions?.map(
                      ({ id, question, SurveyAnswer }) => (
                        <li key={`answer-${id}`} style={{ paddingBottom: 20 }}>
                          <strong>{question}</strong>
                          <br />
                          Jawaban: {SurveyAnswer?.answer || '-'}
                        </li>
                      )
                    )}
                  </ol>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
          <Col sm={6}>
            <UncontrolledAccordion defaultOpen="responden-information">
              <AccordionItem className="shadow">
                <AccordionHeader targetId="responden-information">
                  Informasi Responden
                </AccordionHeader>
                <AccordionBody accordionId="responden-information">
                  <Row className="gy-3">
                    <Col sm={4}>
                      <strong>Unit Evaluasi</strong>
                    </Col>
                    <Col sm={8}>{data?.Direktorat?.name || "-"}</Col>

                    <Col sm={4}>
                      <strong>Nama</strong>
                    </Col>
                    <Col sm={8}>{data?.name || "-"}</Col>

                    <Col sm={4}>
                      <strong>Pekerjaan</strong>
                    </Col>
                    <Col sm={8}>{data?.pekerjaan || "-"}</Col>

                    <Col sm={4}>
                      <strong>Instansi</strong>
                    </Col>
                    <Col sm={8}>{data?.instansi || "-"}</Col>

                    <Col sm={4}>
                      <strong>Provinsi</strong>
                    </Col>
                    <Col sm={8}>{data?.Provinsi?.nama || "-"}</Col>

                    <Col sm={4}>
                      <strong>Pendidikan Terakhir</strong>
                    </Col>
                    <Col sm={8}>{data?.pendidikanTerakhir || "-"}</Col>

                    <Col sm={4}>
                      <strong>No. Telp</strong>
                    </Col>
                    <Col sm={8}>{data?.phoneNumber || "-"}</Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Detail
