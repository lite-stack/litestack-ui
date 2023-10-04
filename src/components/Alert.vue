<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/stores/alert.store.js';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);

window.onclick = (event) => {
  if(event.target.matches('.alert-container')){
    alertStore.clear()
  }
}
document.addEventListener('keydown', function(e) {
  if(e.key === "Escape" ){
    alertStore.clear()
  }
});

</script>

<template>
  <div v-if="alert" class="alert-container" >
    <div class="alert-info alert-dismissable" :class="alert.type">
      <button @click="alertStore.clear()" class="alert-btn">×</button>
      <span>{{alert.message}}</span>
    </div>

  </div>
</template>

<style>
  .alert-container{
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .alert-container .alert-info{
    position: relative;
    background: #1c1c1c;
    opacity: 0.9;
    color: #f44336;
    height: 200px;
    width: 400px;
    font-size: 22px;
    border: 2px solid #222;
    border-radius: 10px;
  }
  .alert-container .alert-info .alert-btn{
    position: absolute;
    right: 0;
    margin-right: 15px;
    font-size: 40px;
  }
  .alert-container .alert-info span{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>