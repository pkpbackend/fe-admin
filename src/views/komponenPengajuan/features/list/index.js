import {
  useDeleteKomponenPengajuanMutation,
  useKomponenPengajuanQuery,
} from "@api/domains/komponen-pengajuan";
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
import Filter from "./component/Filter";
import FormTambah from "./component/FormTambah";

// ** Icons Imports
import sweetalert from "@utils/sweetalert";
import { Edit, PlusSquare, Trash2 } from "react-feather";
import Table from "@customcomponents/Table";

const KomponenPengajuan = () => {
  const [toggle, setToggle] = useState({
    open: false,
    modalData: null,
  });

  const [tableAttr, setTableAttr] = useState({
    page: 1,
    pageSize: 10,
  });

  const { data, isFetching, isLoading } = useKomponenPengajuanQuery({
    ...tableAttr,
    filtered: tableAttr.filtered
      ? JSON.stringify(tableAttr.filtered)
      : undefined,
  });

  const [deleteMutation] = useDeleteKomponenPengajuanMutation();

  const columns = useMemo(() => {
    const deleteData = (id) => {
      sweetalert
        .fire({
          title: "Konfirmasi Hapus",
          text: "Apakah anda yakin menghapus komponen pengajuan ini?",
          icon: "warning",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Tidak",
          preConfirm: async () => {
            try {
              await deleteMutation(id).unwrap();
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
              "Berhasil menghapus komponen pengajuan",
              "success"
            );
          }
        });
    };
    return [
      {
        Header: "No",
        id: "no",
        width: "5%",
        align: "center",
        Cell: ({ row }) => {
          return row.index + 1 + (tableAttr.page - 1) * tableAttr.pageSize;
        },
      },
      {
        Header: "Nama",
        accessor: "name",
      },
      {
        Header: "Aksi",
        width: "10%",
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
  }, [deleteMutation, tableAttr.page, tableAttr.pageSize]);

  const handleTableAttrChange = useCallback((params = {}) => {
    const { filtered = null, page, pageSize } = params;
    setTableAttr((val) => ({
      ...val,
      page: page || val.page,
      pageSize: pageSize || val.pageSize,
      filtered: filtered || val.filtered,
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
              <CardTitle>Daftar Komponen Pengajuan</CardTitle>
              <Button
                color="primary"
                onClick={() => {
                  setToggle({
                    open: true,
                    modalData: null,
                  });
                }}
              >
                <PlusSquare size={16} /> Pengajuan
              </Button>
            </CardHeader>
            <CardBody className="p-0">
              <Table
                columns={columns}
                data={data?.data}
                isFetching={isFetching || isLoading}
                onPaginationChange={(props) => {
                  handleTableAttrChange({ ...tableAttr, ...props });
                }}
                page={tableAttr.page}
                totalPages={data?.total / tableAttr.pageSize || 0}
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

export default KomponenPengajuan;
