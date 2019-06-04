// @flow
import type { Instruction } from '~/types/instruction'

export const normalizer = (data: Object): Instruction => ({
  instructionUUID: `InstructionsFrom-${data.RecipeUUID}`,
  content: data.Instructions,
  lang: data.LanguageKey
})
