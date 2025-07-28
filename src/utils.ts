import Swal from "sweetalert2";

const THEME = {
  background: "#7d628f",
  color: "#f4f4f4",
  confirmButtonColor: "#402651",
  cancelButtonColor: "#888888",
};

export const showSuccess = (title: string, text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    ...THEME,
  });
};

export const showError = (title: string, text = "") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    ...THEME,
  });
};

export const showWarningConfirm = async (title: string, text = "") => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    ...THEME,
  });
};
