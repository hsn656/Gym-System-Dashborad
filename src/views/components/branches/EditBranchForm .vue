<template>
  <div class="container-fluid h-100 bg-white py-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="onSubmit">
          <Field
            v-model="branch.name"
            name="name"
            placeholder="name"
            type="text"
            rules="required"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="name" />
          <div v-if="$store.getters.isAdmin">
            <select v-model="branch.city_id" class="form-select">
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>
          <input
            type="file"
            ref="fileInput"
            name="image"
            @change="onFileChange"
            style="display: none"
          />

          <div class="text-center m-auto mt-2">
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
          <button class="my-2 btn btn-primary w-100">Update Branch</button>
        </Form>
        <button
          @click="this.$router.push('/branches')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to branches
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import CityService from "../../../services/CityService.js";
import BranchService from "../../../services/BranchService";
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
      branch: {
        id: this.$route.params.id,
        name: "",
        city_id: "",
        file: "",
      },
      imageSrc: "",
      cities: {},
    };
  },
  methods: {
    onFileChange(event) {
      this.branch.file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = () => {
        this.imageSrc = fr.result;
      };
      fr.readAsDataURL(this.branch.file);
    },
    onSubmit() {
      this.updateBranch();
    },
    getCities() {
      CityService.getAll().then((res) => {
        console.log(res);
        this.cities = res.data;
      });
    },
    updateBranch() {
      const formData = new FormData();
      formData.append("id", this.branch.id);
      formData.append("name", this.branch.name);
      formData.append("city_id", this.branch.city_id);
      formData.append("image", this.branch.file);
      BranchService.update(this.branch.id, formData)
        .then((res) => {
          console.log(res);
          if (res.data.isSuccess) {
            Swal.fire({
              text: "updated successfully",
              icon: "success",
              confirmButtonText: "ok",
            }).then(() => {
              this.$router.push("/branches");
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
    getBranch() {
      BranchService.getById(this.branch.id)
        .then((response) => {
          this.branch = response.data.data;
          this.imageSrc = this.$store.state.backEndUrl + response.data.data.img;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    if (this.$store.getters.isAdmin) this.getCities();
    else this.branch.city_id = this.$store.getters.getPayLoad.city_id;
    this.getBranch();
  },
  computed: {
    getImageSrc() {
      return this.imageSrc;
    },
  },
};
</script>
