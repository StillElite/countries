<script setup>
import CountryCard from "./CountryCard.vue";
import { ref, onMounted } from "vue";
import { computed } from "vue";

const countries = ref([]);
const searchQuery = ref("");
const selectedRegion = ref("All");
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

// Fetch data from REST Countries API
const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    countries.value = data; // Store API response
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};
const filteredCountries = computed(() =>
  countries.value.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    const matchesRegion = selectedRegion.value === "All" || country.region === selectedRegion.value;

    return matchesSearch && matchesRegion;
  })
);

// Fetch data when component mounts
onMounted(fetchCountries);
</script>

<template>
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="my-5 flex flex-col md:flex-row md:justify-between gap-6">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a country..."
        class="w-full md:w-1/3 px-6 py-3 rounded shadow text-sm text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-300 bg-white"
      />
      <!-- Region Filter -->
      <div class="relative w-full md:w-64">
        <select
          v-model="selectedRegion"
          class="appearance-none w-full pr-12 pl-4 py-2 rounded shadow border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white text-sm"
        >
          <option value="All">Filter by Region</option>
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>

        <svg
          class="pointer-events-none absolute right-4 -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-white top-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      <CountryCard v-for="country in filteredCountries" :key="country.cca3" :country="country" />
    </div>
  </div>
</template>
