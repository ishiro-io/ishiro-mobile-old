export type AppRoutes = {
  Content: undefined;
  Authentication: undefined;
};

export type AuthenticationRoutes = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ConfirmPhoneNumberCode: { phoneNumber: string };
  ForgotPassword: undefined;
  ConfirmPasswordCode: { phoneNumber: string };
  ChangeForgotPassword: { token: string };
};
