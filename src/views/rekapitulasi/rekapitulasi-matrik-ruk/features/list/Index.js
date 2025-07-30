import Breadcrumbs from "@components/breadcrumbs/custom";
import { DIREKTORAT } from "@constants/index";
import { useMasterCategoryDocumentQuery } from "@globalapi/master-document";
import findIndex from "lodash/findIndex";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, X } from "react-feather";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import {
  useLazyDetailRekapMatrixRukQuery,
  useUsulanRukQuery,
} from "../../domains";
import ButtonExportExcel from "./component/ButtonExportExcel";
import DataTable from "./component/Datatable";
import Filter from "./component/Filter";

const ValidDokumen = function (props) {
  let loadingCell;
  let masterDokumen;
  let dokumenMatrix;

  if (typeof props === "object" && Object.keys(props).length > 0) {
    ({ loadingCell, masterDokumen, dokumenMatrix } = props);
  }
  if (loadingCell) {
    return <Spinner size="sm" />;
  } else if (Array.isArray(dokumenMatrix)) {
    let getIndex = findIndex(
      dokumenMatrix,
      (item) => String(item.nama) === String(masterDokumen)
    );

    if (getIndex !== -1) {
      const { valid, lengkap } = dokumenMatrix[getIndex];
      switch (lengkap) {
        case 1:
          return <Check size={20} strokeWidth={2.5} className="text-success" />;
        case 0:
          return <X size={20} strokeWidth={2.5} className="text-danger" />;
        default:
          return "-";
      }
    }
    return "-";
  }

  return "";
};

export default function RekapitulasiMatrixRuk() {
  const [loadingMatrix, setLoadingMatrix] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [tableAttr, setTableAttr] = useState({
    sorted: [{ id: "createdAt", desc: true }],
    filtered: null,
    page: 1,
    pageSize: 10,
  });

  let { data, isFetching, isLoading, isSuccess } = useUsulanRukQuery(tableAttr);
  const [trigger] = useLazyDetailRekapMatrixRukQuery();

  const { data: dataMasterDocument } = useMasterCategoryDocumentQuery({
    DirektoratId: DIREKTORAT.RUK,
  });

  const synchronizeUsulan = async (data, isExport, fnExport) => {
    setLoadingMatrix(true);
    let result = data;

    if (Array.isArray(data) && data.length > 0) {
      result = await Promise.all(
        data.map(async (item) => {
          const { id: UsulanId } = item;
          let documentData = [];
          try {
            const { data } = await trigger({
              UsulanId,
            }).unwrap();
            documentData = data;
          } catch (error) {}

          let keterangan = "";
          for (const data of documentData) {
            if (data.keterangan != null && data.keterangan !== "") {
              keterangan = keterangan + data.keterangan + "; ";
            }
          }
          return {
            ...item,
            allKeterangan: keterangan,
            dokumenMatrix: documentData,
            loadingMatrix: false,
          };
        })
      );

      if (isExport === true) {
        // setDataExport(result);
        fnExport();
        // init();
      } else {
        setTableData(result);
      }
    }
    setLoadingMatrix(false);
    return result;
  };

  useEffect(() => {
    if (isSuccess && data?.data?.length > 0) {
      setTableData(
        data?.data.map((item) => ({
          ...item,
          loadingMatrix: true,
        }))
      );
      synchronizeUsulan(data?.data);
    }
  }, [data?.data, isSuccess]);

  const columns = useMemo(() => {
    let dataDocuments = [];

    if (dataMasterDocument?.data) {
      for (const master of dataMasterDocument?.data) {
        dataDocuments = [...dataDocuments, ...master.MasterDokumens];
      }
    }

    let columnDocuments = [];
    if (Array.isArray(dataDocuments)) {
      const mappingDocument = dataDocuments
        .filter((x) => !!x.required)
        .sort((a, b) => a.sort - b.sort)
        .map((item) => ({
          id: item.id,
          Header: item.nama,
          accessor: item.nama.toLowerCase(),
          Cell: (propsCell) => {
            const {
              loadingMatrix: loadingCell,
              dokumenMatrix,
              type,
            } = propsCell.row.original || {};
            return ValidDokumen({
              loadingCell,
              dokumenMatrix,
              masterDokumen: item.nama,
              type,
              jenisBantuan: item.jenisBantuan,
            });
          },
        }));
      columnDocuments = [...mappingDocument];
    }
    return [
      {
        Header: "Tanggal Surat",
        id: "tglSurat",
        accessor: (row) => moment(row.tglSurat).format("MM/DD/YYYY"),
      },
      {
        Header: "Tanggal Usulan",
        id: "createdAt",
        accessor: (row) => moment(row.createdAt).format("MM/DD/YYYY"),
      },
      {
        Header: "Tahun Usulan",
        id: "tahunUsulan",
        accessor: (row) => moment(row.createdAt).format("YYYY"),
      },
      {
        Header: "Status Usulan",
        accessor: "statusTerkirim",
      },
      {
        Header: "Status Vermin",
        accessor: "statusVermin",
        width: 160,
        Cell: ({ value }) => {
          const statusCode = parseFloat(value);
          let label = "Belum";
          let color = "secondary";
          switch (statusCode) {
            case 1:
              label = "Lengkap";
              color = "success";
              break;
            case 0:
              label = "Tidak Lengkap";
              color = "danger";
              break;
            default:
              break;
          }
          return (
            <Badge pill color={color}>
              {label}
            </Badge>
          );
        },
      },
      {
        Header: "Status Verlok",
        accessor: "statusVertek",
        width: 160,
        Cell: ({ value }) => {
          const statusCode = parseFloat(value);
          let label = "Belum";
          let color = "secondary";
          switch (statusCode) {
            case 1:
              label = "Layak";
              color = "success";
              break;
            case 0:
              label = "Tidak Layak";
              color = "danger";
              break;
            default:
              break;
          }
          return (
            <Badge pill color={color}>
              {label}
            </Badge>
          );
        },
      },
      {
        Header: "Provinsi",
        accessor: "Provinsi.nama",
      },
      {
        Header: "Kabupaten/Kota",
        accessor: "City.nama",
      },
      {
        Header: "Nama Direktur",
        accessor: "Perusahaan.namaDirektur",
      },
      {
        Header: "Nama Perusahaan",
        accessor: "Perusahaan.name",
      },
      {
        Header: "Alamat Perusahaan",
        accessor: "Perusahaan.alamat",
      },
      {
        Header: "Nama Perumahan",
        accessor: "namaPerumahan",
      },
      {
        Header: "Alamat Perumahan",
        accessor: "alamatLokasi",
      },
      {
        Header: "Daya Tampung",
        accessor: "dayaTampung",
      },
      {
        Header: "Jumlah Usulan",
        accessor: "jumlahUsulan",
      },
      {
        Header: "Nomor Telepon Direktur",
        accessor: "Perusahaan.telpDirektur",
      },
      {
        Header: "Nomor Telepon Penanggung Jawab",
        accessor: "Perusahaan.telpPenanggungJawab",
      },
      {
        Header: "Tahun Anggaran",
        accessor: "tahunBantuanPsu",
      },
      {
        Header: "Nama Pengusul",
        accessor: "Pengembang.nama",
      },
      {
        Header: "Jenis Usulan",
        accessor: "jenisPerumahan",
        Cell: ({ value }) => {
          switch (value) {
            case 1:
              return "Non Skala Besar (Bantuan PS NSB)";
            case 2:
              return "Skala Besar (Bantuan PSU SB)";
            case 3:
              return "Komunitas di Perumahan Umum";
            case 4:
              return "Komunitas yang dibantu PBRS";
            default:
              return "";
          }
        },
      },
      {
        Header: "Keterangan Dokumen",
        accessor: "allKeterangan",
        width: 1000,
      },
      {
        Header: "Keterangan",
        accessor: "keterangan",
      },
      ...columnDocuments,
    ];
  }, [dataMasterDocument?.data]);

  const handleTableAttrChange = useCallback((params = {}) => {
    const { filtered = null, page, pageSize } = params;

    setTableAttr((val) => ({
      ...val,
      page: page || val.page,
      pageSize: pageSize || val.pageSize,
      filtered,
    }));
  }, []);

  return (
    <div>
      <Breadcrumbs
        title="Rekapitulasi Matrix RUK"
        data={[{ title: "Rekapitulasi Matrix RUK" }]}
      />
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
              <CardTitle>Matrix Usulan</CardTitle>
              <div className="d-flex align-items-center">
                {loadingMatrix && (
                  <div className="d-flex align-items-center me-5">
                    <Spinner size="sm" className="me-3" />
                    synchronize...
                  </div>
                )}
                <ButtonExportExcel queryParams={{}} />
              </div>
            </CardHeader>
            <DataTable
              columns={columns}
              data={{ ...data, data: tableData } || {}}
              isFetching={isFetching || isLoading}
              tableAttr={tableAttr}
              handleTableAttrChange={(props) => {
                handleTableAttrChange({ ...tableAttr, ...props });
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
