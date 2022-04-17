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
          <div v-if="$store.getters.isAdmin" class="w-25 mt-4 mx-3 d-inline">
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

          <div class="text-center m-auto">
            <div >
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

          <button :disabled="isBeingAdded" class="my-2 btn btn-primary w-100">Add Branch</button>
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
import BranchService from "../../../services/BranchService.js";
import CityService from "../../../services/CityService.js";
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
      branch: {
        name: "",
        city_id: "",
        file:""
      },
      cities: {},
      imageSrc: "http://127.0.0.1:8000/assets/images/noImageYet.jpg",
      isBeingAdded:false
    };
  },
  created() {
    if (this.$store.getters.isAdmin) this.getCities();
    else this.branch.city_id = this.$store.getters.getPayLoad.city_id;
  },
  methods: {
    onSubmit() {
      this.addBranch();
    },
     onFileChange(event) {
      this.branch.file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = () => {
        this.imageSrc = fr.result;
      };
      fr.readAsDataURL(this.branch.file);
    },
    addBranch() {
      this.isBeingAdded=true;
      const formData = new FormData();
      formData.append("name",this.branch.name);
      formData.append("city_id",this.branch.city_id);
      formData.append("image",this.branch.file);
      BranchService.create(formData)
        .then((res) => {
          console.log(res);
          if (res.data.isSuccess) {
            Swal.fire({
              text: "created successfully",
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
          this.isBeingAdded=false;
        })
        .catch((err) => {
          console.log(err);
          this.isBeingAdded=false;
        });
    },
    getCities() {
      CityService.getAll().then((res) => {
        console.log(res);
        this.cities = res.data.data;
        this.branch.city_id = this.cities[0]?.id;
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
