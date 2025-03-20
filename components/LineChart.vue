<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps(["transactions"]);
const chartRef = ref(null);

onMounted(() => {
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  const incomeTransactions = props.transactions
    .filter((t) => t.type === "credit")
    .map((t) => ({
      date: new Date(t.created_at).toLocaleDateString(),
      amount: t.amount,
    }));

  new Chart(ctx, {
    type: "line",
    data: {
      labels: incomeTransactions.map((t) => t.date),
      datasets: [
        {
          label: "Total",
          data: incomeTransactions.map((t) => t.amount),
          borderColor: "#FF5733",
          backgroundColor: "rgba(255, 87, 51, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>

<template>
  <div class="bg-white p-6">
    <canvas ref="chartRef"></canvas>
  </div>
</template>
