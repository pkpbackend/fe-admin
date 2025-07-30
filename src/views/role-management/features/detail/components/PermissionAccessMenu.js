// ** Third Party Components
import ComponentSpinner from "@components/spinner/Loading-spinner";
import { useAccessMenuQuery } from "@globalapi/access-menu";
import { Check, X } from "react-feather";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardTitle,
  Table,
  UncontrolledAccordion,
} from "reactstrap";

const PermissionAccessMenu = ({ accessMenuList = [] }) => {
  const { data, isLoading } = useAccessMenuQuery();
  return (
    <UncontrolledAccordion defaultOpen="role-access-menu">
      <AccordionItem className="shadow">
        <AccordionHeader targetId="role-access-menu">
          Hak Akses Menu
        </AccordionHeader>
        <AccordionBody accordionId="role-access-menu">
          {isLoading ? (
            <div className="p-4">
              <ComponentSpinner />
            </div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {data?.map((item) => {
                return (
                  <li key={item.type}>
                    <Card style={{ boxShadow: "none" }} className="border" body>
                      <CardTitle className="mb-3">{item.type}</CardTitle>
                      <Table size="sm" responsive hover>
                        <thead>
                          <tr>
                            <th>
                              <div className="d-flex align-items-center mb-1">
                                <span className="ms-2">Menu</span>
                              </div>
                            </th>
                            <th>
                              <div className="d-flex align-items-center mb-1">
                                <span className="ms-2">Hak Akses</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.data.map((item) => (
                            <tr>
                              <td>
                                <strong>{item.name}</strong>
                              </td>
                              <td>
                                {accessMenuList?.includes(item.code) ? (
                                  <Check
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-success"
                                  />
                                ) : (
                                  <X
                                    size={20}
                                    strokeWidth={2.5}
                                    className="text-danger"
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card>
                  </li>
                );
              })}
            </ul>
          )}
        </AccordionBody>
      </AccordionItem>
    </UncontrolledAccordion>
  );
};

export default PermissionAccessMenu;
