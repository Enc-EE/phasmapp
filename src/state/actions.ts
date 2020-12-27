
export const SET_HAS_UPDATE = 'SET_HAS_UPDATE'
export const SET_CAN_INSTALL = 'SET_CAN_INSTALL'

interface SetHasUpdateAction {
    type: typeof SET_HAS_UPDATE
    hasUpdate: boolean
}

interface SetCanInstallAction {
    type: typeof SET_CAN_INSTALL
    canInstall: boolean
}

export type AppActionTypes = SetHasUpdateAction | SetCanInstallAction

export function setHasUpdate(hasUpdate: boolean): AppActionTypes {
    return {
        type: SET_HAS_UPDATE,
        hasUpdate,
    }
}

export function setCanInstall(canInstall: boolean): AppActionTypes {
    return {
        type: SET_CAN_INSTALL,
        canInstall,
    }
}
