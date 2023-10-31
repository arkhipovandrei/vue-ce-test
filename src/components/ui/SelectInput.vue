<template>
  <div class="input-block">
    <label
      class="input-label"
      :for="id"
    >{{ label }}</label>
    <select
      :id="id"
      v-model="value"
      class="input"
      :class="{ 'input-invalid': hasError }"
      required
    >
      <option
        value=""
        disabled
        selected
      >
        {{ unref(placeholder) }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <Transition name="fade">
      <InputErrors
        v-if="hasError"
        :errors="errors"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue'
import InputErrors from '@/components/ui/InputErrors.vue'
interface Option {
  text: string
  value: string
}

interface Props {
  modelValue: string
  options: Option[]
  label: string
  placeholder?: string
  id: string
  errors: string[]
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  placeholder: ''
})

const emit = defineEmits<{
  'update:modelValue': [val: string]
  input: [val: string]
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    emit('input', value)
  }
})

const hasError = computed(() => props.errors && props.errors.length)
</script>

<style scoped>
select:invalid {
  color: gray;
}
</style>
