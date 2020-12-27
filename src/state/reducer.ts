import { AppActionTypes, SET_HAS_UPDATE } from "./actions";
import { AppState } from "./types";

const initialState: AppState = {
    hasUpdate: false,
}

export function appReducer(
    state = initialState,
    action: AppActionTypes
): AppState {
    switch (action.type) {
        case SET_HAS_UPDATE:
            return {
                ...state,
                hasUpdate: action.hasUpdate
            }
        default:
            return state
    }
}