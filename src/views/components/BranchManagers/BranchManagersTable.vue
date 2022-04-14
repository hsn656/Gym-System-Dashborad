<template>
  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>Branch Managers table</h6>
      </div>
      <div class="card-header pb-0">
        <router-link :to="{ name: 'addBranchManager' }"
          ><a class="btn btn-success">add Branch Manger</a></router-link
        >
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Name
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                Email
              </th>
              <th
                class="
                  text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                Branch
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                created at
              </th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="branchManager in branchManagers" :key="branchManager.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="img1"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="branchManager1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ branchManager.name }}</h6>
                  </div>
                </div>
              </td>

              <td>
                <p class="text-xs font-weight-bold mb-0">
                  {{ branchManager.email }}
                </p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">
                  {{ branchManager.branch.name }}
                </p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  convertToDate(branchManager.created_at)
                }}</span>
              </td>

              <td class="align-middle">
                <router-link :to="'/branchmanagers/edit/' + branchManager.id">
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
                <span @click="deleteBranchMananger(branchManager.id)">
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
  </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import img1 from "./team-2.jpg";
import BranchManagerService from "@/services/BranchManagerService";

export default {
  name: "branchManagers-table",
  data() {
    return {
      branchManagers: [],
      branches: [],
      img1,
      // componentKey:0
    };
  },

  async created() {
    this.getBranchManagers();
  },

  components: {
    VsudAvatar,
  },
  methods: {
    getBranchManagers() {
      BranchManagerService.getAll()
        .then((response) => {
          this.branchManagers = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    convertToDate(datetime) {
      return datetime.split("").splice(0, 10).join("");
    },

    deleteBranchMananger(id) {
      if (!confirm("are you sure?")) return;

      BranchManagerService.delete(id)
        .then((res) => {
          console.log(res);
          this.branchManagers = this.branchManagers.filter(
            (branchManager) => branchManager.id !== id
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>