<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="addCoach">
          <Field
            v-model="name"
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

          <div class="text-center mt-3 m-auto">
            <div>
              <img
                :src="getImageSrc"
                alt=""
                ref="imagePH"
                style="
                  max-height: 200px;
                  min-height: 200px;
                  max-width: 200px;
                  min-width: 200px;
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
          <div class="text-center">
            <input
              class="btn btn-success w-100"
              type="submit"
              value="Add coach"
              :disabled="isBeingAdded"
            />
          </div>
        </Form>
        <button
          @click="this.$router.push('/coaches')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to coaches
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CoachService from "../../../services/CoachService";
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
export default {
  name: "add-coach",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      name: "",
      file: "",
      imageSrc: this.$store.state.backEndUrl + "assets/images/noImageYet.jpg",
      isBeingAdded: false,
    };
  },
  computed: {
    getImageSrc() {
      return this.imageSrc;
    },
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = () => {
        this.imageSrc = fr.result;
      };
      fr.readAsDataURL(this.file);
    },
    addCoach() {
      this.isBeingAdded = true;
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.file);
      CoachService.create(formData)
        .then((res) => {
          Swal.fire("Added!", "A coach has been added.", "success").then(() => {
            this.$router.push("/coaches");
          });
          console.log(res);
        })
        .catch(() => {
          Swal.fire("", "something went wrong", "error");
          this.isBeingAdded = false;
        });
    },
  },
};
</script>
