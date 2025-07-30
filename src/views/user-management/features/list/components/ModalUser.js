import { SCOPE_REGION_ROLE } from "@constants";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import {
  useKabupatenQuery,
  useProvinsiQuery,
} from "../../../../../api/domains/wilayah";
import { useCreateUserMutation, useUpdateUserMutation } from "../../../domains";
import { useRolesQuery } from "../../../../role-management/domains";

const toggleRegionScope = [
  SCOPE_REGION_ROLE.PER_PROVINSI,
  SCOPE_REGION_ROLE.PER_KABUPATEN,
  SCOPE_REGION_ROLE.PER_PROVINSI_TERPILIH,
  SCOPE_REGION_ROLE.PER_KABUPATEN_TERPILIH,
];
const selectProvinceScope = [
  SCOPE_REGION_ROLE.PER_PROVINSI,
  SCOPE_REGION_ROLE.PER_KABUPATEN,
];
const selectCityScope = [SCOPE_REGION_ROLE.PER_KABUPATEN];
const selectMultipleProvinceScope = [
  SCOPE_REGION_ROLE.PER_PROVINSI_TERPILIH,
  SCOPE_REGION_ROLE.PER_KABUPATEN_TERPILIH,
];
const selectMultipleCityScope = [SCOPE_REGION_ROLE.PER_KABUPATEN_TERPILIH];

const SelectProvinceCity = ({ province, control, index }) => {
  const { data, isLoading, isFetching } = useKabupatenQuery(
    {
      page: 1,
      pageSize: 2e9,
      filtered: JSON.stringify([
        { id: "eq$ProvinsiId", value: province?.ProvinsiId },
      ]),
    },
    { skip: !province?.ProvinsiId }
  );

  const optionsCity =
    data?.map((city) => ({
      label: city.nama,
      value: city.id,
    })) ?? [];

  return (
    <>
      <FormGroup row className="mt-2">
        <Label for={`tambahKabupaten[${index}].data`} sm={3}>
          {province.ProvinsiName}
        </Label>
        <Col sm={9}>
          <Controller
            name={`tambahKabupaten[${index}].data`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                inputId={`tambahKabupaten[${index}].data`}
                placeholder="Silahkan pilih kabupaten..."
                className="react-select"
                classNamePrefix="select"
                onChange={onChange}
                value={value}
                closeMenuOnSelect={false}
                options={optionsCity}
                isMulti
                isLoading={isLoading || isFetching}
              />
            )}
          />
        </Col>
      </FormGroup>
    </>
  );
};
const ModalUser = ({ open, onClose, defaultValues }) => {
  const [createMutation] = useCreateUserMutation();
  const [updateMutation] = useUpdateUserMutation();
  const isFormUpdate = Boolean(defaultValues?.id);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        role: Yup.mixed().required("Role wajib diisi"),
        username: Yup.string().required("Username wajib disi"),
        nama: Yup.string().required("Nama wajib disi"),
        email: Yup.string()
          .email("Format email tidak sesuai")
          .required("Email wajib disi"),
        ProvinsiId: Yup.string().when(["toggleRegion", "ScopeRegionRoleId"], {
          is: (toggleRegion, ScopeRegionRoleId) =>
            toggleRegion && selectProvinceScope.includes(ScopeRegionRoleId),
          then: (schema) => schema.required("Provinsi wajib diisi").nullable(),
          otherwise: (schema) => schema.nullable(),
        }),
        CityId: Yup.string().when(["toggleRegion", "ScopeRegionRoleId"], {
          is: (toggleRegion, ScopeRegionRoleId) =>
            toggleRegion && selectCityScope.includes(ScopeRegionRoleId),
          then: (schema) =>
            schema.required("Kabupaten/Kota wajib diisi").nullable(),
          otherwise: (schema) => schema.nullable(),
        }),
        password: Yup.string().when("changePassword", {
          is: (value) => value || !isFormUpdate,
          then: (schema) => schema.required("Password wajib disi"),
          otherwise: (schema) => schema.nullable(),
        }),
        confirmPassword: Yup.string().when("changePassword", {
          is: (value) => value || !isFormUpdate,
          then: (schema) =>
            schema
              .required("Konfirmasi Password wajib disi")
              .oneOf(
                [Yup.ref("password"), null],
                "Konfirmasi Password tidak sesuai"
              ),
          otherwise: (schema) => schema.nullable(),
        }),
      })
    ),
  });

  const scopeRegionRoleId = watch("ScopeRegionRoleId");
  const toggleRegion = watch("toggleRegion");
  const changePassword = watch("changePassword");
  const provinsiId = watch("ProvinsiId");
  const cities = watch("tambahKabupaten");

  const canToggleRegion = toggleRegionScope.includes(scopeRegionRoleId);
  const canSelectProvince = selectProvinceScope.includes(scopeRegionRoleId);
  const canSelectCity = selectCityScope.includes(scopeRegionRoleId);
  const canSelectMultipleProvince =
    selectMultipleProvinceScope.includes(scopeRegionRoleId);
  const canSelectMultipleCity =
    selectMultipleCityScope.includes(scopeRegionRoleId);

  useEffect(() => {
    const region = defaultValues?.region
      ? JSON.parse(defaultValues.region).provinsi?.length > 0
      : false;
    reset({
      role: defaultValues?.Role
        ? { value: defaultValues.Role.id, label: defaultValues.Role.nama }
        : null,
      username: defaultValues?.username || "",
      nama: defaultValues?.nama || "",
      email: defaultValues?.email || "",
      instansi: defaultValues?.instansi || "",
      alamatInstansi: defaultValues?.alamatInstansi || "",
      toggleRegion:
        (Boolean(defaultValues?.ProvinsiId) ||
          Boolean(defaultValues?.CityId) ||
          region) &&
        toggleRegionScope.includes(defaultValues?.Role?.ScopeRegionRoleId),
      ProvinsiId: defaultValues?.ProvinsiId,
      tambahProvinsi: defaultValues?.region
        ? JSON.parse(defaultValues.region).provinsi
        : null,
      tambahKabupaten: defaultValues?.region
        ? JSON.parse(defaultValues.region).kabupaten
        : null,
      CityId: defaultValues?.CityId,
      changePassword: false,
      password: "",
      confirmPassword: "",
      ScopeRegionRoleId: defaultValues?.Role?.ScopeRegionRoleId || "",
    });
  }, [defaultValues, reset]);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (
        name === "tambahProvinsi" ||
        (name === "ScopeRegionRoleId" &&
          selectMultipleCityScope.includes(value.ScopeRegionRoleId))
      ) {
        setValue(
          "tambahKabupaten",
          value.tambahProvinsi?.length > 0
            ? value.tambahProvinsi.map((province) => ({
                ProvinsiName: province.label,
                ProvinsiId: province.value,
                data: null,
              }))
            : null
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const {
    data: dataRoles,
    isLoading: isLoadingDataRoles,
    isFetching: isFetchingDataRoles,
  } = useRolesQuery({ page: 1, pageSize: 2e9 }, { skip: !open });

  const {
    data: dataProvince,
    isLoading: isLoadingDataProvince,
    isFetching: isFetchingDataProvince,
  } = useProvinsiQuery({ page: 1, pageSize: 2e9 }, { skip: !toggleRegion });
  const {
    data: dataCity,
    isLoading: isLoadingDataCity,
    isFetching: isFetchingDataCity,
  } = useKabupatenQuery(
    {
      page: 1,
      pageSize: 2e9,
      filtered: JSON.stringify([{ id: "eq$ProvinsiId", value: provinsiId }]),
    },
    { skip: !toggleRegion || !provinsiId }
  );

  const onSubmit = async (values) => {
    try {
      const payload = {
        RoleId: values.role.value,
        ProvinsiId:
          values.toggleRegion && canSelectProvince ? values?.ProvinsiId : null,
        CityId: values.toggleRegion && canSelectCity ? values?.CityId : null,
        tambahProvinsi:
          values.toggleRegion &&
          canSelectMultipleProvince &&
          values?.tambahProvinsi?.length > 0
            ? values?.tambahProvinsi
            : null,
        tambahKabupaten:
          values.toggleRegion &&
          canSelectMultipleCity &&
          values?.tambahKabupaten?.length > 0
            ? values?.tambahKabupaten
            : null,
        nama: values.nama,
        username: values.username,
        email: values.email,
        instansi: values.instansi,
        alamatInstansi: values.alamatInstansi,
        region: values.toggleRegion,
      };
      if (values.changePassword || !isFormUpdate) {
        payload.changePassword = values.changePassword;
        payload.password = values.password;
        payload.confirmPassword = values.confirmPassword;
      }

      if (isFormUpdate) {
        await updateMutation({ ...payload, id: defaultValues.id }).unwrap();
        toast.success("Berhasil update user");
        onClose();
      } else {
        await createMutation(payload).unwrap();
        toast.success("Berhasil tambah user");
      }
      reset();
      onClose();
    } catch (error) {
      toast.error(error ?? "Terjadi Kesalahan");
    }
  };

  const optionsProvince =
    dataProvince?.map((province) => ({
      label: province.nama,
      value: province.id,
    })) ?? [];

  const optionsCity =
    dataCity?.map((city) => ({
      label: city.nama,
      value: city.id,
    })) ?? [];

  return (
    <Modal
      isOpen={open}
      toggle={onClose}
      centered
      unmountOnClose
      size="lg"
      backdrop="static"
      onClosed={() => {
        reset();
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={onClose}>
          {isFormUpdate ? "Update  User" : "Tambah User"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="role-form-user" required>
              Role
            </Label>
            <Controller
              name="role"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  inputId="role-form-user"
                  placeholder="Silahkan pilih role user..."
                  className={classnames("react-select", {
                    "is-invalid": errors.role,
                  })}
                  classNamePrefix="select"
                  onChange={(val) => {
                    setValue("ScopeRegionRoleId", val.ScopeRegionRoleId);
                    onChange(val);
                  }}
                  value={value}
                  options={dataRoles?.data?.map((role) => ({
                    label: role.nama,
                    value: role.id,
                    ScopeRegionRoleId: role.ScopeRegionRoleId,
                  }))}
                  isLoading={isLoadingDataRoles || isFetchingDataRoles}
                  isDisabled={isSubmitting}
                />
              )}
            />
            {errors.role && <FormFeedback>{errors.role.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="username-form-user" required>
              Username
            </Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    id="username-form-user"
                    invalid={Boolean(errors.username)}
                    placeholder="Masukan username user"
                    {...field}
                    disabled={isSubmitting || isFormUpdate}
                    onChange={(event) => {
                      const newValue = event.target.value.replace(/ /g, '').toLowerCase()
                      field.onChange(newValue)
                    }}
                  />
                );
              }}
            />
            {errors.username && (
              <FormFeedback>{errors.username.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="nama-form-user" required>
              Nama
            </Label>
            <Controller
              name="nama"
              control={control}
              render={({ field }) => (
                <Input
                  id="nama-form-user"
                  invalid={Boolean(errors.nama)}
                  placeholder="Masukan nama user"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.nama && <FormFeedback>{errors.nama.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="email-form-user" required>
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email-form-user"
                  invalid={Boolean(errors.email)}
                  placeholder="Masukan email user"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.email && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="instansi">Instansi / Lembaga Pengusul</Label>
            <Controller
              name="instansi"
              control={control}
              render={({ field }) => (
                <Input
                  id="instansi"
                  invalid={Boolean(errors.instansi)}
                  placeholder="Masukan instansi/lembaga pengusul user"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.instansi && (
              <FormFeedback>{errors.instansi.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="alamatInstansi">
              Alamat Instansi / Lembaga Pengusul
            </Label>
            <Controller
              name="alamatInstansi"
              control={control}
              render={({ field }) => (
                <Input
                  id="alamatInstansi"
                  invalid={Boolean(errors.alamatInstansi)}
                  placeholder="Masukan alamat instansi/lembaga pengusul user"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.alamatInstansi && (
              <FormFeedback>{errors.alamatInstansi.message}</FormFeedback>
            )}
          </FormGroup>
          {canToggleRegion ? (
            <>
              <hr />
              <FormGroup check>
                <Label for="toggleRegion">Region</Label>
                <Controller
                  name="toggleRegion"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="toggleRegion"
                      invalid={Boolean(errors.toggleRegion)}
                      {...field}
                      type="checkbox"
                      checked={field.value}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.toggleRegion && (
                  <FormFeedback>{errors.toggleRegion.message}</FormFeedback>
                )}
              </FormGroup>

              {toggleRegion && (
                <>
                  {canSelectProvince && (
                    <FormGroup className="mt-2">
                      <Label for="ProvinsiId" required>
                        Provinsi
                      </Label>
                      <Controller
                        name="ProvinsiId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            inputId="ProvinsiId"
                            placeholder="Silahkan pilih scope provinsi user..."
                            className={classnames("react-select", {
                              "is-invalid": errors.ProvinsiId,
                            })}
                            classNamePrefix="select"
                            onChange={(val) => {
                              onChange(val.value);
                            }}
                            value={
                              optionsProvince?.find(
                                (province) => province.value === value
                              ) ?? ""
                            }
                            options={optionsProvince}
                            isLoading={
                              isLoadingDataProvince || isFetchingDataProvince
                            }
                            disabled={isSubmitting}
                          />
                        )}
                      />
                      {errors.ProvinsiId && (
                        <FormFeedback>{errors.ProvinsiId.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                  {canSelectCity && (
                    <FormGroup>
                      <Label for="CityId" required>
                        Kabupaten/Kota
                      </Label>
                      <Controller
                        name="CityId"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            inputId="CityId"
                            placeholder="Silahkan pilih scope kabupaten/kota user..."
                            className={classnames("react-select", {
                              "is-invalid": errors.city,
                            })}
                            classNamePrefix="select"
                            onChange={(val) => {
                              onChange(val.value);
                            }}
                            value={
                              optionsCity?.find(
                                (city) => city.value === value
                              ) ?? ""
                            }
                            options={optionsCity}
                            isLoading={isLoadingDataCity || isFetchingDataCity}
                            isDisabled={!provinsiId || isSubmitting}
                          />
                        )}
                      />
                      {errors.CityId && (
                        <FormFeedback>{errors.CityId.message}</FormFeedback>
                      )}
                    </FormGroup>
                  )}
                  {canSelectMultipleProvince && (
                    <>
                      <FormGroup className="mt-2">
                        <Label for="tambahProvinsi">Provinsi</Label>
                        <Controller
                          name="tambahProvinsi"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Select
                              inputId="tambahProvinsi"
                              placeholder="Silahkan pilih scope provinsi user..."
                              className={classnames("react-select", {
                                "is-invalid": errors.tambahProvinsi,
                              })}
                              classNamePrefix="select"
                              onChange={onChange}
                              value={value}
                              isMulti
                              closeMenuOnSelect={false}
                              options={
                                dataProvince?.map((province) => ({
                                  label: province.nama,
                                  value: province.id,
                                })) ?? []
                              }
                              isLoading={
                                isLoadingDataProvince || isFetchingDataProvince
                              }
                              disabled={isSubmitting}
                            />
                          )}
                        />
                        {errors.tambahProvinsi && (
                          <FormFeedback>
                            {errors.tambahProvinsi.message}
                          </FormFeedback>
                        )}
                      </FormGroup>
                      {canSelectMultipleCity && (
                        <>
                          {cities?.length > 0 ? (
                            <>
                              <p>Kabupaten</p>
                              {cities.map((province, index) => {
                                return (
                                  <SelectProvinceCity
                                    index={index}
                                    key={province.value}
                                    province={province}
                                    control={control}
                                    setValue={setValue}
                                  />
                                );
                              })}
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              <hr />
            </>
          ) : null}

          {isFormUpdate ? (
            <>
              <hr />
              <FormGroup check>
                <Label for="changePassword">Ubah Kata Sandi</Label>
                <Controller
                  name="changePassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="changePassword"
                      invalid={Boolean(errors.changePassword)}
                      {...field}
                      type="checkbox"
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.changePassword && (
                  <FormFeedback>{errors.changePassword.message}</FormFeedback>
                )}
              </FormGroup>
              <hr />
            </>
          ) : null}
          {!isFormUpdate || changePassword ? (
            <>
              <FormGroup>
                <Label for="password" required>
                  Password
                </Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      id="password"
                      invalid={Boolean(errors.password)}
                      placeholder="Masukan password login user"
                      {...field}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.password && (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword" required>
                  Konfirmasi Password
                </Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      id="confirmPassword"
                      invalid={Boolean(errors.confirmPassword)}
                      placeholder="Masukan konfirmasi password login user"
                      {...field}
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
                )}
              </FormGroup>
            </>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} outline disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner style={{ marginRight: "0.5rem" }} size="sm" />
            ) : null}
            Submit
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalUser;
