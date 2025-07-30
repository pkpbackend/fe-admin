import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import classnames from "classnames";
import Select from "react-select";
import {
  useCreateVillageMutation,
  useUpdateVillageMutation,
} from "../../../../domains/desa";
import { File } from "react-feather";

// ** styles
import "@styles/react/libs/react-select/_react-select.scss";
import LinkS3 from "../../../../../../../components/LinkS3";
import { useProvincesQuery } from "../../../../domains/provinsi";
import { useCitiesQuery } from "../../../../domains/kabupaten";
import { useSubdistrictsQuery } from "../../../../domains/kecamatan";
import sweetalert from "@utils/sweetalert";

const validationSchema = yup.object().shape({
  ProvinsiId: yup.string().required("Provinsi tidak boleh kosong"),
  CityId: yup.string().required("Kabupaten tidak boleh kosong"),
  KecamatanId: yup.string().required("Kecamatan tidak boleh kosong"),
  nama: yup.string().required("Nama tidak boleh kosong"),
  kode_dagri: yup.string().required("Kode tidak boleh kosong"),
  kode_bps: yup.string().nullable(),
  kode_rkakl: yup.string().nullable(),
  latitude: yup
    .number()
    .typeError("Format tidak sesuai")
    .nullable(true)
    .transform((_, val) => {
      return val !== "" ? Number(val) : null;
    }),
  longitude: yup
    .number()
    .typeError("Format tidak sesuai")
    .nullable(true)
    .transform((_, val) => {
      return val !== "" ? Number(val) : null;
    }),
  zoom: yup
    .number()
    .typeError("Hasus berupa angka")
    .nullable(true)
    .transform((_, val) => {
      return val !== "" ? Number(val) : null;
    }),
});

const ModalVillage = ({ open, onClose, data }) => {
  const isFormUpdate = Boolean(data);
  const [createMutation] = useCreateVillageMutation();
  const [updateMutation] = useUpdateVillageMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const provinsiId = watch("ProvinsiId");
  const cityId = watch("CityId");
  const currentFileGeojson = data?.geojson;

  const {
    data: dataProvincies,
    isFetching: isFetchingProvincies,
    isLoading: isLoadingProvincies,
  } = useProvincesQuery(
    {
      page: 1,
      pageSize: 2e9,
    },
    { skip: !open }
  );
  const {
    data: dataCities,
    isFetching: isFetchingCities,
    isLoading: isLoadingCities,
  } = useCitiesQuery(
    {
      page: 1,
      pageSize: 2e9,
      filtered: [{ id: "ProvinsiId", value: provinsiId }],
    },
    { skip: !open || !provinsiId }
  );
  const {
    data: dataSubdistricts,
    isFetching: isFetchingSubdistricts,
    isLoading: isLoadingSubdistricts,
  } = useSubdistrictsQuery(
    {
      page: 1,
      pageSize: 2e9,
      filtered: [{ id: "cityId", value: cityId }],
    },
    { skip: !open || !cityId }
  );

  React.useEffect(() => {
    reset({
      ProvinsiId: data?.Kecamatan?.City?.ProvinsiId || "",
      CityId: data?.Kecamatan?.CityId || "",
      KecamatanId: data?.KecamatanId || "",
      nama: data?.nama || "",
      kode_dagri: data?.kode_dagri || "",
      kode_bps: data?.kode_bps || "",
      kode_rkakl: data?.kode_rkakl || "",
      latitude: data?.latitude || "",
      longitude: data?.longitude || "",
      zoom: data?.zoom || "",
      batasWilayah: "",
    });
  }, [data, reset]);

  const onSubmit = async (values) => {
    try {
      if (isFormUpdate) {
        delete values.kode_dagri;
        await updateMutation({ ...values, id: data.id }).unwrap();
      } else {
        await createMutation(values).unwrap();
      }
      sweetalert.fire({
        title: "Berhasil",
        text: `Berhasil ${isFormUpdate ? "ubah" : "tambah"} data desa`,
        icon: "success",
      });
      reset();
      onClose();
    } catch (error) {
      sweetalert.fire({
        title: "Gagal",
        text: `Gagal ${isFormUpdate ? "ubah" : "tambah"} data desa`,
        icon: "error",
      });
    }
  };

  const optionsProvince = [
    ...(dataProvincies?.data?.map((item) => ({
      value: item.id,
      label: `${item.nama} (Kode Dagri: ${item.kode_dagri})`,
    })) || []),
  ];
  const optionsCity = [
    ...(dataCities?.data?.map((item) => ({
      value: item.id,
      label: `${item.nama} (Kode Dagri: ${item.kode_dagri})`,
    })) || []),
  ];
  const optionsSubdistrict = [
    ...(dataSubdistricts?.data?.map((item) => ({
      value: item.id,
      label: `${item.nama} (Kode Dagri: ${item.kode_dagri})`,
    })) || []),
  ];
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
          {isFormUpdate ? "Ubah  Desa" : "Tambah Desa"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="ProvinsiId-form-village" required>
              Provinsi
            </Label>
            <Controller
              name="ProvinsiId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  inputId="ProvinsiId-form-village"
                  value={optionsProvince?.find((c) => c.value === value) || ""}
                  options={optionsProvince}
                  placeholder="Silahkan pilih provinsi..."
                  className={classnames("react-select", {
                    "is-invalid": errors.ProvinsiId,
                  })}
                  classNamePrefix="select"
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  isLoading={isLoadingProvincies || isFetchingProvincies}
                  isDisabled={isSubmitting}
                />
              )}
            />
            {errors.ProvinsiId && (
              <FormFeedback>{errors.ProvinsiId.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="CityId-form-village" required>
              Kabupaten
            </Label>
            <Controller
              name="CityId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  inputId="CityId-form-village"
                  value={optionsCity?.find((c) => c.value === value) || ""}
                  options={optionsCity}
                  placeholder="Silahkan pilih kabupaten..."
                  className={classnames("react-select", {
                    "is-invalid": errors.ProvinsiId,
                  })}
                  classNamePrefix="select"
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  isLoading={isLoadingCities || isFetchingCities}
                  isDisabled={isSubmitting || !provinsiId}
                />
              )}
            />
            {errors.CityId && (
              <FormFeedback>{errors.CityId.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="SubdistrictId-form-village" required>
              Kecamatan
            </Label>
            <Controller
              name="KecamatanId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  inputId="SubdistrictId-form-village"
                  value={
                    optionsSubdistrict?.find((c) => c.value === value) || ""
                  }
                  options={optionsSubdistrict}
                  placeholder="Silahkan pilih kecamatan..."
                  className={classnames("react-select", {
                    "is-invalid": errors.ProvinsiId,
                  })}
                  classNamePrefix="select"
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  isLoading={isLoadingSubdistricts || isFetchingSubdistricts}
                  isDisabled={isSubmitting || !cityId}
                />
              )}
            />
            {errors.KecamatanId && (
              <FormFeedback>{errors.KecamatanId.message}</FormFeedback>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="nama-form-village" required>
              Nama
            </Label>
            <Controller
              name="nama"
              control={control}
              render={({ field }) => (
                <Input
                  id="nama-form-village"
                  invalid={Boolean(errors.nama)}
                  placeholder="Masukan nama kabupaten"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.nama && <FormFeedback>{errors.nama.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="kode-dagri-form-village" required>
              Kode (Berdasarkan Kemendagri)
            </Label>
            <Controller
              name="kode_dagri"
              control={control}
              render={({ field }) => (
                <Input
                  id="kode-dagri-form-village"
                  invalid={Boolean(errors.kode_dagri)}
                  placeholder="Masukan kode dagri"
                  {...field}
                  disabled={isSubmitting || isFormUpdate}
                />
              )}
            />
            {!isFormUpdate && (
              <FormText>
                Kode Kemendagri tidak dapat diubah setelah disimpan, perhatikan
                sebelum menyimpan.
              </FormText>
            )}
            {errors.kode_dagri && (
              <FormFeedback>{errors.kode_dagri.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="kode-bps-form-village">Kode (Berdasarkan BPS)</Label>
            <Controller
              name="kode_bps"
              control={control}
              render={({ field }) => (
                <Input
                  id="kode-bps-form-village"
                  invalid={Boolean(errors.kode_bps)}
                  placeholder="Masukan kode bps"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label for="kode-rkakl-form-village">
              Kode (Berdasarkan RKAKL)
            </Label>
            <Controller
              name="kode_rkakl"
              control={control}
              render={({ field }) => (
                <Input
                  id="kode-rkakl-form-village"
                  placeholder="Masukan kode rkakl"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label for="latitude-form-village">Latitude</Label>
            <Controller
              name="latitude"
              control={control}
              render={({ field }) => (
                <Input
                  id="latitude-form-village"
                  invalid={Boolean(errors.latitude)}
                  placeholder="Masukan latitude"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.latitude && (
              <FormFeedback>{errors.latitude.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="longitude-form-village">Longitude</Label>
            <Controller
              name="longitude"
              control={control}
              render={({ field }) => (
                <Input
                  id="longitude-form-village"
                  invalid={Boolean(errors.longitude)}
                  placeholder="Masukan longitude"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.longitude && (
              <FormFeedback>{errors.longitude.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="zoom-form-village">Zoom</Label>
            <Controller
              name="zoom"
              control={control}
              render={({ field }) => (
                <Input
                  id="zoom-form-village"
                  invalid={Boolean(errors.zoom)}
                  placeholder="Masukan level zoom"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.zoom && <FormFeedback>{errors.zoom.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="geojson-form-village">
              Batas Wilayah (file geojson)
            </Label>
            <Controller
              name="batasWilayah"
              control={control}
              render={({ field }) => (
                <Input
                  id="geojson-form-village"
                  placeholder="Pilih file"
                  onChange={(event) => {
                    field.onChange(event.target.files[0]);
                  }}
                  disabled={isSubmitting}
                  type="file"
                />
              )}
            />

            {isFormUpdate && currentFileGeojson && (
              <LinkS3
                rel="noreferrer"
                href={
                  currentFileGeojson.isS3
                    ? currentFileGeojson.s3url
                    : currentFileGeojson.path
                }
              >
                <File size={14} />
                {currentFileGeojson.filename}
              </LinkS3>
              // <Button
              //   tag="a"
              //   color="link"
              //   href={currentFileGeojson.s3url}
              //   target="_blank"
              //   rel="noreferrer"
              //   block={false}
              //   className="d-inline-flex ps-0"
              //   style={{
              //     textDecoration: "underline",
              //   }}
              // >
              //   <File size={14} />
              //   {currentFileGeojson.filename}
              // </Button>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} outline disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" color="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner style={{ marginRight: "0.5rem" }} size="sm" />
            ) : null}
            Simpan
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalVillage;
