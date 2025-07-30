import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

import { useRekapitulasiPerDirektoratQuery } from "../../../domains";
import { Colors } from "./chart/colors";
import BarChart from "./chart/BarChart";
import PieChart from "./chart/PieChart";
import { Legends } from "./chart/legends";

const CharPerDirektorat = ({ tahunUsulan, chartType }) => {
  const { data } = useRekapitulasiPerDirektoratQuery(tahunUsulan, {
    skip: !tahunUsulan,
  });

  const mappingData =
    data?.map((item) => ({
      name: item.direktorat?.name,
      label: item.direktorat?.name,
      value: item.jumlah,
      color: Colors[Math.floor(Math.random()*Colors.length)]
    })) ?? [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rekapitulasi Usulan Berdasarkan Direktorat</CardTitle>
      </CardHeader>
      <CardBody style={{ minHeight: 400 }}>
        <Row className="g-4 mt-2 d-flex justify-content-center align-item-center">
          <Col sm={6}>
          {
            chartType === 'pie' ?
            <PieChart dataRekap={mappingData} canvasName={"CharPerDirektorat"}/>
            :
            chartType === 'bar' &&
            <BarChart dataRekap={mappingData} canvasName={"CharPerDirektorat"}/>
          }
          </Col>
          <Col sm={12} className="d-flex align-item-center justify-content-center">
            <Legends items={mappingData} large/>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CharPerDirektorat;
