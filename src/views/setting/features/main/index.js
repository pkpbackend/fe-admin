import { Fragment } from "react";

import Breadcrumbs from "@components/breadcrumbs/custom";
import { useSettingGroupQuery } from "@views/setting/domains";
import SettingParameterForm from "./components/SettingParameterForm";

const Setting = () => {
  const { data } = useSettingGroupQuery();
  return (
    <Fragment>
      <Breadcrumbs title="Setting" data={[{ title: "Setting" }]} />

      <div className="mt-3">
        <SettingParameterForm
          data={data?.find((item) => item.group === "API URL")}
        />

        <SettingParameterForm
          data={data?.find((item) => item.group === "Setting Parameter RUK")}
        />
        <SettingParameterForm
          data={data?.find(
            (item) => item.group === "Setting Parameter Swadaya"
          )}
        />
        <SettingParameterForm
          data={data?.find((item) => item.group === "Setting Parameter Rusun")}
        />
        <SettingParameterForm
          data={data?.find((item) => item.group === "Setting Parameter Rusus")}
        />
      </div>
    </Fragment>
  );
};

export default Setting;
