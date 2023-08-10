<script setup>
import { ref } from "vue";
const searchTerm = ref("");
const onSearch = (term) => {
  searchTerm.value = term;
};
definePageMeta({
  middleware: "auth",
  middleware: "route",
});
</script>
<template>
  <Search @search="onSearch" />
  <TableGestion :searchTerm="searchTerm" />
</template>
<style lang="scss" scoped></style>
