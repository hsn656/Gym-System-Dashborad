<template>
  <div class="container-fluid bg-white h-100 py-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="onSubmit">
          <Field
            v-model="user.name"
            name="name"
            placeholder="name"
            type="text"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="name" />

          <Field
            v-model="user.email"
            name="email"
            placeholder="email"
            type="email"
            class="my-2 form-control"
            rules="email|required"
          />
          <ErrorMessage class="text-danger small" name="email" />

          <Field
            v-model="user.national_id"
            name="national_id"
            placeholder="national id"
            type="email"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="national_id" />
          <Field
            v-model="user.image_url"
            name="image_url"
            placeholder="image url"
            type="email"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="image_url" />
          <button
            @click="updateUser(user.id)"
            class="my-2 btn btn-primary w-100"
          >
            Edit
          </button>
        </Form>
        <button
          @click="this.$router.push('/users')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to users
        </button>
      </div>
      <div v-if="isUpdated">
        <p class="text-primary my-2 text-center">updated successfully</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../../services/UserService";
import { Form, Field, ErrorMessage } from "vee-validate";
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
      user: {
        id: this.$route.params.id,
        name: "",
        email: "",
        national_id: "",
        image_url: "",
      },
      isUpdated: false,
    };
  },
  methods: {
    onSubmit() {
      this.updateUser(this.user.id);
    },
    getUser(id) {
      UserService.getById(id)
        .then((response) => {
          this.user = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateUser(id) {
      this.isUpdated = false;
      UserService.update(id, this.user).then((res) => {
        if (res.data.isSuccess) {
          Swal.fire({
            text: "updated successfully",
            icon: "success",
            confirmButtonText: "ok",
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
      });
    },
  },
  created() {
    this.getUser(this.$route.params.id);
  },
};
</script>
