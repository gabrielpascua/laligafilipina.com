<template>
  <span>
    {{temperature}}&deg;C
    <br />
    {{description}}
  </span>
</template>

<script>
export default {
  props: {
    temperature: {
      type: String
    },
    description: {
      type: String
    }
  }
};
</script>
