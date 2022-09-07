<template>
  <div>
    <p>{{ $store.state.token}}</p>
    <button @click="onVuex">onVuex</button>
  </div>
</template>

<script>
import store from '@/store'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  
  methods: {
    ...mapState(['token']),
    onVuex() {
      // const a = store.dispatch('setToken')
      // console.log(a)
     
    }
  }

}
</script>

<style>

</style>