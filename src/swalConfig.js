import Swal from "sweetalert2";

export const swalConfig = Swal.mixin({
  customClass: {
    confirmButton: "button is-danger mr-1",
    cancelButton: "button is-light ml-1",
  },
  buttonsStyling: false,
});
