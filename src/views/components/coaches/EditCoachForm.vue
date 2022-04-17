<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="editCoach($route.params.id)">
          <Field
            v-model="name"
            name="name"
            placeholder="name"
            type="text"
            class="my-2 form-control"
          />
          <ErrorMessage class="text-danger small" name="name" /><br />
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
              :disabled="isBeingUpdated"
              class="btn btn-success w-100"
              type="submit"
              value="Edit Coach"
            />
          </div>
        </Form>
        <button
          @click="this.$router.push('/coaches')"
          class="my-2 btn btn-secondary w-100"
        >
          Back to users
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
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      name: "",
      imageSrc: "",
      file: "",
      isBeingUpdated: false,
    };
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
    getCoach() {
      CoachService.getById(this.$route.params.id).then((res) => {
        this.name = res.data.name;
        this.imageSrc = this.$store.state.backEndUrl + res.data.image_url;
      });
    },
    editCoach(id) {
      this.isBeingUpdated = true;
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", this.name);
      formData.append("image", this.file);

      CoachService.update(formData, id)
        .then(() => {
          Swal.fire("Edited!", "A coach has been Edited.", "success").then(
            () => {
              this.$router.push("/coaches");
            }
          );
        })
        .catch(() => {
          Swal.fire("", "something went wrong", "error");
          this.isBeingUpdated = false;
        });
    },
  },
  async created() {
    await this.getCoach();
  },
  computed: {
    getImageSrc() {
      return this.imageSrc;
    },
  },
};
</script>
