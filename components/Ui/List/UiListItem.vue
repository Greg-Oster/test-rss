<script setup lang="ts">
import { useUiStore } from '~/stores/ui'

defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  formattedDate: {
    type: String,
    required: false,
    default: '',
  },
  source: {
    type: String,
    required: false,
    default: '',
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
})

const uiStore = useUiStore()
</script>

<template>
  <UiListItemListView
    v-if="uiStore.isListView"
    :image="image"
    :title="title"
    :description="description"
    :formatted-date="formattedDate"
    :source="source"
    :link="link"
  />

  <UiListItemTileView
    v-if="uiStore.isTileView"
    :title="title"
    :description="description"
    :formatted-date="formattedDate"
    :link="link"
  />
</template>
