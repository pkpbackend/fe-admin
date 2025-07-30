import { useFilterPengusulanTahunUsulanQuery } from "@globalapi/filter";
import { useEffect } from "react";
import Select from "react-select";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  FormGroup,
  Label,
  UncontrolledAccordion,
} from "reactstrap";

const Filters = ({ formFilter, setFormFilter, loading }) => {
  const { data, isLoading, isFetching } = useFilterPengusulanTahunUsulanQuery(
    {}
  );
  const handleSelectChange = (attr, value) => {
    setFormFilter({
      ...formFilter,
      [attr]: value.value,
    });
  };

  useEffect(() => {
    if (data?.tahunUsulan?.length > 0) {
      setFormFilter({
        ...formFilter,
        tahunUsulan: data.tahunUsulan[0]
      });
    }
  }, [data, setFormFilter]);

  const optionsYear =
    data?.tahunUsulan?.map((value) => ({
      label: value,
      value,
    })) || [];
  
  const optionsChart = [
    {
      label: 'Pie',
      value: 'pie',
    },
    {
      label: 'Bar',
      value: 'bar',
    }
  ]

  return (
    <UncontrolledAccordion className="mb-2" defaultOpen={"1"}>
      <AccordionItem className="shadow">
        <AccordionHeader targetId="1">Filter</AccordionHeader>
        <AccordionBody accordionId="1">
          <FormGroup row>
            <Label sm={2}>Tahun Usulan</Label>
            <Col sm={10}>
              <Select
                options={optionsYear}
                value={
                  optionsYear?.find(
                    (year) => year.value === formFilter.tahunUsulan
                  ) || ""
                }
                classNamePrefix="select"
                placeholder="Pilih tahun usulan..."
                isLoading={isLoading || isFetching}
                isDisabled={loading}
                onChange={(value) =>
                  handleSelectChange("tahunUsulan", value)
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Tipe Chart</Label>
            <Col sm={10}>
              <Select
                options={optionsChart}
                value={
                  optionsChart?.find(
                    (chart) => chart.value === formFilter.chartType
                  ) || ""
                }
                classNamePrefix="select"
                placeholder="Pilih tipe chart..."
                isLoading={isLoading || isFetching}
                isDisabled={loading}
                onChange={(value) =>
                  handleSelectChange("chartType", value)
                }
              />
            </Col>
          </FormGroup>
        </AccordionBody>
      </AccordionItem>
    </UncontrolledAccordion>
  );
};

export default Filters;
