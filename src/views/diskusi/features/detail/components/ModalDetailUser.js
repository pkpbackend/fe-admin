import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

const styleRowHead = {
  fontWeight: 600,
};
const ModalDetailUser = ({ open, onClose, data }) => {
  return (
    <Modal isOpen={open} toggle={onClose} centered>
      <ModalHeader toggle={onClose}>Detail User</ModalHeader>
      <ModalBody>
        <Table size="sm" responsive>
          <tbody>
            <tr>
              <td style={styleRowHead}>Nama</td>
              <td>{data.name || "-"}</td>
            </tr>
            <tr>
              <td style={styleRowHead}>Email</td>
              <td>{data.email || "-"}</td>
            </tr>
            <tr>
              <td style={styleRowHead}>Jenis Kelamin</td>
              <td>{data.gender === "L" ? "Laki-laki" : "Perempuan"}</td>
            </tr>
            <tr>
              <td style={styleRowHead}>Instansi</td>
              <td>{data.instansi || "-"}</td>
            </tr>
            <tr>
              <td style={styleRowHead}>Pekerjaan</td>
              <td>{data.pekerjaan || "-"}</td>
            </tr>
            <tr>
              <td style={styleRowHead}>Provinsi</td>
              <td>{data.Provinsi?.nama || "-"}</td>
            </tr>
            <tr>
              <td style={styleRowHead}>Pendidikan Terakhir</td>
              <td>{data.pendidikanTerakhir || "-"}</td>
            </tr>
            <tr>
              <td style={styleRowHead}>Nomor Teleponn</td>
              <td>{data.phone || "-"}</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} outline>
          Tutup
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDetailUser;
