<template>
  <div class="select-container">
    <Input
      :="$attrs"
      :value="inputValue"
      readonly
      ref="input"
      type="text"
      @click="handleClick"
      class="select-input"
    />

    <Menu
      v-if="!!inputRef"
      :items="items"
      :included="[inputRef?.$el as Node]"
      v-model="isOpenMenu"
      @click-item="handleClickItem"
      class="select-menu"
    />
  </div>
</template>

<script setup lang="ts">
interface InputSelectProps {
  items: string[];
}

defineProps<InputSelectProps>();

const inputValue = ref<string>();
const isOpenMenu = ref<boolean>(false);

const model = defineModel({ type: Object });

const inputRef = useTemplateRef("input");

const handleClick = () => {
  isOpenMenu.value = true;

  return;
};

const handleClickItem = (data: { item: string; index: number }) => {
  model.value = data;

  inputValue.value = data.item;

  return;
};
</script>

<style lang="scss">
.select {
  &-container {
    position: relative;
    display: inline-flex;
  }
  &-input {
    cursor: pointer;
  }
  &-menu {
    bottom: 0;
    transform: translateY(100%);
  }
}
</style>
