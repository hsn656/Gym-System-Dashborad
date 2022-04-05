<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <OldSessionsTable/>
      </div>
    </div>
  </div>
</template>

<script>
import OldSessionsTable from './OldSessionsTable';

export default {
  name: "tables",
  components: {

     OldSessionsTable,
  },
};
</script>
