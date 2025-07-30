import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

import { useRekapitulasiPerProvinsiQuery } from "../../../domains";
import { Colors } from "./chart/colors";
import BarChart from "./chart/BarChart";
import PieChart from "./chart/PieChart";
import { Legends } from "./chart/legends";

const ChartRUK = ({ tahunUsulan, chartType }) => {
  let { data } = useRekapitulasiPerProvinsiQuery(
    {
      direktoratId: 4,
      tahunUsulan: tahunUsulan,
    },
    { skip: !tahunUsulan }
  );

  const mappingData =
    data?.map((item) => ({
      name: item?.provinsi?.nama || "",
      label: item?.provinsi?.nama || "",
      value: item.jumlah,
      color: Colors[Math.floor(Math.random()*Colors.length)]
    }))?.filter(x=> x?.name) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekapitulasi Usulan Rumah Umum dan Komersil</CardTitle>
      </CardHeader>
      <CardBody style={{ minHeight: 400 }}>
        <Row className="g-4 mt-2">
          <Col sm={12}>
          {
            chartType === 'pie' ?
            <PieChart dataRekap={mappingData} canvasName={"ChartRUK"}/>
            :
            chartType === 'bar' &&
            <BarChart dataRekap={mappingData} canvasName={"ChartRUK"}/>
          }
          </Col>
          <Col sm={12} className="d-flex align-item-center justify-content-center">
            <Legends items={mappingData}/>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ChartRUK;
