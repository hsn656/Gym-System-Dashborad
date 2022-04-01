<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <input
          v-model="name"
          name="name"
          placeholder="name"
          type="text"
          class="my-2 form-control"
        />
        <label>Branch name: </label>
        <select class="form-select" v-model="branchId">
          <option
            v-for="branch in branches"
            :key="branch.id"
            :value="branch.id"
          >
            {{ branch.name }}
          </option>
        </select>
        <label>Start time:</label>
        <div class="row">
          <div class="col-6">
            <input
              name="start_date"
              placeholder="name"
              type="date"
              class="my-2 form-control"
              v-model="startDate"
            />
          </div>
          <div class="col-6">
            <input
              name="start_time"
              placeholder="name"
              type="time"
              class="my-2 form-control col-4"
              v-model="startTime"
            />
          </div>
        </div>
        <label class="form-label" style="color: red"
          >Time must be of HOUR:MINUTE:AM/PM pattern</label
        ><br />
        <label>End time:</label>
        <div class="row">
          <div class="col-6">
            <input
              name="end_date"
              type="date"
              class="my-2 form-control"
              v-model="endDate"
            />
          </div>
          <div class="col-6">
            <input
              name="end_time"
              type="time"
              class="my-2 form-control"
              v-model="endTime"
            />
          </div>
        </div>
        <label class="form-label" style="color: red"
          >Time must be of HOUR:MINUTE:AM/PM pattern</label
        ><br />
        <label>Coaches:</label>
        <div class="row">
          <div
            v-for="coach in coaches"
            class="form-group col-4"
            :key="coach.id"
          >
            <label class="form-label mx-2">{{ coach.name }}</label>
            <input
              class="mycheck"
              type="checkbox"
              name="coaches"
              :value="coach.id"
              v-model="inputCoaches"
            />
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-success"
            @click="updateSession($route.params.id)"
          >
            Edit session
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SessionService from "@/services/SessionService";
export default {
  name: "add-user",
  data() {
    return {
      coaches: [],
      branches: [],
      name: "",
      branchId: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      inputCoaches: [],
    };
  },
  methods: {
    getBranches() {
      SessionService.getbranches().then((response) => {
        console.log(response.data);
        this.branches = response.data;
      });
    },
    getCoaches() {
      SessionService.getcoaches().then((response) => {
        this.coaches = response.data.data;
      });
    },

    async getSession(id) {
      await SessionService.getById(id)
        .then((response) => {
          let actualData = response.data.data;
          console.log(actualData);
          this.name = actualData.name;
          this.branchId = actualData.branch_id;
          this.startDate = actualData.start_time.split(" ")[0];
          this.startTime = actualData.start_time.split(" ")[1];
          this.endDate = actualData.end_time.split(" ")[0];
          this.endTime = actualData.end_time.split(" ")[1];
          let checks = document.getElementsByClassName("mycheck");
          let coaches = [];
          for (let coach of actualData.coaches) {
            coaches.push(coach.id);
          }
          for (let i = 0; i < checks.length; i++) {
            let numbervalue = Number(checks[i].value);
            if (coaches.includes(numbervalue)) {
              this.inputCoaches.push(numbervalue);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateSession(id) {
      if (
        this.name &&
        this.branchId &&
        this.startDate &&
        this.startTime &&
        this.endDate &&
        this.endTime &&
        this.inputCoaches.length > 0
      ) {
        let Data = {
          name: this.name,
          branch_id: this.branchId,
          start_time: this.startDate + " " + this.startTime,
          end_time: this.endDate + " " + this.endTime,
          coaches: this.inputCoaches.toString().split(","),
        };
        console.log(Data);
        SessionService.update(Data, id).then((res) => {
          console.log(res);
          this.$router.push("/sessions");
        });
      } else if (
        this.name &&
        this.branchId &&
        this.startDate &&
        this.endDate &&
        this.inputCoaches.length > 0
      ) {
        let Data = {
          name: this.name,
          branch_id: this.branchId,
          start_time: this.startDate + " 12:00:00",
          end_time: this.endDate + " 14:00:00",
          coaches: this.inputCoaches,
        };
        SessionService.update(Data, id).then((res) => {
          console.log(res);
          this.$router.push("/sessions");
        });
      }
      ////////////////////////////////
    },
  },
  async created() {
    await this.getBranches();
    await this.getCoaches();
    await this.getSession(this.$route.params.id);
  },
};
</script>