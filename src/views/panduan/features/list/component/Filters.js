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
      title: "",
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
              <Col md="6">
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
                      placeholder="Masukan judul panduan..."
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
                Cari
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
