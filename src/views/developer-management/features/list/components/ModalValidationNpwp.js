import React from "react";
import { Check, X } from "react-feather";
import toast from "react-hot-toast";
import {
  Alert,
  Badge,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useValidationNpwpDeveloperMutation } from "../../../domains";

const ModalValidationNpwp = ({ open, onClose, defaultValue }) => {
  const [validationNpwpMutation, { isLoading }] =
    useValidationNpwpDeveloperMutation();
  const handleSubmit = async (isValid) => {
    try {
      await validationNpwpMutation({
        isValid: isValid,
        id: defaultValue.id,
      }).unwrap();
      toast.success("Berhasil validasi npwp pengembang", {
        position: "top-center",
      });
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
      onClosed={() => {}}
      size="lg"
    >
      <Form>
        <ModalHeader toggle={onClose}>Validasi NPWP Pengembang</ModalHeader>
        <ModalBody>
          <div className="mb-4 d-flex align-items-center">
            <strong className="me-2">Status Validasi:</strong>
            {defaultValue?.isValid === true && (
              <Badge color="success">Valid</Badge>
            )}
            {defaultValue?.isValid === false && (
              <Badge color="danger">Invalid</Badge>
            )}
            {defaultValue?.isValid === null && (
              <Badge color="secondary">Belum</Badge>
            )}
          </div>

          {defaultValue?.fileNpwp ? (
            <div className="d-flex align-items-center justify-content-center my-3">
              <img
                src={defaultValue?.fileNpwp}
                alt="foto npwp"
                onError={() => {}}
                style={{ objectFit: "contain", maxWidth: "100%" }}
              />
            </div>
          ) : (
            <Alert className="text-center p-3" color="secondary">
              Tidak Ada Foto
            </Alert>
          )}
        </ModalBody>
        <ModalFooter style={{ margin: "0 auto", flexDirection: "column" }}>
          <div className="w-100" style={{ maxWidth: 400 }}>
            <Button
              onClick={() => handleSubmit(true)}
              color="primary"
              disabled={isLoading}
              className="mb-3 w-100"
            >
              <Check size={20} />
              Verifikasi Valid
            </Button>
            <Button
              onClick={() => handleSubmit(false)}
              color="danger"
              disabled={isLoading}
              className="w-100"
            >
              <X size={20} />
              Verifikasi Invalid
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalValidationNpwp;
