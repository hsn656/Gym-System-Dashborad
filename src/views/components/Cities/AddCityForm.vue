<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form>
          <Field v-model="city.name" name="name" placeholder="name" type="text" class="my-2 form-control"
                 rules="required"
          />
          <ErrorMessage class="text-danger small" name="name" />
        </Form>

        <button @click="addCity()" class="my-2 btn btn-primary w-100" :disabled="!checkInputs">Add City</button>
      </div>

    </div>
  </div>
</template>

<script>
import CityService from "../../../services/CityService";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";

export default {
  name: "AddCityManager",
  data() {
    return {
      city: {
        name: ""
      },
      cityManagers: [],
    };
  },
  methods: {
    addCity() {
      let data = {
        name: this.city.name
      };

      CityService.create(data).then(res => {
        console.log(res);
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
      }).catch(err => {
          console.log(err);
      });

    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  computed: {
    checkInputs() {
      return (
        this.city.name
      );
    }
  }
};
</script>