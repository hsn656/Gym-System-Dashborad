<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <CoachesTable />
      </div>
    </div>
  </div>
</template>

<script>
import CoachesTable from "./CoachesTable";

export default {
  name: "tables",
  components: {
    CoachesTable,
  },
};
</script>
