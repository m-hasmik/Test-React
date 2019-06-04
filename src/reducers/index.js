import { combineReducers } from 'redux'
import recipes from './recipes'
import recipe from './recipe'
import session from './session'
import menus from './menus'
import centralMenus from './centralMenus'
import conditions from './centralMenus'
import plan from './plan'
import printer from './printer'

const menuPlanner = combineReducers({
  menus,
  centralMenus,
  conditions,
  recipe,
  recipes,
  plan,
  printer,
  session
})

export default menuPlanner
