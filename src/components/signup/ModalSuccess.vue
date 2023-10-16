<template>
  <VueFinalModal
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="modal">
      <div>
        <SuccessIcon class="modal__icon" />
        <h4 class="modal__heading">
          {{t('modalSuccess.hearer')}}
        </h4>
        <div>
          <div v-if="isConfirmed">
            <p class="modal__paragraph">
              {{t('modalSuccess.content')}}
            </p>
            <p class="modal__paragraph">
              {{t('modalSuccess.timer')}}
            </p>
            <p class="modal__paragraph">
              {{ redirectTimer }}
            </p>
            <a
              ref="redirectButton"
              :href="redirectHref"
            >
              {{t('modalSuccess.goNow')}}
            </a>
          </div>

          <div v-if="!isConfirmed">
            <p class="modal__paragraph">
              {{t('modalSuccess.successfully')}}
            </p>
            <p class="modal__paragraph">
              {{t('modalSuccess.successfullySub')}}
            </p>
          </div>
        </div>
        <p class="modal__paragraph modal__welcome">
          {{t('modalSuccess.welcome')}}
        </p>
      </div>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import SuccessIcon from '@/components/ui/SuccessIcon.vue'
import { onMounted, ref, toRef } from 'vue'
import {useTranslations} from "@/i18n/utils";
import {Locales} from "@/i18n/ui";

const props = defineProps<{
  isConfirmed: boolean
  redirectHref: string
  lang: Locales
}>()

const redirectTimer = ref(5)
const redirectButton = ref<HTMLAnchorElement | null>(null)
const lang = toRef(props, 'lang');
const t = useTranslations(lang.value);

onMounted(() => {
  if (props.isConfirmed) {
    const timer = setInterval(() => {
      if (redirectTimer.value > 1) {
        redirectTimer.value--
      } else {
        fetch('https://api.mybid.io/api/v1/sign-up/verification')
        redirectButton.value?.click()
        redirectTimer.value = 0
        clearInterval(timer)
      }
    }, 1000)
  }
})
</script>

<style scoped lang="scss">
.modal {
  font-family: 'Ruberoid','rimmasansboldruberoidsemibold', sans-serif;
  color: #ffffff;
  padding: 40px;
  background-color: #6f06ff;
  text-align: center;
  max-width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: fit-content;
  width: 50vw;

  &__heading {
    font-size: 22px;
    margin-bottom: 16px;
  }

  &__paragraph {
    font-size: 18px;
    margin-bottom: 8px;
  }

  &__welcome {
    margin-top: 28px;
  }

  &__icon {
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 24px;
  }

  @media screen and (max-width: 500px) {
    width: 80vw;
    padding: 20px;
  }
}
</style>
