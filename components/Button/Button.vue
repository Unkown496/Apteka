<template>
  <button
    :="$attrs"
    :class="{
      'button-icon': icon,
      'button-blue': blue,
      'button-green': green,
    }"
    role="button"
    class="button"
  >
    <div class="button-container">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Colors } from "~/types/styles";

interface ButtonProps {
  icon?: boolean;
}

withDefaults(defineProps<ButtonProps & Pick<Colors, "blue" | "green">>(), {
  icon: false,
  green: false,
  blue: false,
});
</script>

<style lang="scss">
.button {
  @include add-spaces(x, 2);

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 64px;
  min-height: 24px;

  border: 1px solid $dark;
  border-radius: list.nth($sizes, 2);

  transition: background-color, box-shadow, border-color $fast;

  &:hover {
    background-color: $ligth-grey;
    box-shadow: 0px 0px 3px 2px rgba(34, 60, 80, 0.2);
  }

  &-icon {
    @include add-spaces(y, 1);
    min-width: 24px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &-blue {
    border-color: $blue;
  }
  &-green {
    border-color: $green;
  }

  * {
    color: $dark;

    font: {
      weight: 300;
      size: map-get($text-sizes, "meduim");
    }
  }
}
</style>
