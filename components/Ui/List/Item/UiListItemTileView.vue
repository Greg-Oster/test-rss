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
})
</script>

<template>
  <div class="list-item">
    <div class="list-item__body">
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
  </div>
</template>

<style scoped lang="scss">
.list-item {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-default);

  &__title {
    display: flex;
    font-size: var(--h2-font-size);
    color: var(--color-primary);
    font-weight: bold;
  }

  &__body {
    display: flex;
    flex-direction:  column;
    padding: pacing(6);
    padding-bottom: pacing(4);
    gap: pacing(4);
  }

  &__content {
    flex: 1;
  }

  &__image {
    width: 200px;
    height: 100px;
    object-fit: cover;
    border-radius: var(--border-radius-sm, 4px);
  }

  &__footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    color: var(--color-secondary);
    padding: pacing(2) pacing(6);
  }
}
</style>
