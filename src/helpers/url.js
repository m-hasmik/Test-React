//@flow
import { PRODUCTION_PATH } from '~/constants/server'

export const getDomainPath: () => string = () => {
  if (process.env.NODE_ENV === 'development') {
    return ''
  }
  return PRODUCTION_PATH
}
