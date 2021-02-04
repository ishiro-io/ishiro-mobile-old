import * as Yup from "yup";

const ConnectSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Votre numéro de téléphone est requis")
});

export default ConnectSchema;
