<script setup>
import {storeToRefs} from 'pinia';

import {useAlertStore} from '@/stores/alert.store.js';

const alertStore = useAlertStore();
const {alert} = storeToRefs(alertStore);

const props = defineProps({
  width: Number
})

window.onclick = (event) => {
    if (event.target.matches('.alert-container')) {
        alertStore.clear()
    }
}
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
        alertStore.clear()
    }
});

</script>

<template>
    <v-container v-if="alert" class="alert-container d-flex justify-center">
        <div class="alert-info alert-dismissable" :class="alert.type" :style='"width: " + (props.width || 50) + "%;"'>
            <button @click="alertStore.clear()" class="alert-btn">×</button>
            <span>{{ alert.message }}</span>
        </div>

    </v-container>
</template>

<style>
.alert-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.alert-container .alert-info {
    position: relative;
    background: var(--red);
    opacity: 0.9;
    color: black;

    padding: 20px;
    font-size: 16px;
}

.alert-container .alert-info .alert-btn {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0 15px;
    font-size: 30px;
}

.alert-container .alert-info span {
    height: 100%;
    display: flex;
    margin: 0 15px;
    align-items: center;
    justify-content: flex-start;
}
</style>