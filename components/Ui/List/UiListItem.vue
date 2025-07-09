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
  <div class="list-item" :class="{ 'list-item--tile': uiStore.isTileView, 'list-item--list': uiStore.isListView }">
    <!-- List view layout -->
    <template v-if="uiStore.isListView">
      <NuxtImg v-if="image" :src="image" class="list-item__image" alt="Article image" loading="lazy" />
      <div class="list-item__content">
        <a :href="link" target="_blank" class="list-item__title">{{ title }}</a>
        <div v-if="description" class="list-item__description" v-html="description" />
      </div>
      <div class="list-item__footer">
        <div v-if="source" class="list-item__source">
          {{ source }}
        </div>
        <div v-if="formattedDate" class="list-item__date">
          {{ formattedDate }}
        </div>
      </div>
    </template>

    <!-- Tile view layout -->
    <template v-else>
      <a :href="link" target="_blank" class="list-item__title">{{ title }}</a>
      <div v-if="description" class="list-item__description" v-html="description" />
      <div class="list-item__footer">
        <div v-if="source" class="list-item__source">
          {{ source }}
        </div>
        <div v-if="formattedDate" class="list-item__date">
          {{ formattedDate }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.list-item {
  padding: 1rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-default);

  // List view styles
  &--list {
    display: flex;
    gap: 20px;

    .list-item__content {
      flex: 1;
    }

    .list-item__image {
      width: 30%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--border-radius-sm, 4px);
    }

    .list-item__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
    }
  }

  // Tile view styles
  &--tile {
    width: calc(50% - 0.5rem);
    display: flex;
    flex-direction: column;

    .list-item__footer {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 0.5rem;
    }
  }

  &__date {
    font-size: 0.8rem;
    color: var(--color-secondary);
  }

  &__source {
    color: #666;
    font-weight: 500;
    background-color: #f0f0f0;
    padding: 0.1rem 0.5rem;
    border-radius: 3px;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
    margin-bottom: 0.5rem;
    display: block;

    &:hover {
      text-decoration: underline;
    }
  }

  &__description {
    font-size: 0.9rem;
    color: #555;
  }
}
</style>
