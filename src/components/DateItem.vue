<script setup>
const props = defineProps({
  date: Date,
});
console.log(props.date);
const formatedDay = props?.date?.toLocaleString("en-US", { weekday: "long" });
const formatedMonth = props?.date?.toLocaleString("en-US", { month: "long" });
</script>

<template>
  <li class="dateList">
    {{ formatedDay }} {{ props?.date?.getDate() }} {{ formatedMonth }}
  </li>
</template>

<style>
ul {
  padding: 0;
}

.dateList {
  list-style: none;
  display: inline-block;
  padding: 10px;
  background: white;
  margin: 5px;
  border-radius: 5px;
  border-bottom: solid 3px transparent;
  box-sizing: border-box;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.01), 0 2px 4px rgba(0, 0, 0, 0.01);
}

.dateList:hover,
.dateList.active {
  border-bottom: solid 3px #419bfc;
  background: linear-gradient(to top, #d7e4fc 0%, #ffffff 50%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}
</style>
