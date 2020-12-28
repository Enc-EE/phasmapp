
export const SET_HAS_UPDATE = 'SET_HAS_UPDATE'
export const SET_CAN_INSTALL = 'SET_CAN_INSTALL'
export const SET_LANGUAGE = 'SET_LANGUAGE'

interface SetHasUpdateAction {
    type: typeof SET_HAS_UPDATE
    hasUpdate: boolean
}

interface SetCanInstallAction {
    type: typeof SET_CAN_INSTALL
    canInstall: boolean
}

interface SetLanguageAction {
    type: typeof SET_LANGUAGE
    language: string
}

export type AppActionTypes = SetHasUpdateAction | SetCanInstallAction | SetLanguageAction

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

export function setLanguage(language: string): AppActionTypes {
    return {
        type: SET_LANGUAGE,
        language,
    }
}
