import * as Yup from "yup";

const equalTo = (ref: Yup.Ref, msg: string) => {
  return Yup.string().test({
    name: "equalTo",
    exclusive: false,
    message: msg,
    test: function (value) {
      return value === this.resolve(ref);
    }
  });
};

export default equalTo;
