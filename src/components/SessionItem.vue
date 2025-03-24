<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  session: Object,
});

const router = useRouter();

const goToReservation = () => {
  router.push(`/reservation/${props.session.id}`);
};
</script>

<template>
  <div>
    <h4>
      Schedule : {{ new Date(props.session.start_time).toLocaleTimeString() }}
    </h4>
    <button class="loginLogout" @click="goToReservation">Reserve</button>
  </div>
</template>

<style scoped>
.loginLogout {
  margin-top: 4px;
}
</style>
