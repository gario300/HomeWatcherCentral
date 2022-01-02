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
      <div
        v-for="(emergence, index) in emergences"
        class="columns"
        :key="emergence.id"
      >
        <div class="column is-12">
          <div class="box">
            <div class="columns">
              <div class="column is-6">
                <gmapComponent
                  :lat="emergence.lat"
                  :lng="emergence.lng"
                  :full="true"
                />
              </div>
              <div class="column is-6">
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
                <div class="columns">
                  <div class="column is-12">
                    <button
                      :class="getStatusParsantage(emergence.status).class"
                      @click="alterStatus(getStatusParsantage(emergence.status).next, emergence.id, index)"
                    >
                    {{ getStatusParsantage(emergence.status).name }}
                    </button>
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
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'
import gmapComponent from '../../components/Map.vue'
import statusBar from '../../components/StatusBar.vue'
import QueriyingClass from '../../utils/queriyingClass.js'

export default {
  name: 'indexCentral',
  components: {
    gmapComponent,
    statusBar
  },
  data () {
    return {
      emergences: []
    }
  },
  mounted () {
    this.getEmergences()
  },
  methods: {
    async getEmergences () {
      const db = getFirestore()
      const q = query(
        collection(db, 'emergencesColection'),
        where('status', '!=', 'E')
      )
      await onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          switch (change.type) {
            case 'added':
              this.emergences.push({
                ...change.doc.data(),
                id: change.doc.id
              })
              break
            case 'removed':
              this.emergences = this.emergences.filter(emergence => emergence.id !== change.doc.id)
              break
          }
        })
      })
    },
    getStatusParsantage (status) {
      const buttonClass = (v) => {
        return `button ${v} is-fullwidth is-medium`
      }
      const parsantageCauses = {
        S: {
          value: 10,
          class: buttonClass('is-danger'),
          name: 'Atender',
          next: 'A'
        },
        A: {
          value: 25,
          class: buttonClass('is-warning'),
          name: 'Actualizar',
          next: 'P'
        },
        P: {
          value: 50,
          class: buttonClass('is-warning'),
          name: 'Actualizar',
          next: 'D'
        },
        D: {
          value: 75,
          class: buttonClass('is-info'),
          name: 'Finalizar',
          next: 'E'
        },
        E: {
          value: 100,
          name: 'Finalizado',
          class: buttonClass('is-success'),
          next: 'none'
        }
      }
      return parsantageCauses[status]
    },
    async alterStatus (status, id, index) {
      if (status === 'none') {
        return
      }
      if (status === 'P' || status === 'D') {
        this.$router.push(`Details/${id}`)
        return
      }
      await QueriyingClass.editData(
        'emergencesColection',
        { status },
        id
      ).then(() => {
        const newObj = {
          ...this.emergences[index],
          status
        }
        if (status === 'E') {
          this.emergences = this.emergences.filter(emergence => emergence.id !== id)
          return
        }
        this.emergences.splice(index, 1, newObj)
      })
    }
  }
}
</script>
