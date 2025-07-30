import InputField from "@customcomponents/form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import {
  useUpdateDeveloperMutation,
  useCreateDeveloperMutation,
} from "../../../domains";

const ModalDeveloper = ({ open, onClose, defaultValues, type }) => {
  const isViewOnly = type === "detail";
  const [updateMutation] = useUpdateDeveloperMutation();
  const [createMutation] = useCreateDeveloperMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        nama: Yup.string().required("Nama wajib disi"),
        namaPerusahaan: Yup.string().required("Nama perusahaan wajib disi"),
        email: Yup.string()
          .email("Format email tidak sesuai")
          .required("Email wajib disi"),
        npwp: Yup.string().required("NPWP wajib disi"),
        telpPenanggungJawab: Yup.string().required(
          "Nomor hp pengembang wajib disi"
        ),
      })
    ),
  });

  useEffect(() => {
    reset({
      id: defaultValues?.id || "",
      nama: defaultValues?.nama || "",
      namaPerusahaan: defaultValues?.namaPerusahaan || "",
      email: defaultValues?.email || "",
      npwp: defaultValues?.npwp || "",
      telpPenanggungJawab: defaultValues?.telpPenanggungJawab || "",
    });
  }, [defaultValues, reset]);

  const onSubmit = async (values) => {
    try {
      if (type === "create") {
        await createMutation(values).unwrap();
      } else {
        await updateMutation(values).unwrap();
      }
      toast.success(
        `Berhasil ${type === "create" ? "tambah" : "update"} pengembang`,
        { position: "top-center" }
      );
      reset();
      onClose();
    } catch (error) {
      toast.error(error ?? "Terjadi Kesalahan");
    }
  };

  return (
    <Modal
      isOpen={open}
      toggle={onClose}
      centered
      unmountOnClose
      backdrop="static"
      onClosed={() => {
        reset();
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={onClose}>
          {isViewOnly
            ? "Detail Pengembang"
            : type === "create"
            ? "Tambah Pengembang"
            : "Update Pengembang"}
        </ModalHeader>
        <ModalBody>
          <InputField
            control={control}
            disabled={isViewOnly}
            name="nama"
            label="Nama Pengembang"
            placeholder={isViewOnly ? "" : "Masukan nama pengembang"}
          />
          <InputField
            control={control}
            disabled={isViewOnly}
            name="namaPerusahaan"
            label="Nama Perusahaan"
            placeholder={isViewOnly ? "" : "Masukan nama perusahaan pengembang"}
          />
          <InputField
            control={control}
            disabled={isViewOnly}
            name="email"
            label="Email"
            placeholder={isViewOnly ? "" : "Masukan email"}
          />
          <InputField
            control={control}
            disabled={isViewOnly}
            name="npwp"
            label="NPWP"
            placeholder={isViewOnly ? "" : "Masukan npwp"}
          />
          <InputField
            control={control}
            disabled={isViewOnly}
            name="telpPenanggungJawab"
            label="No HP Pengembang"
            placeholder={isViewOnly ? "" : "Masukan nomor hp pengembang"}
            type="number"
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} outline disabled={isSubmitting}>
            {isViewOnly ? "Tutup" : "Batal"}
          </Button>
          {isViewOnly ? null : (
            <Button type="submit" color="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner style={{ marginRight: "0.5rem" }} size="sm" />
              ) : null}
              Submit
            </Button>
          )}
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalDeveloper;
