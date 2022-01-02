<template>
    <div>
      <GmapMap
      :center="{lat: lat, lng: lng}"
      :zoom="18"
      map-type-id="terrain"
      class="nofull"
      :class="{'full':full}"
      >
      <GmapMarker
          :position="{lat: parseFloat(lat), lng: parseFloat(lng)}"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
      </GmapMap>
    </div>
</template>

<script>
export default {
  name: 'gmapComponent',
  props: {
    lat: Number,
    lng: Number,
    full: Boolean
  }
}
</script>

<style scoped>
.nofull{
width: 450px;
height: 250px;
}
.full{
    width: 100%;
    height: 500px;
}
</style>
