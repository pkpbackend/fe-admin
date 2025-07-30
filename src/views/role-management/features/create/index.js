// ** React Imports
import { useNavigate } from "react-router";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs/custom";

// ** Third Party Components
import toast from "react-hot-toast";

import { useCreateRoleMutation } from "../../domains";
import FormRole from "../shared/FormRole";

const Create = () => {
  const navigate = useNavigate();
  const [createRoleMutation] = useCreateRoleMutation();

  async function onSubmit(values) {
    try {
      const payload = {
        ...values,
        admin: values.admin === "1" ? true : false,
        privilege: {},
      };
      await createRoleMutation(payload).unwrap();
      toast.success("Berhasil membuat role");
      navigate("/role-management/list");
    } catch (error) {
      toast.error("Gagal membuat role");
    }
  }

  return (
    <div>
      <Breadcrumbs
        title="Tambah Role"
        data={[
          { title: "Daftar Role", link: "/role-management/list" },
          { title: "Tambah Role" },
        ]}
      />
      <FormRole onSubmit={onSubmit} />
    </div>
  );
};

export default Create;
