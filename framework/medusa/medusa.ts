import Medusa from '@medusajs/medusa-js'
import { MEDUSA_PUBLIC_STORE_URL } from './const'

const medusa: Medusa = new Medusa({ baseUrl: MEDUSA_PUBLIC_STORE_URL! })

export default medusa
