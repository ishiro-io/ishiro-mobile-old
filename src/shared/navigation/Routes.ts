export type AppRoutes = {
  Content: undefined;
  Authentication: undefined;
};

export type AuthenticationRoutes = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ConfirmEmailCode: { email: string };
  ForgotPassword: undefined;
  ConfirmPasswordCode: { email: string };
  ChangeForgotPassword: { token: string };
};
