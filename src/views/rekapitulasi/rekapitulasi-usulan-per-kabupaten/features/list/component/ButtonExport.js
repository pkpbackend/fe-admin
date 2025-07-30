import sweetalert from "@utils/sweetalert";
import { useEffect } from "react";
import { Download } from "react-feather";
import { Button, Spinner } from "reactstrap";
import { useLazyRekapitulasiPerKabupatenExportQuery } from "../../domains";

const ButtonExport = ({
  queryParams,
  disabled = false,
  fileType,
  children,
}) => {
  const [trigger, { isLoading, isFetching, isError, error }] =
    useLazyRekapitulasiPerKabupatenExportQuery();

  useEffect(() => {
    if (isError) {
      sweetalert.fire(
        "Gagal",
        error?.data?.message || "Gagal Unduh File Excel",
        "error"
      );
    }
  }, [isError, error?.data?.message]);

  return (
    <Button
      color="primary"
      outline
      onClick={async () => {
        const response = await trigger({ ...queryParams, fileType });
        if (response.isSuccess) {
          window.open(response.data.s3url);
        }
      }}
      size="sm"
      disabled={isLoading || isFetching || disabled}
    >
      {isLoading || isFetching ? <Spinner size="sm" /> : <Download size={14} />}
      {children}
    </Button>
  );
};

export default ButtonExport;
