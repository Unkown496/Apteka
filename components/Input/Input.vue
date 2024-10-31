<template>
  <div class="input-container">
    <input
      :="$attrs"
      :aria-placeholder="$attrs?.placeholder as string | undefined"
      ref="input"
      @input="e => handleInput(e as EventInput)"
      class="input"
    />

    <div
      v-if="!!slots.icon"
      :class="inputValue.length > 0 && 'input-icon-show'"
      class="input-icon"
    >
      <slot name="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type { EventInput } from "~/types";

interface InputSlots {
  icon: Component<never>;
}
interface InputEmit {
  (e: "input", event: EventInput): void;
}

const inputRef = useTemplateRef("input");

defineExpose({
  ref: inputRef,
});

const emit = defineEmits<InputEmit>();
const model = defineModel({ type: String });
const slots = defineSlots<InputSlots>();

const inputValue = ref<string>("");

const handleInput = (e: EventInput) => {
  // Запуск onInput с кастомным типом
  emit("input", e);

  inputValue.value = e.target.value;
  model.value = e.target.value;

  return;
};
</script>

<style lang="scss">
.input {
  @include add-spaces(x, 2);
  @include add-spaces(y, 3);

  padding-right: 22px;
  border: 0;
  border-radius: list.nth($sizes, 2);
  box-shadow: 0px 5px 40px 2px rgba(34, 60, 80, 0.2);

  transition: border-color $fast;

  &::placeholder {
    color: $grey;
  }

  &:focus {
    border: 1px solid $dark;
  }

  &-container {
    position: relative;
  }
  &-icon {
    @include absolute-center;

    transition: opacity $fast;

    opacity: 0;

    position: absolute;
    right: 5px;

    &-show {
      opacity: 100;
    }
  }
}
</style>
