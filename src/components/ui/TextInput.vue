<template>
  <div class="input-block">
    <label
      class="input-label"
      :for="id"
    >{{ label }}</label>
    <input
      v-model="value"
      :name="id"
      class="input"
      :class="{ 'input-invalid': hasError }"
      :placeholder="unref(placeholder)"
    >
    <Transition name="fade">
      <InputErrors
        v-if="hasError"
        :errors="errors"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {computed, unref} from 'vue'
import InputErrors from '@/components/ui/InputErrors.vue'

interface Props {
  modelValue: string
  label: string
  id: string
  placeholder?: string
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
const hasError = computed(() => props.errors && props.errors.length)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    emit('input', value)
  }
})
</script>
