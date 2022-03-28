<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <Sessionstable />
      </div>
    </div>
  </div>
</template>

<script>
import Sessionstable from './SessionsTable';

export default {
  name: "tables",
  components: {

    Sessionstable,
  },
};
</script>
