<script setup>

</script>

<template>
    <div class="container">
        <div class="info-container" v-for="service in services">
            <div class="info-header" @click="service.showInfo = !service.showInfo;  rotate($event, service)">
                <span>{{ service.name }}</span>
                <div class="arrow"></div>
            </div>
            <component v-if="service.showInfo" :is="service.content"></component>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: 50px 250px;
}
.instruction-container{
   padding: 15px 15px;
}

.info-container {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;

    padding: 25px 15px 25px 15px;
}

.info-header {
    width: 100%;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 24px;
    letter-spacing: 4px;
    padding-right: 10px;
}

.arrow {
    border-width: 0 2px 2px 0;
    transform: translate(60%, 0);
    border-color: black;
    border-style: solid;
    width: 15px;
    height: 15px;
    rotate: 45deg;
}

.info-header:hover {
    cursor: pointer;
}
</style>

<script>
import Servers from "@/views/instructions/Servers.vue"
import Databases from "@/views/instructions/Databases.vue"
import Graphs from "@/views/instructions/Graphs.vue"
import Coding from "@/views/instructions/Coding.vue"

export default {
    data: () => ({
        tab: null,
        services: [
            {
                name: "СТВОРЕННЯ СЕРВЕРІВ",
                content: Servers,
                showInfo: false,
            },
            {
                name: "ІНТЕГРАЦІЯ МЕТОДІВ ОБРАХУНКУ ДАНИХ",
                content: Coding,
                showInfo: false,
            },
            {
                name: "ІНТЕГРАЦІЯ МЕТОДІВ ВІЗУАЛІЗАЦІЇ ДАНИХ",
                content: Graphs,
                showInfo: false,
            },
            {
                name: "ІНТЕГРАЦІЯ БАЗ ДАНИХ",
                content: Databases,
                showInfo: false,
            },
        ],

        rotate: function (e, s) {
            if (s.showInfo === true) {
                e.currentTarget.children[1].style.cssText = `transform: translate(90%, 40%); border-width: 2px 0 0 2px; `;
            } else {
                e.currentTarget.children[1].style.cssText = `transform: translate(60%, 0); border-width: 0 2px 2px 0; `
            }
        }
    }),
    components: {
        Servers,
        Databases,
        Graphs,
        Coding,
    }
}
</script>