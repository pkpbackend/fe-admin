import { useLazySynchronizeRususQuery } from "@views/setting/domains";
import React, { useEffect } from "react";
import { RefreshCcw } from "react-feather";
import toast from "react-hot-toast";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

const SyncEmon = () => {
  const [trigger, { status }] = useLazySynchronizeRususQuery();
  async function handleSubmit() {
    trigger();
  }

  useEffect(() => {
    if (status === "success") {
      toast.success("Berhasil Sinkronisasi Table E-monitoring", {
        position: "top-center",
      });
    }
    if (status === "rejected") {
      toast.error("Gagal Sinkronisasi Table E-monitoring", {
        position: "top-center",
      });
    }
  }, [status]);

  return (
    <Card outline>
      <CardHeader className="border-bottom">
        <CardTitle className="mb-0 text-primary fw-bold">
          Synchronize API
        </CardTitle>
      </CardHeader>
      <CardBody className="p-3">
        <Button
          size="sm"
          color="primary"
          disabled={status === "pending"}
          onClick={handleSubmit}
        >
          <RefreshCcw
            style={{
              animation:
                status === "pending"
                  ? "1.5s linear infinite spinner-border-ltr"
                  : "",
            }}
            size={14}
          />
          Sinkronisasi Table E-monitoring
        </Button>
      </CardBody>
    </Card>
  );
};

export default SyncEmon;
