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
import LinkS3 from "../../../../../../../components/LinkS3";
import {
  useCreateProvinceMutation,
  useUpdateProvinceMutation,
} from "../../../../domains/provinsi";
import { File } from "react-feather";
import sweetalert from "@utils/sweetalert";

const validationSchema = yup.object().shape({
  nama: yup.string().required("Nama tidak boleh kosong"),
  kode_dagri: yup.string().required("Kode tidak boleh kosong"),
  kode_bps: yup.string().nullable(),
  kode_rkakl: yup.string().nullable(),
  latitude: yup
    .number()
    .typeError("Format tidak sesuai")
    .required("Latitude tidak boleh kosong"),
  longitude: yup
    .number()
    .typeError("Format tidak sesuai")
    .required("Longitude tidak boleh kosong"),
  zoom: yup
    .number()
    .typeError("Hasus berupa angka")
    .nullable(true)
    .transform((_, val) => {
      return val !== "" ? Number(val) : null;
    }),
});

const ModalProvince = ({ open, onClose, data }) => {
  const isFormUpdate = Boolean(data);
  const [createMutation] = useCreateProvinceMutation();
  const [updateMutation] = useUpdateProvinceMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const currentFileGeojson = data?.geojson;

  React.useEffect(() => {
    reset({
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
        text: `Berhasil ${isFormUpdate ? "ubah" : "tambah"} data provinsi`,
        icon: "success",
      });
      onClose();
    } catch (error) {
      sweetalert.fire({
        title: "Gagal",
        text: `Gagal ${isFormUpdate ? "ubah" : "tambah"} data provinsi`,
        icon: "error",
      });
    }
  };

  return (
    <Modal
      isOpen={open}
      toggle={onClose}
      centered
      unmountOnClose
      size="lg"
      backdrop="static"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={onClose}>
          {isFormUpdate ? "Ubah  Provinsi" : "Tambah Provinsi"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nama-form-province" required>
              Nama
            </Label>
            <Controller
              name="nama"
              control={control}
              render={({ field }) => (
                <Input
                  id="nama-form-province"
                  invalid={Boolean(errors.nama)}
                  placeholder="Masukan nama provinsi"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.nama && <FormFeedback>{errors.nama.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="kode-dagri-form-province" required>
              Kode (Berdasarkan Kemendagri)
            </Label>
            <Controller
              name="kode_dagri"
              control={control}
              render={({ field }) => (
                <Input
                  id="kode-dagri-form-province"
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
            <Label for="kode-bps-form-province">Kode (Berdasarkan BPS)</Label>
            <Controller
              name="kode_bps"
              control={control}
              render={({ field }) => (
                <Input
                  id="kode-bps-form-province"
                  invalid={Boolean(errors.kode_bps)}
                  placeholder="Masukan kode bps"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label for="kode-rkakl-form-province">
              Kode (Berdasarkan RKAKL)
            </Label>
            <Controller
              name="kode_rkakl"
              control={control}
              render={({ field }) => (
                <Input
                  id="kode-rkakl-form-province"
                  placeholder="Masukan kode rkakl"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label for="latitude-form-province" required>
              Latitude
            </Label>
            <Controller
              name="latitude"
              control={control}
              render={({ field }) => (
                <Input
                  id="latitude-form-province"
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
            <Label for="longitude-form-province" required>
              Longitude
            </Label>
            <Controller
              name="longitude"
              control={control}
              render={({ field }) => (
                <Input
                  id="longitude-form-province"
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
            <Label for="zoom-form-province">Zoom</Label>
            <Controller
              name="zoom"
              control={control}
              render={({ field }) => (
                <Input
                  id="zoom-form-province"
                  invalid={Boolean(errors.zoom)}
                  placeholder="Masukan level zoom"
                  type="number"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.zoom && <FormFeedback>{errors.zoom.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="geojson-form-province">
              Batas Wilayah (file geojson)
            </Label>
            <Controller
              name="batasWilayah"
              control={control}
              render={({ field }) => (
                <Input
                  id="geojson-form-province"
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

export default ModalProvince;
