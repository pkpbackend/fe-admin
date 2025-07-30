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
      City_nama: "",
      City_Provinsi_nama: "",
    },
  });

  const onSubmit = (data) => {
    const filtered = [];

    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        let id = key;
        if (key === "City_Provinsi_nama") {
          id = "City.Provinsi.nama";
        }
        if (key === "City_nama") {
          id = "City.nama";
        }
        filtered.push({
          id,
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
                    <Label className="form-label" for="filter-subdistrict-id">
                      Kode Kecamatan
                    </Label>
                    <Controller
                      name="id"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-subdistrict-id"
                          {...field}
                          placeholder="Masukan kode kecamatan..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="filter-subdistrict-nama">
                      Nama Kecamatan
                    </Label>
                    <Controller
                      name="nama"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-subdistrict-nama"
                          {...field}
                          placeholder="Masukan nama kecamatan..."
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
                      for="filter-subdistrict-kode-dagri"
                    >
                      Kode Dagri
                    </Label>
                    <Controller
                      name="kode_dagri"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-subdistrict-kode-dagri"
                          {...field}
                          placeholder="Masukan kode dagri..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label
                      className="form-label"
                      for="filter-subdistrict-kode-bps"
                    >
                      Kode BPS
                    </Label>
                    <Controller
                      name="kode_bps"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-subdistrict-kode-bps"
                          {...field}
                          placeholder="Masukan kode bps..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label
                      className="form-label"
                      for="filter-subdistrict-kode-rkakl"
                    >
                      Kode RKAKL
                    </Label>
                    <Controller
                      name="kode_rkakl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-subdistrict-kode-rkakl"
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
                      for="filter-subdistrict-city-name"
                    >
                      Nama Kabupaten
                    </Label>
                    <Controller
                      name="City_nama"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-subdistrict-city-name"
                          {...field}
                          placeholder="Masukan nama kabupaten..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label
                      className="form-label"
                      for="filter-subdistrict-province-name"
                    >
                      Nama Provinsi
                    </Label>
                    <Controller
                      name="City_Provinsi_nama"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="filter-subdistrict-province-name"
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
                Cari Kecamatan
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
