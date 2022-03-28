<template>
  <div class="container-fluid" >
    <div class="row justify-content-center">
    <div class=" col-10 col-md-8 col-lg-6" >
      <input  v-model="user.name" name="name" placeholder="name" type="text" class="my-2 form-control">
      <input  v-model="user.email" name="email" placeholder="email" type="email" class="my-2 form-control">
      <input  v-model="user.national_id" name="national_id" placeholder="national id" type="email" class="my-2 form-control">
      <input  v-model="user.image_url" name="image_url" placeholder="image url" type="email" class="my-2 form-control">
      <button @click="updateUser(user.id)" class="my-2 btn btn-primary w-100">Edit</button>
    </div>
    <div v-if="isUpdated" >
      <p class="text-primary my-2 text-center"> updated successfully </p>
    </div>
  </div>
  </div>
</template>

<script>
import UserService from "../../../services/UserService";


export default {
  name: "add-user",
  data() {
    return {
      user: {
        name: "",
        email: "",
        national_id: "",
        image_url:"",
      },
      isUpdated:false
    };
  },
  methods:{
    getUser(id){
      UserService.getById(id)
        .then(response => {
          this.user = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateUser(id){
      this.isUpdated=false;
      UserService.update(id,this.user).then((res)=>{
        console.log(res);
        this.isUpdated=true;
      });
    }
  },
  created(){
      this.getUser(this.$route.params.id);
  }

};
</script>