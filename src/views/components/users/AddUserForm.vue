<template>
  <div class="container-fluid" >
    <div class="row justify-content-center">
    <div class=" col-10 col-md-8 col-lg-6" >
      <input  v-model="user.name" name="name" placeholder="name" type="text" class="my-2 form-control">
      <input  v-model="user.email" name="email" placeholder="email" type="email" class="my-2 form-control">
      <input  v-model="user.national_id" name="national_id" placeholder="national id" type="email" class="my-2 form-control">
      <input  v-model="user.image_url" name="image_url" placeholder="image url" type="email" class="my-2 form-control">
      <input v-model="user.password" name="password" placeholder="password" type="password" class="my-2 form-control">
      <button @click="addUser()" class="my-2 btn btn-primary w-100">Add user</button>
    </div>
    <div v-if="isAdded" >
      <p class="text-primary my-2 text-center"> added successfully </p>
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
        password:""
      },
      isAdded:false
    };
  },
  methods:{
    addUser(){
      let data = {
        name: this.user.name,
        email: this.user.email,
        national_id:this.user.national_id,
        image_url:this.user.image_url,
        password:this.user.password 
      };

      UserService.create(data).then(res=>{
          console.log(res);
          this.isAdded=true;
        }).catch(err=>{
          console.log(err);
        })

    }
  }

};
</script>