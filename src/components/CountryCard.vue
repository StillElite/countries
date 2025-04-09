<script setup lang="ts">
interface Country {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  capital?: string[];
}

defineProps<{ country: Country }>();
</script>

<template>
  <div class="shadow-sm rounded-lg bg-white dark:bg-[#2B3845] overflow-hidden">
    <img
      :src="country.flags.svg"
      :alt="'Flag of ' + country.name.common"
      class="w-full aspect-video object-cover border-gray-100 border dark:border-[#24303b]"
    />
    <div class="px-6 pt-4 pb-6 text-sm dark:text-white space-y-2">
      <RouterLink :to="`/country/${country.cca3}`" class="text-xl font-bold hover:underline">
        {{ country.name.common }}
      </RouterLink>
      <p><span class="font-bold">Population:</span> {{ country.population.toLocaleString() }}</p>
      <p><span class="font-bold">Region:</span> {{ country.region }}</p>
      <p>
        <span class="font-bold">Capital:</span> {{ country.capital ? country.capital[0] : "N/A" }}
      </p>
    </div>
  </div>
</template>
