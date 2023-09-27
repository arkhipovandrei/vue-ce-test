<template> 
  <div :class="classlist">
    <button
      :class="{
        'bg-text-thirdly text-black uppercase px-2 py-1 hover:opacity-90': true,
        [isSpanish(lang) ? 'es-font' : 'en-ru-font']: true,
        'button--large': isLarge,
        'bg-text-secondary': isReversed,
        'hover:bg-text-secondary': withHover && !isReversed,
        'hover:bg-text-thirdly': withHover && isReversed,
      }"
      @click="isOpened = true"
    >
      {{ label || t('signUp') }}
    </button>
    <VueFinalModal
      v-model="isOpened"
      class="vue-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      content-class="relative max-w-[575px] mx-auto inset-0 h-[100dvh] flex justify-center md:items-center max-md:overflow-auto max-md:bg-[#151516]"
    >
      <SignUp
        :lang="lang"
        @close="closeModal"
      />
    </VueFinalModal>
  </div>
</template>

<script setup lang="ts">
import '@/styles/global.scss'
import type { Locales } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'
import {onBeforeMount, ref, toRef} from 'vue'
import { useModal, VueFinalModal } from 'vue-final-modal'
import SignUp from '@/components/signup/SignUp.vue'
import {isSpanish} from '@/consts/isSpanish'
import ModalSuccess from '@/components/signup/ModalSuccess.vue'

const props = defineProps<{
  lang: Locales,
  classlist?: string,
  label?: string,
  isLarge?: boolean,
  withHover?: boolean,
  isReversed?: boolean,
}>()

const urlSearchParams = new URLSearchParams(window.location.search)
const code = urlSearchParams.get('code')
const email = urlSearchParams.get('email')
const lead_id = urlSearchParams.get('lead_id')
const login = urlSearchParams.get('login')

const redirectHref = `${import.meta.env.PUBLIC_DASHBOARD_URL}?login=${login}`

const lang = toRef(props, 'lang')
const t = useTranslations(lang.value)
const isOpened = ref(false)

const closeModal = () => {
  isOpened.value = false
}

const { open: openSuccessModal } = useModal({
  component: ModalSuccess,
  attrs: {
    isConfirmed: true,
    redirectHref: redirectHref
  }
})

if (code && login && email) {

  fetch('https://api.mybid.io/api/v1/sign-up/verification', {
    body: JSON.stringify({ code, lead_id, email }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(openSuccessModal)
}


onBeforeMount(async () => {
  isOpened.value = window.location.href.includes('regForm')
  const elements = document.querySelectorAll('.vue-modal-content')

  elements.forEach((elem, i) => {
    if (i >= 0) {
      isOpened.value = false
    }
  })
})
</script>

<style scoped lang="scss">
.button {
  &--large {
    width: 295px;
    padding: 22px 34px;
  }
}
</style>