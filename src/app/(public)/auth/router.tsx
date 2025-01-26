import { ROUTES } from "@/commons/constants/routes";

export const AuthRouter = [
  {
    path: ROUTES.AUTH.LOGIN.URL,
    lazy: () => import("./login/page"),
  },
  {
    path: ROUTES.AUTH.REGISTER.URL,
    lazy: () => import("./register/page"),
  },
  {
    path: ROUTES.AUTH.VERIFY_EMAIL.URL,
    lazy: () => import("./verify-email/page"),
  },
];
