import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  Alert,
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
import * as Yup from "yup";

import { useDirektoratQuery } from "../../../../../api/domains/direktorat";
import {
  useDiscussionTopicsQuery,
  useCreateHelpdeskMutation,
  useGlossaryQuery,
} from "../../../../../api/domains/diskusi";
import { Search } from "react-feather";
import toast from "react-hot-toast";

const ModalFormAdminCreateTicket = ({
  isOpen,
  onClose,
  defaultValues = {
    DirektoratId: null,
    HelpdeskTopikDiskusiId: null,
    title: "",
  },
}) => {
  const [isStillHaveNotFoundAnAnswer, setIsStillHaveNotFoundAnAnswer] =
    React.useState(false);
  const {
    data: dataDirektorat,
    isLoading: isLoadingDataDirektorat,
    isFetching: isFetchingDataDirektorat,
  } = useDirektoratQuery();
  const {
    data: dataDiscusstionTopic,
    isLoading: isLoadingDataDiscusstionTopic,
    isFetching: isFetchingDataDiscusstionTopic,
  } = useDiscussionTopicsQuery({ page: 1, pageSize: 2e9 });

  const [mutation] = useCreateHelpdeskMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(
      Yup.object().shape({
        DirektoratId: Yup.string()
          .required("Direktorat wajib diisi")
          .nullable(),
        HelpdeskTopikDiskusiId: Yup.string()
          .required("Topik wajib diisi")
          .nullable(),
        title: Yup.string().required("Judul wajib diisi"),
      })
    ),
  });
  const direktoratId = watch("DirektoratId");
  const helpdeskTopikDiskusiId = watch("HelpdeskTopikDiskusiId");

  const {
    data: dataGlossary,
    isLoading: isLoadingDataGlossary,
    isFetching: isFetchingDataGlossary,
  } = useGlossaryQuery(
    { direktoratId, helpdeskTopikDiskusiId },
    { skip: !direktoratId && !helpdeskTopikDiskusiId }
  );

  const optionsDirektorat =
    dataDirektorat?.map((direktorat) => ({
      label: direktorat.name,
      value: direktorat.id,
    })) ?? [];
  const optionsDiscussionTopic =
    dataDiscusstionTopic?.map((direktorat) => ({
      label: direktorat.name,
      value: direktorat.id,
    })) ?? [];

  const resetModalData = () => {
    reset();
    setIsStillHaveNotFoundAnAnswer(false);
    onClose();
  };
  async function onSubmit(values) {
    try {
      await mutation({
        Helpdesk: {
          HelpdeskTopikDiskusiId: values.HelpdeskTopikDiskusiId,
          isAdmin: true,
          DirektoratId: values.DirektoratId,
          title: values.title,
          // HelpdeskUserId: 0,
        },
      }).unwrap();
      toast.success("Tiket berhasil dibuat", { position: "top-center" });
      resetModalData();
    } catch (error) {
      toast.error(error, { position: "top-center" });
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      size="lg"
      unmountOnClose
      onClosed={() => {
        setIsStillHaveNotFoundAnAnswer(false);
        reset();
      }}
      backdrop={isSubmitting ? "static" : true}
    >
      <ModalHeader toggle={onClose}>
        {defaultValues?.id ? "Ubah" : "Buat"} Tiket Diskusi
      </ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormGroup>
            <Label className="form-label" for="DirektoratId">
              Direktorat
            </Label>
            <Controller
              id="DirektoratId"
              name="DirektoratId"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    inputId="DirektoratId"
                    options={optionsDirektorat}
                    placeholder="Silahkan pilih direktorat..."
                    className={classnames("react-select", {
                      "is-invalid": errors.DirektoratId,
                    })}
                    classNamePrefix="select"
                    onChange={(val) => {
                      onChange(val.value);
                    }}
                    value={optionsDirektorat.find(
                      (option) => option.value === value
                    )}
                    isLoading={
                      isLoadingDataDirektorat || isFetchingDataDirektorat
                    }
                    disabled={isSubmitting}
                  />
                );
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label className="form-label" for="HelpdeskTopikDiskusiId">
              Topik
            </Label>
            <Controller
              id="HelpdeskTopikDiskusiId"
              name="HelpdeskTopikDiskusiId"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    inputId="HelpdeskTopikDiskusiId"
                    options={optionsDiscussionTopic}
                    placeholder="Silahkan pilih topik diskusi..."
                    className={classnames("react-select", {
                      "is-invalid": errors.HelpdeskTopikDiskusiId,
                    })}
                    classNamePrefix="select"
                    onChange={(val) => {
                      onChange(val.value);
                    }}
                    value={optionsDiscussionTopic.find(
                      (option) => option.value === value
                    )}
                    isLoading={
                      isLoadingDataDiscusstionTopic ||
                      isFetchingDataDiscusstionTopic
                    }
                    disabled={isSubmitting}
                  />
                );
              }}
            />
          </FormGroup>
          {isStillHaveNotFoundAnAnswer ? (
            <FormGroup>
              <Label className="form-label" for="title">
                Judul
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="title"
                    type="textarea"
                    placeholder="Masukan judul diksusi"
                    rows={3}
                    invalid={Boolean(errors.title)}
                    {...field}
                    disabled={isSubmitting}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback>{errors.title.message}</FormFeedback>
              )}
            </FormGroup>
          ) : direktoratId && helpdeskTopikDiskusiId ? (
            <div>
              <h4>Glossary Jawaban</h4>
              {dataGlossary?.length > 0 ? (
                <></>
              ) : (
                <div>
                  <Alert
                    color="secondary"
                    style={{ padding: "1.5rem", fontSize: "1rem" }}
                  >
                    <Search style={{ marginRight: "1rem" }} />
                    Hasil tidak ditemukan
                  </Alert>
                </div>
              )}
            </div>
          ) : null}
        </ModalBody>
        <ModalFooter>
          {!isStillHaveNotFoundAnAnswer &&
          direktoratId &&
          helpdeskTopikDiskusiId ? (
            <>
              <Button color="primary" onClick={onClose}>
                Kembali, Saya telah menemukan jawabannya
              </Button>
              <Button
                color="primary"
                outline
                onClick={() => setIsStillHaveNotFoundAnAnswer(true)}
              >
                Tidak menemukan jawaban?
              </Button>
            </>
          ) : null}

          {isStillHaveNotFoundAnAnswer ? (
            <>
              <Button
                color="danger"
                onClick={onClose}
                outline
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner style={{ marginRight: "0.5rem" }} size="sm" />
                ) : null}
                Buat Tiket
              </Button>
            </>
          ) : null}
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalFormAdminCreateTicket;
