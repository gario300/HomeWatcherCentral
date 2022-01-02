<template>
  <div class="columns">
    <div class="column is-12">
      <progress
        :class="getStatusParsantage().class"
        :value="getStatusParsantage().value"
        max="100"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'statusBar',
  props: {
    status: String
  },
  methods: {
    getStatusParsantage () {
      const parsantageCauses = {
        S: {
          value: 10,
          class: 'progress is-danger',
          name: 'Recibido'
        },
        A: {
          value: 25,
          class: 'progress is-warning',
          name: 'Atendiendo'
        },
        P: {
          value: 50,
          class: 'progress is-warning',
          name: 'En proceso'
        },
        D: {
          value: 75,
          class: 'progress is-info',
          name: 'Supervisor en lugar'
        },
        E: {
          value: 100,
          name: 'Finalizado',
          class: 'progress is-success'
        }
      }
      return parsantageCauses[this.status]
    }
  }
}
</script>

<style scoped>

</style>
