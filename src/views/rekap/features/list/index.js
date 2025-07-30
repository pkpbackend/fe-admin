import { Fragment, useState } from "react";
import { Col, Row } from "reactstrap";

import CharPerDirektorat from "./component/CharPerDirektorat";
import ChartRusun from "./component/ChartRusun";
import ChartRusus from "./component/ChartRusus";
import ChartRuswa from "./component/ChartRuswa";
import ChartRUK from "./component/ChartRUK";
import Filters from "./component/Filters";

const Rekapitulasi = () => {
  const [formFilter, setFormFilter] = useState({
    tahunUsulan: null,
    chartType: "pie"
  });

  return (
    <Fragment>
      <Filters formFilter={formFilter} setFormFilter={setFormFilter} />
      <br />
      <Row>
        <Col md="12">
          <CharPerDirektorat tahunUsulan={formFilter.tahunUsulan} chartType={formFilter.chartType}/>
        </Col>
        <Col md="6">
          <ChartRusun tahunUsulan={formFilter.tahunUsulan} chartType={formFilter.chartType}/>
        </Col>
        <Col md="6">
          <ChartRusus tahunUsulan={formFilter.tahunUsulan} chartType={formFilter.chartType}/>
        </Col>
        <Col md="6">
          <ChartRuswa tahunUsulan={formFilter.tahunUsulan} chartType={formFilter.chartType}/>
        </Col>
        <Col md="6">
          <ChartRUK tahunUsulan={formFilter.tahunUsulan} chartType={formFilter.chartType}/>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Rekapitulasi;
