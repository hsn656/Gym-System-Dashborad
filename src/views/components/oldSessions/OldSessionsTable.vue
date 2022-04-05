<template>
  <div class="card mb-4">
    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>old Sessions table</h6>
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
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                  ps-2
                "
              >
                Branch Name
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Starts at
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Ends at
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Coaches
              </th>
            <th class="text-secondary opacity-7 text-center">Delete</th>
            </tr>
          </thead>
          <tbody :key="componentKey">
            <tr v-for="session in sessions" :key="session.id">
              <td>
                <div class="d-flex px-2 py-1">
                  
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ session.name }}</h6>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ session.branch_name }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToDate(session.start_time) }}
                </p>
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToTime(session.start_time) }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToDate(session.end_time) }}
                </p>
                <p class="text-xs font-weight-bold mb-0">
                  {{ convertToTime(session.end_time) }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p
                  v-for="coach in session.coaches"
                  :key="coach.id"
                  class="text-xs font-weight-bold mb-0"
                >
                  {{ coach.name }}
                </p>
              </td>
              
              <td class="align-middle text-center">
                <span @click="deleteSession(session.id)"
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

import SessionService from "../../../services/SessionService";

export default {
  name: "OldSessionsTable",
  data() {
    return {
      sessions: [],
    
      componentKey: 0,
    };
  },

  async created() {
    this.getSessions();
  },

  components: {
   
  },
  methods: {
    getSessions() {
      SessionService.getOld()
        .then((response) => {
          this.sessions = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    convertToDate(datetime) {
      return datetime.split(" ")[0];
    },
    convertToTime(datetime) {
      return datetime.split(" ")[1];
    },
    deleteSession(id) {
      if (confirm("are you sure?")) {
        SessionService.delete(id)
          .then((res) => {
            console.log(res);
            this.sessions = this.sessions.filter(
              (session) => session.id !== id
            );
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