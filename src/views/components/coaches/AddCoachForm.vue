<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <Form @submit="addCoach">
          <Field
            v-model="name" name="name" placeholder="name" type="text" class="my-2 form-control" rules="required"
          />
          <ErrorMessage class="text-danger small" name="name" /><br />
          <div class="text-center mt-5">
            <input class="btn btn-success" type="submit" value="Add coach" />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import CoachService from "../../../services/CoachService";
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
export default {
  name: "add-coach",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addCoach() {
      // if (this.name) {
        let Data = {
          name: this.name,
        };
        CoachService.create(Data).then((res) => {
          Swal.fire(
                  'Added!',
                  'A coach has been added.',
                  'success'
                ).then(()=>{
                 this.$router.push("/coaches");
                })
          console.log(res);
         
        });
      // }
    },
  },
};
</script>
