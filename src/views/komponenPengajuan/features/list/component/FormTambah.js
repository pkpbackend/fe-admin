import { useEffect } from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

import InputField from "@customcomponents/form/InputField";
import { useSubmitKomponenPengajuanMutation } from "@globalapi/komponen-pengajuan";
import { yupResolver } from "@hookform/resolvers/yup";
import sweetalert from "@utils/sweetalert";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Nama komponen pengajuan wajib diisi"),
});

const FormTambah = ({ isOpen, onClose, data }) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    } else {
      reset({});
    }
  }, [data, reset, isOpen]);

  const [submitMutation, result] = useSubmitKomponenPengajuanMutation();

  const disabledForm = result.isLoading;
  const onSubmit = async (values) => {
    try {
      await submitMutation({ data: values, id: values?.id }).unwrap();
      sweetalert.fire(
        "Sukses",
        "Data komponen pengajuan berhasil tersimpan",
        "success"
      );
      onClose();
    } catch (error) {
      sweetalert.fire("Gagal", error?.data?.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} size={"lg"}>
      <ModalHeader toggle={onClose}>
        {data?.id ? "Ubah" : "Tambah"} Komponen Pengajuan
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            disabled={disabledForm}
            name="name"
            label="Nama Komponen Pengajuan"
            placeholder="Masukan nama komponen pengajuan"
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Batal</Button>
        <Button
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={disabledForm}
        >
          {result.isLoading ? <Spinner size="sm" /> : null}
          Simpan
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FormTambah;
