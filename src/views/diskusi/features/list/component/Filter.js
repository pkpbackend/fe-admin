import { useState } from "react";

// ** Utils
import { OPTION_ALL } from "@constants/global";

// ** Third Party Components
import classnames from "classnames";
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
import { Search } from "react-feather";
import { useDirektoratQuery } from "../../../../../api/domains/direktorat";
import { useDiscussionTopicsQuery } from "../../../../../api/domains/diskusi";

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
      DirektoratId: null,
      HelpdeskTopikDiskusiId: null,
      title: "",
      status: null,
    },
  });
  // ** query
  const queryDirektorat = useDirektoratQuery({}, { skip: !open });
  const queryDiscussionTopic = useDiscussionTopicsQuery(
    {},
    {
      skip: !open,
    }
  );

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
            key === "status"
              ? data?.[key] === "0"
                ? false
                : true
              : data?.[key],
        });
      }
    }
    handleTableAttrChange({
      filtered: filtered.length ? filtered : null,
      page: 1,
    });
  };

  const optionsDirektorat = [
    ...(queryDirektorat?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || []),
  ];

  const optionsDiscussionTopic = [
    ...(queryDiscussionTopic?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || []),
  ];
  const optionsStatus = [
    {
      value: "0",
      label: "Belum Selesai",
    },
    {
      value: "1",
      label: "Selesai",
    },
  ];

  return (
    <Accordion className="mb-2" open={open} toggle={toggle}>
      <AccordionItem className="shadow">
        <AccordionHeader targetId="1">Filter</AccordionHeader>
        <AccordionBody accordionId="1">
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: "0 1rem 1rem" }}
          >
            <Row className="gx-4 gy-4 mb-4">
              <Col md="3">
                <Label className="form-label" for="DirektoratId">
                  Direktorat
                </Label>
                <Controller
                  name="DirektoratId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      inputId="DirektoratId"
                      value={
                        optionsDirektorat.find((c) => c.value === value) || ""
                      }
                      options={optionsDirektorat}
                      placeholder="Silahkan pilih direktorat..."
                      className={classnames("react-select")}
                      classNamePrefix="select"
                      onChange={(val) => {
                        onChange(val.value);
                      }}
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      isDisabled={loading}
                      isLoading={
                        queryDirektorat.isLoading || queryDirektorat.isFetching
                      }
                    />
                  )}
                />
              </Col>
              <Col md="3">
                <Label className="form-label" for="HelpdeskTopikDiskusiId">
                  Topik Diskusi
                </Label>
                <Controller
                  name="HelpdeskTopikDiskusiId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      inputId="HelpdeskTopikDiskusiId"
                      value={
                        optionsDiscussionTopic.find((c) => c.value === value) ||
                        ""
                      }
                      options={optionsDiscussionTopic}
                      placeholder="Silahkan pilih topik diskusi..."
                      className={classnames("react-select")}
                      classNamePrefix="select"
                      onChange={(val) => {
                        onChange(val.value);
                      }}
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      isDisabled={loading}
                      isLoading={
                        queryDiscussionTopic.isLoading ||
                        queryDiscussionTopic.isFetching
                      }
                    />
                  )}
                />
              </Col>
              <Col md="3">
                <Label className="form-label" for="title">
                  Judul
                </Label>
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <Input
                      id="title"
                      {...field}
                      placeholder="Cari judul..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="3">
                <Label className="form-label" for="status">
                  Status
                </Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      inputId="status"
                      value={optionsStatus.find((c) => c.value === value) || ""}
                      options={optionsStatus}
                      placeholder="Silahkan pilih status..."
                      className={classnames("react-select")}
                      classNamePrefix="select"
                      onChange={(val) => {
                        onChange(val.value);
                      }}
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      isDisabled={loading}
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
                  handleTableAttrChange({ filtered: null });
                }}
                disabled={loading}
              >
                Reset
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : <Search size={16} />}
                Cari Diskusi
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
