<template>
  <div class="container">
    <img
        alt="button close"
        :src="CloseIcon"
        @click="emit('close')"
        class="btn-close"
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
        <template v-if="formInput.type === 'select'">
          <SelectInput
              :id="formKey"
              v-model="form[formKey]"
              :options="formInput?.options"
              :label="t(formKey)"
              :placeholder="formInput?.placeholder"
              :errors="errors.fieldErrors?.[formKey]"
              @input="onInput(formKey, false)"
          />
        </template>
        <template v-else>
          <TextInput
              :id="formKey"
              v-model="form[formKey]"
              :label="t(formKey)"
              :placeholder="formInput?.placeholder"
              :errors="errors.fieldErrors?.[formKey]"
              @input="onInput(formKey)"
          />
        </template>
      </template>
      <div class="flex mb-6">
        <input
            v-model="agree"
            class="mr-2"
            type="checkbox"
        >
        <div class="self-center">
          {{ t('modal.agree') }}
          <a href="/terms_en.html" target="_blank">
            {{ t('modal.terms') }}
          </a>
        </div>
      </div>
      <GRecaptcha v-model:has-error="isCaptchaInvalid" @load="onRecaptchaLoad"/>
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
import { computed, reactive, ref, toRef, defineEmits, defineProps } from 'vue'
import { z } from 'zod'
import {Locales} from "@/i18n/ui";
import {useTranslations} from "@/i18n/utils";
import {TFormatsInput} from "@/components/signup/type";
import {isSpanish} from "@/consts/isSpanish";
import 'vue-final-modal/style.css';
import CloseIcon from '@/assets/close-menu.svg';

type FormSchema = z.infer<typeof formSchema>
type FlattenedErrors = z.inferFlattenedErrors<typeof formSchema>

const props = withDefaults(defineProps<{
  lang: Locales
}>(), {
  lang: 'en'
});

const emit = defineEmits<{
  (event: 'close'): void
}>();
const lang = toRef(props, 'lang')
const t = useTranslations(lang.value)

const agree = ref(false)
const grecaptchaId = ref<number | null>(null)
const onRecaptchaLoad = (id: number) => {
  grecaptchaId.value = id
}
const isCaptchaInvalid = ref(false)

const formSchema = z
    .object({
      name: z
          .string()
          // .nonempty({ message: t('errors.nonEmpty') })
          .min(3, { message: t('errors.minChars') })
          .max(30, { message: t('errors.maxChars') })
          .regex(/^[\w\dА-Яа-я\s]+$/, { message: t('errors.nameValidChars') }),
      email: z
          .string()
          // .nonempty({ message: t('errors.nonEmpty') })
          .email({ message: t('errors.invalidEmail') }),
      messenger: z.string().nonempty({ message: t('errors.nonEmpty') }),
      userName: z
          .string()
          // .nonempty({ message: t('errors.nonEmpty') })
          .min(3, { message: t('errors.minChars') })
          .regex(/^[A-Za-z-_#$%^&@\.\d:]+$/, {
            message: t('errors.userNameValidChars')
          }),
      countryOfResidence: z.string().nonempty({ message: t('errors.nonEmpty') }),
      promoCode: z.string()
    })
    .strict();

const form = reactive<FormSchema>({
  name: '',
  email: '',
  messenger: '',
  userName: '',
  countryOfResidence: '',
  promoCode: ''
})

const formInputs: TFormatsInput = {
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
      { value: 'telegram', text: 'Telegram' },
      { value: 'skype', text: 'Skype' }
    ],
    placeholder: t('msgrPlaceholder')
  },
  userName: {
    type: 'text',
    placeholder: 'live: ... | @username'
  },
  countryOfResidence: {
    type: 'select',
    options: COUNTRIES.map((c) => ({ text: c, value: c })).sort(),
    placeholder: t('countryPlaceholder')
  },
  promoCode: {
    type: 'text',
    placeholder: '--------'
  }
}
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
    const result = formSchema.safeParse(form);
    if (!result.success) {
      errors.value = result.error.flatten()
      return
    }
    const recaptchaResponse = grecaptcha.getResponse(grecaptchaId.value)
    isCaptchaInvalid.value = !recaptchaResponse
    //const result = formSchema.safeParse(form)


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
        redirectHref: redirectHref.value
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
</script>

<style scoped lang="scss">

:deep{
  .input-block {
    display: flex;
    flex-direction: column;
    min-height: 110px;

    @media screen and (max-width: 420px) {
      min-height: 95px;
    }
  }

  .input-label {
    margin-bottom: 8px;
    color: #FFF;
    font-family: 'Ruberoid','rimmasansboldruberoidsemibold', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media screen and (max-width: 420px) {
      margin-bottom: 4px;
    }
  }

  .input {
    height: 50px;
    background: #FFF;
    color: #000;
    outline: none;
    border: none;
    padding-left: 24px;
    font-family: 'Ruberoid','rimmasansboldruberoidsemibold', sans-serif;

    @media screen and (max-width: 420px) {
      height: 37px;
    }

    &::selection {
      background: theme('colors.text.primary');
      color: white
    }
  }

  .input-invalid {
    outline: solid red;
  }

  input select{
    box-sizing: border-box;
  }

  .input__error {
    color: red;
    font-size: 14px;
    padding-top: 4px;

    @media screen and (max-width: 420px) {
      font-size: 11px;
    }

  }
  .captcha {
    align-self: center;
    width: fit-content;
    min-height: 80px;
    &_invalid {
      outline: solid 1px red;
    }
  }
}

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

.btn-close{
  width: 24px;
  height: 24px;
  position: absolute;
  top: .75rem;
  right: 1.25rem;
  cursor: pointer;
}
.flex{
  display: flex;
}
.mb-6{
  margin-bottom: 1.5rem;
}
a:not(.unset) {
  color: #FFFFFF;
  text-decoration: none;
  background-repeat: no-repeat;
  background-size: 100% 1.5px;
  background-position: 0 100%;
  background-image: linear-gradient(to right,rgb(15, 23, 42), rgb(255, 88, 248));
}
</style>
