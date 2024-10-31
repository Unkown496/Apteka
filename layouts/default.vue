<template>
  <div class="layout">
    <Header />

    <main>
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  main {
    display: flex;
    flex: 1;
  }
}
.container {
  @include add-spaces(all, 2);
  flex: 1;
}
</style>
