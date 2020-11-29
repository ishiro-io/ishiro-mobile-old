import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required("Une adresse mail est requise"),
  username: Yup.string().required("Un nom d'utilisateur est requis"),
  password: Yup.string()
    .min(8, "Le mot de passe est trop court (8 caractères minimum)")
    .matches(/[a-zA-Z]/, "Le mot de passe contient des caractères interdits.")
    .required("Un mot de passe est requis")
});

export default SignUpSchema;
