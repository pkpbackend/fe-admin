import { useState } from "react";

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
import Select from "react-select";

import { Search } from "react-feather";

import classnames from "classnames";

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
      title: "",
      type: "",
      urgencyScale: "",
      pembuat: "",
    },
  });

  const onSubmit = (data) => {
    const filtered = [];

    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        filtered.push({
          id: key,
          value: data?.[key],
        });
      }
    }
    handleTableAttrChange({
      filtered: filtered.length ? filtered : [],
      page: 1,
    });
  };

  const optionsType = [
    { label: "Usulan", value: 1 },
    { label: "Sistem", value: 2 },
    { label: "Lainnya", value: 3 },
  ];

  const optionsUrgency = [
    { label: "Rendah", value: 1 },
    { label: "Sedang", value: 2 },
    { label: "Penting", value: 3 },
    { label: "Mendesak", value: 4 },
    { label: "Sangat Mendesak", value: 5 },
  ];

  return (
    <Accordion className="mb-2" open={open} toggle={toggle}>
      <AccordionItem className="shadow">
        <AccordionHeader targetId="1">Filter</AccordionHeader>
        <AccordionBody accordionId="1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col sm={6}>
                <Row className="mb-3">
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="title">
                      Judul
                    </Label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="title"
                          {...field}
                          placeholder="Masukan judul..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                <Row>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="type">
                      Tipe
                    </Label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          id="type"
                          name="type"
                          placeholder="Pilih tipe..."
                          className={classnames("react-select")}
                          classNamePrefix="select"
                          menuPlacement="auto"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          isDisabled={loading}
                          options={optionsType}
                          value={
                            optionsType.find((c) => c.value === value) || ""
                          }
                          onChange={(val) => {
                            onChange(val.value);
                          }}
                        />
                      )}
                    />
                  </Col>
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="urgencyScale">
                      Urgensi
                    </Label>
                    <Controller
                      name="urgencyScale"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        // <Input
                        //   id="urgencyScale"
                        //   {...field}
                        //   placeholder="Masukan urgensi..."
                        //   disabled={loading}
                        // />
                        <Select
                          id="urgencyScale"
                          name="urgencyScale"
                          placeholder="Pilih urgensi..."
                          className={classnames("react-select")}
                          classNamePrefix="select"
                          menuPlacement="auto"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          isDisabled={loading}
                          options={optionsUrgency}
                          value={
                            optionsUrgency.find((c) => c.value === value) || ""
                          }
                          onChange={(val) => {
                            onChange(val.value);
                          }}
                        />
                      )}
                    />
                  </Col>
                  {/* <Col md="12" className="mb-3">
                    <Label className="form-label" for="pembuat">
                      Pembuat
                    </Label>
                    <Controller
                      name="pembuat"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="pembuat"
                          {...field}
                          placeholder="Masukan pembuat..."
                          disabled={loading}
                        />
                      )}
                    />
                  </Col> */}
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
                    filtered: [],
                  });
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Cari Pengumuman
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
