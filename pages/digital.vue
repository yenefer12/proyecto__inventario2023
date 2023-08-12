<script setup>
  import { ref } from "vue";
  const searchTerm = ref("");
  const onSearch = (term) => {
  searchTerm.value = term;
  };
  definePageMeta({
    middleware: "route",
  });
</script>
<template>
<Search @search="onSearch"/>
<TableDigital :searchTerm="searchTerm"/>
</template>
<style lang="scss" scoped>
</style>