<template>
<div class="row">
    
        
      <div class="col-5 m-auto mb-5">
        
        <input class="form-control me-2 w-50" placeholder="Search" type="search" aria-label="Search" id="Search" name="Search" v-model="search" @keyup="SearchSome">
      </div>
</div>

  <div class="card mb-4">
    

    <div class="d-flex justify-content-between">
      <div class="card-header pb-0">
        <h6>Coaches table</h6>
      </div>
      <div class="card-header pb-0">
        <router-link :to="{ name: 'AddCoachForm' }"
          ><a class="btn btn-success">Add coach</a></router-link
        >
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 " @click="sort('name')"
              >
                Name
                 <i
                  v-if="sortField == 'name' && sortDirection == 'asc'"
                  class="fas fa-arrow-up text-dark"
                ></i>
                <i
                  v-if="sortField == 'name' && sortDirection == 'desc'"
                  class="fas fa-arrow-down text-dark"
                ></i>
              </th>
              <th class="text-secondary opacity-7 text-center">Edit</th>
              <th class="text-secondary opacity-7 text-center">Delete</th>
            </tr>
          </thead>
          <tbody :key="componentKey">
            <tr v-for="coach in coaches" :key="coach.id">
              <td>
                <div class="d-flex px-2 py-1">
                   <div>
                    <vsud-avatar
                      :img="$store.state.backEndUrl+coach.image_url"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ coach.name }}</h6>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center">
                <router-link :to="'/coaches/edit/' + coach.id">
                  <a
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                    >Edit</a
                  ></router-link
                >
              </td>
              <td class="align-middle text-center">
                <span @click="deleteCoach(coach.id)"
                  ><a
                    style="cursor: pointer"
                    class="text-danger font-weight-bold text-xs"
                  >
                    delete</a
                  ></span
                >
              </td>
            </tr>
          </tbody>
           <tfoot>
             <tr>
               <td colspan="7" class="text-center">
                <input  class=" paginatebtn" type="button" v-for="link in links" :key="link.label" :value="link.label" @click="page=link.label;getSome()"/>
               </td>
             </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import CoachService from "../../../services/CoachService";
import Swal from "sweetalert2";
export default {
  name: "CoachesTable",
  data() {
    return {
      coaches: [],
      componentKey: 0,
       links: [],
      search: "",
      sortField: "name",
      sortDirection: "asc",
      page:1,
    };
      
  },
  components: {
    VsudAvatar,
  },
  async created() {
    this.getSome();
    // this.getCoaches();


  },

  methods: {
       getSome(){
    
      CoachService.getSome(this.page,this.search,this.sortField,this.sortDirection)
         .then(response=>{
             console.log(response);
           this.coaches=response.data.data;
         
           this.links=response.data.links.slice(1, -1);
         })
     
   }
    ,
    sort(field){
     this.sortField = field;
     this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
      this.getSome()
    },
     SearchSome(){
       CoachService.getSome(this.page ,this.search).then(response=>{
                       console.log(response)
          this.coaches=response.data.data;
           this.links=response.data.links.slice(1, -1);
       })
    
    },
  // getCoaches() {
  //     CoachService.getAll()
  //       .then((response) => {
  //         this.coaches = response.data.data;
          
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   },
    deleteCoach(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          CoachService.delete(id)
            .then((res) => {
              console.log(res);
              this.coaches = this.coaches.filter((coach) => coach.id !== id);
              this.forceRerender();
              Swal.fire("Deleted!", "Session has been deleted.", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
<style scoped>
.paginatebtn{
  border-radius: 20%;
  margin:5px;
  padding:5px 15px;
  border:none;
  background-color: #82d616;
}
</style>
