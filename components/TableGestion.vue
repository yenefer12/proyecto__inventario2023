<script setup>
  const login = async () => {
    try {
      const data = await useFetch(
        () => `https://inventario-3hbd.onrender.com/api/users`
        );
        console.log(data.data._rawValue)
      } catch (error) {
        console.error(error);
      }
  };
  onMounted(() => {
    login()
  })
</script>
<template>
  <v-table
    class="content-table"
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Numero de documento
        </th>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Estado
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data.data._rawValue"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<style lang="scss" scoped>
  .content-table{
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }

</style>