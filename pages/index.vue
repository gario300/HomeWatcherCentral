<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-narrow">
        <button
          @click="goCentral"
          class="button is-success"
        >
          Ir a Central
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    goCentral () {
      this.$router.push('Central')
    }
  }
}
</script>
