
export const SET_HAS_UPDATE = 'SET_HAS_UPDATE'

interface SetHasUpdateAction {
    type: typeof SET_HAS_UPDATE
    hasUpdate: boolean
}

export type AppActionTypes = SetHasUpdateAction

export function setHasUpdate(hasUpdate: boolean): AppActionTypes {
    return {
        type: SET_HAS_UPDATE,
        hasUpdate
    }
}