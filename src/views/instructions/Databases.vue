<template>
   <div class="instruction-container">
      <div>
         <p>
            Для інтеграції баз даних <span class="font-weight-bold"> Postgres</span> та
            <span class="font-weight-bold"> MongoDB</span> до створеного серверу OpenStack Вам необхідно
            виконати наступні дії:
         </p>
         <ul>
            <li>Перейдіть на сторінку <span class="font-weight-bold">"Бази даних".</span></li>
            <li>Знайдіть необхідний сервер зі списку серверів, на які можливо встановити відповідні модулі.</li>
            <li>Натисніть кнопку <span class="font-weight-bold">"Встановити"</span>
               для інсталяції необхідного модулю та почекайте приблизно 20 хвилин.</li>
         </ul>
         <p>
            Після успішного встановлення модулю текст на кнопці зміниться на
            <span class="font-weight-bold">"Видалити"</span>. Для деінсталяції модулю натисніть на відповідну кнопку.
         </p>
      </div>
   </div>
</template>

<style scoped>
ul li{
   line-height: 160%; /*or whatever height you like*/
   list-style: circle;
}

ul{
   margin: 0;
   padding: 0 0 0 2em;
}
</style>
<script setup>
</script>