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
                class="btn btn-primary"
                value="Browse..."
                @click="this.$refs.fileInput.click()"
              />
            </div>
          </div>
          <button
            @click="updateUser(user.id)"
            :disabled="isBeingUpdated"
            class="my-2 btn btn-success w-100"
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
        file: "",
      },
      imageSrc: "",
      isBeingUpdated:false
    };
  },
  methods: {
    onFileChange(event) {
      this.user.file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = () => {
        this.imageSrc = fr.result;
      };
      fr.readAsDataURL(this.user.file);
    },
    onSubmit() {
      this.updateUser(this.user.id);
    },
    getUser(id) {
      UserService.getById(id)
        .then((response) => {
          this.user = response.data.data;
          this.imageSrc =
            this.$store.state.backEndUrl + response.data.data.image_url;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateUser(id) {
      this.isBeingUpdated=true;
      const formData = new FormData();
      formData.append("id", this.user.id);
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("national_id", this.user.national_id);
      formData.append("image", this.user.file);
      UserService.update(id, formData).then((res) => {
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
        this.isBeingUpdated=false;
      });
    },
  },
  created() {
    this.getUser(this.$route.params.id);
  },
  computed: {
    getImageSrc() {
      return this.imageSrc;
    },
  },
};
</script>
