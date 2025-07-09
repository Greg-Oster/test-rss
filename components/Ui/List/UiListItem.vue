<script setup lang="ts">
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
</script>

<template>
  <div class="list-item">
    <div class="list-item__header">
      <div v-if="formattedDate" class="list-item__date">
        {{ formattedDate }}
      </div>
      <div v-if="source" class="list-item__source">
        {{ source }}
      </div>
    </div>
    <a :href="link" target="_blank" class="list-item__title">{{ title }}</a>
    <img v-if="image" :src="image" class="list-item__image" alt="Article image" />
    <div v-if="description" class="list-item__description" v-html="description" />
  </div>
</template>

<style scoped lang="scss">
.list-item {
  padding: 1rem;
  border-radius: var(--border-radius-md);
  box-shadow:  var(--shadow-default);

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
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

  &__image {
    max-width: 100%;
    height: auto;
    margin: 0.5rem 0;
    border-radius: var(--border-radius-sm, 4px);
  }
}
</style>
