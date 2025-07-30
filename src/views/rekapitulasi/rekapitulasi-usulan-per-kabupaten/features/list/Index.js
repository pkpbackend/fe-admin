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

import { DIREKTORAT, SCOPE_REGION_ROLE } from "@constants/index";
import { getUser } from "@utils/LoginHelpers";
import { useRekapitulasiPerKabupatenQuery } from "../domains";

import "jspdf-autotable";

import ComponentSpinner from "@components/spinner/Loading-spinner";
import classNames from "classnames";
import ButtonExport from "./component/ButtonExport";
import TableRuk from "./component/TableRuk";
import TableRusun from "./component/TableRusun";
import TableRusus from "./component/TableRusus";
import TableRuswa from "./component/TableRuswa";

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

export default function RekapitulasiPerKabupaten() {
  let query = useQuery();
  const { Role, region: userRegion } = getUser().user;
  const active = query.get("active");

  const items =
    Number(Role.DirektoratId) === DIREKTORAT.SELURUH_DIREKTORAT
      ? tabItems
      : tabItems.filter((item) => item.id === Number(Role.DirektoratId));

  const activeTab = active ?? `${items[0].id}`;

  const defaultTableAttribute = ({ ScopeRegionRoleId, userRegion }) => {
    const year = new Date().getFullYear();
    let regions = undefined;
    if (ScopeRegionRoleId !== SCOPE_REGION_ROLE.SELURUH_INDONESIA) {
      if (
        ScopeRegionRoleId !== SCOPE_REGION_ROLE.PER_PROVINSI ||
        ScopeRegionRoleId !== SCOPE_REGION_ROLE.PER_PROVINSI_TERPILIH
      ) {
        regions = userRegion;
      }
    }
    return {
      filtered: [],
      fromYear: year,
      toYear: year,
      isProposal: false,
      region: regions,
    };
  };

  const [tableAttr, setTableAttr] = useState(() =>
    defaultTableAttribute({
      ScopeRegionRoleId: Role.ScopeRegionRoleId,
      userRegion,
    })
  );

  const queryParams = {
    ...tableAttr,
    isProposal: false,
    filtered: [
      ...(tableAttr.filtered || []),
      { id: "direktoratId", value: activeTab },
      { id: "statusTerkirim", value: "terkirim" },
    ],
  };
  const { data, isFetching, isLoading } =
    useRekapitulasiPerKabupatenQuery(queryParams);

  const handleTableAttrChange = useCallback(
    (params) => {
      if (params) {
        const { filtered = null, ...rest } = params;
        setTableAttr((val) => ({
          ...val,
          filtered: filtered,
          ...rest,
        }));
      } else {
        setTableAttr(
          defaultTableAttribute({
            ScopeRegionRoleId: Role.ScopeRegionRoleId,
            userRegion,
          })
        );
      }
    },
    [Role.ScopeRegionRoleId, userRegion]
  );

  return (
    <div>
      <BreadCrumbs
        title="Rekapitulasi Usulan"
        data={[{ title: "Rekapitulasi Usulan per Kabupaten" }]}
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
                  {Number(activeTab) === DIREKTORAT.RUK ? (
                    <TableRuk
                      data={data?.data}
                      loading={isLoading || isFetching}
                      queryParams={queryParams}
                    />
                  ) : (
                    <Card className="border border-secondary-subtle">
                      <CardHeader>
                        <CardTitle>
                          Rekapitulasi {item.name} Usulan per Kabupaten
                        </CardTitle>
                        <Row className="gx-3">
                          <Col xs="auto">
                            <ButtonExport
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
                            </ButtonExport>
                          </Col>
                          <Col xs="auto">
                            <ButtonExport
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
                            </ButtonExport>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        {isLoading || isFetching ? (
                          <div className="p-3">
                            <ComponentSpinner />
                          </div>
                        ) : (
                          <>
                            {Number(activeTab) === DIREKTORAT.RUSUN && (
                              <TableRusun data={data?.data} />
                            )}
                            {Number(activeTab) === DIREKTORAT.RUSUS && (
                              <TableRusus data={data?.data} />
                            )}
                            {Number(activeTab) === DIREKTORAT.SWADAYA && (
                              <TableRuswa data={data?.data} />
                            )}
                          </>
                        )}
                      </CardBody>
                    </Card>
                  )}
                </Col>
              </Row>
            </TabPane>
          ))}
        </TabContent>
      </div>
    </div>
  );
}
