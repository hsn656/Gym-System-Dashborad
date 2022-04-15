<template>
  <div class="container-fluid" >
    <div class="row justify-content-center">
      <div class=" col-10 col-md-8 col-lg-6">
        <Form @submit="addSession">
          <Field v-model="name" name="name" placeholder="name" type="text" class="my-2 form-control" rules="required"/>
          <ErrorMessage class="text-danger small" name="name" /><br>
          <div v-if="$store.getters.isAdmin">
            <label>City name: </label>
            <select class="form-select" v-model="cityId" @change="getBranches">
              <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
            </select>
          </div>
          <div v-if="cityId">
            <label>Branch name: </label>
            <select class="form-select" name="branches" id="branches" v-model="branchId">
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
          </div>
          <label>Date:</label>
          <div class="row">
            <div class="col-12">
              <Field name="start_date" placeholder="name" type="date" class="my-2 form-control" v-model="startDate" rules="required"/>
              <ErrorMessage class="text-danger small" name="start_date" /><br>
            </div>
          </div>
          <label>Time:</label>
          <div class="row">
            <div class="col-6">
              <Field name="start_time"  type="time" class="my-2 form-control col-4" v-model="startTime" />
            </div>
            <div class="col-6">
              <Field name="end_time"  type="time" class="my-2 form-control" v-model="endTime" />
            </div>
          </div>
          <label class="form-label" style="color:green">Time must be of HOUR:MINUTE:AM/PM pattern</label><br>
          <label>Coaches:</label>
          <div class="row">
            <div v-for="coach in coaches" class="form-group col-4" :key="coach.id">
              <label class="form-label mx-2">{{coach.name}}</label>
              <Field type="checkbox" name="coaches" :value="coach.id" v-model="inputCoaches"/>
            </div>
          </div>
          <div class="text-center">
            <input class="btn btn-success" type="submit" value="Add session" />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import SessionService from "../../../services/SessionService";
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
import CityService from "../../../services/CityService";
import BranchService from "../../../services/BranchService";
export default {
  name: "AddSessionForm2",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data(){
    return {
      coaches: [],
      branches: [],
      name: "",
      branchId: "",
      startDate: "",
      startTime: "",
      endTime:"",
      inputCoaches: [],
      cities: [],
      cityId: "",

    }
  },
  async created(){
    this.getCities();
    this.getCoaches();
    if(this.$store.getters.getPayLoad["role"] == "city manager"){
      this.cityId = this.$store.getters.getPayLoad["city_id"]
      this.getBranches();
    }
     if(this.$store.getters.getPayLoad["role"] == "branch manager"){
      this.branchId = this.$store.getters.getPayLoad["branch_id"]
    }
    },
  methods: {
    getBranches(){
      BranchService.getByCityId(this.cityId)
        .then(response => {
          this.branches = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCoaches(){
      SessionService.getcoaches().then(response =>{
        this.coaches = response.data.data
      });
    },
    getCities() {
      CityService.getAll()
        .then(response => {
          this.cities = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
    ,addSession(){
          let Data = {
              name: this.name,
              branch_id: this.branchId,
              start_time: this.startDate+" "+ this.startTime,
              end_time: this.startDate+" "+ this.endTime,
              coaches: this.inputCoaches
            }
            SessionService.create(Data).then(res=>{
              console.log(res)
              if (res.data.isSuccess) {
                Swal.fire(
                  'Created!',
                  'Your Session has been created.',
                  'success'
                ).then(()=>{
                  this.$router.push("/sessions")
                })
              } else {
                let error= Object.values(res.data.errors).reduce((p,n)=>p+" & "+n);
                Swal.fire({
                  text:  error,
                  icon: "error",
                  confirmButtonText: "ok",
                });
              }
            }).catch(err=>{
            console.log(err);
      })
    }
  }
};
</script>

<style scoped>

</style>