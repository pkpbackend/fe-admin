import { Fragment, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import Filters from "./component/Filters";
// ** Icons Imports
import Table from "@customcomponents/Table";
import sweetalert from "@utils/sweetalert";
import _ from "lodash";
import { Edit, Plus, Trash2 } from "react-feather";
import { useDeleteFaqMutation, useFaqQuery } from "../../../../api/domains/faq";
import FormTambah from "./component/FormTambah";

const Faq = () => {
  const [toggle, setToggle] = useState({
    isOpen: false,
    modalData: {},
    modalTambah: false,
  });
  const [formFilter, setFormFilter] = useState(null);

  const { data, isLoading, isFetching } = useFaqQuery(formFilter);
  const [deleteFaq] = useDeleteFaqMutation();

  const columns = useMemo(
    () => [
      {
        Header: "Pertanyaan",
        accessor: "question",
      },
      {
        Header: "Jawaban",
        accessor: "answer",
        Cell: (props) => {
          let {
            row: { original },
          } = props;

          const answer = original.answer.replace(/(<([^>]+)>)/gi, "");
          return _.truncate(answer, {
            length: 50,
            omission: "...",
          });
        },
      },
      {
        Header: "Aksi",
        disableSortBy: true,
        Cell: (props) => {
          let { row } = props;
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                size="sm"
                color="primary"
                outline
                title="Edit"
                onClick={() =>
                  setToggle({
                    ...toggle,
                    isOpen: true,
                    modalData: row.original,
                  })
                }
              >
                <Edit size={15} />
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => deleteData(row.original.id)}
                title="Hapus"
              >
                <Trash2 size={15} />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const deleteData = (id) => {
    sweetalert
      .fire({
        title: "Hapus FAQ?",
        text: "Apakah anda yakin menghapus FAQ ini?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          deleteFaq({
            id,
          })
            .unwrap()
            .then(async (res) => {
              await sweetalert.fire({
                title: "Sukses",
                text: "Data berhasil dihapus",
                type: "success",
              });
            })
            .catch(async (err) => {
              console.error(err);
              await sweetalert.fire({
                title: "Gagal hapus Faq",
                text: err,
                type: "error",
              });
            });
        }
      });
  };

  return (
    <Fragment>
      <Filters
        onReset={() => {
          setFormFilter(null);
        }}
        onSubmit={(value) => {
          setFormFilter({
            filtered: JSON.stringify([{ id: "question", value }]),
          });
        }}
        loading={isFetching || isLoading}
      />
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Daftar FAQ</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setToggle({
                    ...toggle,
                    isOpen: true,
                    modalData: {
                      id: null,
                    },
                    modalTambah: true,
                  });
                }}
              >
                <Plus size={16} /> Tambah FAQ
              </Button>
            </CardHeader>
            <CardBody>
              <Table
                columns={columns}
                data={data?.data}
                isFetching={isFetching || isLoading}
                totalPages={data?.pageCount}
                pagination={false}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={toggle.isOpen}
        toggle={() => {
          setToggle({
            ...toggle,
            isOpen: !toggle.isOpen,
          });
        }}
        size={"lg"}
      >
        <ModalHeader
          toggle={() => {
            setToggle({
              ...toggle,
              isOpen: !toggle.isOpen,
            });
          }}
          className="bg-darkblue"
        >
          {toggle.modalData.id == null ? "Tambah" : "Ubah"} Faq
        </ModalHeader>
        <ModalBody>
          <FormTambah setToggle={setToggle} toggle={toggle} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Faq;
