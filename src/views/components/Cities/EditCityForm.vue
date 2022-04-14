<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class=" col-10 col-md-8 col-lg-6">
        <Form>
          <Field v-model="city.name" name="name" placeholder="name" type="text" class="my-2 form-control" />
          <ErrorMessage class="text-danger small" name="name" />
        </Form>
        <button @click="updateCity(city.id)" class="my-2 btn btn-primary w-100">Edit</button>
      </div>
      <div v-if="isUpdated">
        <p class="text-primary my-2 text-center"> updated successfully </p>
      </div>
    </div>
  </div>
</template>

<script>
import CityService from "../../../services/CityService";
import CityManagerService from "../../../services/CityManagerService";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";


export default {
  name: "Edit City Manager",
  data() {
    return {
      city: {
        name: ""
      },
      cityManagers: []
    };
  },
  async created() {
    this.getCity(this.$route.params.id);
    this.getCityManagers();
    console.log(this.cityManagers);
  },
  methods: {
    getCity(id) {
      CityService.getById(id)
        .then(response => {
          console.log(response.data.data);
          this.city.id = response.data.data.id;
          this.city.name = response.data.data.name;
          console.log(this.city);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateCity(id) {
      this.isUpdated = false;
      CityService.update(id, this.city).then((res) => {
        // console.log(res);
        if (res.data.isSuccess) {
          this.$router.push({ name: "Cities" });
        } else {
          let error = Object.values(res.data.errors).reduce((p, n) => p + " & " + n);
          Swal.fire({
            text: error,
            icon: "error",
            confirmButtonText: "ok"
          });
        }
      });
    },
    getCityManagers() {
      CityManagerService.getAll()
        .then(response => {
          this.cityManagers = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  }


};
</script>