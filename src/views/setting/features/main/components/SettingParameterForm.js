import "@styles/react/libs/flatpickr/flatpickr.scss";
import {
  useLazySynchronizeRususQuery,
  useUpdateSettingMutation,
} from "@views/setting/domains";
import Cleave from "cleave.js/react";
import { useEffect, useState } from "react";
import { RefreshCcw } from "react-feather";
import Flatpickr from "react-flatpickr";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Spinner,
  Table,
} from "reactstrap";
import SettingHargaRumah from "./SettingHargaRumah";

const ButtonSyncRusus = ({ setting }) => {
  const { label, value: initialValue } = setting;
  const [value, setValue] = useState(() => initialValue);

  const [trigger, { status }] = useLazySynchronizeRususQuery();
  async function handleSubmit() {
    trigger();
  }

  useEffect(() => {
    if (status === "success") {
      toast.success("Berhasil Sinkronisasi Usulan Rusus", {
        position: "top-center",
      });
      setValue(true);
    }
    if (status === "rejected") {
      setValue(initialValue);
      toast.error("Gagal Sinkronisasi Usulan Rusus", {
        position: "top-center",
      });
    }
  }, [initialValue, status]);

  return (
    <tr>
      <td colSpan={99}>
        <Button
          size="sm"
          color="primary"
          disabled={value || status === "pending"}
          onClick={handleSubmit}
          className="mt-2"
        >
          <RefreshCcw
            style={{
              animation:
                value || status === "pending"
                  ? "1.5s linear infinite spinner-border-ltr"
                  : "",
            }}
            size={14}
          />
          {label}
        </Button>
      </td>
    </tr>
  );
};

const InputComponent = ({ setting }) => {
  const { label, key, type, value: initialValue } = setting;
  const [value, setValue] = useState(() => initialValue);

  const [updateMutation, resultUpdate] = useUpdateSettingMutation();
  async function handleSubmit(key) {
    try {
      await updateMutation({
        key,
        value,
      }).unwrap();
      toast.success("Berhasil update settings", { position: "top-center" });
    } catch (error) {
      setValue(initialValue);
      toast.error("Gagal update settings", { position: "top-center" });
    }
  }

  let component = null;
  switch (type) {
    case "date":
      component = (
        <Flatpickr
          id={key}
          className="form-control"
          onChange={(date, currentDateString) => {
            setValue(currentDateString ?? null);
          }}
          value={value}
          options={{
            dateFormat: "Y-m-d",
          }}
          disabled={resultUpdate.isLoading}
        />
      );
      break;
    case "number":
      component = (
        <Cleave
          id={key}
          className="form-control"
          onChange={(e) => {
            setValue(e.target.rawValue);
          }}
          value={value}
          options={{
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
          }}
        />
      );
      break;
    case "string":
      component = (
        <Input
          id={key}
          className="form-control"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
      );
      break;
    case "json":
      component = <SettingHargaRumah data={value} fieldKey={key} />;
      break;
    default:
      break;
  }
  return (
    <tr>
      <td>
        <Label className="mb-0 text-primary fw-bold" for={key}>
          {label}
        </Label>
      </td>
      <td>:</td>
      <td>{component}</td>
      <td>
        {type !== "json" ? (
          <Button
            onClick={() => {
              handleSubmit(setting.key);
            }}
            color="primary"
            disabled={resultUpdate.isLoading}
          >
            {resultUpdate.isLoading ? <Spinner size="sm" /> : null}
            Save
          </Button>
        ) : null}
      </td>
    </tr>
  );
};
const SettingParameterForm = ({ data }) => {
  return data ? (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle className="mb-0 text-primary fw-bold">
          {data.group}
        </CardTitle>
      </CardHeader>
      <CardBody className="p-3">
        <Table responsive size="sm" borderless style={{ width: "auto" }}>
          <tbody>
            {data.settings.map((setting) => {
              return setting.key === "sync_rusus" ? (
                // <ButtonSyncRusus setting={setting} key={setting.key} />
                <></>
              ) : (
                <InputComponent setting={setting} key={setting.key} />
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  ) : null;
};

export default SettingParameterForm;
