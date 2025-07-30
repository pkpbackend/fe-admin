import { Fragment, useCallback, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {
  useDeletePanduanMutation,
  usePanduanQuery,
} from "../../../../api/domains/panduan";
import Filters from "./component/Filters";
import FormTambah from "./component/FormTambah";
// ** Icons Imports
import BreadCrumbs from "@components/breadcrumbs/custom";
import Table from "@customcomponents/Table";
import sweetalert from "@utils/sweetalert";
import { Edit, Plus, Trash2 } from "react-feather";

const Peraturan = () => {
  const [toggle, setToggle] = useState({
    open: false,
    modalData: null,
  });
  const [tableAttr, setTableAttr] = useState({
    page: 1,
    pageSize: 5,
    sorted: [],
    filtered: [],
  });
  const { data, isFetching, isLoading } = usePanduanQuery(tableAttr);
  const [deletePanduan] = useDeletePanduanMutation();

  const columns = useMemo(
    () => [
      {
        Header: "Judul",
        accessor: "title",
        disableSortBy: true,
      },
      {
        Header: "Sort Index",
        accessor: "order",
        sortType: "basic",
      },
      {
        Header: "Aksi",
        disableSortBy: true,
        width: 20,
        Cell: (props) => {
          let { row } = props;
          return (
            <div className="d-flex justify-content-center">
              <Button
                className="btn-icon me-2"
                color="primary"
                size="sm"
                title="Edit"
                onClick={(e) =>
                  setToggle({
                    open: true,
                    modalData: row.original,
                  })
                }
              >
                <Edit size={15} />
              </Button>
              <Button
                className="btn-icon"
                color="danger"
                size="sm"
                title="Hapus"
                outline
                onClick={(e) => deleteData(row.original.id)}
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
        title: "Hapus Panduan?",
        text: "Apakah anda yakin menghapus panduan ini?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Tidak",
        cancelButtonTextStyle: {
          marginLeft: 20,
        },
      })
      .then((result) => {
        if (result.value) {
          deletePanduan({
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
              await sweetalert.fire({
                title: "Gagal hapus panduan",
                text: err,
                type: "error",
              });
            });
        }
      });
  };

  const handleTableAttrChange = useCallback((params = {}) => {
    const { filtered = [], sorted = [], page, pageSize } = params;

    setTableAttr((val) => ({
      ...val,
      page: page || val.page,
      pageSize: pageSize || val.pageSize,
      filtered,
      sorted,
    }));
  }, []);

  return (
    <Fragment>
      <BreadCrumbs title="Panduan" data={[{ title: "Panduan" }]} />
      <Row className="gy-3">
        <Col sm="12">
          <Filters
            handleTableAttrChange={handleTableAttrChange}
            loading={isFetching || isLoading}
          />
        </Col>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Panduan</CardTitle>
              <Button
                color="primary"
                onClick={() =>
                  setToggle({
                    open: true,
                    modalData: null,
                  })
                }
              >
                <Plus size={14} />
                Tambah Panduan
              </Button>
            </CardHeader>
            <CardBody>
              <Table
                columns={columns}
                data={data?.data}
                isFetching={isFetching || isLoading}
                onPaginationChange={(props) =>
                  handleTableAttrChange({ ...tableAttr, ...props })
                }
                onSortChange={handleTableAttrChange}
                page={tableAttr.page}
                totalPages={data?.pages}
                sortable
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <FormTambah
        data={toggle.modalData}
        isOpen={toggle.open}
        onClose={() => setToggle({ open: false, data: null })}
      />
    </Fragment>
  );
};

export default Peraturan;
