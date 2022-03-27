<template>
<div class="conatiner mx-4">
 <a class="btn btn-success mb-3 ">Add package</a>
 <a class="btn btn-primary mb-3 mx-3">Buy package to user</a>
 <div class="row d-flex">
 <div v-for="traningPackage in packages" :key="traningPackage.id" class="card mx-2 mb-3" style="width: 18rem;">
  <div class="card-body">
    <img src="https://via.placeholder.com/150" class="card-img-top" alt="">
    <h5 class="card-title">{{ traningPackage.name }}</h5>
    <h5 class="card-text">price: {{ traningPackage.price }}</h5>
    <h5 class="card-text">{{ traningPackage.number_of_sessions }} sessions</h5>
    <div class="d-flex justify-content-between">
        <a href="#" class="btn btn-info">Edit</a>
        <button class="btn btn-danger" @click="deletePackage(traningPackage.id)">Delete</button>
        
    </div>
  </div>
 </div>
 </div>



</div>
 
</template>

<script>
import PackageService from "../../../services/PackageService";

export default {
    data() {
    return {
      packages:[]
    };
  },

  async created(){
    this.getPackages();
  },
    
  methods:{
      getPackages() {
      PackageService.getAll()
        .then(response => {
          this.packages = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePackage(id){
      if (!confirm("are you sure?")) return;

      PackageService.delete(id).then(res=>{
          console.log(res);
          this.packages=this.packages.filter(packages=>packages.id!==id);
        }).catch(err=>{
          console.log(err);
        });
    },
  }

}


</script>

<style>

</style>