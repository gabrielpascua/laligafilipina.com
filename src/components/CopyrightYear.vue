<template>
    <span>{{ year }}</span>
</template>

<script>
export default {
    data: function() {
        const today = new Date();
        return {
            year: today.getFullYear()
        }
    }
}
</script>