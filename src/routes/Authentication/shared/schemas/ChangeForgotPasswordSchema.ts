import * as Yup from "yup";

import equalTo from "shared/utils/yup/equalTo";

Yup.addMethod(Yup.string, "equalTo", equalTo);

const ChangeForgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Le mot de passe est trop court (8 caractères minimum)")
    .matches(/[a-zA-Z]/, "Un mot de passe contient des caractères interdits")
    .required("Un mot de passe est requis"),

  confirmPassword: Yup.string()
    //@ts-ignore
    .equalTo(Yup.ref("password"), "Les mots de passe ne correspondent pas")
    .required("Une confirmation du mot de passe est requise")
});

export default ChangeForgotPasswordSchema;
