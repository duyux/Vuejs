<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.container {
  border: 2px solid #42b983;
  border-radius: 10px;
  padding: 20px;
}
</style>
