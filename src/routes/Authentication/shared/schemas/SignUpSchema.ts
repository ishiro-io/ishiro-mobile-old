import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Un numéro de  téléphone est requis"),
  username: Yup.string().required("Un nom d'utilisateur est requis"),
  password: Yup.string()
    .min(8, "Le mot de passe est trop court (8 caractères minimum)")
    .matches(/[a-zA-Z]/, "Le mot de passe contient des caractères interdits.")
    .required("Un mot de passe est requis")
});

export default SignUpSchema;
