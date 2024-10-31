<template>
  <div
    :="$attrs"
    class="card"
  >
    <div
      v-if="!!$slots.header || !!title"
      class="card-header"
    >
      <CardTitle v-if="!!title">{{ title }}</CardTitle>

      <slot name="header" />
    </div>

    <div class="card-body">
      <CardText v-if="!!text">{{ text }}</CardText>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface CardProps {
  title?: string;
  text?: string;
}
interface CardSlots {
  header?: VoidFunction;
  default: VoidFunction;
}

defineSlots<CardSlots>();
const props = defineProps<CardProps>();
</script>

<style lang="scss" scoped>
.card {
  @include add-spaces(all, 2);

  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;

  // Общие стили блоков
  &-header,
  &-body {
    padding-bottom: list.nth($spaces, 2);
  }

  // Блоки
  &-header {
    padding-top: list.nth($spaces, 2);
  }
  &-body {
    flex: 1;
  }
}
</style>
