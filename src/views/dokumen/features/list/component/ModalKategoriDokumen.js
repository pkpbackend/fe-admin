import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  Button,
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
import * as yup from "yup";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateKategoriDokumenMutation,
  useUpdateKategoriDokumenMutation,
} from "../../../domains/masterkategoridokumen";
import sweetalert from "@utils/sweetalert";

const validationSchema = yup.object().shape({
  name: yup.string().required("Nama tidak boleh kosong"),
  description: yup.string().required("Deskripsi tidak boleh kosong"),
  DirektoratId: yup.string().required("Direktorat tidak boleh kosong"),
});

const ModalKategoriDokumen = ({ open, onClose, data }) => {
  const isFormUpdate = Boolean(data);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [createKategoriMutation] = useCreateKategoriDokumenMutation();
  const [updateKategoriMutation] = useUpdateKategoriDokumenMutation();

  const onSubmit = async (values) => {
    try {
      if (isFormUpdate) {
        await updateKategoriMutation({ ...values, id: data.id }).unwrap();
      } else {
        await createKategoriMutation(values).unwrap();
      }
      sweetalert.fire({
        title: "Berhasil",
        text: `Berhasil ${
          isFormUpdate ? "mengubah" : "menambah"
        } data kategori dokumen`,
        icon: "success",
      });
      onClose();
    } catch (error) {
      sweetalert.fire({
        title: "Gagal",
        text: `Gagal ${
          isFormUpdate ? "mengubah" : "menambah"
        } data kategori dokumen`,
        icon: "error",
      });
    }
  };

  React.useEffect(() => {
    reset({
      name: data?.name || "",
      description: data?.description || "",
      DirektoratId: data?.DirektoratId || "",
    });
  }, [data, reset]);

  const optionsDirektorat = [
    { label: "Rumah Susun", value: 1 },
    { label: "Rumah Khusus", value: 2 },
    { label: "Rumah Swadaya", value: 3 },
    { label: "Rumah Umum dan Komersial", value: 4 },
  ];

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
          {isFormUpdate ? "Ubah Kategori Dokumen" : "Tambah Kategori Dokumen"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name" required>
              Nama
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  invalid={Boolean(errors.name)}
                  placeholder="Masukan nama kategori"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="description" required>
              Deskripsi
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  id="description"
                  invalid={Boolean(errors.description)}
                  placeholder="Masukan deskripsi"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.description && (
              <FormFeedback>{errors.description.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="DirektoratId" required>
              Direktorat
            </Label>
            <Controller
              name="DirektoratId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  id="DirektoratId"
                  name="DirektoratId"
                  placeholder="Pilih direktorat..."
                  className={classnames("react-select")}
                  classNamePrefix="select"
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  options={optionsDirektorat}
                  value={optionsDirektorat.find((c) => c.value === value) || ""}
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                />
              )}
            />
            {errors.DirektoratId && (
              <div style={{ color: "#ea5455", fontSize: 12, marginTop: 2 }}>
                {errors.DirektoratId.message}
              </div>
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

export default ModalKategoriDokumen;
