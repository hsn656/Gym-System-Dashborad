<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <input
          v-model="name"
          name="name"
          placeholder="name"
          type="text"
          class="my-2 form-control"
        />
        <div class="text-center mt-5">
          <button class="btn btn-success" @click="editCoach($route.params.id)">
            Edit coach
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoachService from "../../../services/CoachService";
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    getCoach() {
      CoachService.getById(this.$route.params.id).then((res) => {
        this.name = res.data.name;
      });
    },

    editCoach(id) {
      if (this.name) {
        let Data = {
          name: this.name,
        };
        CoachService.update(Data, id).then((res) => {
          console.log(res);
          this.$router.push("/coaches");
        });
      }
    },
  },
  async created() {
    await this.getCoach();
  },
};
</script>