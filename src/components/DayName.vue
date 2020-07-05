<template>
    <span>{{ day }}</span>
</template>

<script>
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default {
    data: function() {
        const today = new Date();
        return {
            day: `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`
        }
    }
}
</script>