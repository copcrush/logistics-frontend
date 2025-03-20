<script setup>
defineProps(["users", "products", "transactions", "orders"]);
</script>

<template>
  <div class="grid grid-cols-4 gap-4 mb-6">
    <div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
      <p class="text-lg">Users</p>
      <p class="text-2xl font-bold">{{ users.length }}</p>
    </div>
    <div class="bg-green-500 text-white p-4 rounded-lg shadow-md">
      <p class="text-lg">Products</p>
      <p class="text-2xl font-bold">{{ products.length }}</p>
    </div>
    <div class="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
      <p class="text-lg">Transactions</p>
      <p class="text-2xl font-bold">{{ transactions.length }}</p>
    </div>
    <div class="bg-red-500 text-white p-4 rounded-lg shadow-md">
      <p class="text-lg">Orders</p>
      <p class="text-2xl font-bold">{{ orders.length }}</p>
    </div>
  </div>
</template>
