<template>

  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>Attendance table</h6>
      </div>

    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">

        <select class="form-select w-25" v-model="city.id" @change="getBranches">
          <option v-for="city in cities" :key="city.id" v-bind:value="city.id">{{ city.name }}</option>
        </select>

        <select class="form-select w-25" v-model="branchId">
          <option v-for="branch in branches" :key="branch.id" v-bind:value="branch.id" @change="getAttendance">{{ branch.name }}</option>
        </select>

        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">User Name</th>

            <th
              class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >Training Session Name
            </th>

            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >Attendance Date
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >Attendance Time
            </th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="attendee in attendanceSheet" :key="attendee.id">


            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <vsud-avatar :img="img1" size="sm" border-radius="lg" class="me-3" alt="cityManager1" />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ attendee.UserName }}</h6>
                </div>
              </div>
            </td>


            <td>
              <p class="text-xs font-weight-bold mb-0">{{ attendee.SessionName }}</p>
            </td>


            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ getDate(attendee.AttendanceTime) }}</span>
            </td>

            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">{{ getTime(attendee.AttendanceTime) }}</span>
            </td>


          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import img1 from "./team-2.jpg";
import AttendanceService from "../../../services/AttendanceService";
import CityService from "../../../services/CityService";
import BranchService from "../../../services/BranchService";


export default {
  name: "Attendance-table",
  data() {
    return {
      attendanceSheet: [],
      img1,
      cities: [],
      city: {
        name: "",
        id: ""
      },
      branches: [],
      branchId:''

    };
  },

  async created() {
    this.getCities();
    // this.getAttendance();
  },

  components: {
    VsudAvatar
  },
  methods: {
   async getAttendance() {
      console.log("Hello");
      AttendanceService.getAll(this.branchId)
        .then(response => {
          this.attendanceSheet = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 2022-03-28 15:38:00
    getDate(dateTime) {
      return dateTime.split(" ")[0];
    },
    getTime(dateTime) {
      return dateTime.split(" ")[1];
    },
    getCities() {
      CityService.getAll()
        .then(response => {
          this.cities = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    showCityID() {
      console.log(this.city.id);
    },
    getBranches() {
      BranchService.getBranchesByCityId(this.city.id)
        .then(response => {
          this.branches = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  }
};
</script>