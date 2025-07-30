import BreadCrumbs from "@components/breadcrumbs/custom";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Filter from "./component/Filter";

import { DIREKTORAT } from "@constants/index";
import { getUser } from "@utils/LoginHelpers";
import { useRekapitulasiPerProvinsiQuery } from "../domains";

import "jspdf-autotable";

import { localizeNumber } from "@utils/Strings";
import classNames from "classnames";
import ButtonExportExcel from "./component/ButtonExport";
import DataTable from "./component/Datatable";

const tabItems = [
  {
    id: DIREKTORAT.RUSUN,
    name: "Rusun",
  },
  {
    id: DIREKTORAT.RUSUS,
    name: "Rusus",
  },
  {
    id: DIREKTORAT.SWADAYA,
    name: "Swadaya",
  },
  {
    id: DIREKTORAT.RUK,
    name: "RUK",
  },
];

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function RekapitulasiPerProvinsi() {
  let query = useQuery();
  const { Role } = getUser().user;
  const active = query.get("active");

  const items =
    Number(Role.DirektoratId) === DIREKTORAT.SELURUH_DIREKTORAT
      ? tabItems
      : tabItems.filter((item) => item.id === Number(Role.DirektoratId));

  const activeTab = active ?? `${items[0].id}`;

  const defaultTableAttribute = () => {
    const year = new Date().getFullYear();
    return {
      filtered: [],
      fromYear: year,
      toYear: year,
    };
  };

  const [tableAttr, setTableAttr] = useState(defaultTableAttribute);

  const queryParams = {
    ...tableAttr,
    filtered: [
      ...(tableAttr.filtered || []),
      { id: "DirektoratId", value: activeTab },
    ],
  };
  const { data, isFetching, isLoading } =
    useRekapitulasiPerProvinsiQuery(queryParams);

  const handleTableAttrChange = useCallback((params) => {
    if (params) {
      const { filtered = null, ...rest } = params;
      setTableAttr((val) => ({
        ...val,
        filtered: filtered,
        ...rest,
      }));
    } else {
      setTableAttr(defaultTableAttribute);
    }
  }, []);

  const columns = [
    {
      Header: "No",
      accessor: "no",
      width: 50,
      Cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      Header: "Provinsi",
      accessor: "namaProvinsi",
      width: 190,
      Footer: "",
    },
    {
      Header: "Kabupaten",
      accessor: "namaKabupaten",
      width: 180,
      Footer: <b>Total</b>,
    },
    {
      Header: "Usulan (Terkirim)",
      accessor: "Usulan (Terkirim)",
      Footer: "Usulan (Terkirim)",
      align: "center",
      columns: [
        {
          Header: "Lokasi",
          accessor: "usulanTotalTerkirim",
          Cell: ({ value }) => localizeNumber(value ?? ""),
          Footer: localizeNumber(
            data?.data?.totalData?.usulanTotalTerkirim ?? ""
          ),
        },
        {
          Header: "Unit",
          accessor: "unitTotalTerkirim",
          Cell: ({ value }) => localizeNumber(value ?? ""),
          Footer: localizeNumber(
            data?.data?.totalData?.unitTotalTerkirim ?? ""
          ),
        },
      ],
    },
    {
      Header: "Usulan (Belum Terkirim)",
      accessor: "Usulan (Belum Terkirim)",
      Footer: "Usulan (Belum Terkirim)",
      align: "center",
      columns: [
        {
          Header: "Lokasi",
          accessor: "usulanTotalBelum",
          Cell: ({ value }) => localizeNumber(value ?? ""),
          Footer: localizeNumber(data?.data?.totalData?.usulanTotalBelum ?? ""),
        },
        {
          Header: "Unit",
          accessor: "unitTotalBelum",
          Cell: ({ value }) => localizeNumber(value ?? ""),
          Footer: localizeNumber(data?.data?.totalData?.unitTotalBelum ?? ""),
        },
      ],
    },
    {
      Header: "Usulan (Total)",
      accessor: "Usulan (Total)",
      Footer: "Usulan (Total)",
      align: "center",
      columns: [
        {
          Header: "Lokasi",
          accessor: "usulanTotal",
          Cell: ({ value }) => localizeNumber(value ?? ""),
          Footer: localizeNumber(data?.data?.totalData?.usulanTotal ?? ""),
        },
        {
          Header: "Unit",
          accessor: "unitTotal",
          Cell: ({ value }) => localizeNumber(value ?? ""),
          Footer: localizeNumber(data?.data?.totalData?.unitTotal ?? ""),
        },
      ],
    },
  ];

  return (
    <div>
      <BreadCrumbs
        title="Rekapitulasi Usulan"
        data={[{ title: "Rekapitulasi Usulan per Provinsi" }]}
      />
      <div className="mt-3">
        <Nav pills tabs>
          {items.map((item) => (
            <NavItem key={item.id}>
              <Link
                className={classNames("nav-link fs-4", {
                  active: activeTab === `${item.id}`,
                })}
                to={`?active=${item.id}`}
              >
                {item.name}
              </Link>
            </NavItem>
          ))}
        </Nav>
        <TabContent className="p-4 card" activeTab={activeTab}>
          {items.map((item) => (
            <TabPane key={item.id} tabId={`${item.id}`}>
              <Row className="gy-3">
                <Col sm="12">
                  <Filter
                    activeTab={activeTab}
                    handleTableAttrChange={handleTableAttrChange}
                    loading={isLoading || isFetching}
                  />
                </Col>
                <Col sm="12">
                  <Card className="border border-secondary-subtle">
                    <CardHeader>
                      <CardTitle>
                        Rekapitulasi {item.name} Usulan per Provinsi
                      </CardTitle>
                      <Row className="gx-3">
                        <Col xs="auto">
                          <ButtonExportExcel
                            fileType="pdf"
                            queryParams={queryParams}
                            disabled={
                              !data ||
                              data?.data?.length === 0 ||
                              isLoading ||
                              isFetching
                            }
                          >
                            Download PDF
                          </ButtonExportExcel>
                        </Col>
                        <Col xs="auto">
                          <ButtonExportExcel
                            fileType="excel"
                            queryParams={queryParams}
                            disabled={
                              !data ||
                              data?.data?.length === 0 ||
                              isLoading ||
                              isFetching
                            }
                          >
                            Export Excel
                          </ButtonExportExcel>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody className="p-0">
                      <DataTable
                        columns={columns}
                        data={data?.data?.result || []}
                        isFetching={isFetching || isLoading}
                        tableAttr={tableAttr}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          ))}
        </TabContent>
      </div>
    </div>
  );
}
