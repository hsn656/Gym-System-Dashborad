<template>
  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0 mt-2">
        <h6>Branches table</h6>
      </div>

      <div class="input-group h-50 w-25 mt-4 me-2">
        <span class="input-group-text text-body"
          ><i class="fas fa-search" aria-hidden="true"></i
        ></span>
        <input
          v-model="search"
          @keyup="getSearch"
          type="text"
          class="form-control"
          placeholder="Type here..."
        />
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div v-if="$store.getters.isAdmin" class="w-25 mt-4 mx-3 d-inline">
        <select @change="getBranches" v-model="city_id" class="form-select">
          <option value="all">all cities</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </div>

      <div class="card-header pb-0">
        <router-link :to="{ name: 'add Branch' }"
          ><a class="btn btn-success">Add Branch</a></router-link
        >
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                data-field="name"
                @click="sort"
              >
                Name
                <i
                  v-if="sortField == 'name' && sortDirection == 'asc'"
                  class="fas fa-arrow-up text-dark"
                ></i>
                <i
                  v-if="sortField == 'name' && sortDirection == 'desc'"
                  class="fas fa-arrow-down text-dark"
                ></i>
              </th>

              <th
                v-if="$store.getters.isAdmin"
                class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7"
              >
                Manager Name
              </th>

              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                data-field="created_at"
                @click="sort"
              >
                created at
                <i
                  v-if="sortField == 'created_at' && sortDirection == 'asc'"
                  class="fas fa-arrow-up text-dark"
                ></i>
                <i
                  v-if="sortField == 'created_at' && sortDirection == 'desc'"
                  class="fas fa-arrow-down text-dark"
                ></i>
              </th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="branch in branches" :key="branch.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="img1"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ branch.name }}</h6>
                  </div>
                </div>
              </td>
              <td
                v-if="$store.getters.isAdmin"
                class="align-middle text-center"
              >
                <span class="text-secondary text-xs font-weight-bold">{{
                  branch.city_manager_name
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  convertToDate(branch.created_at)
                }}</span>
              </td>
              <td class="align-middle">
                <router-link :to="'/branches/edit/' + branch.id">
                  <a
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                  >
                    Edit</a
                  >
                </router-link>
              </td>
              <td class="align-middle">
                <span @click="deleteBranch(branch.id)">
                  <a
                    style="cursor: pointer"
                    class="text-danger font-weight-bold text-xs"
                  >
                    delete</a
                  >
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav aria-label="Page navigation" class="m-auto">
      <ul v-if="links.length > 1" class="pagination">
        <li v-for="link in links" :key="link.label" class="page-item">
          <a class="page-link" @click="paginate(link.label)">{{
            link.label
          }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import img1 from "./team-2.jpg";
import BranchService from "../../../services/BranchService.js";
import CityService from "../../../services/CityService.js";
import Swal from "sweetalert2";

export default {
  name: "branches-table",
  data() {
    return {
      branches: [],
      img1,
      links: [],
      search: "",
      sortField: "created_at",
      sortDirection: "asc",
      city_id: "all",
      cities: [],
    };
  },

  async created() {
    this.getCities();
    this.getBranches();
  },

  components: {
    VsudAvatar,
  },
  methods: {
    getBranches() {
      console.log(this.city_id);
      BranchService.getSomeByCityId(this.city_id)
        .then((response) => {
          this.rerenderTableBody(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    convertToDate(datetime) {
      return datetime.split("").splice(0, 10).join("");
    },
    getSearch() {
      BranchService.getSomeByCityId(this.city_id, 1, this.search)
        .then((response) => {
          this.rerenderTableBody(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    paginate(page) {
      BranchService.getSomeByCityId(this.city_id, page, this.search)
        .then((response) => {
          this.rerenderTableBody(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteBranch(id) {
      Swal.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          BranchService.delete(id)
            .then(() => {
              this.branches = this.branches.filter((b) => b.id != id);
              Swal.fire("Deleted!", "", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    sort(e) {
      if (this.sortField == e.target.dataset.field)
        this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
      this.sortField = e.target.dataset.field;
      BranchService.getSomeByCityId(
        this.city_id,
        null,
        this.search,
        this.sortField,
        this.sortDirection
      )
        .then((response) => {
          this.rerenderTableBody(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rerenderTableBody(response) {
      this.branches = response.data.data.data;
      this.links = response.data.data.links;
    },
    getCities() {
      CityService.getAll().then((res) => {
        this.cities = res.data;
        // this.city_id = this.cities[0]?.id;
      });
    },
  },
};
</script>
