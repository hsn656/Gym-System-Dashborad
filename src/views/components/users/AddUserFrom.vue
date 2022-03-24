<template>
  <form>
      <div class="row justify-content-center">
        <div class=" col-10 col-md-8 col-lg-6" >
        <input name="name" placeholder="name" type="text" class="my-2 form-control">
        <input name="email" placeholder="email" type="email" class="my-2 form-control">
        <input name="national_id" placeholder="national id" type="email" class="my-2 form-control">
        <input name="image_url" placeholder="image url" type="email" class="my-2 form-control">
        <input name="password" placeholder="password" type="password" class="my-2 form-control">
        <button type="submit" class="my-2 btn btn-primary w-100">Add user</button>
      </div>
      </div>
  </form>
</template>

<script>
export default {
  name: "add-user",
  data() {
    return {

    };
  },
  components: {
  },
};
</script>