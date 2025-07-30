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
      username: "",
      email: "",
      Role_nama: "",
    },
  });

  const onSubmit = (data) => {
    const filtered = [];
    const convertKey = (key) => {
      return key?.split("_").join(".");
    };

    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        filtered.push({
          id: convertKey(key),
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
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: "0 1rem 1rem" }}
          >
            <Row className="mb-3">
              <Col md="3" className="mb-3">
                <Label className="form-label" for="nama">
                  Nama
                </Label>
                <Controller
                  name="nama"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="nama"
                      {...field}
                      placeholder="Masukan nama user..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="3" className="mb-3">
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="username"
                      {...field}
                      placeholder="Masukan username user..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="3" className="mb-3">
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
                      placeholder="Masukan email user..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="3" className="mb-3">
                <Label className="form-label" for="Role_nama">
                  Role
                </Label>
                <Controller
                  name="Role_nama"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="Role_nama"
                      {...field}
                      placeholder="Masukan role user..."
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
                  handleTableAttrChange({ filtered: null, page: 1 });
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Cari User
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
