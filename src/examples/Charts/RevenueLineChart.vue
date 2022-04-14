<template>
  <div class="pb-0 card-header">
    <div class="row justify-content-space-between align-items-baseline">
      <div class="col-6">
        <h6>Revenue overview</h6>
      </div>
      <div class="col-6">
        <select class="form-select w-75">
          <option>2022</option>
        </select>
      </div>
    </div>
  </div>
  <div class="p-3 card-body">
    <div class="chart">
      <canvas
        ref="revenueCanvas"
        id="chart-line"
        class="chart-canvas"
        height="300"
      ></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import StatisticsService from "../../services/StatisticsService";

export default {
  name: "revenue-line-chart",
  data() {
    return {
      data: new Array(12).fill(0),
      context: {},
    };
  },
  methods: {
    fillChartData(arr) {
      this.data = new Array(arr[arr.length - 1].month).fill(0);
      arr.forEach((data) => {
        this.data[data.month - 1] = data.total;
      });
    },
    renderChart() {
      this.context = this.$refs.revenueCanvas.getContext("2d");

      this.gradientStroke = this.context.createLinearGradient(0, 230, 0, 50);

      this.gradientStroke.addColorStop(1, "rgba(203,12,159,0.2)");
      this.gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
      this.gradientStroke.addColorStop(0, "rgba(203,12,159,0)"); //purple colors

      new Chart(this.context, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],

          datasets: [
            {
              label: "Revenue",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#3A416F",
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 3,
              backgroundColor: this.gradientStroke,
              fill: true,
              data: this.data,
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#b2b9bf",
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#b2b9bf",
                padding: 20,
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    StatisticsService.getRevenue()
      .then((res) => {
        // this.data = new Array(12).fill(30);
        this.fillChartData(res.data);
        this.renderChart();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
