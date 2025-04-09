<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { ref, onMounted, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const country = ref(null);
const borderCountries = ref([]);
const isLoading = ref(true);

const fetchCountry = async () => {
  isLoading.value = true;
  country.value = null;
  borderCountries.value = [];

  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${route.params.cca3}`);
    const data = await response.json();
    country.value = data[0];

    if (country.value.borders) {
      await fetchBorderCountries(country.value.borders);
    }
  } catch (error) {
    console.error("Error fetching country:", error);
  } finally {
    isLoading.value = false;
  }
};

const fetchBorderCountries = async (borderCodes) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`
    );
    const data = await response.json();

    // Store full country names
    borderCountries.value = data.map((country) => ({
      name: country.name.common,
      code: country.cca3,
    }));
  } catch (error) {
    console.error("Error fetching border countries:", error);
  }
};

onMounted(fetchCountry);
watch(
  () => route.params.cca3,
  () => {
    fetchCountry();
  }
);
</script>
<template>
  <div class="mx-auto max-w-7xl p-6">
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="flex items-center mt-8 mb-16 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      <font-awesome-icon class="mr-2" :icon="faArrowLeftLong" />
      Back
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center text-xl mt-10">Loading country data...</div>

    <!-- Country Details -->
    <div
      v-else-if="country"
      class="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-center"
    >
      <!-- Flag Section -->
      <img
        :src="country.flags.svg || country.flags.png"
        :alt="'Flag of ' + country.name.common"
        class="w-full max-h-[400px] object-contain"
      />

      <!-- Country Info Section -->
      <div>
        <h1 class="text-3xl font-bold mb-10">{{ country.name.common }}</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <!-- Left Column -->
          <div class="space-y-2">
            <p>
              <strong>Native Name:</strong>
              {{
                country.name.nativeName
                  ? Object.values(country.name.nativeName)[0].common
                  : country.name.common
              }}
            </p>
            <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
            <p><strong>Region:</strong> {{ country.region }}</p>
            <p><strong>Sub Region:</strong> {{ country.subregion || "N/A" }}</p>
            <p><strong>Capital:</strong> {{ country.capital?.[0] || "N/A" }}</p>
          </div>

          <!-- Right Column -->
          <div class="space-y-2">
            <p><strong>Top Level Domain:</strong> {{ country.tld?.[0] || "N/A" }}</p>
            <p>
              <strong>Currencies:</strong>
              {{
                country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "N/A"
              }}
            </p>
            <p>
              <strong>Languages:</strong>
              {{ country.languages ? Object.values(country.languages).join(", ") : "N/A" }}
            </p>
          </div>
        </div>

        <!-- Border Countries -->
        <div v-if="borderCountries.length" class="flex flex-col xl:flex-row xl:items-center gap-2">
          <strong>Border Countries:</strong>
          <div class="flex flex-wrap gap-2">
            <RouterLink
              v-for="border in borderCountries"
              :key="border.code"
              :to="`/country/${border.code}`"
              class="dark:bg-gray-700 px-3 py-1 rounded text-sm shadow-sm hover:underline"
            >
              {{ border.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
