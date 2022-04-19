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
        <button @click="updateCity(city.id)" class="my-2 btn btn-success w-100">
          Edit
        </button>
        <button
          @click="this.$router.push('/cities')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to cities
        </button>
      </div>
      <div v-if="isUpdated">
        <p class="text-primary my-2 text-center">updated successfully</p>
      </div>
    </div>
  </div>
</template>

<script>
import CityService from "../../../services/CityService";
import CityManagerService from "../../../services/CityManagerService";
import { ErrorMessage, Field, Form } from "vee-validate";
import Swal from "sweetalert2";

export default {
  name: "Edit City Manager",
  data() {
    return {
      city: {
        name: "",
        file: "",
      },
      cityManagers: [],
      imageSrc: "",
    };
  },
  async created() {
    this.getCity(this.$route.params.id);
    this.getCityManagers();
    console.log(this.cityManagers);
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
    getCity(id) {
      CityService.getById(id)
        .then((response) => {
          this.city.id = response.data.data.id;
          this.city.name = response.data.data.name;
          this.imageSrc =
            this.$store.state.backEndUrl + response.data.data.image_url;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateCity(id) {
      this.isUpdated = false;
      const formData = new FormData();
      formData.append("name", this.city.name);
      formData.append("image", this.city.file);
      CityService.update(id, formData).then((res) => {
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
      });
    },
    getCityManagers() {
      CityManagerService.getAll()
        .then((response) => {
          this.cityManagers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    getImageSrc() {
      return this.imageSrc;
    },
  },
};
</script>
