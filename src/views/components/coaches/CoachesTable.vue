<template>
  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>Coaches table</h6>
      </div>
      <div class="card-header pb-0">
        <router-link :to="{ name: 'AddCoachForm' }"
          ><a class="btn btn-success">Add coach</a></router-link
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
              <th class="text-secondary opacity-7 text-center">Edit</th>
              <th class="text-secondary opacity-7 text-center">Delete</th>
            </tr>
          </thead>
          <tbody :key="componentKey">
            <tr v-for="coach in coaches" :key="coach.id">
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
                    <h6 class="mb-0 text-sm">{{ coach.name }}</h6>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <router-link :to="'/coaches/edit/' + coach.id">
                  <a
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                    >Edit</a
                  ></router-link
                >
              </td>
              <td class="align-middle text-center">
                <span @click="deleteCoach(coach.id)"
                  ><a
                    style="cursor: pointer"
                    class="text-danger font-weight-bold text-xs"
                  >
                    delete</a
                  ></span
                >
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
import CoachService from "../../../services/CoachService";

export default {
  name: "CoachesTable",
  data() {
    return {
      coaches: [],
      img1,
      componentKey: 0,
    };
  },

  async created() {
    this.getCoaches();
  },

  components: {
    VsudAvatar,
  },
  methods: {
    getCoaches() {
      CoachService.getAll()
        .then((response) => {
          this.coaches = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteCoach(id) {
      if (confirm("are you sure?")) {
        CoachService.delete(id)
          .then((res) => {
            console.log(res);
            this.coaches = this.coaches.filter((coach) => coach.id !== id);
            this.forceRerender();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>