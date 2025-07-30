import { useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

import InputField from "@customcomponents/form/InputField";
import { useSubmitPanduanMutation } from "@globalapi/panduan";
import { yupResolver } from "@hookform/resolvers/yup";
import sweetalert from "@utils/sweetalert";
import Dropzone from "react-dropzone";
import { UploadCloud, X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object().shape({
  title: yup.string().required("Judul wajib diisi"),
  order: yup.number(),
});

const FieldAttachments = ({ control, onServerFileRemove }) => {
  return (
    <Controller
      control={control}
      name="attachments"
      render={({ field }) => (
        <FormGroup>
          <Label>Attachment</Label>
          <Dropzone
            onDrop={(acceptedFiles) => {
              return field.onChange([
                ...acceptedFiles.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    isNew: true,
                  })
                ),
              ]);
            }}
            accept={{ "application/pdf": [".pdf"] }}
            maxFiles={1}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <UploadCloud className="text-body-tertiary mb-1" />
                  <p className="m-0 text-body-tertiary fs-5 fw-bold">
                    Upload attachment disini jika diperlukan
                  </p>
                  <p className="m-0 text-body-tertiary">
                    (Only *.pdf document will be accepted)
                  </p>
                </div>
                <aside className="mt-2">
                  <ListGroup
                    flush
                    style={{
                      "--bs-list-group-bg": "#fff",
                    }}
                  >
                    {field.value?.map((file) => (
                      <ListGroupItem
                        key={file.path}
                        className="d-flex gap-3 align-items-center w-100 px-1 py-2"
                      >
                        <a href={file.preview} target="_blank" rel="noreferrer">
                          {file.path}
                        </a>
                        <Button
                          color="danger"
                          size="sm"
                          className="btn-icon"
                          outline
                          onClick={() => {
                            if (file.preview && file.isNew) {
                              URL.revokeObjectURL(file.preview);
                            }
                            if (!file.isNew) {
                              onServerFileRemove(file.id);
                            }
                            field.onChange(
                              field?.value?.filter(
                                (item) => item.path !== file.path
                              )
                            );
                          }}
                        >
                          <X size={10} />
                        </Button>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </aside>
              </section>
            )}
          </Dropzone>
        </FormGroup>
      )}
    />
  );
};

const FormTambah = ({ isOpen, onClose, data }) => {
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(formSchema),
  });

  const attachments = watch("attachments");
  const deleteAttachments = watch("deleteAttachments");
  useEffect(() => {
    if (data) {
      reset({
        ...data,
        attachments:
          data?.attachments?.length > 0
            ? data?.attachments.map((file) => ({
                id: file.id,
                preview: file.s3url,
                path: file.filename,
                isNew: false,
              }))
            : [],
      });
    } else {
      reset({
        title: "",
        order: "",
        attachments: [],
      });
    }
  }, [data, reset, isOpen]);

  const [submitPanduan, result] = useSubmitPanduanMutation();

  const disabledForm = result.isLoading;
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title ? values.title : "");
    formData.append("description", "");
    formData.append("order", parseInt(values.order));
    if (values.id && values?.deleteAttachments?.length > 0) {
      for (const attachment of values.deleteAttachments) {
        formData.append("deleteAttachments[]", attachment);
      }
    }

    for (const attachment of values.attachments) {
      if (attachment.isNew) {
        formData.append("attachments[]", attachment);

        if (data) {
          for (const oldAttachment of data.attachments) {
            formData.append("deleteAttachments[]", oldAttachment.id);
          }
        }
      }
    }

    try {
      await submitPanduan({ data: formData, id: values?.id }).unwrap();
      sweetalert.fire("Sukses", "Data panduan berhasil tersimpan", "success");
      onClose();
    } catch (error) {
      sweetalert.fire("Gagal", error?.data?.message, "error");
    }
  };

  useEffect(() => {
    return () =>
      attachments?.forEach((file) => {
        if (file.isNew) {
          URL.revokeObjectURL(file.preview);
        }
      });
  }, [attachments]);

  return (
    <Modal isOpen={isOpen} toggle={onClose} size={"lg"}>
      <ModalHeader toggle={onClose}>
        {data?.id ? "Ubah" : "Tambah"} Panduan
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            disabled={disabledForm}
            name="title"
            label="Judul *"
            placeholder="Masukan judul panduan"
          />
          <InputField
            control={control}
            disabled={disabledForm}
            name="order"
            label="Sort Index (nilai kecil muncul lebih awal)"
            placeholder="Masukan Sort Index"
            type="number"
          />
          <FieldAttachments
            control={control}
            files={attachments}
            onServerFileRemove={(fileId) => {
              setValue("deleteAttachments", [
                ...(deleteAttachments || []),
                fileId,
              ]);
            }}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} outline>
          Batal
        </Button>
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
