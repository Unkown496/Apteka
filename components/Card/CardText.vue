<template>
  <p
    :="$attrs"
    class="card-text"
  >
    <slot />
  </p>
</template>
<style lang="scss">
.card-text {
  font: {
    weight: 300;
    size: map-get($text-sizes, "medium");
  }
}
</style>
