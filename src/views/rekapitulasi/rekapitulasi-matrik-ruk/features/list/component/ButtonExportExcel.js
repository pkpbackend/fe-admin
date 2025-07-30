import sweetalert from "@utils/sweetalert";
import { useLazyRekapMatrixRukExportExcelQuery } from "@views/rekapitulasi/rekapitulasi-matrik-ruk/domains";
import { useEffect } from "react";
import { Download } from "react-feather";
import { Button, Spinner } from "reactstrap";

const ButtonExportExcel = ({ queryParams, disabled = false }) => {
  const [trigger, { isLoading, isFetching, isError, error }] =
    useLazyRekapMatrixRukExportExcelQuery();
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
        const response = await trigger(queryParams);
        if (response.isSuccess) {
          window.open(response.data.s3url);
        }
      }}
      size="sm"
      disabled={isLoading || isFetching || disabled}
    >
      {isLoading || isFetching ? <Spinner size="sm" /> : <Download size={14} />}
      Export Excel
    </Button>
  );
};

export default ButtonExportExcel;
