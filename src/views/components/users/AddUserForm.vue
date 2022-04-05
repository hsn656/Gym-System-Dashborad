<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="onSubmit">
          <Field
            v-model="user.name"
            name="name"
            placeholder="name"
            type="text"
            rules="required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="name" />
          <Field
            v-model="user.email"
            name="email"
            placeholder="email"
            type="email"
            rules="email|required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="email" />
          <!-- <ErrorMessage name="email" v-slot="{ msg='not valid email' }">
            <p class="text-danger small">{{ msg }}</p>
          </ErrorMessage> -->
          <Field
            v-model="user.national_id"
            name="national_id"
            placeholder="national id"
            type="email"
            rules="required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="national_id" />
          <Field
            v-model="user.image_url"
            name="image_url"
            placeholder="image url"
            type="text"
            rules="required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="image_url" />
          <Field
            v-model="user.password"
            name="password"
            placeholder="password"
            type="password"
            rules="required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="password" />
          <button class="my-2 btn btn-primary w-100">Add user</button>
        </Form>
      </div>
      <div v-if="isAdded">
        <p class="text-primary my-2 text-center">added successfully</p>
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
        name: "",
        email: "",
        national_id: "",
        image_url: "",
        password: "",
      },
      isAdded: false,
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      this.addUser();
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
    addUser() {
      let data = {
        name: this.user.name,
        email: this.user.email,
        national_id: this.user.national_id,
        image_url: this.user.image_url,
        password: this.user.password,
      };
      console.log(data);
      UserService.create(data)
        .then((res) => {
          console.log(res);
          if (res.data.isSuccess) this.isAdded = true;
          else {
            let error= Object.values(res.data.errors).reduce((p,n)=>p+" & "+n);
            Swal.fire({
              text:  error,
              icon: "error",
              confirmButtonText: "ok",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
