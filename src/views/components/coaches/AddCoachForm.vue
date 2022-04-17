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
          <ErrorMessage class="text-danger small" name="name" /><br />
          <div class="text-center mt-5">
            <input class="btn btn-success" type="submit" value="Add coach" />
          </div>
        </Form>
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
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.file);
      CoachService.create(formData).then((res) => {
        Swal.fire("Added!", "A coach has been added.", "success").then(() => {
          this.$router.push("/coaches");
        });
        console.log(res);
      });
      // }
    },
  },
};
</script>
