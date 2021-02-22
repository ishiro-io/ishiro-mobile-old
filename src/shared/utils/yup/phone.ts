import * as Yup from "yup";

const regex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

Yup.addMethod(Yup.string, "phone", () => {
  return Yup.string()
    .required("Votre numéro de téléphone est requis.")
    .test(
      "phone",
      "Votre numéro de téléphone est incorrect. Merci de vérifier son format.",
      (value: string) => regex.test(value)
    );
});
