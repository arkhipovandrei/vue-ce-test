<template>
  <div class="container">
    <button
        class="bg-[url('/src/assets/icons/close-menu.svg')] w-[24px] h-[24px] absolute top-3 right-5"
        @click="emit('close')"
    />
    <form
        class="form"
        :onSubmit="submitForm"
        novalidate
    >
      <template
          v-for="(formInput, formKey, index) of formInputs"
          :key="index"
      >
      <template
        v-for="(formInput, formKey, index) of unref(formInputs)"
        :key="index"
      >
        <template v-if="formInput.type === 'select'">
          <SelectInput
            :id="formKey"
            v-model="form[formKey]"
            :options="formInput?.options"
            :label="getLabel({formInput, formKey})"
            :placeholder="unref(formInput?.placeholder)"
            :errors="errors.fieldErrors?.[formKey]"
            @input="onInput(formKey, false)"
          />
        </template>

        <template v-else-if="formInput.type === 'tel'">
          <TextInput
            :id="formKey"
            v-model="form[formKey]"
            :label="getLabel({formInput, formKey})"
            :placeholder="unref(formInput?.placeholder)"
            :errors="errors.fieldErrors?.[formKey]"
            v-maskito="maskitoOptions"
            @input="onInput(formKey)"
          />
        </template>
        <template v-else>
          <TextInput
            :id="formKey"
            v-model="form[formKey]"
            :label="getLabel({formInput, formKey})"
            :placeholder="unref(formInput?.placeholder)"
            :errors="errors.fieldErrors?.[formKey]"
            @input="onInput(formKey)"
          />
        </template> 
      </template>  
      
      </template>
      <div class="flex mb-6">
        <input
            v-model="agree"
            class="mr-2"
            type="checkbox"
        >
        <div class="self-center">
          {{ t('modal.agree') }}<a
            href="/terms_en.html"
            target="_blank"
        >{{ t('modal.terms') }}</a>
        </div>
      </div>
      <GRecaptcha
          v-model:has-error="isCaptchaInvalid"
          class="max-md:-mt-[16px]"
          @load="onRecaptchaLoad"
      />
      <div>
        <p
            v-for="(err, errIdx) in errors.formErrors"
            :key="errIdx"
            style="color: red"
        >
          {{ err }}
        </p>
      </div>
      <button
          :disabled="formIsLoading || !agree"
          :class="[isSpanish(lang) ? 'es-font' : 'en-ru-font', 'button']"
          type="submit"
      >
        {{ !formIsLoading ? t('signUp') : `${t('loading')}...` }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useModal } from 'vue-final-modal'
import ModalSuccess from '@/components/signup/ModalSuccess.vue'
import TextInput from '@/components/ui/TextInput.vue'
import SelectInput from '@/components/ui/SelectInput.vue'
import GRecaptcha from '@/components/signup/GRecaptcha.vue'
import { COUNTRIES } from '@/consts/countries'
import { computed, reactive, ref, toRef, defineEmits, defineProps, unref } from 'vue'
import { z } from 'zod'
import { useTranslations } from '@/i18n/utils'
import type { Locales } from '@/i18n/ui'
import {isSpanish} from '@/consts/isSpanish'
import type {TFormatsInput} from '@/components/signup/type';

import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {maskito as vMaskito} from '@maskito/vue';
import metadata from 'libphonenumber-js/mobile/metadata';
 
const props = defineProps<{
  lang: Locales
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const maskitoOptions = maskitoPhoneOptionsGenerator({
    metadata,
    strict: false,
    countryIsoCode: 'RU',
});

type FormSchema = z.infer<typeof formSchema>
type FlattenedErrors = z.inferFlattenedErrors<typeof formSchema>
const form = reactive<FormSchema>({
  name: '',
  email: '',
  messenger: '',
  userName: '',
  countryOfResidence: '',
  promoCode: ''
});

const lang = toRef(props, 'lang')
const t = useTranslations(lang.value)

const agree = ref(false)
const grecaptchaId = ref<number | null>(null)
const onRecaptchaLoad = (id: number) => {
  grecaptchaId.value = id
}
const isCaptchaInvalid = ref(false)

const Messenger = {
  Facebook: "facebook",
  WhatsApp: 'whatsapp'
} 

const userNameProps = computed(() => {
  switch(form.messenger){
    case Messenger.Facebook:
      return {
        regex: /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
        placeholder:  "Profile link",
        label: t('profileLink'),
        type: 'text'
      }
    case Messenger.WhatsApp:
      return {
        placeholder: "+...",
        label: t('phoneNumber'),
        type: 'tel'
      }
    default: 
      return {
        regex:/^[A-Za-z-_#$%^&@\.\d:]+$/,
        placeholder: "live: ... | @username" ,
        label: t('userName'),
        type: 'text'
      } 
  }
})

const userNameRule = computed(() => {
  const rule  = z.string();

  if(form.messenger === Messenger.WhatsApp){
      return rule
      //.min(9, {message: t('errors.minChars').replace('3', 9)})
      //.max(15, {message: t('errors.maxChars').replace('30', 15)})
  }

  return rule
    .regex(userNameProps.value.regex, {
      message: t('errors.userNameValidChars')
    })
    .min(3, {message: t('errors.minChars')})      
});

const formSchema = computed(() => z
  .object({ 
    name: z
      .string()
    // .nonempty({ message: t('errors.nonEmpty') })
      .min(3, {message: t('errors.minChars')})
      .max(30, {message: t('errors.maxChars')})
      .regex(/^[\w\dА-Яа-я\s]+$/, {message: t('errors.nameValidChars')}),
    email: z
      .string()
    // .nonempty({ message: t('errors.nonEmpty') })
      .email({message: t('errors.invalidEmail')}),
    messenger: z.string().nonempty({message: t('errors.nonEmpty')}),
    userName: userNameRule.value,
    countryOfResidence: z.string().nonempty({message: t('errors.nonEmpty')}),
    promoCode: z.string()
  })
  .strict()
)
 
const formInputs: TFormatsInput = computed(() => {
  return {
    name: {
      type: 'text',
      placeholder: t('namePlaceholder')
    },
    email: {
      type: 'text',
      placeholder: 'example@mail.com'
    },
    messenger: {
      type: 'select',
      options: [
        {value: 'telegram', text: 'Telegram'},
        {value: 'skype', text: 'Skype'},
        {value: Messenger.WhatsApp, text: 'WhatsApp'},
        {value: Messenger.Facebook, text: 'Facebook'},
      ],
      placeholder: t('msgrPlaceholder')
    },
    userName: {
      type:  userNameProps.value.type,
      placeholder: userNameProps.value.placeholder,
      label: userNameProps.value.label,
    },
    countryOfResidence: {
      type: 'select',
      options: COUNTRIES.map((c) => ({text: c, value: c})).sort(),
      placeholder: t('countryPlaceholder')
    },
    promoCode: {
      type: 'text',
      placeholder: '--------'
    }
  } 
});

const errors = ref<FlattenedErrors>({
  formErrors: [],
  fieldErrors: {}
})
const setFormErrors = (errs: string[]) => {
  errors.value.formErrors = errs
}
const clearFieldErrors = () => {
  errors.value.fieldErrors = {}
}
const clearFormErrors = () => {
  setFormErrors([])
  clearFieldErrors()
  isCaptchaInvalid.value = false
}

const dirtyFormEntries = Object.entries(form).map(([key, v]) => ([key, !!v]))
const isDirty = Object.fromEntries(dirtyFormEntries)

const inputValidate = (key: keyof FormSchema) => {
  const result = formSchema.shape[key].safeParse(form[key])
  if (!result.success) {
    errors.value.fieldErrors[key] = result.error.flatten().formErrors
    return
  } else {
    errors.value.fieldErrors[key] = []
  }
}

const onInput = (key: keyof FormSchema, checkDirty: boolean = true) => {
  if (isDirty[key] || !checkDirty) {
    inputValidate(key)
  }
  if (!isDirty[key]) {
    const timeout = setTimeout(() => {
      inputValidate(key)
      clearTimeout(timeout)

      isDirty[key] = true
    }, 400)
  }
}

const formIsLoading = ref(false)
const isConfirmed = ref(false)
const redirectHref = computed(() => `${import.meta.env.PUBLIC_DASHBOARD_URL}?login=${form.name}`)

const submitForm = async (e: Event) => {
  e.preventDefault()
  clearFormErrors()
  try {
    const recaptchaResponse = grecaptcha.getResponse(grecaptchaId.value)
    isCaptchaInvalid.value = !recaptchaResponse
    const result = formSchema.safeParse(form)
    if (!result.success) {
      errors.value = result.error.flatten()
      return
    }

    if (isCaptchaInvalid.value) {
      return
    }

    formIsLoading.value = true

    const browserLanguage = window.navigator.language.split('-')[0]
    const params = Object.fromEntries(new URLSearchParams(window.location.search))
    const payload = {
      country_of_residence: form.countryOfResidence,
      email: form.email,
      messenger: form.messenger,
      name: form.name,
      nick_name: form.userName,
      promo_code: form.promoCode,
      user_name: form.userName,
      activity: 'Affiliate',
      browser_language: browserLanguage,
      fingerprint: 'xNagOPJG2BUOGNNFAXRa',
      google_click_id: params.gclid || '',
      google_id: '',
      how_did_you_know: '',
      language: browserLanguage === 'ru' ? 'ru' : 'eng',
      params,
      password: '',
      recaptcha_response: recaptchaResponse,
      referer: params.referer || document.referrer ? new URL(document.referrer).host : '',
      referral: params.ref || '',
      yandex_click_id: params.yclid || '',
      yandex_id: ''
    }

    const { access, errors: resErrors } = await fetch('https://api.mybid.io/api/v1/sign-up', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((r) => r.json())

    if (resErrors) {
      throw new Error(resErrors)
    }

    emit('close')

    const { open: openSuccessModal } = useModal({
      component: ModalSuccess,
      attrs: {
        isConfirmed: isConfirmed.value,
        redirectHref: redirectHref.value,
        lang,
        closeSuccessModal :() => {
          emit('close')
          close()
        } 
      }
    })

    if (access === 'confirmed') {
      isConfirmed.value = false
      openSuccessModal()
    } else if (access === 'unconfirmed') {
      isConfirmed.value = true
      openSuccessModal()
    }
  } catch (err) {
    let errorText = ''
    if (err instanceof Error) {
      errorText = err.message
    }
    if (errorText.startsWith('This email already exists')) {
      setFormErrors([t('errors.emailAlreadyExist')])
    } else if (errorText.startsWith('This name already exists')) {
      setFormErrors([t('errors.nameAlreadyExist')])
    } else if (errorText.startsWith('This login already exists')) {
      setFormErrors([t('errors.loginAlreadyExist')])
    } else {
      console.error('Something went wrong: ', errorText)
      setFormErrors([t('errors.smthWentWrong')])
    }
  } finally {
    formIsLoading.value = false
  }
}

const getLabel = ({formInput, formKey}:any) => {
  return formInput.label ?? t(formKey)
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  max-width: 575px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  background: #151516;
  color: #fff;
  font-family: 'Ruberoid', 'rimmasansboldruberoidsemibold', Arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media screen and (max-width: 500px) {
    padding: 25px 20px 20px 20px;
  }
}
.form {
  display: flex;
  flex-direction: column;
}

.button {
  margin-top: 20px;
  background-color: rgba(0, 255, 209, 1);
  color: #000;
  box-sizing: border-box;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 16px;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  outline: none;
  border: none;
  text-align: center;
  cursor: pointer;

  &:hover, &:disabled {
    opacity: 0.9;
  }
  &:disabled {
    cursor: not-allowed;
  }
  @media screen and (max-width: 420px) {
    margin-top: 12px;
    font-size: 18px;
  }
}
</style>
