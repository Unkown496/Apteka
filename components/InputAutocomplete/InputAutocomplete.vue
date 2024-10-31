<template>
  <div class="input-autocomplete-container">
    <Input
      :="$attrs"
      :value="inputValue"
      ref="input"
      @input="handleInput"
      class="input-autocomplete"
    >
      <template
        v-for="slotName in Object.keys($slots)"
        v-slot:[slotName]="slotScope"
      >
        <slot
          :name="slotName"
          v-bind="slotScope"
        ></slot>
      </template>
    </Input>

    <Menu
      v-if="isShowMenu"
      :items="menuItems"
      :included="[inputRef?.$el as Node]"
      class="input-autocomplete-menu"
      @click-item="handleClickItem"
      v-model="isShowMenu"
    >
      <template #item="{ value }">
        <div
          v-if="value !== emptyMessage"
          v-html="
            decodeURI(
              normalazeString(value).replace(
                normalazeString(inputValue!),
                `<mark class='input-autocomplete-mark'>${decodeURI(inputValue!)}</mark>`
              )
            )
          "
        />
        <div v-else>{{ value }}</div>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import type { EventInput } from "~/types";
import { normalazeString } from "~/utils/string";

interface InputAutocompleteProps {
  emptyMessage?: string;
  items: Array<{ key: string; value: string }>;
}

const props = withDefaults(defineProps<InputAutocompleteProps>(), {
  emptyMessage: "Ничего не найдено!",
});

const { items, emptyMessage } = toRefs(props);

const inputRef = useTemplateRef("input");

const model = defineModel({ type: String });

const inputValue = ref<string>();

const isShowMenu = ref<boolean>(false);

const handleInput = (e: EventInput) => {
  // Если ничего не введено меню будет закрыто
  if (!!e.target.value) isShowMenu.value = true;
  else isShowMenu.value = false;

  inputValue.value = e.target.value;
  model.value = e.target.value;

  return;
};

const handleClickItem = (data: { item: string; index: number }): void => {
  model.value = data.item;
  inputValue.value = data.item;

  return;
};

const menuItems = computed<string[]>(() => {
  if (inputValue.value?.length === 0)
    return items.value.map(item => item.value);

  const filterItems = items.value.filter(item =>
    normalazeString(item.value).match(normalazeString(inputValue.value!))
  );

  return filterItems.length > 0
    ? filterItems.map(filterItem => filterItem.value)
    : [emptyMessage.value];
});

// Если v-model удаляют и как-то изменяют мануально
watch(model, value => {
  if (value !== inputValue.value) inputValue.value = value;
});
</script>

<style lang="scss">
.input-autocomplete {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &-menu {
    border-top: 1px solid $grey;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }

  &-container {
    position: relative;
  }

  &-mark {
    background-color: $blue;
  }
}
</style>
