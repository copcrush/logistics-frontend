<script setup>
import { ref, onMounted } from "vue";
import SummaryCards from "~/components/SummaryCards.vue";
import BarChart from "~/components/BarChart.vue";
import LineChart from "~/components/LineChart.vue";

const API_BASE = process.env.NUXT_PUBLIC_API_BASE || "http://localhost:5000";

const users = ref([]);
const products = ref([]);
const transactions = ref([]);
const orders = ref([]);

const fetchData = async () => {
  try {
    console.log("Fetching data...");
    const [usersRes, productsRes, transactionsRes, ordersRes] =
      await Promise.all([
        fetch(`${API_BASE}/users`),
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/transactions`),
        fetch(`${API_BASE}/orders`),
      ]);

    if (
      !usersRes.ok ||
      !productsRes.ok ||
      !transactionsRes.ok ||
      !ordersRes.ok
    ) {
      throw new Error("API Response not OK");
    }

    users.value = await usersRes.json();
    products.value = await productsRes.json();
    transactions.value = await transactionsRes.json();
    orders.value = await ordersRes.json();

    console.log("Data fetched successfully:", {
      users,
      products,
      transactions,
      orders,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(fetchData);
</script>

<template>
  <div
    class="p-6 bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen text-white"
  >
    <h1 class="text-3xl font-extrabold mb-6 text-center animate-fade-in">
      Dashboard Overview
    </h1>

    <div class="container mx-auto space-y-6">
      <SummaryCards
        :users="users"
        :products="products"
        :transactions="transactions"
        :orders="orders"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="bg-white p-6 rounded-xl shadow-xl animate-slide-in text-gray-900"
        >
          <h2 class="text-xl font-semibold mb-3">
            Top 5 Best-Selling Products
          </h2>
          <BarChart :products="products" />
        </div>

        <div
          class="bg-white p-6 rounded-xl shadow-xl animate-slide-in text-gray-900"
        >
          <h2 class="text-xl font-semibold mb-3">Transactions</h2>
          <LineChart :transactions="transactions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-in-out;
}

.animate-slide-in {
  animation: slide-in 0.8s ease-in-out;
}
</style>
