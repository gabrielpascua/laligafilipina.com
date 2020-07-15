<template>
    <span>{{ day }}<br />{{ date }}</span>
</template>

<script>
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default {
    data: function() {
        const today = new Date();
        return {
            day: `${days[today.getDay()]}`,
            date: `${months[today.getMonth()]} ${today.getDate()}`
        }
    }
}
</script>