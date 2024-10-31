<template>
  <div class="pagination">
    <NuxtLink
      v-for="pageNumber in page"
      :key="page"
      :external="true"
      :to="`/?page=${pageNumber}`"
    >
      <button
        class="pagination-button"
        :class="model === pageNumber && 'pagination-button-active'"
        @click="() => handleClick(pageNumber)"
        role="button"
      >
        {{ pageNumber }}
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface PaginationProps {
  page: number;
}

defineProps<PaginationProps>();

const model = defineModel({ type: Number, default: 1 });

const handleClick = (pageNumber: number) => {
  model.value = pageNumber;

  return;
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: list.nth($spaces, 1);

  &-button {
    @include add-spaces(x, 2);
    @include add-spaces(y, 1);

    background-color: transparent;
    border: 1px solid $blue;
    border-radius: list.nth($spaces, 1);

    transition: color, opacity $fast;

    &:hover {
      color: $green;
      opacity: 85;
    }

    &-active {
      color: $green;
    }
  }
}
</style>
