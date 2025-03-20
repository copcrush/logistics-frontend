<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps(["products"]);
const chartRef = ref(null);

onMounted(() => {
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  const productSales = props.products
    .map((product) => {
      const totalOrders = product.orders.length;
      const totalQuantity = product.orders.reduce(
        (sum, order) => sum + order.quantity,
        0
      );

      return {
        name: product.name,
        totalOrders,
        totalQuantity,
      };
    })
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: productSales.map((p) => p.name),
      datasets: [
        {
          label: "Orders",
          data: productSales.map((p) => p.totalOrders),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Quantity Sold",
          data: productSales.map((p) => p.totalQuantity),
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        y: { beginAtZero: true },
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
