<script setup>

</script>

<template>
<!--      <v-container>-->
<!--          <v-card>-->
<!--              <v-tabs-->
<!--                  v-model="tab"-->
<!--                  bg-color="dark"-->
<!--              fixed-tabs >-->
<!--                  <v-tab value="servers">Сервери</v-tab>-->
<!--                  <v-tab value="graphs">Графіки</v-tab>-->
<!--                  <v-tab value="dbs">Бази даних</v-tab>-->
<!--                  <v-tab value="dev">Розробка</v-tab>-->

<!--              </v-tabs>-->

<!--              <v-card-text>-->
<!--                  <v-window v-model="tab">-->
<!--                      <v-window-item value="servers">-->
<!--                          <Servers/>-->
<!--                      </v-window-item>-->
<!--                      <v-window-item value="graphs">-->
<!--                          Graphs-->
<!--                      </v-window-item>-->
<!--                      <v-window-item value="dbs">-->
<!--                          DBs-->
<!--                      </v-window-item>-->
<!--                      <v-window-item value="dev">-->
<!--                          Dev-->
<!--                      </v-window-item>-->
<!--                  </v-window>-->
<!--              </v-card-text>-->
<!--          </v-card>-->
<!--      </v-container>-->

      <div class="container">
           <div class="info-container" v-for="service in services">
                <div class="info-header" @click="service.showInfo = !service.showInfo;  rotate($event, service)">
                     <span>{{ service.name }}</span>
                     <div class="arrow"></div>
                </div>
             <p v-if="service.showInfo">{{service.text }}</p>
           </div>
      </div>
</template>

<style scoped>
  .container{
    margin: 50px 250px;
  }
  .info-container{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;

    padding: 25px 15px 25px 15px;
  }
  .info-header{
    width: 100%;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 24px;
    letter-spacing: 4px;
    padding-right: 10px;
  }

  .arrow{
    border-width: 0 2px 2px 0;
    transform: translate(60%, 0);
    border-color: black;
    border-style: solid;
    width: 15px;
    height: 15px;
    rotate: 45deg;
  }
  .info-header:hover{
    cursor: pointer;
  }
</style>

<script>
import Servers from "@/views/instructions/Servers.vue"
export default {
    data: () => ({
        tab: null,
        services : [
          {
            name: "СТВОРЕННЯ СЕРВЕРІВ",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n" +
                "      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco \n" +
                "      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in \n" +
                "      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat \n" +
                "      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            showInfo: false,
          },
          {
            name: "ІНТЕГРАЦІЯ МЕТОДІВ ОБРАХУНКУ ДАНИХ",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n" +
                "      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco \n" +
                "      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in \n" +
                "      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat \n" +
                "      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            showInfo: false,
          },
          {
            name: "ІНТЕГРАЦІЯ МЕТОДІВ ВІЗУАЛІЗАЦІЇ ДАНИХ",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n" +
                "      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco \n" +
                "      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in \n" +
                "      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat \n" +
                "      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            showInfo: false,
          },
          {
            name: "ІНТЕГРАЦІЯ БАЗ ДАНИХ",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\n" +
                "      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco \n" +
                "      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in \n" +
                "      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat \n" +
                "      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            showInfo: false,
          },
        ],

        rotate: function (e, s){
          if(s.showInfo === true) {
            e.currentTarget.children[1].style.cssText = `transform: translate(90%, 40%); border-width: 2px 0 0 2px; `;
          } else e.currentTarget.children[1].style.cssText = `transform: translate(60%, 0); border-width: 0 2px 2px 0; `;
        }
    }),
    components: {
        Servers,
    }
}
</script>