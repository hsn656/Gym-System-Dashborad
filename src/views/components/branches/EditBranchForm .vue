<template>
  <div class="container-fluid h-100 bg-white py-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="onSubmit">
          <Field
            v-model="branch.name"
            name="name"
            placeholder="name"
            type="text"
            rules="required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="name" />
          <div v-if="$store.getters.isAdmin">
            <select v-model="branch.city_id" class="form-select">
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>
          <button class="my-2 btn btn-primary w-100">Update Branch</button>
        </Form>
        <button
          @click="this.$router.push('/branches')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to branches
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import CityService from "../../../services/CityService.js";
import BranchService from "../../../services/BranchService";
import Swal from "sweetalert2";


export default {
  name: "add-user",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      branch: {
        id: this.$route.params.id,
        name: "",
        city_id: "",
      },
      cities: {},
    };
  },
  methods: {
    onSubmit() {
      this.updateBranch();
    },
    getCities() {
      CityService.getAll().then((res) => {
        console.log(res);
        this.cities = res.data;
      });
    },
    updateBranch() {
      BranchService.update(this.branch.id, this.branch).then((res) => {
        console.log(res);
        if (res.data.isSuccess) {
          Swal.fire({
            text: "updated successfully",
            icon: "success",
            confirmButtonText: "ok",
          }).then(() => {
            this.$router.push("/branches");
          });
        } else {
          let error = Object.values(res.data.errors).reduce(
            (p, n) => p + " & " + n
          );
          Swal.fire({
            text: error,
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      }).catch(err=>{
        console.log(err);
      });
    },
    getBranch() {
      BranchService.getById(this.branch.id)
        .then((response) => {
          this.branch = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getCities();
    this.getBranch();
  },
};
</script>
