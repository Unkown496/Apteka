<template>
  <header class="header">
    <div class="header-container">
      <NuxtLink
        href="/"
        class="header-logo"
      >
        home
      </NuxtLink>

      <div class="header-content">
        <!-- <InputAutocomplete
          placeholder="Поиск"
          type="text"
        >
          <template #icon>
            <Magnify />
          </template>
        </InputAutocomplete> -->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Magnify from "@assets/icons/Magnify.svg";
</script>

<style lang="scss">
.header {
  width: 100%;

  &-container {
    @include add-spaces(x, 3);

    display: flex;
  }

  &-logo {
    color: $blue;
    display: inline-flex;
    align-items: center;
  }
  &-content {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
</style>
