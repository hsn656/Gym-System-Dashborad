<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <users-table />
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from './components/Cities.vue';

export default {
  name: "tables",
  components: {

    UsersTable,
  },
};
</script>
