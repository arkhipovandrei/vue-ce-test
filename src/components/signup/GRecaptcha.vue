<template>
  <div
    ref="captchaFieldRef"
    class="captcha"
    :class="{ captcha_invalid: hasError }"
    :data-callback="callbackName"
  />
</template>

<script setup lang="ts">
/**
 * TODO types https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/grecaptcha/index.d.ts
 */
import {ref, onMounted, unref} from 'vue'
defineProps<{
  hasError: boolean
}>()
const emit = defineEmits<{
  load: [id: number]
  'update:hasError': [v: boolean]
}>()
const captchaFieldRef = ref()
const gCaptchaScriptSrc = 'https://www.google.com/recaptcha/api.js?render=explicit'
const gCaptchaSelector = document.head.querySelector(`script[src="${gCaptchaScriptSrc}"]`)

const callbackName = `onGCall_${Math.random()}`
const onGCall = () => {
  emit('update:hasError', false)
}
onMounted(() => {
  window[callbackName] = onGCall

  if (!gCaptchaSelector) {
    const recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', gCaptchaScriptSrc)
    document.head.appendChild(recaptchaScript)
  }

  let checkInterval = setInterval(() => {

    if (grecaptcha) {
      clearInterval(checkInterval)
      grecaptcha.ready(function () {
        const id: number = grecaptcha.render(unref(captchaFieldRef), {
          sitekey: "6LfYxQgkAAAAAIfTsChNOcbtnVWn0SX4H-G7wge6"
        // theme: 'dark'
        })
        emit('load', id)
      })
    } else {
      console.error('grecaptcha not found')
    }
  }, 500)
})



</script>

<style scoped lang="scss">
.captcha {
  align-self: center;
  width: fit-content;
  min-height: 80px;
  &_invalid {
    outline: solid 1px red;
  }
}
</style>
