<template>
  <ul
    :class="model && 'menu-show'"
    v-click-outside="{
      handler: handleOutsideClick,
      included: props.included,
    }"
    class="menu"
  >
    <template
      v-for="(item, index) in items"
      :key="index"
    >
      <li
        @click="() => handleClickItem({ item, index })"
        :class="activeItem === index && 'menu-item-active'"
        class="menu-item"
      >
        <template v-if="!!slots.item">
          <slot
            name="item"
            :value="item"
            :index="index"
          />
        </template>
        <template v-else>
          {{ item }}
        </template>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
interface MenuProps {
  items: string[];
  included?: Array<Node>;
}
interface MenuSlots {
  item(props: { value: string; index: number }): any;
}

const props = defineProps<MenuProps>();
const slots = defineSlots<MenuSlots>();

const activeItem = ref<number>();

const model = defineModel({ type: Boolean });
const emits = defineEmits<{
  (e: "click-item", data: { item: string; index: number }): void;
}>();

const handleClickItem = (data: { item: string; index: number }) => {
  activeItem.value = data.index;

  model.value = false;

  return emits("click-item", data);
};

const handleOutsideClick: VoidFunction = () => {
  model.value = false;

  return;
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  position: absolute;
  background-color: #ffff;

  pointer-events: none;

  transition: all $fast;
  opacity: 0;

  border-radius: list.nth($sizes, 2);

  box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);

  &-show {
    pointer-events: all;
    opacity: 100;
  }

  &-item {
    @include add-spaces(all, 2);
    cursor: pointer;
    transition: background-color $fast;

    &:hover {
      background-color: $ligth-grey;
    }
  }
}
</style>
