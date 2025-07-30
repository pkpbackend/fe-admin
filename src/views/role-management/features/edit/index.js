// ** React Imports
import { useNavigate, useParams } from "react-router";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";
import ComponentSpinner from "../../../../@core/components/spinner/Loading-spinner";

// ** Third Party Components
import toast from "react-hot-toast";
import { Card, CardBody } from "reactstrap";

import sweetalert from "@utils/sweetalert";
import { useRoleQuery, useUpdateRoleMutation } from "../../domains";
import FormRole from "../shared/FormRole";

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [updateMutation] = useUpdateRoleMutation();

  const { data, isLoading, isFetching, error } = useRoleQuery(params?.id, {
    skip: !params?.id,
  });

  if (error?.status === 404) {
    sweetalert
      .fire({
        title: "404 Not Found",
        text: "Data role tidak ditemukan",
        icon: "error",
        confirmButtonText: "Kembali",
        allowOutsideClick: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/role-management/list");
        }
      });
  }
  async function onSubmit(values) {
    try {
      const payload = {
        ...values,
        admin: values.admin === "1" ? true : false,
        privilege: {},
        id: data.id,
      };
      await updateMutation(payload).unwrap();
      toast.success("Berhasil edit data role", { position: "top-center" });
      navigate(`/role-management/list/detail/${data.id}`);
    } catch (error) {
      toast.error("Gagal edit data role");
    }
  }
  return (
    <div>
      <Breadcrumbs
        title="Edit Role"
        data={[
          { title: "Daftar Role", link: "/role-management/list" },
          { title: "Edit Role" },
        ]}
      />
      <>
        {isLoading || isFetching ? (
          <Card>
            <CardBody>
              <div className="p-4">
                <ComponentSpinner />
              </div>
            </CardBody>
          </Card>
        ) : (
          <>
            <FormRole
              onSubmit={onSubmit}
              defaultValues={{
                id: data.id,
                nama: data.nama,
                ScopeRegionRoleId: data.ScopeRegionRoleId,
                direktif: data.direktif !== null ? `${data.direktif}` : "",
                DirektoratId: data.DirektoratId,
                admin: data.admin ? "1" : "0",
                dashboard: data.dashboard,
                defaultLogin: data.defaultLogin,
                accessMenu: data.accessMenu,
              }}
            />
          </>
        )}
      </>
    </div>
  );
};

export default Edit;
