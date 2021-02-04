import * as yup from "yup";

export default yup.object().shape({
   name: yup.string().required("Item name is required"),
   category: yup.string().required("Category is required"),
   location: yup.string().required("Location is required"),
   price: yup.number().required("Price is required"),
});
