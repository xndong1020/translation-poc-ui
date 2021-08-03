import { UserRole } from "../graphql/graphqlTypes";
import Admin from "../layouts/Admin";
import LoginLayout from "../layouts/Login";
import LogoutLayout from "../layouts/Logout";
import Translator from "../layouts/Translator";

const indexRoutes = [
  { path: "/login", name: "Login", component: LoginLayout, protected: false },
  {
    path: "/logout",
    name: "Logout",
    component: LogoutLayout,
    protected: false,
  },
];

export const getIndexRoutes = (userRole: string) => {
  switch (userRole) {
    case UserRole.Admin:
    case UserRole.Owner:
      return [
        ...indexRoutes,
        { path: "/", name: "Home", component: Admin, protected: true },
      ];
    case UserRole.Translator:
    default:
      return [
        ...indexRoutes,
        { path: "/", name: "Home", component: Translator, protected: true },
      ];
  }
};
