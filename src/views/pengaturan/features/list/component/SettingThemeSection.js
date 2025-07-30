import {
  usePengaturanByKeyQuery,
  useSubmitPengaturanMutation,
} from "@globalapi/pengaturan";
import { useState } from "react";
import { Check, Edit, Plus, Trash2 } from "react-feather";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert,
  Button,
  Modal,
  Table,
} from "reactstrap";

import ComponentSpinner from "@components/spinner/Loading-spinner";
import InputField from "@customcomponents/form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import sweetalert from "@utils/sweetalert";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import * as Yup from "yup";

const ColorPallete = ({ hex }) => {
  return (
    <div className="d-flex gap-2 align-items-center">
      <div style={{ width: 80 }}>
        <strong>{hex}</strong>
      </div>
      <div
        className="hadow-sm rounded-2 border"
        style={{ width: 40, height: 40, background: hex }}
      />
    </div>
  );
};
const ModalSettingTheme = ({
  open,
  onClose,
  defaultValues,
  currentThemes,
  id,
}) => {
  const isUpdate = Boolean(defaultValues);
  const [submitPengaturan] = useSubmitPengaturanMutation();
  const currentThemesName = [...currentThemes]
    .map((theme) => theme.name)
    .filter((name) => name !== defaultValues?.name);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required("Nama tema wajib disi"),
        primaryColor: Yup.string().required("Primary color wajib disi"),
        secondaryColor: Yup.string().required("Secondary color wajib disi"),
      })
    ),
  });

  useEffect(() => {
    reset({
      name: defaultValues?.name || "",
      primaryColor: defaultValues?.primaryColor || "",
      secondaryColor: defaultValues?.secondaryColor || "",
    });
  }, [defaultValues, reset]);

  const onSubmit = async (values) => {
    const checkUniqueName = currentThemesName.includes(values.name);
    if (checkUniqueName) {
      setError("name", {
        message: "Nama Tema sudah digunakan!",
        type: "validate",
      });
    } else {
      let themes = [];
      try {
        if (isUpdate) {
          themes = currentThemes;
          themes[defaultValues.index] = { ...values, applied: false };
        } else {
          themes = [...(currentThemes || []), { ...values, applied: false }];
        }

        await submitPengaturan({
          id,
          params: JSON.stringify(themes),
        }).unwrap();
        toast.success(`Berhasil ${isUpdate ? "update" : "tambah"} tema`, {
          position: "top-center",
        });
        reset();
        onClose();
      } catch (error) {
        toast.error(error ?? "Terjadi Kesalahan");
      }
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
          {isUpdate ? `Update Tema ${defaultValues.name}` : "Tambah Tema"}
        </ModalHeader>
        <ModalBody>
          <InputField
            control={control}
            disabled={isSubmitting}
            name="name"
            label="Nama Tema"
            placeholder={"Masukan nama tema"}
          />
          <InputField
            control={control}
            disabled={isSubmitting}
            name="primaryColor"
            label="Primary Color (HEX)"
            placeholder={"Contoh: #FFFFFF"}
          />
          <InputField
            control={control}
            disabled={isSubmitting}
            name="secondaryColor"
            label="Secondary Color (HEX)"
            placeholder={"Contoh: #000000"}
          />
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

const SettingThemeSection = () => {
  const [isOpen, setIsOpen] = useState("");
  const toggle = (id) => {
    if (isOpen === id) {
      setIsOpen();
    } else {
      setIsOpen(id);
    }
  };

  const [submitPengaturan] = useSubmitPengaturanMutation();

  const [modalSettingThemeState, setModalSettingThemeState] = useState({
    open: false,
    data: null,
  });

  const { data, isLoading } = usePengaturanByKeyQuery("theme", {
    skip: !isOpen,
  });

  const themes = data?.params ? JSON.parse(data?.params) : [];

  async function handleDeleteTheme(theme) {
    sweetalert
      .fire({
        title: "Konfirmasi Hapus",
        html: `<div>
                  <span>Apakah anda yakin akan hapus tema ini?
                </div>`,
        type: "warning",
        icon: "info",
        confirmButtonText: "Ya",
        showCancelButton: true,
        cancelButtonText: "Batal",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await submitPengaturan({
              id: data?.id,
              params: JSON.stringify(
                themes.filter((item) => item.name !== theme.name)
              ),
            }).unwrap();
            return true;
          } catch (error) {
            sweetalert.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !sweetalert.isLoading(),
      })
      .then((result) => {
        if (result.isConfirmed) {
          sweetalert.fire("Berhasil", "Berhasil menghapus tema...", "success");
        }
      });
  }

  async function handleAppliedTheme(theme) {
    sweetalert
      .fire({
        title: "Konfirmasi Terapkan Tema",
        html: `<div>
              <span>Apakah anda yakin ingin menerapkan tema ini?
              <br />
              <br />
              <strong>
              Nama Tema
              <br />
              ${theme.name}
              </strong>
            </div>`,
        type: "warning",
        icon: "info",
        confirmButtonText: "Ya",
        showCancelButton: true,
        cancelButtonText: "Batal",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await submitPengaturan({
              id: data?.id,
              params: JSON.stringify(
                themes.map((item) => ({
                  ...item,
                  applied: item.name === theme.name,
                }))
              ),
            }).unwrap();
            return true;
          } catch (error) {
            sweetalert.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !sweetalert.isLoading(),
      })
      .then((result) => {
        if (result.isConfirmed) {
          sweetalert.fire("Berhasil", "Berhasil menerapkan tema...", "success");
        }
      });
  }
  return (
    <>
      <Accordion open={isOpen} toggle={toggle}>
        <AccordionItem className="shadow">
          <AccordionHeader targetId="setting-portal-theme-section">
            Theme
          </AccordionHeader>

          <AccordionBody accordionId="setting-portal-theme-section">
            <Button
              size="sm"
              color="primary"
              className="mb-3"
              onClick={() =>
                setModalSettingThemeState({ open: true, data: null })
              }
            >
              <Plus size={16} />
              Tambah Tema
            </Button>
            {isLoading ? (
              <div className="p-3">
                <ComponentSpinner />
              </div>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Diterapkan</th>
                    <th>Primary</th>
                    <th>Secondary</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {themes?.length > 0 ? (
                    <>
                      {themes.map((theme, index) => (
                        <tr key={theme.name}>
                          <td>{theme.name}</td>
                          <td>{theme.applied ? "Ya" : "Tidak"}</td>
                          <td>
                            <ColorPallete hex={theme.primaryColor} />
                          </td>
                          <td>
                            <ColorPallete hex={theme.secondaryColor} />
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                size="sm"
                                color="primary"
                                disabled={theme.applied}
                                onClick={() => handleAppliedTheme(theme)}
                              >
                                <Check size={16} />
                                Terapkan
                              </Button>
                              <Button
                                size="sm"
                                color="primary"
                                outline
                                onClick={() => {
                                  setModalSettingThemeState({
                                    open: true,
                                    data: { ...theme, index: index },
                                  });
                                }}
                              >
                                <Edit size={16} />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                color="danger"
                                outline
                                disabled={
                                  theme.applied || theme.name === "Default"
                                }
                                onClick={() => handleDeleteTheme(theme)}
                              >
                                <Trash2 size={16} />
                                Hapus
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={99}>
                        <Alert color="secondary" className="text-center">
                          Tidak ada data
                        </Alert>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </AccordionBody>
        </AccordionItem>
      </Accordion>
      <ModalSettingTheme
        open={modalSettingThemeState.open}
        onClose={() => {
          setModalSettingThemeState({ open: false });
        }}
        defaultValues={modalSettingThemeState.data}
        currentThemes={themes}
        id={data?.id}
      />
    </>
  );
};

export default SettingThemeSection;
