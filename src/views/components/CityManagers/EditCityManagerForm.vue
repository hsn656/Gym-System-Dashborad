<template>
  <div class="container-fluid" >
    <div class="row justify-content-center">
    <div class=" col-10 col-md-8 col-lg-6" >
      <input  v-model="cityManager.name" name="name" placeholder="name" type="text" class="my-2 form-control">
      <input  v-model="cityManager.email" name="email" placeholder="email" type="email" class="my-2 form-control">
      <input  v-model="cityManager.nationalid" name="national_id" placeholder="national id" type="email" class="my-2 form-control">
      <input  v-model="cityManager.imageurl" name="image_url" placeholder="image url" type="email" class="my-2 form-control">
      <button @click="updateCityManager(cityManager.id)" class="my-2 btn btn-primary w-100">Edit</button>
    </div>
    <div v-if="isUpdated" >
      <p class="text-primary my-2 text-center"> updated successfully </p>
    </div>
  </div>
  </div>
</template>

<script>
import CityManagerService from "@/services/CityManagerService";


export default {
  name: "Edit City Manager",
  data() {
    return {
      cityManager: {
        name: "",
        email: "",
        nationalid: "",
        imageurl:"",
      },
      isUpdated:false
    };
  },
  methods:{
    getCityManager(id){
      CityManagerService.getById(id)
        .then(response => {
          console.log(response.data);
          this.cityManager.id = response.data.id;
          this.cityManager.name = response.data.name;
          this.cityManager.email = response.data.email;
          this.cityManager.nationalid = response.data.national_id;
          this.cityManager.imageurl = response.data.image_url;
          console.log(this.cityManager);
        })
        .catch(e => {
           console.log(e);
        });
    },
    updateCityManager(id){
      this.isUpdated=false;
      CityManagerService.update(id,this.cityManager).then(()=>{
         // console.log(res);
        this.isUpdated=true;
      });
    }
  },
  created(){
      this.getCityManager(this.$route.params.id);
  }

};
</script>