import { AppActionTypes, SET_CAN_INSTALL, SET_HAS_UPDATE } from "./actions"
import { AppState } from "./types"

const initialState: AppState = {
    hasUpdate: false,
    canInstall: false,
}

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    switch (action.type) {
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