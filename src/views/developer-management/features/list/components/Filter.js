import { useState } from "react";

// ** Third Party Components
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

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

// ** styles
import "@styles/react/libs/react-select/_react-select.scss";
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
      nama: "",
      isValid: "",
      email: "",
      namaPerusahaan: "",
      npwp: "",
      telpPenanggungJawab: "",
    },
  });
  const optionsStatusValidation = [
    { label: "Valid", value: "1" },
    { label: "Invalid", value: "0" },
    { label: "Belum", value: "2" },
  ];
  const onSubmit = (data) => {
    const filtered = [];
    const convertKey = (key) => {
      return key?.split("_").join(".");
    };

    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        filtered.push({
          id: convertKey(key),
          value:
            key === "isValid"
              ? data?.[key] === "1"
                ? true
                : data?.[key] === "0"
                ? false
                : null
              : data?.[key],
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
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: "0 1rem 1rem" }}
          >
            <Row className="mb-3">
              <Col md="4" className="mb-3">
                <Label className="form-label" for="nama">
                  Nama Pengembang
                </Label>
                <Controller
                  name="nama"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="nama"
                      {...field}
                      placeholder="Masukan nama pengembang..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="4" className="mb-3">
                <Label className="form-label" for="isValid">
                  Status Validasi
                </Label>
                <Controller
                  name="isValid"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        inputId="isValid"
                        options={optionsStatusValidation}
                        placeholder="Silahkan pilih status validasi..."
                        classNamePrefix="select"
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        onChange={(val) => {
                          onChange(val.value);
                        }}
                        value={
                          optionsStatusValidation?.find(
                            (option) => option.value === value
                          ) ?? ""
                        }
                        isDisabled={loading}
                      />
                    );
                  }}
                />
              </Col>
              <Col md="4" className="mb-3">
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      {...field}
                      placeholder="Masukan email pengembang..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="4" className="mb-3">
                <Label className="form-label" for="namaPerusahaan">
                  Nama Perusahaan
                </Label>
                <Controller
                  name="namaPerusahaan"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="namaPerusahaan"
                      {...field}
                      placeholder="Masukan nama perusahaan pengembang..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="4" className="mb-3">
                <Label className="form-label" for="npwp">
                  NPWP
                </Label>
                <Controller
                  name="npwp"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="npwp"
                      {...field}
                      placeholder="Masukan npwp pengembang..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="4" className="mb-3">
                <Label className="form-label" for="telpPenanggungJawab">
                  No HP
                </Label>
                <Controller
                  name="telpPenanggungJawab"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="telpPenanggungJawab"
                      {...field}
                      placeholder="Masukan nomor telepon penanggung jawab..."
                      disabled={loading}
                    />
                  )}
                />
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
                Cari Pengembang
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
