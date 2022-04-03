<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class=" col-10 col-md-8 col-lg-6">
        <input v-model="city.name" name="name" placeholder="name" type="text" class="my-2 form-control">
        <select class="form-select" v-model="city.manager_id" name="cityManager">
          <option v-for="cityManager in cityManagers" :key="cityManager.id" v-bind:value="cityManager.id">
            {{ cityManager.name }}
          </option>
        </select>
        <button @click="updateCity(city.id)" class="my-2 btn btn-primary w-100">Edit</button>
      </div>
      <div v-if="isUpdated">
        <p class="text-primary my-2 text-center"> updated successfully </p>
      </div>
    </div>
  </div>
</template>

<script>
import CityService from "../../../services/CityService";
import CityManagerService from "../../../services/CityManagerService";


export default {
  name: "Edit City Manager",
  data() {
    return {
      city: {
        name: "",
        manager_id: "",
      },
      cityManagers: [],
      isUpdated: false
    };
  },
  async created() {
    this.getCity(this.$route.params.id);
    this.getCityManagers();
    console.log(this.cityManagers)
  },
  methods: {
    getCity(id) {
      CityService.getById(id)
        .then(response => {
          console.log(response.data);
          this.city.id = response.data.id;
          this.city.name = response.data.name;
          this.city.manager_id = response.data.manager_id;
          console.log(this.city);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateCity(id) {
      this.isUpdated = false;
      CityService.update(id, this.city).then(() => {
        // console.log(res);
        this.isUpdated = true;
      });
    },
    getCityManagers() {
      CityManagerService.getAll()
        .then(response => {
          this.cityManagers = response.data;
          // console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }


};
</script>