import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  emailOrUsername: Yup.string().required(
    "Votre adresse mail / nom d'utilisateur est requis"
  ),
  password: Yup.string()
    .min(8, "Le mot de passe est trop court (8 caractères minimums)")
    .matches(
      /[a-zA-Z]/,
      "Votre mot de passe contient des caractères interdits."
    )
    .required("Votre mot de passe est requis")
});

export default LoginSchema;
