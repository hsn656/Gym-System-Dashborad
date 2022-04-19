<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form>
          <Field
            v-model="city.name"
            name="name"
            placeholder="name"
            type="text"
            class="my-2 form-control"
            rules="required"
          />
          <ErrorMessage class="text-danger small" name="name" />

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
        </Form>
        <button
          @click="addCity()"
          class="my-2 btn btn-success w-100"
          :disabled="!checkInputs"
        >
          Add City
        </button>
         <button
          @click="this.$router.push('/cities')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to cities
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CityService from "../../../services/CityService";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";

export default {
  name: "AddCityManager",
  data() {
    return {
      city: {
        name: "",
        file: "",
      },
      cityManagers: [],
      imageSrc: this.$store.state.backEndUrl + "assets/images/noImageYet.jpg",
    };
  },
  methods: {
    onFileChange(event) {
      this.city.file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = () => {
        this.imageSrc = fr.result;
      };
      fr.readAsDataURL(this.city.file);
    },
    addCity() {
      const formData = new FormData();
      formData.append("name", this.city.name);
      formData.append("image", this.city.file);

      CityService.create(formData)
        .then((res) => {
          console.log(res);
          if (res.data.isSuccess) {
            this.$router.push({ name: "Cities" });
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
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    checkInputs() {
      return this.city.name;
    },
    getImageSrc() {
      return this.imageSrc;
    },
  },
};
</script>
