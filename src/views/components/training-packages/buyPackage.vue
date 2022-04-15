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
              placeholder="Enter user email"
              class="form-control"
              @keyup="getUsers"
              v-model="selectedUserName"
            />
            <datalist id="users">
              <option v-for="user in Object.keys(users)" :key="user">
                {{ user }}
              </option>
            </datalist>
            <div class="d-flex justify-content-around my-2">
              <select
                v-if="$store.getters.isAdmin"
                class="form-select"
                v-model="selectedCity"
                @change="getbranches"
              >
                <option selected disabled value="">Select City</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
              <select
                id="branchSelect"
                class="form-select"
                v-model="selectedBranch"
                v-if="$store.getters.atLeastCityManager"
              >
                <option selected disabled value="">Select Branch</option>
                <option
                  v-for="branch in branches"
                  :key="branch.id"
                  :value="branch.id"
                >
                  {{ branch.name }}
                </option>
              </select>
            </div>
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
            <div class="my-3" id="cardElement"></div>
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

          <button
            class="btn btn-success ms-3"
            @click="processPayment"
            :disabled="isPaymentProcessing"
            v-text="isPaymentProcessing ? 'processing' : 'buy package'"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BranchService from "../../../services/BranchService.js";
import UserService from "@/services/UserService";
import BuyPackageService from "@/services/BuyPackageService";
import CityService from "../../../services/CityService";
import { loadStripe } from "@stripe/stripe-js/pure";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      branches: [],
      cities: [],
      users: [],
      selectedCity: "",
      selectedBranch: "",
      selectedPackage: "",
      selectedPackagePrice: "",
      packageSessions: "",
      selectedUserName: "",
      userid: "",
      search: "",
      isPaymentProcessing: false,
      stripe: {},
      cardElement: {},
      paymentMethodId: "",
    };
  },
  props: ["packages"],
  async created() {
    if (this.$store.getters.isAdmin) this.getCities();
    else if (this.$store.getters.isCityManager) {
      this.selectedCity = this.$store.getters.getPayLoad.city_id;
      this.getbranches();
    } else this.selectedBranch = this.$store.getters.getPayLoad.branch_id;
    await this.renderCardElement();
  },
  methods: {
    getCities() {
      CityService.getAll().then((res) => {
        this.cities = res.data.data;
      });
    },
    getbranches() {
      console.log(this.selectedCity);
      BranchService.getByCityId(this.selectedCity)
        .then((response) => {
          this.branches = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async processPayment() {
      if (this.users[this.selectedUserName] === undefined) return;

      this.isPaymentProcessing = true;
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.cardElement,
        billing_details: {
          email: this.selectedUserName,
        },
      });
      if (error) {
        this.isPaymentProcessing = false;
        Swal.fire({
          text: error.message,
          icon: "error",
          confirmButtonText: "ok",
        });
      } else {
        this.paymentMethodId = paymentMethod.id;
        const data = {
          package_id: this.selectedPackage,
          user_id: this.users[this.selectedUserName],
          branch_id: this.selectedBranch,
          enrollement_price: this.selectedPackagePrice,
          remianing_sessions: this.packageSessions,
          paymentMethodId: this.paymentMethodId,
        };
        console.log(data);
        BuyPackageService.create(data)
          .then((res) => {
            if (res.data.data.result == "transaction completed successfully") {
              Swal.fire({
                text: "transaction completed successfully",
                icon: "success",
                confirmButtonText: "ok",
              });
              this.clearForm();
            } else {
              Swal.fire({
                text: "something went wrong, please try again",
                icon: "error",
                confirmButtonText: "ok",
              });
            }
            console.log(res);
            this.isPaymentProcessing = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getUsers() {
      this.search = this.selectedUserName;
      UserService.getSomeByEmail(this.search)
        .then((response) => {
          this.users = response.data.data;
          this.users = this.convertToKeyValue(this.users, "email", "id");
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

    clearForm() {
      this.selectedUserName = "";
      this.selectedPackage = "";
      this.renderCardElement();
      if (this.$store.getters.isAdmin) this.selectedCity = "";
      if (this.$store.getters.atLeastCityManager) this.selectedBranch = "";
    },
    convertToKeyValue(array, key, value) {
      let keyValueObj = {};
      for (const data of array) {
        keyValueObj[data[key]] = data[value];
      }
      return keyValueObj;
    },

    async renderCardElement() {
      const key = this.$store.state.stripePK;
      this.stripe = await loadStripe(key);
      console.log(this.stripe);
      const elements = this.stripe.elements();
      this.cardElement = elements.create("card", {
        classes: {
          base: "rounded p-2 border border-secondary",
        },
      });
      this.cardElement.mount("#cardElement");
    },
  },
};
</script>

<style></style>
