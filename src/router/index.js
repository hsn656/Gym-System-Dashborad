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
import EditSessionForm from "@/views/components/sessions/EditSessionForm ";
import CoachesTableContainer from "@/views/components/coaches/CoachesTableContainer";
import AddCoachForm from "@/views/components/coaches/AddCoachForm";
import EditCoachForm from "@/views/components/coaches/EditCoachForm";
import Cities from "../views/components/Cities/Cities";
import AddCityForm from "../views/components/Cities/AddCityForm";
import EditCityForm from "../views/components/Cities/EditCityForm";
import AttendanceTable from "../views/components/Attendance/AttendanceTable";
import BranchesTable from "../views/components/branches/BranchesTable";
import OldSessionTableContainer from "../views/components/oldSessions/OldSessionTableContainer";
import AddBranch from "../views/components/branches/AddBranchForm.vue";
import EditBranch from "../views/components/branches/EditBranchForm .vue";
import BranchManagersTable from "@/views/components/BranchManagers/BranchManagersTable";
import AddBranchManager from "../views/components/BranchManagers/AddBranchManagerForm";
import EditBranchManager from "../views/components/BranchManagers/EditBranchManagerForm";
import store from "../store";

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
    meta: { auth: store.getters.atLeastBranchManager },
  },
  //#region users routes
  {
    path: "/users",
    name: "Users",
    component: UsersTable,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/users/add",
    name: "addUser",
    component: AddUser,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/users/edit/:id",
    name: "editUser",
    component: editUser,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  //#endregion
  // #region City Managers routes
  {
    path: "/citymanagers",
    name: "CityManagers",
    component: CityManagersTable,
    meta: { auth: store.getters.atLeastAdmin },
  },
  {
    path: "/citymanagers/add",
    name: "addCityManager",
    component: AddCityManager,
    meta: { auth: store.getters.atLeastAdmin },
  },
  {
    path: "/citymanagers/edit/:id",
    name: "editCityManager",
    component: EditCityManager,
    meta: { auth: store.getters.atLeastAdmin },
  },
  //#endregion
  // #region Cities routes
  {
    path: "/cities",
    name: "Cities",
    component: Cities,
    meta: { auth: store.getters.atLeastAdmin },
  },
  {
    path: "/cities/add",
    name: "Add City",
    component: AddCityForm,
    meta: { auth: store.getters.atLeastAdmin },
  },
  {
    path: "/cities/edit/:id",
    name: "Edit City",
    component: EditCityForm,
    meta: { auth: store.getters.atLeastAdmin },
  },
  // #endregion
  // #region Branches routes
  {
    path: "/branches",
    name: "Branches",
    component: BranchesTable,
    meta: { auth: store.getters.atLeastCityManager },
  },
  {
    path: "/branches/add",
    name: "add Branch",
    component: AddBranch,
    meta: { auth: store.getters.atLeastCityManager },
  },
  {
    path: "/branches/add",
    name: "add Branch",
    component: AddBranch,
    meta: { auth: store.getters.atLeastCityManager },
  },
  {
    path: "/branches/edit/:id",
    name: "Edit Branch",
    component: EditBranch,
    meta: { auth: store.getters.atLeastCityManager },
  },
  //#endregion
  // #region Attendance routes
  {
    path: "/sheets",
    name: "Attendance",
    component: AttendanceTable,
    meta: { auth: store.getters.atLeastBranchManager },
  },

  //#endregion
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
    meta: { auth: true },
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  //#region packages routes
  {
    path: "/packages",
    name: "Training Packages",
    component: Packages,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  //#endregion
  //#region Sessions routes
  {
    path: "/sessions",
    name: "Sessions",
    component: SessionTableContainer,
    meta: { auth: store.getters.atLeastBranchManager },
  },

  {
    path: "/sessions/add",
    name: "AddSessionForm2",
    component: AddSessionForm2,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/sessions/edit/:id",
    name: "editSession",
    component: EditSessionForm,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/oldsessions",
    name: "oldSessions",
    component: OldSessionTableContainer,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/coaches",
    name: "Coaches",
    component: CoachesTableContainer,
    meta: { auth: store.getters.atLeastBranchManager },
  },

  {
    path: "/coaches/add",
    name: "AddCoachForm",
    component: AddCoachForm,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  {
    path: "/coaches/edit/:id",
    name: "editCoach",
    component: EditCoachForm,
    meta: { auth: store.getters.atLeastBranchManager },
  },
  // #region branch Managers routes
  {
    path: "/branchmanagers",
    name: "Branch Managers",
    component: BranchManagersTable,
    meta: { auth: store.getters.atLeastCityManager },
  },
  {
    path: "/branchmanagers/add",
    name: "addBranchManager",
    component: AddBranchManager,
    meta: { auth: store.getters.atLeastCityManager },
  },
  {
    path: "/branchmanagers/edit/:id",
    name: "editBranchManager",
    component: EditBranchManager,
    meta: { auth: store.getters.atLeastCityManager },
  },
  //#endregion
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
