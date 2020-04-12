import { EDIT, PREV } from '~/models/EditorDisplayMode'

const FULL_WIDTH = 12
const HALF_WIDTH = 6
const NONE = 0

export const getDisplayEditFormCols = (displayMode: string): number => {
  if (displayMode === PREV) {
    return NONE
  }
  if (displayMode === EDIT) {
    return FULL_WIDTH
  }
  return HALF_WIDTH
}

export const getDisplayPreviewAreaCols = (displayMode: string): number => {
  if (displayMode === PREV) {
    return FULL_WIDTH
  }
  if (displayMode === EDIT) {
    return NONE
  }
  return HALF_WIDTH
}
