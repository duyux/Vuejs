<template>
  <avue-form-design style="height: 100vh;"
                    :include-fields="includeFields">
  </avue-form-design>
</template>

<script>

export default {
  data() {
    return {
      includeFields: ['input']
    }
  },
}
</script>
