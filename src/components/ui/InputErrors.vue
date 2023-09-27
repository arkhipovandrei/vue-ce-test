<template>
  <span class="input__error">{{
    errors.map((e, i) => (i !== 0 ? e.toLowerCase() : e)).join(', ')
  }}</span>
</template>

<script setup lang="ts">
interface Props {
  errors: string[]
}
defineProps<Props>()
</script>

<style scoped lang="scss">
.input__error {
  color: red;
  font-size: 14px;
  padding-top: 4px;

  @media screen and (max-width: 420px) {
    font-size: 11px;
  }
  
}
</style>
