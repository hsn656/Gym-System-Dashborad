<template>
  <div class="conatiner mx-4">
    <!-- <a class="btn btn-success mb-3 ">Add package</a> -->
    <add-component @add-package="updatePackageArray" />
    <a class="btn btn-primary mb-3 mx-3">Buy package to user</a>
    <div class="row d-flex">
      <div
        v-for="traningPackage in packages"
        :key="traningPackage.id"
        class="card mx-2 mb-3"
        style="width: 18rem"
      >
        <div class="card-body">
          <img
            src="https://via.placeholder.com/150"
            class="card-img-top"
            alt=""
          />
          <h5 class="card-title">{{ traningPackage.name }}</h5>
          <h5 class="card-text">price: {{ traningPackage.price }}</h5>
          <h5 class="card-text">
            {{ traningPackage.number_of_sessions }} sessions
          </h5>
          <div class="d-flex justify-content-between">
            <a
              href="#"
              class="btn btn-info"
              data-bs-target="#editPackageModal"
              data-bs-toggle="modal"
              @click="fillForm(traningPackage.id)"
              >Edit</a
            >
            <!-- <a href="#" class="btn btn-primary">Subscribe</a> -->
            <button
              class="btn btn-danger"
              @click="deletePackage(traningPackage.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- edit modal -->
  <div
    class="modal fade"
    id="editPackageModal"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Edit training package</h5>
        </div>
        <div class="modal-body">
          <form>
            <input type="hidden" v-model="id" />
            <input type="text" class="form-control my-2" v-model="name" />
            <input type="text" class="form-control my-2" v-model="price" />
            <input
              type="text"
              class="form-control my-2"
              v-model="number_of_sessions"
            />
          </form>
        </div>
        <div class="moda-footer d-flex flex-row-reverse px-3">
          <button class="btn btn-danger ms-3" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="updatePackage(packageId)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PackageService from "../../../services/PackageService";
import addComponent from "./AddPackage.vue";
export default {
  data() {
    return {
      packages: [],
      name: "",
      price: "",
      number_of_sessions: "",
      packageId: "",
      id: "",
    };
  },

  components: {
    addComponent,
  },

  async created() {
    this.getPackages();
  },

  methods: {
    getPackages() {
      PackageService.getAll()
        .then((response) => {
          this.packages = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePackage(id) {
      if (!confirm("are you sure?")) return;

      PackageService.delete(id)
        .then((res) => {
          console.log(res);
          this.packages = this.packages.filter(
            (packages) => packages.id !== id
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // try to refactor
    async updatePackageArray() {
      this.getPackages();
    },

    fillForm(_id) {
      this.id = this.packages.find((p) => p.id == _id).id;
      this.name = this.packages.find((p) => p.id == _id).name;
      this.price = this.packages.find((p) => p.id == _id).price;
      this.number_of_sessions = this.packages.find(
        (p) => p.id == _id
      ).number_of_sessions;
      this.packageId = _id;
      console.log(this.id);
    },

    updatePackage(_id) {
      if (
        this.name == "" ||
        this.price == "" ||
        this.number_of_sessions == ""
      ) {
        alert("all fields are required !");
      } else {
        let data = {
          name: this.name,
          price: this.price,
          number_of_sessions: this.number_of_sessions,
        };

        PackageService.update(_id, data)
          .then((res) => {
            if (res.data == "Package was updated successfully") {
              this.packages = this.packages.map((p) =>
                p.id == _id
                  ? {
                      id: this.id,
                      name: this.name,
                      price: this.price,
                      number_of_sessions: this.number_of_sessions,
                    }
                  : p
              );
            }

            console.log(res);
            console.log(this.id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  emits: ["add-package"],
};
</script>

<style>
</style>