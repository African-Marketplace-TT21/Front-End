import * as yup from "yup";

export default yup.object().shape({
   firstname: yup.string().required("First name is required"),
   lastname: yup.string().required("Last name is required"),
   email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
   pass: yup
      .string()
      .min(4, "Your Password should be at least 4 characters")
      .required("Password is required"),
   accountType: yup
      .string()
      .oneOf(["user", "owner"], "You need to pick a role"),
});
