import { createStore } from "vuex";
import { getpayload } from "@/jwtdecode";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    mcolor: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: false,
    showMain: true,
    stripePK:
      "pk_test_51KhzxNEHwj20Yn6RZTOFDxaHP3m22XbpDuDywMsZthUWTOyKJtEvTpOxcAL7FfeC4uOlucTXQ39azat1SDexH3D200Amtv1A4z",
    backEndUrl: "http://localhost:8000/",
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
  getters: {
    isAdmin() {
      return getpayload().role == "admin";
    },
    isCityManager() {
      return getpayload().role == "city manager";
    },
    isBranchManager() {
      return getpayload().role == "branch manager";
    },
    isUser() {
      return getpayload().role == "user";
    },
    getPayLoad() {
      return getpayload();
    },
    atLeastAdmin() {
      return getpayload().role == "admin";
    },
    atLeastCityManager() {
      return (
        getpayload().role == "admin" || getpayload().role == "city manager"
      );
    },
    atLeastBranchManager() {
      return (
        getpayload().role == "admin" || getpayload().role == "city manager"
      );
    },
  },
});
