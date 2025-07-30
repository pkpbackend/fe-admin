import {
  usePengaturanByKeyQuery,
  useSubmitPengaturanMutation,
  useUploadFilePengaturanMutation,
} from "@api/domains/pengaturan";
import { LANDING_URL, REVALIDATE_TOKEN } from "@constants/index";
import InputField from "@customcomponents/form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Trash2, X } from "react-feather";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";

const UploadField = ({ onSuccessUpload, value, onRemove, name, className }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [uploadMutation, resultUploadMutation] =
    useUploadFilePengaturanMutation();

  function closePreview() {
    setShowPreview(false);
  }
  async function onUpload(file) {
    try {
      const formData = new FormData();
      formData.append("document", file);
      const response = await uploadMutation(formData).unwrap();
      toast.success(`File uploaded successfully`);
      onSuccessUpload(response.fileUrl);
    } catch (error) {
      toast.error(`File uploaded failed`);
    }
  }
  return (
    <>
      <Dropzone
        disabled={resultUploadMutation.isLoading}
        onDrop={(acceptedFiles) => {
          onUpload(acceptedFiles[0]);
        }}
        maxFiles={1}
        accept={"image/*"}
        validator={(file) => {
          const isImage = file.type.includes("image");
          if (!isImage) {
            toast.error("Format file tidak valid", { position: "top-center" });
            return false;
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input id={name} {...getInputProps()} />
              <Button
                outline
                type="button"
                disabled={resultUploadMutation.isLoading}
              >
                {resultUploadMutation.isLoading ? (
                  <>
                    <Spinner size="sm" /> Uploading...
                  </>
                ) : (
                  "Click to upload"
                )}
              </Button>
            </div>
            <aside className="mt-2">
              {value ? (
                <div className="d-flex justify-content-between align-items-center w-100 px-3 py-2 border">
                  <Button
                    color="link text-decoration-underline p-0"
                    onClick={() => setShowPreview(true)}
                  >
                    <div style={{ width: 60, height: 60 }} className="me-2">
                      <img
                        src={value}
                        crossOrigin="anonymous"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        alt="Banner"
                      />
                    </div>
                    Uploaded file
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    className="btn-icon ms-4"
                    outline
                    onClick={() => {
                      onRemove();
                    }}
                  >
                    <X size={10} />
                  </Button>
                </div>
              ) : null}
            </aside>
          </section>
        )}
      </Dropzone>
      <Modal isOpen={showPreview} toggle={closePreview} centered>
        <ModalHeader toggle={closePreview}>Preview</ModalHeader>
        <ModalBody>
          <img
            src={value}
            crossOrigin="anonymous"
            style={{ width: "100%", height: "100%" }}
            alt="Banner"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closePreview}>
            Tutup
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const FormSlider = (props) => {
  const { setToggle, toggle } = props;
  let { modalKey: key } = toggle;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    defaultValues: { params: [] },
    resolver: yupResolver(
      Yup.object().shape({
        params: Yup.array().of(
          Yup.object().shape({
            filepathDesktop: Yup.string().required(
              "Foto slider desktop tidak boleh kosong"
            ),
            filepathMobile: Yup.string().required(
              "Foto slider mobile tidak boleh kosong"
            ),
          })
        ),
      })
    ),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "params",
  });

  const [submitPengaturan] = useSubmitPengaturanMutation();

  const { isSuccess, data } = usePengaturanByKeyQuery(key);

  const onSubmit = async (values) => {
    try {
      const payload = {
        id: data?.id,
        key,
        params: JSON.stringify(
          values.params.map((item) => ({
            title: item.title,
            description: item.description,
            filepathDesktop: item.filepathDesktop,
            filepathMobile: item.filepathMobile,
          }))
        ),
      };
      await submitPengaturan(payload).unwrap();
      toast.success("Pengaturan Home Slider berhasil disimpan");
      await axios.get(`${LANDING_URL}api/revalidate?token=${REVALIDATE_TOKEN}`);
      setToggle({
        ...toggle,
        modalTambah: false,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      reset({ params: data?.params ? JSON.parse(data?.params) : "" });
    }
  }, [data?.params, isSuccess, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields?.map((field, index) => {
        return (
          <Fragment key={field.id}>
            <Row>
              <Col md={2}>
                <h4 className="me-0">Slider {index + 1}</h4>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={isSubmitting}
                >
                  <Trash2 size={16} />
                </Button>
              </Col>
              <Col md={10}>
                <InputField
                  control={control}
                  name={`params.${index}.title`}
                  label="Judul"
                  placeholder="Masukan judul slider"
                />
                <InputField
                  control={control}
                  name={`params.${index}.description`}
                  label="Deskripsi"
                  placeholder={"Masukan deskripsi"}
                  type="textarea"
                />
                <FormGroup>
                  <Label for="filepathDesktop">Foto Slider Desktop *</Label>
                  <UploadField
                    name={"filepathDesktop"}
                    onSuccessUpload={(value) => {
                      update(index, { ...field, filepathDesktop: value });
                    }}
                    onRemove={() =>
                      update(index, { ...field, filepathDesktop: "" })
                    }
                    value={field.filepathDesktop}
                  />
                  {errors?.params?.[index]?.filepathDesktop.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.params[index].filepathDesktop.message}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="filepathMobile">Foto Slider Mobile *</Label>
                  <UploadField
                    name={"filepathMobile"}
                    onSuccessUpload={(value) => {
                      update(index, { ...field, filepathMobile: value });
                    }}
                    onRemove={() =>
                      update(index, { ...field, filepathMobile: "" })
                    }
                    value={field.filepathMobile}
                  />
                  {errors?.params?.[index]?.filepathMobile.message && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.params[index].filepathMobile.message}
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <hr></hr>
          </Fragment>
        );
      })}
      <FormGroup
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="primary"
          onClick={() => append()}
          disabled={isSubmitting}
        >
          Tambah Slider
        </Button>
        <Button color="primary" type="submit" disabled={isSubmitting}>
          Simpan
        </Button>
      </FormGroup>
    </Form>
  );
};

export default FormSlider;
