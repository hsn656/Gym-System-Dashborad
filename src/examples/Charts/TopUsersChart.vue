<template>
  <div class="d-flex justify-content-between mb-2">
    <h6 class="mt-0 mb-3 ms-2">Top Users</h6>
    <div class="d-flex w-75">
      <select
        v-if="$store.getters.isAdmin"
        class="form-select"
        v-model="selectedCity"
        @change="getbranches"
      >
        <option selected disabled value="">Select City</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>

      <select
        id="branchSelect"
        class="form-select"
        v-model="selectedBranch"
        v-if="$store.getters.atLeastCityManager"
      >
        <option selected disabled value="">Select Branch</option>
        <option v-for="branch in branches" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>
    </div>
  </div>

  <div
    class="
      py-3
      mb-3
      bg-gradient-dark
      border-radius-lg
      pe-1
      d-flex
      justify-content-center
    "
  >
    <div class="chart" style="width: 400px">
      <canvas id="myChart" class="chart-canvas"></canvas>
    </div>
  </div>

  <!-- <p class="text-sm ms-2">
    (<span class="font-weight-bolder">+23%</span>) than last week
  </p> -->
  <div class="container border-radius-lg">
    <!-- <div class="row">
      <div class="py-3 col-3 ps-0">
        <div class="mb-2 d-flex">
          <div
            class="
              text-center
              shadow
              icon icon-shape icon-xxs
              border-radius-sm
              bg-gradient-primary
              me-2
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 40 44"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>document</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1870.000000, -591.000000)"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                >
                  <g transform="translate(1716.000000, 291.000000)">
                    <g transform="translate(154.000000, 300.000000)">
                      <path
                        class="color-background"
                        d="M40,40 L36.3636364,40 L36.3636364,3.63636364 L5.45454545,3.63636364 L5.45454545,0 L38.1818182,0 C39.1854545,0 40,0.814545455 40,1.81818182 L40,40 Z"
                        opacity="0.603585379"
                      ></path>
                      <path
                        class="color-background"
                        d="M30.9090909,7.27272727 L1.81818182,7.27272727 C0.814545455,7.27272727 0,8.08727273 0,9.09090909 L0,41.8181818 C0,42.8218182 0.814545455,43.6363636 1.81818182,43.6363636 L30.9090909,43.6363636 C31.9127273,43.6363636 32.7272727,42.8218182 32.7272727,41.8181818 L32.7272727,9.09090909 C32.7272727,8.08727273 31.9127273,7.27272727 30.9090909,7.27272727 Z M18.1818182,34.5454545 L7.27272727,34.5454545 L7.27272727,30.9090909 L18.1818182,30.9090909 L18.1818182,34.5454545 Z M25.4545455,27.2727273 L7.27272727,27.2727273 L7.27272727,23.6363636 L25.4545455,23.6363636 L25.4545455,27.2727273 Z M25.4545455,20 L7.27272727,20 L7.27272727,16.3636364 L25.4545455,16.3636364 L25.4545455,20 Z"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="mt-1 mb-0 text-xs font-weight-bold">Users</p>
        </div>
        <h4 class="font-weight-bolder">36K</h4>
        <div class="progress w-75">
          <div
            class="progress-bar bg-dark w-60"
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
      <div class="py-3 col-3 ps-0">
        <div class="mb-2 d-flex">
          <div
            class="
              text-center
              shadow
              icon icon-shape icon-xxs
              border-radius-sm
              bg-gradient-info
              me-2
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 40 40"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>spaceship</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1720.000000, -592.000000)"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                >
                  <g transform="translate(1716.000000, 291.000000)">
                    <g transform="translate(4.000000, 301.000000)">
                      <path
                        class="color-background"
                        d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"
                      ></path>
                      <path
                        class="color-background"
                        d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"
                      ></path>
                      <path
                        class="color-background"
                        d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"
                        opacity="0.598539807"
                      ></path>
                      <path
                        class="color-background"
                        d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"
                        opacity="0.598539807"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="mt-1 mb-0 text-xs font-weight-bold">Clicks</p>
        </div>
        <h4 class="font-weight-bolder">2m</h4>
        <div class="progress w-75">
          <div
            class="progress-bar bg-dark w-90"
            role="progressbar"
            aria-valuenow="90"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
      <div class="py-3 col-3 ps-0">
        <div class="mb-2 d-flex">
          <div
            class="
              text-center
              shadow
              icon icon-shape icon-xxs
              border-radius-sm
              bg-gradient-warning
              me-2
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 43 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>credit-card</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-2169.000000, -745.000000)"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                >
                  <g transform="translate(1716.000000, 291.000000)">
                    <g transform="translate(453.000000, 454.000000)">
                      <path
                        class="color-background"
                        d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                        opacity="0.593633743"
                      ></path>
                      <path
                        class="color-background"
                        d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="mt-1 mb-0 text-xs font-weight-bold">Sales</p>
        </div>
        <h4 class="font-weight-bolder">435$</h4>
        <div class="progress w-75">
          <div
            class="progress-bar bg-dark w-30"
            role="progressbar"
            aria-valuenow="30"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
      <div class="py-3 col-3 ps-0">
        <div class="mb-2 d-flex">
          <div
            class="
              text-center
              shadow
              icon icon-shape icon-xxs
              border-radius-sm
              bg-gradient-danger
              me-2
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 40 40"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>settings</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-2020.000000, -442.000000)"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                >
                  <g transform="translate(1716.000000, 291.000000)">
                    <g transform="translate(304.000000, 151.000000)">
                      <polygon
                        class="color-background"
                        opacity="0.596981957"
                        points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                      ></polygon>
                      <path
                        class="color-background"
                        d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                        opacity="0.596981957"
                      ></path>
                      <path
                        class="color-background"
                        d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="mt-1 mb-0 text-xs font-weight-bold">Items</p>
        </div>
        <h4 class="font-weight-bolder">43</h4>
        <div class="progress w-75">
          <div
            class="progress-bar bg-dark w-50"
            role="progressbar"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import CityService from "../../services/CityService";
import BranchService from "../../services/BranchService.js";
import StatisticsService from "../../services/StatisticsService";

export default {
  name: "top-users-chart",
  data() {
    return {
      branches: [],
      cities: [],
      selectedCity: "",
      selectedBranch: "",
      data: new Array(10).fill(0),
      users_number: 0,
      labels: new Array(10).fill(0),
    };
  },
  async created() {
    if (this.$store.getters.isAdmin) this.getCities();
    else if (this.$store.getters.isCityManager) {
      this.selectedCity = this.$store.getters.getPayLoad.city_id;
      this.getbranches();
    } else this.selectedBranch = this.$store.getters.getPayLoad.branch_id;
  },
  methods: {
    getCities() {
      CityService.getAll().then((res) => {
        this.cities = res.data.data;
      });
    },
    getbranches() {
      console.log(this.selectedCity);
      BranchService.getByCityId(this.selectedCity)
        .then((response) => {
          this.branches = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
      this.selectedBranch = "";
    },
    fillChartData(users) {
      users.forEach((user, i) => {
        this.data[i] = user.totoal_sessions;
        this.users_number = i + 1;
        this.labels[i] = user.name;
      });
      this.data.length = this.users_number;
      this.labels.length = this.users_number;
      console.log(this.data);
      console.log(this.labels);
    },
    renderChart() {
      //setup block
      const data = {
        labels: this.labels,
        datasets: [
          {
            label: "# of Votes",
            data: this.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",

              "rgba(255, 159, 64, 0.2)",
              "rgba(80, 100, 64, 0.2)",
              "rgba(255, 60, 64, 0.2)",
              "rgba(30, 54, 64, 0.2)",
              "rgba(25, 90, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",

              "rgba(255, 159, 64, 1)",
              "rgba(80, 100, 64, 1)",
              "rgba(255, 60, 64, 1)",
              "rgba(30, 54, 64, 1)",
              "rgba(25, 90, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      //option block
      const options = {
        plugins: {
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      };

      //config block
      const config = {
        type: "pie",
        data,
        options,
      };

      //render block
      new Chart(document.getElementById("myChart").getContext("2d"), config);
    },
  },
  mounted() {
    StatisticsService.getTopUsers(this.selectedCity, this.selectedBranch)
      .then((result) => {
        let topUsers = result.data.data;
        this.fillChartData(topUsers);
        // console.log(topUsers);
        this.renderChart();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
