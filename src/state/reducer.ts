import { AppActionTypes, SET_CAN_INSTALL, SET_HAS_UPDATE, SET_LANGUAGE } from "./actions"
import { AppState } from "./types"

const knownLanguages = ["en", "de"]
const language = navigator.language.split(/[-_]/)[0]

const initialState: AppState = {
    hasUpdate: false,
    canInstall: false,
    language: knownLanguages.indexOf(language) >= 0 ? language : "en",
}

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    switch (action.type) {
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
        default:
            return state
    }
}