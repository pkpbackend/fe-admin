import Swal from "sweetalert2";

const sweetalert = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: true,
});

export default sweetalert;
