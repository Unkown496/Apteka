<template>
  <p
    :="$attrs"
    class="toolbar-title"
  >
    <slot />
  </p>
</template>

<style lang="scss">
.toolbar-title {
  // Чтобы переполняющий текст превратился в ...
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: map-get($text-sizes, "large");
  font-weight: 500;
}
</style>
