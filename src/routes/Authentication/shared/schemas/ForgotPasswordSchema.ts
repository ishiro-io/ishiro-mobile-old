import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Votre numéro de téléphone  est requis")
});

export default ForgotPasswordSchema;
