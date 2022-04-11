<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="addBranchManager">
          <Field
            v-model="branchManager.name"
            name="name"
            placeholder="name"
            type="text"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="name" />
          <Field
            v-model="branchManager.email"
            name="email"
            placeholder="email"
            type="email"
            class="my-2 form-control"
            rules="email|required"
          />
          <ErrorMessage class="text-danger small" name="email" />
          <Field
            v-model="branchManager.national_id"
            name="national_id"
            placeholder="national id"
            type="text"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="national_id" />
          <Field
            v-model="branchManager.image_url"
            name="image_url"
            placeholder="image url"
            type="text"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="image_url" />
          <Field
            v-model="branchManager.password"
            name="password"
            placeholder="password"
            type="password"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="password" />
          <div v-if="$store.getters.isAdmin">
            <select
              name="city"
              @change="getBranches"
              v-model="city_id"
              class="form-select"
            >
              <option value="all" selected disabled>select city</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>

          <select
            class="form-select mt-2"
            v-model="selectedBranch"
            @change="branchData"
            name="branch"
          >
            <option selected disabled value="">Select branch</option>
            <option
              v-for="branch in branches"
              :key="branch.id"
              :value="branch.id"
            >
              {{ branch.name }}
            </option>
          </select>

          <button class="my-2 btn btn-primary w-100">Add Branch Manager</button>
        </Form>
      </div>

      <div v-if="isAdded">
        <p class="text-primary my-2 text-center">added successfully</p>
      </div>
    </div>
  </div>
</template>

<script>
import BranchManagerService from "@/services/BranchManagerService";
import CityService from "../../../services/CityService.js";
import BranchService from "../../../services/BranchService.js";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "AddCityManager",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      branchManager: {
        name: "",
        email: "",
        national_id: "",
        image_url: "",
        password: "",
      },
      city_id: "all",
      cities: [],
      branches: [],
      Added: false,
      selectedBranch: "",
    };
  },
  computed: {
    isAdded() {
      return this.Added;
    },
  },
  async created() {
    this.getCities();
    this.getBranches();
  },
  methods: {
    getCities() {
      CityService.getAll().then((res) => {
        this.cities = res.data;
        console.log(this.cities);
        // this.city_id = this.cities[0]?.id;
      });
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "This field is required";
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }
      // All is good
      return true;
    },
    addBranchManager() {
      let data = {
        name: this.branchManager.name,
        email: this.branchManager.email,
        national_id: this.branchManager.national_id,
        image_url: this.branchManager.image_url,
        password: this.branchManager.password,
        branch_id: this.selectedBranch,
      };

      BranchManagerService.create(data)
        .then((res) => {
          if (res.data == "branch manager added") {
            this.Added = true;
            console.log(this.Updated);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBranches() {
      console.log(this.city_id);
      BranchService.getSomeByCityId(this.city_id)
        .then((response) => {
          this.rerenderTableBody(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    branchData() {
      console.log(this.selectedBranch);
    },
    rerenderTableBody(response) {
      this.branches = response.data.data.data;
      this.links = response.data.data.links;
    },
  },
};
</script>