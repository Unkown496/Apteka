<template>
  <div class="current-item">
    <NuxtImg
      class="current-item-image"
      :src="data.image"
    />
    <Card :title="data.title">
      <div class="card-item-data">
        <p class="card-item-text">Описание:</p>
        <p class="card-item-description">
          {{ data.description }}
        </p>

        <p class="card-item-price">
          Цена:

          <span
            :data-old-price="data.oldPrice"
            class="card-item-price-text"
          >
            {{ data.price }}
          </span>

          <Dollar />
        </p>

        <p class="card-item-category">
          Категория:

          <span>{{ data.category }}</span>

          <Sale />
        </p>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Dollar from "@assets/icons/Dollar.svg";
import Sale from "@assets/icons/Sale.svg";

const route = useRoute();

const { data, error } = await useFetch(`/api/item/${route.params.slug}`);

if (!data.value) {
  throw createError({
    ...error.value,
  });
}
</script>

<style lang="scss">
.current-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;

  &-image {
    height: 50vh;
  }
}
</style>
