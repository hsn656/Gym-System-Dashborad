<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Cities" :to="{ name: 'Cities' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="City Managers" :to="{ name: 'City Managers' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Branches" :to="{ name: 'Branches' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Branch Managers" :to="{ name: 'Branch Managers' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse navText="Users" :to="{ name: 'Users' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Users2" :to="{ name: 'Users2' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          navText="City Managers"
          :to="{ name: 'CityManagers' }"
        >
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          navText="Cities"
          :to="{ name: 'Cities' }"
        >
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
  <li class="nav-item">
        <sidenav-collapse navText="Branches" :to="{ name: 'Branches' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          navText="Attendance"
          :to="{ name: 'Attendance' }"
        >
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>








      <li class="nav-item">
        <sidenav-collapse
          navText="Training Packages"
          :to="{ name: 'Training Packages' }"
        >
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Coaches" :to="{ name: 'Coaches' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Sessions" :to="{ name: 'Sessions' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="nav-item">
        <sidenav-collapse navText="Coaches" :to="{ name: 'Coaches' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li> -->
      <li class="nav-item">
        <sidenav-collapse navText="Tables" :to="{ name: 'Tables' }">
          <template v-slot:icon>
            <icon name="tables" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Billing" :to="{ name: 'Billing' }">
          <template v-slot:icon>
            <icon name="billing" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          navText="Virtual Reality"
          :to="{ name: 'Virtual Reality' }"
        >
          <template v-slot:icon>
            <icon name="virtual-reality" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="RTL" :to="{ name: 'Rtl' }">
          <template v-slot:icon>
            <icon name="rtl-page" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Profile" :to="{ name: 'Profile' }">
          <template v-slot:icon>
            <icon name="customer-support" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Sign In" :to="{ name: 'Sign In' }">
          <template v-slot:icon>
            <icon name="sign-in" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Sign Up" :to="{ name: 'Sign Up' }">
          <template v-slot:icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
      href="https://www.creative-tim.com/learning-lab/vue/overview/soft-ui-dashboard/"
      linkText="Documentation"
      iconClass="ni ni-diamond"
    />
    <a
      class="btn bg-gradient-success mt-4 w-100"
      href="https://www.creative-tim.com/product/vue-soft-ui-dashboard-pro?ref=vsud"
      type="button"
      >Upgrade to pro</a
    >
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import jwtDecode from "../../jwtdecode";
// import jwt_decode from 'jwt-decode';
// import jwt_decode from '../../../node_modules/jwt-decode';

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      tokenPayload: {},
    };
  },
  created() {
    var token = localStorage.getItem("gstoken");

    if (token) {
      this.tokenPayload = jwtDecode(token);
      console.log(this.tokenPayload);
    }
  },
  components: {
    Icon,
    SidenavCollapse,
    SidenavCard,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
