import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Le numéro est incorrect"
    )
    .required("Votre numéro de téléphone est requis")
});

export default ForgotPasswordSchema;
