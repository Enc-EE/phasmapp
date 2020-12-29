import { AppActionTypes, SET_CAN_INSTALL, SET_HAS_UPDATE, SET_LANGUAGE, SHOW_CAN_INSTALL, SHOW_HAS_UPDATE, SHOW_HIDE_SETTINGS } from "./actions"
import { AppState } from "./types"

const knownLanguages = ["en", "de"]
const language = navigator.language.split(/[-_]/)[0]

const initialState: AppState = {
    hasUpdate: false,
    canInstall: false,
    language: knownLanguages.indexOf(language) >= 0 ? language : "en",
    showSettings: false,
    showCanInstall: false,
    showHasUpdate: false,
}

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    switch (action.type) {
        case SHOW_HIDE_SETTINGS:
            return {
                ...state,
                showSettings: action.showSettings,
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.language,
            }
        case SET_HAS_UPDATE:
            return {
                ...state,
                hasUpdate: action.hasUpdate,
            }
        case SET_CAN_INSTALL:
            return {
                ...state,
                canInstall: action.canInstall,
            }
        case SHOW_HAS_UPDATE:
            return {
                ...state,
                showHasUpdate: action.showHasUpdate,
            }
        case SHOW_CAN_INSTALL:
            return {
                ...state,
                showCanInstall: action.showCanInstall,
            }
        default:
            return state
    }
}