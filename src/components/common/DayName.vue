<template>
    <a href="https://time.is/Philippines">
      {{ date }}<br />{{ day }}
    </a>
</template>

<script>
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default {
  data: function() {
    const today = new Date();
    return {
      day: `${days[today.getDay()]}`,
      date: `${months[today.getMonth()]} ${today.getDate()}`
    };
  }
};
</script>
