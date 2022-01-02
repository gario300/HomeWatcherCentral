<template>
  <div>
    <nav class="navbar is-success">
      <div class="navbar-brand">
        <div class="navbar-item">
          <h3 class="title is-6">
            Hola, Operador
          </h3>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <div class="box">
            <gmapComponent
              :lat="emergence.latitude"
              :lng="emergence.longitude"
              :full="true"
            />
            <div class="columns">
              <div class="column is-12">
                <div class="columns">
                  <div class="column">
                    <h2 class="title is-3">
                      Tipo: {{ emergence.type }}
                    </h2>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <h2 class="title is-5">
                      Nombre: {{ emergence.name+' '+emergence.lastName }}
                    </h2>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <h2 class="title is-5">
                      Ubicación: {{ emergence.address }}
                    </h2>
                  </div>
                </div>
                <statusBar
                  :status="emergence.status"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="colums">
        <div class="column is-6">
          <div class="field">
            <label class="label">
              Elegir Supervisor
            </label>
            <div class="select is-primary is-fullwidth">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <div class="field">
            <label class="label">
              Acción a ejecutar
            </label>
            <textarea
              class="textarea is-success"
              placeholder="Describe la acción"
              v-model="details"
            >
            </textarea>
          </div>
          <div class="field">
            <button
              class="button is-warning is-fullwidth"
              @click="alterById()"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gmapComponent from '../../components/Map.vue'
import QueriyingClass from '../../utils/queriyingClass'
export default {
  name: 'detailsEmergence',
  components: {
    gmapComponent
  },
  data () {
    return {
      emergence: {
        name: '',
        lastName: '',
        type: '',
        address: '',
        status: 'S',
        id: '',
        latitude: 0,
        longitude: 0
      },
      details: ''
    }
  },
  mounted () {
    this.getElementById()
  },
  methods: {
    getElementById () {
      QueriyingClass.findByDoc('emergencesColection', this.$route.params.id).then((r) => {
        const localEmergence = r[0]
        this.emergence = {
          name: localEmergence.name,
          lastName: localEmergence.lastName,
          type: localEmergence.type,
          address: localEmergence.address,
          status: localEmergence.status,
          id: localEmergence.id,
          latitude: localEmergence.lat,
          longitude: localEmergence.lng
        }
        this.details = localEmergence.details ? localEmergence.details : ''
      })
    },
    async alterById () {
      const newStatus = {
        A: 'P',
        P: 'D'
      }
      await QueriyingClass.editData(
        'emergencesColection',
        {
          status: newStatus[this.emergence.status],
          details: this.details
        },
        this.emergence.id
      ).then(() => {
        this.getElementById()
        alert('Actualizado con exito')
        if (newStatus[this.emergence.status] === 'D') {
          this.$router.push('/Central')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
