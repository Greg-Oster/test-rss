<script setup lang="ts">
const error = useError()

onUnmounted(() => {
  clearError({ redirect: '/' })
})
</script>

<template>
  <div class="error-container">
    <h1>{{ error?.statusCode }}</h1>
    <h2>{{ error?.statusMessage || 'An error occurred' }}</h2>
    <button @click="clearError({ redirect: '/' })">
      На главную
    </button>
  </div>
</template>

<style scoped lang="scss">
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  h1 {
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin-bottom: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
