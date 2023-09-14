import Swal from "sweetalert2";

const SuccessAlert = (
  title = "Your work has been saved",
  icon = "success",
  time = 1500
) => {
  return Swal.fire({
    position: "top-center",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: time,
    iconColor: "#e31e25",
    customClass: "my-custom-sweetalert2-class",
  });
};

export default SuccessAlert;
