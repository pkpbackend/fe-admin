import { useState } from "react";

// ** Utils

// ** Third Party Components
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import { Search } from "react-feather";

const Filter = (props) => {
  const { handleTableAttrChange, loading } = props;
  // ** Local State
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  // ** Hooks
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: "",
      nama: "",
      kode_dagri: "",
      kode_bps: "",
      kode_rkakl: "",
      Provinsi_nama: "",
    },
  });

  const onSubmit = (data) => {
    const filtered = [];

    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        let id = key;
        if (key === "Provinsi_nama") {
          id = "Provinsi.nama";
        }
        filtered.push({
          id: id,
          value: data?.[key],
        });
      }
    }
    handleTableAttrChange({
      filtered: filtered.length ? filtered : null,
      page: 1,
    });
  };

  return (
    <Accordion className="mb-2" open={open} toggle={toggle}>
      <AccordionItem className="shadow">
        <AccordionHeader targetId="1">Filter</AccordionHeader>
        <AccordionBody accordionId="1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col sm={4}>
                <Row className="mb-3">
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="filter-city-id">
                      Kode Kabupaten
                    </Label>
                    <Controller
                      name="id"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-city-id"
                          {...field}
                          placeholder="Masukan kode kabupaten..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="filter-city-nama">
                      Nama Kabupaten
                    </Label>
                    <Controller
                      name="nama"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-city-nama"
                          {...field}
                          placeholder="Masukan nama kabupaten..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="filter-city-kode-dagri">
                      Kode Dagri
                    </Label>
                    <Controller
                      name="kode_dagri"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-city-kode-dagri"
                          {...field}
                          placeholder="Masukan kode dagri..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="filter-city-kode-bps">
                      Kode BPS
                    </Label>
                    <Controller
                      name="kode_bps"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-city-kode-bps"
                          {...field}
                          placeholder="Masukan kode bps..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="filter-city-kode-rkakl">
                      Kode RKAKL
                    </Label>
                    <Controller
                      name="kode_rkakl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-city-kode-rkakl"
                          {...field}
                          placeholder="Masukan kode rkakl..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                <Row>
                  <Col md="12" className="mb-3">
                    <Label
                      className="form-label"
                      for="filter-city-province-name"
                    >
                      Nama Provinsi
                    </Label>
                    <Controller
                      name="Provinsi_nama"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-city-province-name"
                          {...field}
                          placeholder="Masukan nama provinsi..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="filter-actions">
              <Button
                color="secondary"
                outline
                onClick={() => {
                  reset();
                  handleTableAttrChange({
                    page: 1,
                    filtered: null,
                  });
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Cari Kabupaten
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
