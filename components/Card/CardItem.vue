<template>
  <Card
    :="$attrs"
    class="card-item"
  >
    <div class="card-item-container">
      <div class="card-item-data">
        <p class="card-item-text">Описание:</p>
        <p class="card-item-description">
          {{ text }}
        </p>

        <p class="card-item-price">
          Цена:

          <span
            :data-old-price="oldPrice"
            class="card-item-price-text"
          >
            {{ price }}
          </span>

          <Dollar />
        </p>

        <p class="card-item-category">
          Категория:

          <span>{{ category }}</span>

          <Sale />
        </p>
      </div>
      <div class="card-item-media">
        <NuxtImg
          class="card-item-image"
          :src="image"
        />
      </div>

      <div class="card-item-actions">
        <NuxtLink
          external
          :to="`/${slug}`"
        >
          <Button>Подробнее</Button>
        </NuxtLink>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Dollar from "@assets/icons/Dollar.svg";
import Sale from "@assets/icons/Sale.svg";

interface CardItemProps {
  image: string;
  price: number;
  oldPrice: number;
  text: string;
  category: string;
  slug: string;
}

defineProps<CardItemProps>();
</script>

<style lang="scss">
.card-item {
  &-container {
    display: grid;
    height: 100%;
    grid-template-columns: repeat(12, 1fr);
  }

  &-media {
    grid-column-start: 8;
    grid-column-end: -1;
  }
  &-data {
    grid-column: span 7 / span 7;
    display: flex;
    flex-direction: column;
    gap: list.nth($spaces, 2);
  }
  &-image {
    aspect-ratio: 16/9;
    max-height: 250px;
    width: 100%;
  }

  &-price,
  &-actions,
  &-category {
    display: inline-flex;
    align-items: center;

    gap: list.nth($sizes, 2);

    & svg {
      border-radius: list.nth($sizes, 2);
    }
  }

  &-price {
    & svg {
      border: 1px solid $green;
    }

    &-text {
      position: relative;
      color: $green;

      &::before {
        content: "";
        position: absolute;
        border: 1px solid $red;
        width: 12px;
        left: -5%;
        top: 50%;
        transform: rotate(40deg) translateX(-100%);
        transform-origin: right;
      }
      &::after {
        content: attr(data-old-price);
        position: absolute;
        top: -120%;
        left: 20%;
        font-size: map-get($text-sizes, "small") + 4px;
        color: $red;
        transform: translateY(100%) translateX(-100%);
      }
    }
  }
  &-category {
    & svg {
      border: 1px solid $grey;
    }
  }
}
</style>
