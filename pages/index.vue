<template>
  <div class="container-page">
    <Toolbar class="filter">
      <div class="filter-buttons">
        <Button
          icon
          @click="() => (filters.view = 'grid')"
          :blue="filters.view === 'grid'"
        >
          <Grid />
        </Button>

        <Button
          icon
          @click="() => (filters.view = 'col')"
          :blue="filters.view === 'col'"
        >
          <Columns />
        </Button>
      </div>

      <div class="filter-inputs">
        <InputSelect
          placeholder="Свойство для поиска!"
          v-model="filters.field"
          :items="Object.keys(filterKeys)"
        />
        <InputAutocomplete
          placeholder="Поиск"
          :disabled="!filters.field"
          :items="autocompleteItems"
          v-model="filters.search"
        >
          <template #icon>
            <Magnify />
          </template>
        </InputAutocomplete>
      </div>
    </Toolbar>

    <div
      :class="`grid-items-${filters.view}`"
      class="grid-items"
    >
      <CardItem
        v-if="searchItems.length > 0"
        v-for="item in searchItems"
        :title="item.title"
        :text="item.description"
        :price="item.price"
        :old-price="item.oldPrice"
        :slug="item.slug"
        :image="item.image"
        :category="item.category"
      />
      <div v-else>
        <p>Ничего не найдено!</p>
        <p
          @click="() => (filters.search = '')"
          type="button"
          class="reset-filters"
        >
          Может сбросить фильтры?
        </p>
      </div>
    </div>

    <Pagination
      v-model="currentPage"
      :page="data?.totalPages"
    />
  </div>
</template>

<script setup lang="ts">
import Grid from "@assets/icons/Grid.svg";
import Columns from "@assets/icons/Columns.svg";
import Magnify from "@assets/icons/Magnify.svg";

type Filters = {
  view: "col" | "grid";
  field: null | { item: string; index: number };
  search: string;
};

const filterKeys: Record<string, string> = {
  Название: "title",
  Категория: "category",
  Описание: "description",
};

const filters = reactive<Filters>({
  view: "col",
  field: null,
  search: "",
});

const route = useRoute();

const currentPage = ref<number>(+route.query.page! as number);

const router = useRouter();

if (isNaN(+route.query.page))
  router.push({ name: "index", query: { page: 1 } });

const { data, error } = await useFetch("/api/items", {
  query: {
    ...{
      page: isNaN(currentPage.value) ? 1 : currentPage.value,
    },
  },
});

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    message: error.value?.message,
  });
}

const autocompleteItems = computed<Array<{ key: string; value: string }> | []>(
  () => {
    if (!filters.field) return [];

    const currentFilterKey = filterKeys[filters.field.item as string];

    const autocompleteData: Array<{ key: string; value: string }> =
      data.value?.items.map(item => {
        return {
          key: item.id,
          value: item[currentFilterKey],
        };
      });

    return autocompleteData;
  }
);

const searchItems = computed(() => {
  const currentFilterKey = filterKeys[filters?.field?.item as string];

  if (!currentFilterKey) return data.value?.items;

  return data.value?.items?.filter(item =>
    item[currentFilterKey].match(normalazeString(filters.search))
  );
});
</script>

<style lang="scss">
.container-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: list.nth($spaces, 2);
}

.reset-filters {
  color: $blue;
}
.grid-items {
  display: grid;
  flex: 1;
  gap: list.nth($sizes, 3);

  margin: {
    left: 32px;
    right: 32px;
  }

  &-col {
    grid-template-columns: 1fr;
  }
  &-grid {
    grid-template-columns: repeat(3, 1fr);

    .card-item {
      &-media {
        order: -1;
      }

      &-media,
      &-actions,
      &-data {
        grid-column: span 12 / 12;
      }
    }
  }
}

.filter {
  .toolbar-container {
    display: flex;
    gap: list.nth($sizes, 3);
  }

  &-buttons,
  &-inputs {
    display: flex;
    gap: list.nth($sizes, 2);
  }
  &-inputs {
    flex: 1;
    gap: list.nth($sizes, 3);
  }
}
</style>
