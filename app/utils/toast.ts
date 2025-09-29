import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "success",
  options: object = {}
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    ...options,
  });
};
