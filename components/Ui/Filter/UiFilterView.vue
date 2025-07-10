<script setup lang="ts">

</script>

<template>
  <div class="filter">
    <div class="filter__title">
      <slot>
        <h1>Список новостей</h1>
      </slot>
      <UiFilterRefreshBtn class="filter__refresh" />
    </div>
    <UiFilterSearch class="filter__search" />
  </div>
</template>

<style scoped lang="scss">
.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include max-width(){
    flex-direction: column;
    gap: pacing(4);
  }

  &__title {
    display: flex;
    align-items:  center;
    gap: 1rem;

    @include max-width(){
      width: 100%;
      justify-content: space-between;
    }
  }

  &__search {
    @include max-width(){
      width: 100%;
    }
  }
}
</style>
