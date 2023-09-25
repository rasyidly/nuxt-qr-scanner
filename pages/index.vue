<template>
    <h1>Welcome</h1>
</template>

<script setup>
const { data } = await useAsyncData('satfest', () => queryContent('/satfest').findOne())
console.log(data)
</script>