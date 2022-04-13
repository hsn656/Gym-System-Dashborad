<template>
  <div class="container-fluid bg-white h-100 py-4">
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
            v-model="user.password"
            name="password"
            placeholder="password"
            type="password"
            rules="required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="password" />
          <input
            type="file"
            ref="fileInput"
            name="image"
            @change="onFileChange"
            style="display: none"
          />

          <div class="text-center m-auto">
            <div>
              <img
                :src="getImageSrc"
                alt=""
                ref="imagePH"
                style="
                  max-height: 120px;
                  min-height: 120px;
                  max-width: 120px;
                  min-width: 120px;
                "
                class="formImage"
              />
            </div>
            <div class="mt-2">
              <input
                type="button"
                class="btn btn-secondary"
                value="Browse..."
                @click="this.$refs.fileInput.click()"
              />
            </div>
          </div>
          <button class="my-2 btn btn-primary w-100">Add user</button>
        </Form>
        <button
          @click="this.$router.push('/users')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to users
        </button>
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
        password: "",
        file: "",
      },
      imageSrc: this.$store.state.backEndUrl + "assets/images/noImageYet.jpg",
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      this.addUser();
    },
    onFileChange(event) {
      this.user.file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = () => {
        this.imageSrc = fr.result;
      };
      fr.readAsDataURL(this.user.file);
    },
    addUser() {

      const formData = new FormData();
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("national_id", this.user.national_id);
      formData.append("password", this.user.password);
      formData.append("image", this.user.file);
      UserService.create(formData)
        .then((res) => {
          console.log(res);
          if (res.data.isSuccess) {
            Swal.fire({
              text: "created successfully",
              icon: "success",
              confirmButtonText: "ok",
            }).then(() => {
              this.$router.push("/users");
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    getImageSrc() {
      return this.imageSrc;
    },
  },
};
</script>
