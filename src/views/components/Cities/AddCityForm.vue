<template>
  <div class="container-fluid" >
    <div class="row justify-content-center">
    <div class=" col-10 col-md-8 col-lg-6" >
      <input  v-model="city.name" name="name" placeholder="name" type="text" class="my-2 form-control">

      <select class="form-select" v-model="city.manager_id" >
        <option v-for="cityManager in cityManagers" :key="cityManager.id" v-bind:value="cityManager.id">{{ cityManager.name }}</option>
      </select>

      <button @click="addCity()" class="my-2 btn btn-primary w-100">Add City</button>
    </div>
    <div v-if="isAdded" >
      <p class="text-primary my-2 text-center"> added successfully </p>
    </div>
  </div>
  </div>
</template>

<script>
import CityService from "../../../services/CityService";
import CityManagerService from "../../../services/CityManagerService";

export default {
  name: "AddCityManager",
  data() {
    return {
      city: {
        name: "",
        manager_id: "",
      },
      cityManagers:[],
      isAdded:false
    };
  },
  async created(){
    this.getCityManagers();
    console.log(this.cityManagers);
  },
  methods:{
    addCity(){
      let data = {
        name: this.city.name,
        manager_id:this.city.manager_id,
      };

      CityService.create(data).then(res=>{
          console.log(res);
          this.isAdded=true;
        }).catch(err=>{
          console.log(err);
        })

    },
    getCityManagers(){
      CityManagerService.getAll()
        .then(response => {
          this.cityManagers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

};
</script>