<template>
  <component
    :is="tag"
    :="$attrs"
    :class="{
      'toolbar-grey': grey,
      'toolbar-blue': blue,
      'toolbar-shadow': shadow,
      'toolbar-rounded': rounded,
    }"
    class="toolbar"
  >
    <div class="toolbar-container">
      <ToolbarTitle v-if="!!title">{{ title }}</ToolbarTitle>

      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import type { Colors, States } from "~/types/styles";

interface ToolbarProps {
  tag?: string;
  title?: string;
}

withDefaults(defineProps<ToolbarProps & Colors & States>(), {
  tag: "div",
  grey: true,
  shadow: false,
  rounded: false,
  blue: false,
});
</script>

<style lang="scss">
.toolbar {
  @include add-spaces(all, 2);

  background-color: $white;

  // Цвета
  &-blue {
    background-color: $blue;
  }
  &-grey {
    background-color: $grey;
  }

  // Виды
  &-shadow {
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  }
  &-rounded {
    border-radius: list.nth($sizes, 2);
  }
}
</style>
