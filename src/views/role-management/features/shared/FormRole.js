// ** React Imports

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import Select from "react-select";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
  Table,
  UncontrolledAccordion,
} from "reactstrap";
import * as yup from "yup";

import ComponentSpinner from "@components/spinner/Loading-spinner";
import { useAccessMenuQuery } from "@globalapi/access-menu";
import remove from "lodash/remove";
import uniq from "lodash/uniq";
import { useNavigate } from "react-router";
import { useDirektoratQuery } from "../../../../api/domains/direktorat";
import { useScopeRegionQuery } from "../../domains";

import "./form-role.scss";

const AccessMenu = () => {
  const {
    watch,
    formState: { isSubmitting },
    setValue,
  } = useFormContext();
  const { data, isLoading } = useAccessMenuQuery();
  const accessMenu = watch("accessMenu") || [];

  return (
    <>
      {isLoading ? (
        <ComponentSpinner />
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data?.map((field) => {
            return (
              <li key={field.id}>
                <Card style={{ boxShadow: "none" }} className="border" body>
                  <CardTitle className="mb-3">{field.type}</CardTitle>
                  <Table size="sm" responsive hover>
                    <thead>
                      <tr>
                        <th>
                          <span>Menu</span>
                        </th>
                        <th>
                          <span>Hak Akses</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {field?.data.map((item) => (
                        <tr>
                          <td>
                            <strong>{item.name}</strong>
                          </td>
                          <td>
                            <div>
                              <FormGroup switch>
                                <Input
                                  disabled={isSubmitting}
                                  type="switch"
                                  role="switch"
                                  checked={accessMenu?.includes(item.code)}
                                  onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    let newValue = [...accessMenu];
                                    if (isChecked) {
                                      newValue = uniq([...newValue, item.code]);
                                    } else {
                                      newValue = remove(
                                        [...newValue],
                                        (value) => value !== item.code
                                      );
                                    }
                                    setValue("accessMenu", newValue);
                                  }}
                                />
                              </FormGroup>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

const FormRole = ({ onSubmit, defaultValues }) => {
  const isFormEdit = Boolean(defaultValues);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(
      yup.object().shape({
        nama: yup.string().required("Nama role tidak boleh kosong"),
        ScopeRegionRoleId: yup
          .string()
          .required("Cangkupan usulan tidak boleh kosong"),
        direktif: yup.string().required("Direktif tidak boleh kosong"),
        DirektoratId: yup.string().required("Direktorat tidak boleh kosong"),
      })
    ),
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const accessToDashboard = watch("dashboard");

  const {
    data: dataScopeRegion,
    isLoading: isLoadingDataScopeRegion,
    isFetching: isFetchingDataScopeRegion,
  } = useScopeRegionQuery({ page: 1, pageSize: 2e9 });

  const {
    data: dataDirektorat,
    isLoading: isLoadingDataDirektorat,
    isFetching: isFetchingDataDirektorat,
  } = useDirektoratQuery({});

  const optionsScopeRegion =
    dataScopeRegion?.map((scopeRegion) => ({
      label: scopeRegion.name,
      value: scopeRegion.id,
    })) ?? [];

  const optionsDirektif = [
    { value: "0", label: "Reguler" },
    { value: "1", label: "Direktif" },
    { value: "2", label: "Reguler & Direktif" },
  ];

  const optionsDirektorat =
    dataDirektorat?.map((direktorat) => ({
      label: direktorat.name,
      value: direktorat.id,
    })) ?? [];

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "6rem" }}>
        <Card body>
          <FormGroup row>
            <Label className="form-label" for="form-role-name" sm={2}>
              Nama Role
            </Label>
            <Col sm={10}>
              <Controller
                name="nama"
                control={control}
                render={({ field }) => (
                  <Input
                    id="form-role-name"
                    placeholder="Masukan nama role"
                    invalid={Boolean(errors.nama)}
                    {...field}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors.nama && (
                <FormFeedback>{errors.nama.message}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              className="form-label"
              for="form-role-ScopeRegionRoleId"
              sm={2}
            >
              Cangkupan Usulan
            </Label>
            <Col sm={10}>
              <Controller
                name="ScopeRegionRoleId"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Select
                      inputId="form-role-ScopeRegionRoleId"
                      options={optionsScopeRegion}
                      placeholder="Silahkan pilih cangkupan usulan..."
                      className={classnames("react-select", {
                        "is-invalid": errors.ScopeRegionRoleId,
                      })}
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
                      isDisabled={isSubmitting}
                    />
                  );
                }}
              />
              {errors.ScopeRegionRoleId && (
                <FormFeedback>{errors.ScopeRegionRoleId.message}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="form-label" for="direktif" sm={2}>
              Direktif
            </Label>
            <Col sm={10}>
              <Controller
                name="direktif"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Select
                      inputId="direktif"
                      options={optionsDirektif}
                      placeholder="Silahkan pilih direktif..."
                      className={classnames("react-select", {
                        "is-invalid": errors.direktif,
                      })}
                      classNamePrefix="select"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      onChange={(val) => {
                        onChange(val.value);
                      }}
                      value={
                        optionsDirektif.find(
                          (option) => option.value === value
                        ) ?? ""
                      }
                      isDisabled={isSubmitting}
                    />
                  );
                }}
              />
              {errors.direktif && (
                <FormFeedback>{errors.direktif.message}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="form-label" for="form-role-DirektoratId" sm={2}>
              Direktorat
            </Label>
            <Col sm={10}>
              <Controller
                name="DirektoratId"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Select
                      inputId="form-role-DirektoratId"
                      options={optionsDirektorat}
                      placeholder="Silahkan pilih direktorat..."
                      className={classnames("react-select", {
                        "is-invalid": errors.DirektoratId,
                      })}
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
                      isDisabled={isSubmitting}
                    />
                  );
                }}
              />
              {errors.DirektoratId && (
                <FormFeedback>{errors.DirektoratId.message}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <hr />
          <FormGroup tag="fieldset">
            <legend className="col-form-label">Admin</legend>
            <Controller
              name="admin"
              control={control}
              render={({ field }) => (
                <>
                  <FormGroup check className="mb-1">
                    <Label check>
                      <Input
                        name="admin"
                        type="radio"
                        value="1"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        checked={field.value === "1"}
                        disabled={isSubmitting}
                      />
                      Admin
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        name="admin"
                        type="radio"
                        value="0"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        checked={field.value === "0"}
                        disabled={isSubmitting}
                      />
                      Pengusul
                    </Label>
                  </FormGroup>
                  {errors.admin && (
                    <FormFeedback>{errors.admin.message}</FormFeedback>
                  )}
                </>
              )}
            />
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend className="col-form-label">Akses Dashboard</legend>
            <FormGroup check>
              <Label check for="dashboard">
                Dashboard
              </Label>
              <Controller
                name="dashboard"
                control={control}
                render={({ field }) => (
                  <Input
                    id="dashboard"
                    onChange={(e) => {
                      field.onChange(e.target.checked ? 1 : 0);
                    }}
                    checked={field.value === 1}
                    type="checkbox"
                    disabled={isSubmitting}
                  />
                )}
              />
            </FormGroup>
            {accessToDashboard === 1 && (
              <FormGroup check className="mt-2">
                <Label check for="defaultLogin">
                  Default Login ke Dashboard
                </Label>
                <Controller
                  name="defaultLogin"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="defaultLogin"
                      invalid={Boolean(errors.defaultLogin)}
                      onChange={(e) => {
                        field.onChange(e.target.checked ? 1 : 0);
                      }}
                      checked={field.value === 1}
                      type="checkbox"
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.defaultLogin && (
                  <FormFeedback>{errors.defaultLogin.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          </FormGroup>
        </Card>
        <UncontrolledAccordion defaultOpen="role-access-menu" className="mb-4">
          <AccordionItem className="shadow">
            <AccordionHeader targetId="role-access-menu">
              Hak Akses Menu
            </AccordionHeader>
            <AccordionBody accordionId="role-access-menu">
              <AccessMenu />
            </AccordionBody>
          </AccordionItem>
        </UncontrolledAccordion>
        <div className="d-flex justify-content-end">
          {isFormEdit && (
            <Button
              type="submit"
              color="secondary"
              disabled={isSubmitting}
              onClick={() => {
                navigate(`/role-management/list/detail/${defaultValues.id}`);
              }}
              className="me-3"
            >
              Batal
            </Button>
          )}

          <Button type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner style={{ marginRight: "0.5rem" }} size="sm" />
            ) : null}
            Simpan
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};

export default FormRole;
