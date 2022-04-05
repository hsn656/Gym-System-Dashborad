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
import UsersTable2 from "../views/components/users/UsersTable2.vue";
import AddUser from "../views/components/users/AddUserForm.vue";
import editUser from "../views/components/users/EditUserForm .vue";
import Packages from "../views/components/training-packages/Packages.vue";
import SessionTableContainer from "@/views/components/sessions/SessionTableContainer";
import AddSessionForm2 from "@/views/components/sessions/AddSessionForm2";
import CityManagersTable from "@/views/components/CityManagers/CityManagersTable";
import AddCityManager from "../views/components/CityManagers/AddCityManagerForm";
import EditCityManager from "../views/components/CityManagers/EditCityManagerForm";
import EditSessionForm from "@/views/components/sessions/EditSessionForm ";
import CoachesTableContainer from "@/views/components/coaches/CoachesTableContainer";
import AddCoachForm from "@/views/components/coaches/AddCoachForm";
import EditCoachForm from "@/views/components/coaches/EditCoachForm";
import Cities from "../views/components/Cities/Cities";
import AddCityForm from "../views/components/Cities/AddCityForm";
import EditCityForm from "../views/components/Cities/EditCityForm";
import AttendanceTable from "../views/components/Attendance/AttendanceTable";
import BranchesTable from "../views/components/branches/BranchesTable";
import OldSessionTableContainer from "../views/components/oldSessions/OldSessionTableContainer"
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
    path: "/users2",
    name: "Users2",
    component: UsersTable2,
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
  // #region Cities routes
  {
    path: "/cities",
    name: "Cities",
    component: Cities,
  },
  {
    path: "/cities/add",
    name: "Add City",
    component: AddCityForm,
  },
  {
    path: "/cities/edit/:id",
    name: "Edit City",
    component: EditCityForm,
  },
  // #endregion
  // #region Branches routes
  {
    path: "/branches",
    name: "Branches",
    component: BranchesTable,
  },
  //#endregion
  // #region Attendance routes
  {
    path: "/sheets",
    name: "Attendance",
    component: AttendanceTable,
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
  },

  {
    path: "/sessions/add",
    name: "AddSessionForm2",
    component: AddSessionForm2,
  },
  {
    path: "/sessions/edit/:id",
    name: "editSession",
    component: EditSessionForm,
  },
  {
    path: "/oldsessions",
    name: "oldSessions",
    component: OldSessionTableContainer,
  },
  {
    path: "/coaches",
    name: "Coaches",
    component: CoachesTableContainer,
  },

  {
    path: "/coaches/add",
    name: "AddCoachForm",
    component: AddCoachForm,
  },
  {
    path: "/coaches/edit/:id",
    name: "editCoach",
    component: EditCoachForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
