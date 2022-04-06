<template>
  <a
    class="btn btn-primary mb-3 mx-3"
    data-bs-target="#buyPackageModal"
    data-bs-toggle="modal"
    >Buy package to user
  </a>

  <!-- modal -->
  <div
    class="modal fade"
    id="buyPackageModal"
    data-bs-keyboard="false"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Buy package to user</h5>
        </div>
        <div class="modal-body">
          <form enctype="multipart/form-data">
            <input
              type="text"
              list="users"
              placeholder="Enter user name"
              class="form-control"
              @keyup="getSearch"
              v-model="selectedUserName"
            />
            <datalist id="users">
              <option v-for="user in users" :key="user.id">
                {{ user.name }}
              </option>
            </datalist>
            <div class="d-flex justify-content-around my-2">
              <select
                id="branchSelect"
                class="form-select"
                v-model="selectedBranch"
              >
                <option selected disabled value="">Select Branch</option>
                <option
                  v-for="branch in branches"
                  :key="branch.id"
                  :value="branch.id"
                  @change="this.selectedBranch = branch.id"
                >
                  {{ branch.name }}
                </option>
              </select>

              <select
                class="form-select"
                v-model="selectedPackage"
                @change="packageData"
                id="packageSelect"
              >
                <option selected disabled value="">Select Package</option>
                <option
                  v-for="traningPackage in packages"
                  :key="traningPackage.id"
                  :value="traningPackage.id"
                >
                  {{ traningPackage.name }}
                </option>
              </select>
            </div>
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
            @click="buyPackage(selectedUserName)"
            type="submit"
            value="Buy package"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BranchService from "../../../services/BranchService.js";
import UserService from "@/services/UserService";
import BuyPackageService from "@/services/BuyPackageService";

export default {
  data() {
    return {
      branches: [],
      users: [],
      selectedBranch: "",
      selectedPackage: "",
      selectedPackagePrice: "",
      packageSessions: "",
      selectedUserName: "",
      userid: "",
      search: "",
      //   branchUsers: "",
    };
  },
  props: ["packages"],
  async created() {
    this.getbranches();
  },
  methods: {
    getbranches() {
      BranchService.getSomeByCityId()
        .then((response) => {
          this.branches = response.data.data.data;
          console.log(response.data.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // getBranchUsers(branch) {
    //     BranchService.getBranchUsers(branch)
    //     .then((res))
    // },

    getSearch() {
      this.search = this.selectedUserName;
      UserService.getSome(null, this.search)
        .then((response) => {
          this.users = response.data.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    packageData() {
      this.selectedPackagePrice = this.packages.find(
        (p) => p.id == this.selectedPackage
      ).price;
      this.packageSessions = this.packages.find(
        (p) => p.id == this.selectedPackage
      ).number_of_sessions;
    },

    buyPackage(userName) {
      this.userid = this.users.find((u) => u.name == userName).id;

      let data = {
        package_id: this.selectedPackage,
        user_id: this.userid,
        branch_id: this.selectedBranch,
        enrollement_price: this.selectedPackagePrice,
        remianing_sessions: this.packageSessions,
      };

      BuyPackageService.create(data)
        .then((res) => {
          if (res.data.data.result == "transaction completed successfully") {
            alert("transaction completed successfully");
          } else {
            alert("something went wrong, please try again later");
          }
          console.log(res);
          this.clearForm();
        })
        .catch((err) => {
          console.log(err);
        });

      // console.log(
      //   "branch: " + this.selectedBranch,
      //   ", package: " + this.selectedPackage,
      //   ", user name: " + this.selectedUserName,
      //   ", user id: " + this.userid,
      //   ", price: " + this.selectedPackagePrice,
      //   ", sessions: " + this.packageSessions
      // );
    },

    clearForm() {
      this.selectedUserName = "";
      // document.getElementById("branchSelect").value = "Select Branch";
      // document.getElementById("packageSelect").value = "Select Package";
      this.selectedBranch = "";
      this.selectedPackage = "";
    },
  },
};
</script>



<style>
</style>