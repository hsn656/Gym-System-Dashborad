<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form>
          <Field
            v-model="cityManager.name"
            name="name"
            placeholder="name"
            type="text"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="name" />

          <Field
            v-model="cityManager.email"
            name="email"
            placeholder="email"
            type="email"
            class="my-2 form-control"
            rules="required|email"
          />
          <ErrorMessage class="text-danger small" name="email" />

          <Field
            v-model="cityManager.national_id"
            name="national_id"
            placeholder="national id"
            type="email"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="national_id" />

          <Field
            v-model="cityManager.image_url"
            name="image_url"
            placeholder="image url"
            type="email"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="image_url" />

          <Field
            v-model="cityManager.password"
            name="password"
            placeholder="password"
            type="password"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="password" />
          <div>
            <label for="city">City</label>
            <select id="city" class="form-select w-100" v-model="cityManager.city_id">
              <option v-for="city in newCities" :key="city.id" v-bind:value="city.id">{{ city.name }}</option>
            </select>
          </div>
        </Form>
        <button
          :disabled="!checkInputs"
          class="my-2 btn btn-primary w-100"
          @click="addCityManager()"
        >
          Add City Manager
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import CityManagerService from "@/services/CityManagerService";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";
import CityService from "../../../services/CityService";

export default {
  name: "AddCityManager",
  data() {
    return {
      cityManager: {
        name: "",
        email: "",
        national_id: "",
        image_url: "",
        password: "",
        city_id: ""
      },
      newCities: []
    };
  },
  async created() {
    this.getCities();
  },
  computed: {
    checkInputs() {
      return (
        this.cityManager.name &&
        this.cityManager.email &&
        this.cityManager.national_id &&
        this.cityManager.password &&
        this.cityManager.city_id
      );
    }
  },
  methods: {
    addCityManager() {
      CityManagerService.create(this.cityManager)
        .then((res) => {
          if (res.data.isSuccess) {
            this.$router.push({ name: "CityManagers" });
          } else {
            let error = Object.values(res.data.errors).reduce((p, n) => p + " & " + n);
            Swal.fire({
              text: error,
              icon: "error",
              confirmButtonText: "ok"
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCities() {
      CityService.getNewCities().then((response) => {
        this.newCities = response.data.data;
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
