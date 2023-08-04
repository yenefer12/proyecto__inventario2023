<script setup>
const searchTerm = ref('');
const onSearch = (term) => {
  searchTerm.value = term;
};
</script>
<template>
<Search @search="onSearch"/>
<TableDigital :searchTerm="searchTerm"/>
</template>
<style lang="scss" scoped>
</style>