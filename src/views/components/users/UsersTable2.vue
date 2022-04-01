<template>
  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0 mt-2">
        <h6>Users table</h6>
      </div>
      <div class="input-group h-50 w-25 mt-4">
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
      <div class="card-header pb-0">
        <router-link :to="{ name: 'addUser' }"
          ><a class="btn btn-success">add user</a></router-link
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
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Email
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                created at
              </th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody :key="componentKey">
            <tr v-for="user in users" :key="user.id">
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
                    <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ user.email }}</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  convertToDate(user.created_at)
                }}</span>
              </td>
              <td class="align-middle">
                <router-link :to="'/users/edit/' + user.id">
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
                <span @click="deleteUser(user.id)">
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
      <ul class="pagination">
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
import UserService from "@/services/UserService";

export default {
  name: "users-table",
  data() {
    return {
      users: [],
      img1,
      componentKey: 0,
      links: [],
      search: "",
      sortField: "created_at",
      sortDirection: "asc",
    };
  },

  async created() {
    this.getUsers();
  },

  components: {
    VsudAvatar,
  },
  methods: {
    getUsers() {
      UserService.getSome()
        .then((response) => {
          this.users = response.data.data.data;
          this.links = response.data.data.links.slice(1, -1);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    convertToDate(datetime) {
      return datetime.split("").splice(0, 10).join("");
    },
    getSearch() {
      console.log("ss");
      UserService.getSome(null, this.search)
        .then((response) => {
          this.users = response.data.data.data;
          this.links = response.data.data.links.slice(1, -1);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    paginate(page) {
      UserService.getSome(page, this.search)
        .then((response) => {
          this.users = response.data.data.data;
          this.links = response.data.data.links.slice(1, -1);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteUser(id) {
      if (!confirm("are you sure?")) return;

      UserService.delete(id)
        .then((res) => {
          console.log(res);
          this.users = this.users.filter((user) => user.id !== id);
          this.forceRerender();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
