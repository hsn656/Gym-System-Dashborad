<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
         <Form @submit="editCoach($route.params.id)">
        <Field
          v-model="name"
          name="name"
          placeholder="name"
          type="text"
          class="my-2 form-control"
        />
          <ErrorMessage class="text-danger small" name="name" /><br/>
        <div class="text-center mt-5">
          <input class="btn btn-success" type="submit" value="Edit Coach"/>
        
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
    getCoach() {
      CoachService.getById(this.$route.params.id).then((res) => {
        this.name = res.data.name;
      });
    },

    editCoach(id) {
   
        let Data = {
          name: this.name,
        };
        CoachService.update(Data, id).then((res) => {
          console.log(res);
             Swal.fire(
                  'Edited!',
                  'A coach has been Edited.',
                  'success'
                ).then(()=>{
                 this.$router.push("/coaches");
                })
        });
    
    },
  },
  async created() {
    await this.getCoach();
  },
};
</script>