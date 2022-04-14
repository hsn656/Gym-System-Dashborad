<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="updateBranchManager(branchManager.id)">
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
            type="email"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="national_id" />
          <Field
            v-model="branchManager.image_url"
            name="image_url"
            placeholder="image url"
            type="email"
            class="my-2 form-control"
          />

          <button class="my-2 btn btn-primary w-100">Edit</button>
        </Form>
      </div>
      <div v-if="isUpdated">
        <p class="text-primary my-2 text-center">updated successfully</p>
      </div>
    </div>
  </div>
</template>

<script>
import BranchManagerService from "@/services/BranchManagerService";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "Edit City Manager",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      branchManager: {
        id: "",
        name: "",
        email: "",
        national_id: "",
        image_url: "",
      },
      Updated: false,
    };
  },
  computed: {
    isUpdated() {
      return this.Updated;
    },
  },
  methods: {
    getBranchManager(id) {
      BranchManagerService.getById(id)
        .then((response) => {
          console.log(response.data);
          this.branchManager.id = response.data.id;
          this.branchManager.name = response.data.name;
          this.branchManager.email = response.data.email;
          this.branchManager.national_id = response.data.national_id;
          this.branchManager.image_url = response.data.image_url;
          console.log(this.branchManager);
        })
        .catch((e) => {
          console.log(e);
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
    updateBranchManager(id) {
      BranchManagerService.update(id, this.branchManager).then((res) => {
        if (res.data == "branch manager updated") {
          this.Updated = true;
          console.log(this.Updated);
        }
        console.log(res);
      });
    },
  },
  async created() {
    this.getBranchManager(this.$route.params.id);
  },
};
</script>