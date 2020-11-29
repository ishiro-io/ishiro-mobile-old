import * as Yup from "yup";

const GoogleSetUsernameSchema = Yup.object().shape({
  username: Yup.string().required("Un nom d'utilisateur est requis")
});

export default GoogleSetUsernameSchema;
