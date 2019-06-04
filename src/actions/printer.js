import type { Entities } from '~/types/prints'
import type { RSAA } from './types'

export const PRELOAD_PRINT = 'PRELOAD_PRINT'
export const CLEAN_PRINT = 'CLEAN_PRINT'
export const PRINTER_DATA_RECEIVED = 'PRINTER_DATA_RECEIVED'
export const LOAD_PRINTER_DATA = 'LOAD_PRINTER_DATA'
export const LOAD_PRINTER_DATA_FAILED = 'LOAD_PRINTER_DATA_FAILED'

// actions
export const preloadPrinterQueue = (
  data: any,
  entity: Entities = ''
): RSAA => ({
  type: PRELOAD_PRINT,
  payload: {
    data,
    entity
  }
})

export const cleanPrinterQueue = (): RSAA => ({
  type: CLEAN_PRINT
})

export const loadPrinterData = (
  entity: Entities,
  ids: Array<string>
): RSAA => ({
  type: LOAD_PRINTER_DATA,
  payload: {
    entity,
    ids
  }
})
