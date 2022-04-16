<template>
  <div class="pb-0 card-header">
    <!-- <h6>Sales overview</h6> -->

    <!-- <p class="text-sm">
       <i class="fa fa-arrow-up text-success"></i>
       <span class="font-weight-bold">4% more</span> in 2021
     </p> -->

    <!-- </div> -->

    <!-- <div class="p-3 card-body"> -->

    <!-- <div class="chart"> -->
    <!-- <canvas id="chart-line" class="chart-canvas" height="300"></canvas>  -->
    <!-- </div> -->
  </div>
</template>

 <script>
// import Chart from "chart.js/auto";
// import DashBoardService from "../../services/DashBoardService";

// export default {
//   name: "gradient-line-chart",
//   data() {
//     return {
//       branches: [],
//       myDatasets: [],
//       canvasKey: 0,
//     };
//   },
//   computed: {
//     isSet() {
//       return this.myDatasets;
//     },
//   },
//   methods: {
//     getBranches() {
//       DashBoardService.getBranches()
//         .then((response) => {
//           this.branches = response.data;
//           // console.log(response.data[0].branch_id);
//           console.log(this.branches);
//         })
//         .then(() => {
//           this.loop();
//         })
//         .then(() => {
//           this.renderChart();
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     },

//     loop() {
//       var ctx2 = document.getElementById("chart-line").getContext("2d");
//       var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

//       gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
//       gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
//       gradientStroke1.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

//       this.branches.forEach((branch) => {
//         var myData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//         // console.log(branch);
//         console.log("b id", branch.branch_id);

//         DashBoardService.getBranchMonthly(branch.branch_id).then((response) => {
//           response.data.forEach((monthly) => {
//             for (let i = 0; i < 11; i++) {
//               if (i + 1 == parseInt(monthly.month)) {
//                 myData[i] = parseInt(monthly.total);
//                 myData.length = i + 1;
//               }
//             }
//           });
//           var graphBranch = {
//             label: branch.name,
//             tension: 0.4,
//             borderWidth: 0,
//             pointRadius: 0,
//             borderColor: `#${Math.floor(Math.random() * 16777215).toString(
//               16
//             )}`,
//             // eslint-disable-next-line no-dupe-keys
//             borderWidth: 3,
//             backgroundColor: gradientStroke1,
//             fill: true,
//             data: myData,
//             maxBarThickness: 6,
//           };
//           this.myDatasets.push(graphBranch);
//         });
//       });
//     },

//     renderChart() {
//       var ctx2 = document.getElementById("chart-line").getContext("2d");
//       new Chart(ctx2, {
//         type: "line",
//         data: {
//           labels: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//           ],

//           datasets: this.isSet,
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//           interaction: {
//             intersect: false,
//             mode: "index",
//           },
//           scales: {
//             y: {
//               grid: {
//                 drawBorder: false,
//                 display: true,
//                 drawOnChartArea: true,
//                 drawTicks: false,
//                 borderDash: [5, 5],
//               },
//               ticks: {
//                 display: true,
//                 padding: 10,
//                 color: "#b2b9bf",
//                 font: {
//                   size: 11,
//                   family: "Open Sans",
//                   style: "normal",
//                   lineHeight: 2,
//                 },
//               },
//             },
//             x: {
//               grid: {
//                 drawBorder: false,
//                 display: false,
//                 drawOnChartArea: false,
//                 drawTicks: false,
//                 borderDash: [5, 5],
//               },
//               ticks: {
//                 display: true,
//                 color: "#b2b9bf",
//                 padding: 20,
//                 font: {
//                   size: 11,
//                   family: "Open Sans",
//                   style: "normal",
//                   lineHeight: 2,
//                 },
//               },
//             },
//           },
//         },
//       });
//     },
//   },

//   mounted() {
//     this.getBranches();
//   },
// };
//
</script>
