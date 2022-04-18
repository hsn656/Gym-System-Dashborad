<template>
  <div class="card mb-4 p-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>old Sessions table</h6>
      </div>
    </div>
      <div class="row">
      <div class="col-6">
        <div v-if="$store.getters.isAdmin">
          <label for="city">City</label>
          <select id="city" class="form-select w-50" v-model="city.id" @change="getBranches">
            <option v-for="city in cities" :key="city.id" v-bind:value="city.id">{{ city.name }}</option>
          </select>
        </div>
      </div>
      <div class="col-5">
        <label for="Search">Search:</label>
        <input class="form-control me-2 w-50" type="search" aria-label="Search" id="Search" name="Search" v-model="search" @keyup="getSomeOld">
      </div>
    </div>
    <div v-if="city.id" class="seletStyle">
      <label for="branch">Branch</label>
      <select id="branch" class="form-select w-25" v-model="branchId" @change="getSomeOld">
        <option v-for="branch in branches" :key="branch.id" v-bind:value="branch.id">{{ branch.name }}</option>
      </select>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0" v-if="branchId">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" @click="sort('name')">Name
              <i
                  v-if="sortField == 'name' && sortDirection == 'asc'"
                  class="fas fa-arrow-up text-dark"
                ></i>
                <i
                  v-if="sortField == 'name' && sortDirection == 'desc'"
                  class="fas fa-arrow-down text-dark"
                ></i>
            </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Branch Name
              </th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" @click="sort('start_time')">
               Starts at
              <i
                v-if="sortField == 'start_time' && sortDirection == 'asc'"
                class="fas fa-arrow-up text-dark"
              ></i>
              <i
                v-if="sortField == 'start_time' && sortDirection == 'desc'"
                class="fas fa-arrow-down text-dark"
              ></i>
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
             <tfoot>
             <tr>
               <td colspan="7" class="text-center">
                <input  class=" paginatebtn" type="button" v-for="link in links" :key="link.label" :value="link.label" @click="page=link.label;getSomeOld()"/>
               </td>
             </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import SessionService from "../../../services/SessionService";
import CityService from "@/services/CityService";
import BranchService from "@/services/BranchService";
import Swal from "sweetalert2";

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
      branchId:'',
      links: [],
      search: "",
      sortField: "start_time",
      sortDirection: "desc",
      page:1,
    };
  },

  async created() {
    this.getCities();
    if(this.$store.getters.getPayLoad["role"] == "city manager"){
      this.city.id = this.$store.getters.getPayLoad["city_id"]
      this.getBranches();
    }
     if(this.$store.getters.getPayLoad["role"] == "branch manager"){
      this.branchId = this.$store.getters.getPayLoad["branch_id"]
      this.getSomeOld()
    }
  },

  components: {
   
  },
  methods: {
    getSomeOld(){
       SessionService.getSomeOld(this.branchId,this.page,this.search,this.sortField,this.sortDirection)
        .then(response=>{
           this.sessions=response.data.data.data;
           this.links=response.data.data.meta.links.slice(1, -1);
         })
    
   }
    ,getCities() {
      CityService.getAll()
        .then(response => {
          this.cities = response.data.data;
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
    // ,getSessions() {
    //   SessionService.getOldSessionsByBranch(this.branchId)
    //     .then((response) => {
    //       console.log(response);
    //       this.sessions = response.data.data;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
    ,
    sort(field){
     this.sortField = field;
     this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
      this.getSomeOld()
    },

   
    convertToDate(datetime) {
      return datetime.split(" ")[0];
    },
    convertToTime(datetime) {
      return datetime.split(" ")[1];
    },
    deleteSession(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          SessionService.delete(id)
            .then((res) => {
              console.log(res);
              if(res.data.isSuccess){
                this.sessions = this.sessions.filter((session) => session.id !== id);
                this.forceRerender();
                Swal.fire(
                  'Deleted!',
                  'Session has been deleted.',
                  'success'
                )}else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: res.data.errors,
                })
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
<style scoped>
.paginatebtn{
  border-radius: 20%;
  margin:5px;
  padding:5px 15px;
  border:none;
  background-color: #82d616;
}
</style>
