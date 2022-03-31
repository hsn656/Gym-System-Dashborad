<template>
  <a
    class="btn btn-success mb-3"
    data-bs-target="#addPackageModal"
    data-bs-toggle="modal"
    >Add package</a
  >

  <!-- modal -->
  <div
    class="modal fade"
    id="addPackageModal"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Add new training package</h5>
        </div>
        <div class="modal-body">
          <form enctype="multipart/form-data">
            <input
              type="text"
              class="form-control my-2"
              v-model="name"
              placeholder="Name"
              required
            />
            <input
              type="text"
              class="form-control my-2"
              v-model="price"
              placeholder="Price"
              required
            />
            <input
              type="text"
              class="form-control my-2"
              v-model="number_of_sessions"
              placeholder="Number of sessions"
              required
            />
            <input
              type="file"
              ref="fileInput"
              name="file"
              @change="onFileChange"
              style="display: none"
            />

            <input
              type="button"
              value="Browse..."
              @click="this.$refs.fileInput.click()"
            />

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
          </form>
        </div>
        <div class="moda-footer d-flex flex-row-reverse px-3">
          <button
            class="btn btn-danger ms-3"
            data-bs-dismiss="modal"
            @click="clearForm()"
          >
            Cancel
          </button>
          <input
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="addPackage()"
            type="submit"
            value="Add"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PackageService from "../../../services/PackageService";

export default {
  data() {
    return {
      name: "",
      price: "",
      number_of_sessions: "",
      file: "",
      imageSrc: "https://via.placeholder.com/150/150",
      //   isAdded: false,
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
      console.log(event.target.files);
      var fr = new FileReader();
      fr.onload = () => {
        this.imageSrc = fr.result;
      };
      fr.readAsDataURL(this.file);
    },

    addPackage() {
      const formData = new FormData();
      if (
        this.name == "" ||
        this.price == "" ||
        this.number_of_sessions == ""
      ) {
        alert("all fields are required !");
      } else {
        // let data = {
        //   name: this.name,
        //   price: this.price,
        //   number_of_sessions: this.number_of_sessions,
        // };
        formData.append("name", this.name);
        formData.append("price", this.price);
        formData.append("number_of_sessions", this.number_of_sessions);
        formData.append("image", this.file);

        PackageService.create(formData)
          .then((res) => {
            // this.isAdded = true;
            // console.log(this.isAdded);
            if (res.data == "Package was created successfully") {
              this.$emit("add-package");
            } else {
              alert("invalid input, please try again");
            }
            this.clearForm();
            // this.isAdded = false;
            // console.log(this.isAdded);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    clearForm() {
      this.name = "";
      this.price = "";
      this.number_of_sessions = "";
      this.file = "";
      this.imageSrc = "https://via.placeholder.com/150/150";
    },
  },

  emits: ["addPackage"],
};
</script>

<style scoped>
.formImage {
  margin-left: 50px;
}
</style>
