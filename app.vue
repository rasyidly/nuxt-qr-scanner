<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Notivue v-slot="item">
    <Notifications :item="item" :theme="materialTheme" />
  </Notivue>
</template>

<script setup>
import { materialTheme } from 'notivue'
</script>