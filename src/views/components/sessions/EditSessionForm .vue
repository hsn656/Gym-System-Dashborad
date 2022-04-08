<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="updateSession($route.params.id)">
          <Field v-model="name" name="name" placeholder="name" type="text" class="my-2 form-control"
                 rules="required" />
          <ErrorMessage class="text-danger small" name="name" /><br>
          <label>Branch name: </label>
          <select class="form-select" v-model="branchId">
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.name }}
            </option>
          </select>
          <label>Start time:</label>
          <div class="row">
            <div class="col-6">
              <Field name="start_date" placeholder="name" type="date" class="my-2 form-control"
                     v-model="startDate" rules="required" />
              <ErrorMessage class="text-danger small" name="start_date" /><br>
            </div>
            <div class="col-6">
              <Field name="start_time" placeholder="name" type="time" class="my-2 form-control col-4"
                     v-model="startTime" />
            </div>
          </div>
          <label class="form-label" style="color: green">Time must be of HOUR:MINUTE:AM/PM
            pattern</label><br />
          <label>End time:</label>
          <div class="row">
            <div class="col-6">
              <Field name="end_date" type="date" class="my-2 form-control" v-model="endDate"
                     rules="required" />
              <ErrorMessage class="text-danger small" name="end_date" /><br>
            </div>
            <div class="col-6">
              <Field name="end_time" type="time" class="my-2 form-control" v-model="endTime" />
            </div>
          </div>
          <label class="form-label" style="color: green">Time must be of HOUR:MINUTE:AM/PM pattern</label><br />
          <label>Coaches:</label>
          <div class="row">
            <div v-for="coach in coaches" class="form-group col-4" :key="coach.id">
              <label class="form-label mx-2">{{ coach.name }}</label>
              <input class="mycheck" type="checkbox" name="coaches" :value="coach.id"
                     v-model="inputCoaches" />
            </div>
          </div>
          <div class="text-center">
            <input type="submit" class="btn btn-success" value="Edit session">
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import SessionService from "@/services/SessionService";
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
export default {
  name: "add-user",
  components: {
    Form, Field, ErrorMessage
  }
  , data() {
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
        this.branches = response.data.data;
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
          let dummy = actualData.start_time.split(" ")[1].split(":");
          dummy = dummy[0] + ":" + dummy[1];
          this.startTime = dummy;
          this.endDate = actualData.end_time.split(" ")[0];
          let seconddummy = actualData.end_time.split(" ")[1].split(":");
          seconddummy = seconddummy[0] + ":" + seconddummy[1];
          this.endTime = seconddummy;
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
      let Data = {
        id: this.$route.params.id,
        name: this.name,
        branch_id: this.branchId,
        start_time: this.startDate + " " + this.startTime,
        end_time: this.endDate + " " + this.endTime,
        coaches: this.inputCoaches.toString().split(","),
      };
      console.log(Data);
      SessionService.update(Data, id).then((res) => {
        if (res.data.isSuccess) {
          Swal.fire(
            'Updated!',
            'Your Session has been Updated successfully.',
            'success'
          ).then(() => {
            this.$router.push("/sessions")
          })
        } else {
          let error = Object.values(res.data.errors).reduce((p, n) => p + " & " + n);
          Swal.fire({
            text: error,
            icon: "error",
            confirmButtonText: "ok",
          });
        }

      }).catch(err => {
        console.log(err);
      });
    }
  },
  async created() {
    await this.getBranches();
    await this.getCoaches();
    await this.getSession(this.$route.params.id);
  },
};
</script>