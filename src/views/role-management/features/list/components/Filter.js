import { useState } from "react";

// ** Third Party Components
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import Select from "react-select";
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
import { useDirektoratQuery } from "../../../../../api/domains/direktorat";
import { useScopeRegionQuery } from "../../../domains";

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
      DirektoratId: "",
      ScopeRegionRoleId: "",
    },
  });

  const {
    data: dataDirektorat,
    isLoading: isLoadingDataDirektorat,
    isFetching: isFetchingDataDirektorat,
  } = useDirektoratQuery({}, { skip: !open });

  const {
    data: dataScopeRegion,
    isLoading: isLoadingDataScopeRegion,
    isFetching: isFetchingDataScopeRegion,
  } = useScopeRegionQuery({ page: 1, pageSize: 2e9 }, { skip: !open });

  const optionsDirektorat =
    dataDirektorat?.map((direktorat) => ({
      label: direktorat.name,
      value: direktorat.id,
    })) ?? [];

  const optionsScopeRegion =
    dataScopeRegion?.map((scopeRegion) => ({
      label: scopeRegion.name,
      value: scopeRegion.id,
    })) ?? [];

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
              <Col md="4" className="mb-3">
                <Label className="form-label" for="nama">
                  Role
                </Label>
                <Controller
                  name="nama"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="nama"
                      {...field}
                      placeholder="Masukan role..."
                      disabled={loading}
                    />
                  )}
                />
              </Col>
              <Col md="4" className="mb-3">
                <Label className="form-label" for="DirektoratId">
                  Direktorat
                </Label>
                <Controller
                  name="DirektoratId"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        inputId="DirektoratId"
                        options={optionsDirektorat}
                        placeholder="Silahkan pilih direktorat..."
                        classNamePrefix="select"
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        onChange={(val) => {
                          onChange(val.value);
                        }}
                        value={
                          optionsDirektorat.find(
                            (option) => option.value === value
                          ) ?? ""
                        }
                        isLoading={
                          isLoadingDataDirektorat || isFetchingDataDirektorat
                        }
                        isDisabled={loading}
                      />
                    );
                  }}
                />
              </Col>
              <Col md="4" className="mb-3">
                <Label className="form-label" for="ScopeRegionRoleId">
                  Cangkupan Usulan
                </Label>
                <Controller
                  name="ScopeRegionRoleId"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        inputId="ScopeRegionRoleId"
                        options={optionsScopeRegion}
                        placeholder="Silahkan pilih cangkupan usulan..."
                        classNamePrefix="select"
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        onChange={(val) => {
                          onChange(val.value);
                        }}
                        value={
                          optionsScopeRegion.find(
                            (option) => option.value === value
                          ) ?? ""
                        }
                        isLoading={
                          isLoadingDataScopeRegion || isFetchingDataScopeRegion
                        }
                        isDisabled={loading}
                      />
                    );
                  }}
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
                Cari Role
              </Button>
            </div>
          </Form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
