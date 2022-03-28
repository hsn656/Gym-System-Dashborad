<template>
  <div class="container-fluid" >
    <div class="row justify-content-center">
    <div class=" col-10 col-md-8 col-lg-6" >
      <input  v-model="cityManager.name" name="name" placeholder="name" type="text" class="my-2 form-control">
      <input  v-model="cityManager.email" name="email" placeholder="email" type="email" class="my-2 form-control">
      <input  v-model="cityManager.national_id" name="national_id" placeholder="national id" type="email" class="my-2 form-control">
      <input  v-model="cityManager.image_url" name="image_url" placeholder="image url" type="email" class="my-2 form-control">
      <input v-model="cityManager.password" name="password" placeholder="password" type="password" class="my-2 form-control">
      <button @click="addCityManager()" class="my-2 btn btn-primary w-100">Add City Manager</button>
    </div>
    <div v-if="isAdded" >
      <p class="text-primary my-2 text-center"> added successfully </p>
    </div>
  </div>
  </div>
</template>

<script>
import CityManagerService from "@/services/CityManagerService";


export default {
  name: "AddCityManager",
  data() {
    return {
      cityManager: {
        name: "",
        email: "",
        national_id: "",
        image_url:"",
        password:""
      },
      isAdded:false
    };
  },
  methods:{
    addCityManager(){
      let data = {
        name: this.cityManager.name,
        email: this.cityManager.email,
        national_id:this.cityManager.national_id,
        image_url:this.cityManager.image_url,
        password:this.cityManager.password
      };

      CityManagerService.create(data).then(res=>{
          console.log(res);
          this.isAdded=true;
        }).catch(err=>{
          console.log(err);
        })

    }
  }

};
</script>