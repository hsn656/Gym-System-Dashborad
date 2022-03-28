import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import UsersTable from "../views/components/users/UsersTable.vue";
import AddUser from "../views/components/users/AddUserForm.vue";
import editUser from "../views/components/users/EditUserForm .vue";
import Packages from "../views/components/training-packages/Packages.vue";
import SessionTableContainer from "@/views/components/sessions/SessionTableContainer";
import AddSessionForm2 from "@/views/components/sessions/AddSessionForm2";
import CityManagersTable from "@/views/components/CityManagers/CityManagersTable";
import AddCityManager from "../views/components/CityManagers/AddCityManagerForm";
import EditCityManager from "../views/components/CityManagers/EditCityManagerForm";


const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  //#region users routes
  {
    path: "/users",
    name: "Users",
    component: UsersTable,
  },
  {
    path: "/users/add",
    name: "addUser",
    component: AddUser,
  },
  {
    path: "/users/edit/:id",
    name: "editUser",
    component: editUser,
  },
  //#endregion
  // #region City Managers routes
  {
    path: "/citymanagers",
    name: "CityManagers",
    component: CityManagersTable,
  },
  {
    path: "/citymanagers/add",
    name: "addCityManager",
    component: AddCityManager,
  },
  {
    path: "/citymanagers/edit/:id",
    name: "editCityManager",
    component: EditCityManager,
  },
  //#endregion
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  //#region packages routes
  {
    path: "/packages",
    name: "Training Packages",
    component: Packages,
  },
  // {
  //   path: "/users/add",
  //   name: "addUser",
  //   component: AddUser,
  // },
  // {
  //   path: "/users/edit/:id",
  //   name: "editUser",
  //   component: editUser,
  // },
  //#endregion
  //#region Sessions routes
  {
    path: "/sessions",
    name: "Sessions",
    component: SessionTableContainer,
  }

  ,{
  path: "/sessions/add",
    name: "AddSessionForm2",
    component: AddSessionForm2
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
