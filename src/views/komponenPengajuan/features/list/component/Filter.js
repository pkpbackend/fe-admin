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
      name: "",
    },
  });

  const onSubmit = (data) => {
    const filtered = [];

    for (const key of Object.keys(data || {})) {
      if (data?.[key]) {
        if (key === 'name') {
          filtered.push({
            id: `like_${key}`,
            value: data?.[key],
          });
        } else {
          filtered.push({
            id: `${key}`,
            value: data?.[key],
          });
        }
      }
    }
    handleTableAttrChange({
      filtered: filtered.length ? filtered : [],
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
              <Col sm={6}>
                <Row className="mb-3">
                  <Col md="12" className="mb-3">
                    <Label className="form-label" for="name">
                      Judul
                    </Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="name"
                          {...field}
                          placeholder="Masukan judul..."
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
                    filtered: [],
                  });
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Cari Komponen Pengajuan
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
