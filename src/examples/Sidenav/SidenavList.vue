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
      <li v-if="$store.getters.atLeastCityManager" class="nav-item">
        <sidenav-collapse
          navText="Branch Managers"
          :to="{ name: 'Branch Managers' }"
        >
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li v-if="$store.getters.isAdmin" class="nav-item">
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
        <sidenav-collapse navText="Users" :to="{ name: 'Users' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li v-if="$store.getters.isAdmin" class="nav-item">
        <sidenav-collapse navText="Cities" :to="{ name: 'Cities' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li v-if="$store.getters.atLeastCityManager" class="nav-item">
        <sidenav-collapse navText="Branches" :to="{ name: 'Branches' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Attendance" :to="{ name: 'Attendance' }">
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
        <sidenav-collapse
          navText="Upcoming Sessions"
          :to="{ name: 'Sessions' }"
        >
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Old Sessions" :to="{ name: 'oldSessions' }">
          <template v-slot:icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  <div v-if="false" class="pt-3 mx-3 mt-3 sidenav-footer">
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
  created() {},
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
