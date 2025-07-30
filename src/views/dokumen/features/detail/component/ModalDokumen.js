import React, { useState, useEffect } from "react";
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
import { JENIS_DATA_USULAN } from "@constants/usulan";
import {
  useCreateDokumenMutation,
  useUpdateDokumenMutation,
} from "../../../domains/masterdokumen";
import { optionsDirektif } from "@constants/index";
import sweetalert from "@utils/sweetalert";

const validationSchema = yup.object().shape({
  nama: yup.string().required("Nama dokumen tidak boleh kosong"),
  model: yup.string().required("Model tidak boleh kosong"),
  jenisData: yup.string().nullable(),
  jenisDirektif: yup.string().nullable(),
  required: yup.string().nullable(),
  type: yup.number().nullable(),
  MasterKategoriDokumenId: yup.number().nullable(),
  maxSize: yup.number().nullable(),
  typeFile: yup.string().nullable(),
  ditRusunField: yup.string().nullable(),
  jenisBantuan: yup.string().nullable(),
  sort: yup.number().nullable(),
  formatDokumen: yup.string().nullable(),
});

const ModalDokumen = ({ open, onClose, data }) => {
  const isFormUpdate = Boolean(data?.nama);
  const [createDokumenMutation] = useCreateDokumenMutation();
  const [updateDokumenMutation] = useUpdateDokumenMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    reset({
      nama: data?.nama || "",
      model: data?.model || "",
      jenisData: data?.jenisData || null,
      jenisDirektif: data?.jenisDirektif || null,
      required: data?.required || null,
      type: data?.type || null,
      MasterKategoriDokumenId: data?.MasterKategoriDokumenId || null,
      maxSize: data?.maxSize || null,
      typeFile: data?.typeFile || null,
      ditRusunField: data?.ditRusunField || null,
      jenisBantuan: data?.jenisBantuan || null,
      sort: data?.sort || null,
      formatDokumen: data?.formatDokumen || null,
    });
  }, [data, reset]);

  const onSubmit = async (values) => {
    try {
      if (isFormUpdate) {
        await updateDokumenMutation({ ...values, id: data.id }).unwrap();
      } else {
        await createDokumenMutation(values).unwrap();
      }
      sweetalert.fire({
        title: "Berhasil",
        text: `Berhasil ${isFormUpdate ? "ubah" : "tambah"} data dokumen`,
        icon: "success",
      });
      onClose();
    } catch (error) {
      sweetalert.fire({
        title: "Gagal",
        text: `Gagal ${isFormUpdate ? "ubah" : "tambah"} data dokumen`,
        icon: "error",
      });
    }
  };

  const optionsModel = [
    { label: "Vermin", value: "Vermin" },
    { label: "SerahTerima", value: "SerahTerima" },
  ];

  const optionsTypeFile = [
    { label: "Dokumen Ms. Word (*.doc)", value: "doc" },
    { label: "Dokumen Ms. Word (*.docx)", value: "docx" },
    { label: "Dokumen Ms. Excel (*.xls)", value: "xls" },
    { label: "Dokumen Ms. Excel (*.xlsx)", value: "xlsx" },
    { label: "Dokumen PDF (*.pdf)", value: "pdf" },
    { label: "Arsip (*.zip)", value: "zip" },
  ];

  const [optionsJenisData, setOptionsJenisData] = useState([]);

  useEffect(() => {
    // RUK
    if (data?.DirektoratId === 4) {
      setOptionsJenisData(
        JENIS_DATA_USULAN.ruk.map(({ label, value }) => {
          return {
            label: `${value} - ${label}`,
            value,
          };
        })
      );
    }
    // Non RUK
    else {
      setOptionsJenisData(
        JENIS_DATA_USULAN.non_ruk.map(({ label, value }) => {
          return {
            label: `${value} - ${label}`,
            value,
          };
        })
      );
    }
  }, [data?.DirektoratId]);

  const optionsRequired = [];
  optionsRequired.push({
    label: "all",
    value: "all",
  });
  for (let i = 0; i <= 25; i++) {
    optionsRequired.push({
      label: i,
      value: i,
    });
  }

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
          {isFormUpdate ? "Ubah Dokumen" : "Tambah Dokumen"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nama" required>
              Nama
            </Label>
            <Controller
              name="nama"
              control={control}
              render={({ field }) => (
                <Input
                  id="nama"
                  invalid={Boolean(errors.nama)}
                  placeholder="Masukan nama dokumen"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.nama && <FormFeedback>{errors.nama.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="model" required>
              Model
            </Label>
            <Controller
              name="model"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  id="model"
                  name="model"
                  placeholder="Pilih model..."
                  className={classnames("react-select")}
                  classNamePrefix="select"
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  options={optionsModel}
                  value={optionsModel.find((c) => c.value === value) || ""}
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                />
              )}
            />
            {errors.model && (
              <div style={{ color: "#ea5455", fontSize: 12, marginTop: 2 }}>
                {errors.model.message}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="jenisData">Jenis Data</Label>
            <Controller
              name="jenisData"
              control={control}
              render={({ field: { onChange, value } }) => {
                let newValue = [];

                if (value) {
                  newValue = JSON.parse(value).map((iValue) => {
                    return (
                      optionsJenisData.find((c) => c.value === iValue) || {
                        label: iValue,
                        value: iValue,
                      }
                    );
                  });
                }

                return (
                  <>
                    <small style={{ float: "right" }}>{value}</small>
                    <Select
                      id="jenisData"
                      name="jenisData"
                      placeholder="Pilih jenis data..."
                      className={classnames("react-select")}
                      classNamePrefix="select"
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      options={optionsJenisData}
                      value={newValue}
                      onChange={(val) => {
                        onChange(JSON.stringify(val.map(({ value }) => value)));
                      }}
                      isMulti
                    />
                  </>
                );
              }}
            />
            {errors.jenisData && (
              <FormFeedback>{errors.jenisData.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="jenisDirektif">Jenis Direktif</Label>
            <Controller
              name="jenisDirektif"
              control={control}
              render={({ field: { onChange, value } }) => {
                let newValue = [];

                if (value) {
                  newValue = JSON.parse(value).map((iValue) => {
                    return (
                      optionsDirektif.find((c) => c.value === iValue) || {
                        label: iValue,
                        value: iValue,
                      }
                    );
                  });
                }

                return (
                  <>
                    <small style={{ float: "right" }}>{value}</small>
                    <Select
                      id="jenisDirektif"
                      name="jenisDirektif"
                      placeholder="Pilih jenis direktif..."
                      className={classnames("react-select")}
                      classNamePrefix="select"
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      options={optionsDirektif}
                      value={newValue}
                      onChange={(val) => {
                        onChange(JSON.stringify(val.map(({ value }) => value)));
                      }}
                      isMulti
                    />
                  </>
                );
              }}
            />
            {errors.jenisDirektif && (
              <FormFeedback>{errors.jenisDirektif.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="required">Wajib</Label>
            <Controller
              name="required"
              control={control}
              render={({ field: { onChange, value } }) => {
                let newValue = [];

                if (value) {
                  newValue = JSON.parse(value).map((iValue) => {
                    return (
                      optionsRequired.find((c) => c.value === iValue) || {
                        label: iValue,
                        value: iValue,
                      }
                    );
                  });
                }

                return (
                  <>
                    <small style={{ float: "right" }}>{value}</small>
                    <Select
                      id="required"
                      name="required"
                      placeholder="Pilih yang wajib..."
                      className={classnames("react-select")}
                      classNamePrefix="select"
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      options={optionsRequired}
                      value={newValue}
                      onChange={(val) => {
                        onChange(JSON.stringify(val.map(({ value }) => value)));
                      }}
                      isMulti
                    />
                  </>
                );
              }}
            />
            {errors.required && (
              <FormFeedback>{errors.required.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="type">Tipe</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Input
                  id="type"
                  invalid={Boolean(errors.type)}
                  placeholder="Masukan tipe"
                  {...field}
                  type="number"
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.type && <FormFeedback>{errors.type.message}</FormFeedback>}
          </FormGroup>
          {/* <FormGroup>
            <Label for="MasterKategoriDokumenId" required>
              Kategori Dokumen
            </Label>
            <Controller
              name="MasterKategoriDokumenId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  id="MasterKategoriDokumenId"
                  name="MasterKategoriDokumenId"
                  placeholder="Pilih kategori..."
                  className={classnames("react-select")}
                  classNamePrefix="select"
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  options={[]}
                  // value={
                  //   optionsModel.find((c) => c.value === value) || ""
                  // }
                  // onChange={(val) => {
                  //   onChange(val.value)
                  // }}
                />
              )}
            />
            {errors.MasterKategoriDokumenId && (
              <FormFeedback>
                {errors.MasterKategoriDokumenId.message}
              </FormFeedback>
            )}
          </FormGroup> */}
          <FormGroup>
            <Label for="maxSize">Ukuran File Maksimum (MB)</Label>
            <Controller
              name="maxSize"
              control={control}
              render={({ field }) => (
                <Input
                  id="maxSize"
                  invalid={Boolean(errors.type)}
                  placeholder="Masukan ukuran file maksimum"
                  {...field}
                  disabled={isSubmitting}
                  type="number"
                />
              )}
            />
            {errors.maxSize && (
              <FormFeedback>{errors.maxSize.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="typeFile">Tipe File</Label>
            <Controller
              name="typeFile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  id="typeFile"
                  name="typeFile"
                  placeholder="Pilih tipe file..."
                  className={classnames("react-select")}
                  classNamePrefix="select"
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  options={optionsTypeFile}
                  value={optionsTypeFile.find((c) => c.value === value) || ""}
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                />
              )}
            />
            {errors.typeFile && (
              <FormFeedback>{errors.typeFile.message}</FormFeedback>
            )}
          </FormGroup>
          {/* <FormGroup>
            <Label for="ditRusunField" required>
              Dit Rusun Field
            </Label>
            <Controller
              name="ditRusunField"
              control={control}
              render={({ field }) => (
                <Input
                  id="ditRusunField"
                  invalid={Boolean(errors.ditRusunField)}
                  placeholder="Masukan dit rusun field"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.ditRusunField && (
              <FormFeedback>{errors.ditRusunField.message}</FormFeedback>
            )}
          </FormGroup> */}
          {/* <FormGroup>
            <Label for="jenisBantuan" required>
              Jenis Bantuan
            </Label>
            <Controller
              name="jenisBantuan"
              control={control}
              render={({ field }) => (
                <Input
                  id="jenisBantuan"
                  invalid={Boolean(errors.jenisBantuan)}
                  placeholder="Masukan jenis bantuan"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.jenisBantuan && (
              <FormFeedback>{errors.jenisBantuan.message}</FormFeedback>
            )}
          </FormGroup> */}
          <FormGroup>
            <Label for="sort">Urutan</Label>
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Input
                  id="sort"
                  invalid={Boolean(errors.sort)}
                  placeholder="Masukan urutan"
                  type="number"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.sort && <FormFeedback>{errors.sort.message}</FormFeedback>}
          </FormGroup>
          {/* <FormGroup>
            <Label for="formatDokumen" required>
              Format Dokumen
            </Label>
            <Controller
              name="formatDokumen"
              control={control}
              render={({ field }) => (
                <Input
                  id="formatDokumen"
                  invalid={Boolean(errors.formatDokumen)}
                  placeholder="Masukan format dokumen"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.formatDokumen && (
              <FormFeedback>{errors.formatDokumen.message}</FormFeedback>
            )}
          </FormGroup> */}
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

export default ModalDokumen;
