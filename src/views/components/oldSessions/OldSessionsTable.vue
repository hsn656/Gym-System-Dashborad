<template>
  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>old Sessions table</h6>
      </div>
    </div>
    <div class="seletStyle">
      <div class="m-auto">
         <label for="city">City</label>
         <select id="city" class="form-select w-25" v-model="city.id" @change="getBranches">
           <option v-for="city in cities" :key="city.id" v-bind:value="city.id">{{ city.name }}</option>
       </select>
       </div>
    </div>
    <div v-if="city.id" class="seletStyle">
      <label for="branch">Branch</label>
      <select id="branch" class="form-select w-25" v-model="branchId" @change="getSessions(branchId)">
        <option v-for="branch in branches" :key="branch.id" v-bind:value="branch.id">{{ branch.name }}</option>
      </select>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0" v-if="branchId">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Name
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Branch Name
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Starts at
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Ends at
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Coaches
              </th>
            <th class="text-secondary opacity-7 text-center">Delete</th>
            </tr>
          </thead>
          <tbody :key="componentKey">
            <tr v-for="session in sessions" :key="session.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ session.name }}</h6>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ session.branch_name }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToDate(session.start_time) }}
                </p>
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToTime(session.start_time) }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToDate(session.end_time) }}
                </p>
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToTime(session.end_time) }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p v-for="coach in session.coaches" :key="coach.id" class="text-xs font-weight-bold mb-0">
                  {{ coach.name }}
                </p>
              </td>
              
              <td class="align-middle text-center">
                <span @click="deleteSession(session.id)"><a style="cursor: pointer" class="text-danger font-weight-bold text-xs"
                  >
                    delete</a
                  ></span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import SessionService from "../../../services/SessionService";
import CityService from "@/services/CityService";
import BranchService from "@/services/BranchService";

export default {
  name: "OldSessionsTable",
  data() {
    return {
     sessions: [],
      componentKey: 0,
      cities: [],
      city:{
        "name":"",
        "id":""
      },
      branches: [],
      branchId:''
    };
  },

  async created() {
    this.getSessions();
    this.getCities();
  },

  components: {
   
  },
  methods: {
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
    getBranches() {
      BranchService.getByCityId(this.city.id)
        .then(response => {
          this.branches = response.data.data;
          this.branchId = ""
        })
        .catch(e => {
          console.log(e);
        });
    }
    ,getSessions(id) {
      SessionService.getOldSessionsByBranch(id)
        .then((response) => {
          console.log(response);
          this.sessions = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    convertToDate(datetime) {
      return datetime.split(" ")[0];
    },
    convertToTime(datetime) {
      return datetime.split(" ")[1];
    },
    deleteSession(id) {
      if (confirm("are you sure?")) {
        SessionService.delete(id)
          .then((res) => {
            console.log(res);
            this.sessions = this.sessions.filter(
              (session) => session.id !== id
            );
            this.forceRerender();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
