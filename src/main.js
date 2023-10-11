import { defineCustomElement } from 'vue'
import MybidFromWithStyles from './components/MybidFrom.ce.vue'
import './styles/signup.scss'

export const MybidFrom = defineCustomElement(MybidFromWithStyles)

customElements.define('mybid-from', MybidFrom)
