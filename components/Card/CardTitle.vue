<template>
  <p
    :="$attrs"
    class="card-title"
  >
    <slot />
  </p>
</template>

<style lang="scss">
.card-title {
  font-weight: 500;
  font-size: map-get($text-sizes, "large");
}
</style>
