import "shared/utils/yup/phone";

import * as Yup from "yup";

const AskCodeSchema = Yup.object().shape({
  // @ts-ignore
  phoneNumber: Yup.string().phone()
});

export default AskCodeSchema;
