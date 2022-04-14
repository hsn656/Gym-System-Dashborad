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


        </Form>
        <button
          @click="updateCityManager(cityManager.id)"
          class="my-2 btn btn-primary w-100"
          :disabled="!checkInputs"
        >
          Edit
        </button>
      </div>
      <div v-if="isUpdated">
        <p class="text-primary my-2 text-center">updated successfully</p>
      </div>
    </div>
  </div>
</template>

<script>
import CityManagerService from "@/services/CityManagerService";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";


export default {
  name: "Edit City Manager",
  data() {
    return {
      cityManager: {
        name: "",
        email: "",
        national_id: "",
        image_url: ""
      },
      isUpdated: false
    };
  },
  methods: {
    getCityManager(id) {
      CityManagerService.getById(id)
        .then((response) => {
          this.cityManager = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateCityManager(id) {
      this.isUpdated = false;
      CityManagerService.update(id, this.cityManager).then((res) => {
        this.isUpdated = true;
        if (res.data.isSuccess) {
          this.$router.push({ name: 'CityManagers' })
          this.isUpdated = true;
        } else {
          let error = Object.values(res.data.errors).reduce(
            (p, n) => p + " & " + n
          );
          Swal.fire({
            text: error,
            icon: "error",
            confirmButtonText: "ok"
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  created() {
    this.getCityManager(this.$route.params.id);
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  computed: {
    checkInputs() {
      return (
        this.cityManager.name &&
        this.cityManager.email &&
        this.cityManager.national_id
      );
    }
  }
};
</script>
