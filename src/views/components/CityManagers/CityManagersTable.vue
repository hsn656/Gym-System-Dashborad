<template>

  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>City Managers table</h6>
      </div>
      <div class="card-header pb-0">
        <router-link :to="{ name: 'addCityManager' }" ><a class="btn btn-success">add City Manger</a></router-link>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Email</th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >created at</th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="cityManager in cityManagers" :key="cityManager.id" >


              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar :img="img1" size="sm" border-radius="lg" class="me-3" alt="cityManager1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ cityManager.name}}</h6>
                  </div>
                </div>
              </td>


              <td>
                <p class="text-xs font-weight-bold mb-0">{{cityManager.email}}</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{convertToDate(cityManager.created_at)}}</span>
              </td>


              <td class="align-middle">
                <router-link :to="'/citymanagers/edit/'+cityManager.id" >
                  <a
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user">
                    Edit</a>
                </router-link>
              </td>


              <td class="align-middle" >
                <span @click="deleteCityMananger(cityManager.id)">
                  <a
                  style="cursor: pointer;"
                  class="text-danger font-weight-bold text-xs">
                  delete</a>
                </span>
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
import CityManagerService from "@/services/CityManagerService";




export default {
  name: "cityManagers-table",
  data() {
    return {
      cityManagers:[],
      img1,
      // componentKey:0
    };
  },

  async created(){
    this.getCityManagers();
  },

  components: {
    VsudAvatar,
  },
  methods: {
    getCityManagers() {
      CityManagerService.getAll()
        .then(response => {
          this.cityManagers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    convertToDate(datetime){
      return datetime.split("").splice(0,10).join("")
    },

    deleteCityMananger(id){
      if (!confirm("are you sure?")) return;

      CityManagerService.delete(id).then(res=>{
          console.log(res);
          this.cityManagers=this.cityManagers.filter(cityManager=>cityManager.id!==id);
          // this.forceRerender();
        }).catch(err=>{
          console.log(err);
        });
    },
    // forceRerender() {
    //   this.componentKey += 1;
    // }
  }
};
</script>