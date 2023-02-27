<template>
  <a href="https://www.pagasa.dost.gov.ph/weather" class="capitalize">
    {{temperature}}&deg;C
    <br />
    {{description}}
  </a>
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
