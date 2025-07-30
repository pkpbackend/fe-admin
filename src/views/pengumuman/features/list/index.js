import { Fragment, useCallback, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {
  useDeletePengumumanMutation,
  usePengumumanQuery,
} from "@api/domains/pengumuman";
import Filter from "./component/Filter";
import FormTambah from "./component/FormTambah";

// ** Icons Imports
import sweetalert from "@utils/sweetalert";
import { Edit, PlusSquare, Trash2 } from "react-feather";
import Table from "@customcomponents/Table";

const Pengumuman = () => {
  const [toggle, setToggle] = useState({
    open: false,
    modalData: null,
  });
  const [deletePengumuman] = useDeletePengumumanMutation();

  const columns = useMemo(() => {
    const deleteData = (id) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          text: "Apakah anda yakin menghapus pengumuman ini?",
          icon: "warning",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Tidak",
          preConfirm: async () => {
            try {
              await deletePengumuman(id).unwrap();
              return true;
            } catch (error) {
              sweetalert.showValidationMessage(`Request failed: ${error}`);
            }
          },
          allowOutsideClick: () => !sweetalert.isLoading(),
        })
        .then((result) => {
          if (result.isConfirmed) {
            sweetalert.fire(
              "Berhasil",
              "Berhasil menghapus pengumuman",
              "success"
            );
          }
        });
    };
    return [
      {
        Header: "Judul",
        accessor: "title",
        sortType: "basic",
      },
      {
        Header: "Tipe",
        accessor: "type",
        sortType: "basic",
        Cell: (props) => {
          let { row } = props;
          if (row.original.type === 1) {
            return <Badge color="success">Usulan</Badge>;
          } else if (row.original.type === 2) {
            return <Badge color="primary">Sistem</Badge>;
          } else {
            return <Badge color="secondary">Lainnya</Badge>;
          }
        },
      },
      {
        Header: "Urgensi",
        accessor: "urgent",
        sortType: "basic",
      },
      {
        Header: "Pembuat",
        accessor: "User.nama",
        sortType: "basic",
      },
      {
        Header: "Aksi",
        disableSortBy: true,
        Cell: (props) => {
          let { row } = props;
          return (
            <div className="d-flex gap-1">
              <Button
                color="primary"
                className="btn-icon"
                size="sm"
                onClick={(e) =>
                  setToggle({
                    open: true,
                    modalData: row.original,
                  })
                }
              >
                <Edit size={15} />
              </Button>
              &nbsp;
              <Button
                className="btn-icon"
                color="danger"
                size="sm"
                onClick={(e) => deleteData(row.original.id)}
              >
                <Trash2 size={15} />
              </Button>
              &nbsp;
            </div>
          );
        },
      },
    ];
  }, [deletePengumuman]);

  const [tableAttr, setTableAttr] = useState({
    // filtered: [],
    page: 1,
    pageSize: 10,
  });

  const { data, isFetching, isLoading } = usePengumumanQuery({
    ...tableAttr,
    filtered: tableAttr.filtered
      ? JSON.stringify(tableAttr.filtered)
      : undefined,
    sorted: tableAttr.sorted ? JSON.stringify(tableAttr.sorted) : undefined,
  });

  const handleTableAttrChange = useCallback((params = {}) => {
    const { filtered = null, sorted = null, page, pageSize } = params;
    setTableAttr((val) => ({
      ...val,
      page: page || val.page,
      pageSize: pageSize || val.pageSize,
      filtered: filtered || val.filtered,
      sorted: sorted || val.sorted,
    }));
  }, []);

  return (
    <Fragment>
      <Row className="gy-3">
        <Col sm="12">
          <Filter
            handleTableAttrChange={handleTableAttrChange}
            loading={isFetching || isLoading}
          />
        </Col>

        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Pengumuman</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setToggle({
                    open: true,
                    modalData: null,
                  });
                }}
              >
                <PlusSquare size={16} /> Tambah Pengumuman
              </Button>
            </CardHeader>
            <CardBody className="p-0">
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

export default Pengumuman;
