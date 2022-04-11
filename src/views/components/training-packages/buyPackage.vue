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
            <div id="cardElement"></div>
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

          <button
            class="btn btn-danger ms-3"
            data-bs-dismiss="modal"
            @click="processPayment"
            :disabled="isPaymentProcessing"
            v-text="isPaymentProcessing ? 'processing' : 'buy'"
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
import { loadStripe } from "@stripe/stripe-js/pure";

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
      isPaymentProcessing: false,
      stripe: {},
      cardElement: {},
      paymentMethodId: "",
      //   branchUsers: "",
    };
  },
  props: ["packages"],
  async created() {
    this.getbranches();
  },
  methods: {
    getbranches() {
      BranchService.getByCityId(1)
        .then((response) => {
          this.branches = response.data.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async processPayment() {
      if(this.users[this.selectedUserName]===undefined) return;

      this.isPaymentProcessing = true;
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.cardElement,
        billing_details: {
          name: "hsn",
        },
      });
      if (error) {
        this.isPaymentProcessing = false;
        alert(error);
      } else {
        this.paymentMethodId = paymentMethod.id;
        const data = {
          package_id: this.selectedPackage,
          user_id: 3,
          branch_id: this.selectedBranch,
          enrollement_price: this.selectedPackagePrice,
          remianing_sessions: this.packageSessions,
          paymentMethodId: this.paymentMethodId,
        };
        console.log(data);
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
      }
    },
    getUsers() {
      this.search = this.selectedUserName;
      
      UserService.getSomeByEmail(this.search)
        .then((response) => {
          this.users = response.data.data.data;
          this.users=this.convertToKeyValue(this.users, "email", "id");
          console.log(this.users);
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
    },
    clearForm() {
      this.selectedUserName = "";
      this.selectedBranch = "";
      this.selectedPackage = "";
    },
    convertToKeyValue(array, key, value) {
      let keyValueObj = {};
      for (const data of array) {
        keyValueObj[data[key]] = data[value];
      }
      return keyValueObj;
    },
  },
  async mounted() {
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
};
</script>

<style></style>
