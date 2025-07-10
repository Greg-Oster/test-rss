<script setup lang="ts">
import { useRssData } from '~/composables/useRssData'

const { filteredItems, loading, errorMessage } = useRssData('/')
</script>

<template>
  <UiListView :items="filteredItems" :loading="loading" :error="errorMessage" />
</template>

<style lang="scss" scoped></style>
