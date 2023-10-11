<template>
<!--    <v-footer app color="#222222">-->
<!--            <v-col class="text-center ma-2">-->
<!--                {{ new Date().getFullYear() }} — <strong>LiteStack</strong>-->
<!--            </v-col>-->
<!--    </v-footer>-->
   <div class="footer">
      <span>{{ new Date().getFullYear() }} — <strong>LiteStack</strong></span>
   </div>
</template>

<style scoped>

   .footer{
      background-color: #222;
      width: 100%;
      height: 80px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      letter-spacing: 3px;
   }

</style>

<script>
export default {
    name: 'Footer',
    data: () => ({
        links: [
            ['CЕРВЕРИ', '/servs'],
            ['ГРАФІКИ', '/graphs'],
            ['БАЗИ ДАНИХ', '/databases'],
            ['РОЗРОБКА', '/coding'],
            ['ІНСТРУКЦІЇ', '/instructions'],
        ],
    }),
}
</script>