
export const SET_HAS_UPDATE = 'SET_HAS_UPDATE'
export const SET_CAN_INSTALL = 'SET_CAN_INSTALL'
export const SHOW_HAS_UPDATE = 'SHOW_HAS_UPDATE'
export const SHOW_CAN_INSTALL = 'SHOW_CAN_INSTALL'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SHOW_HIDE_SETTINGS = 'SHOW_HIDE_SETTINGS'

interface SetHasUpdateAction {
    type: typeof SET_HAS_UPDATE
    hasUpdate: boolean
}

interface SetCanInstallAction {
    type: typeof SET_CAN_INSTALL
    canInstall: boolean
}

interface ShowHasUpdateAction {
    type: typeof SHOW_HAS_UPDATE
    showHasUpdate: boolean
}

interface ShowCanInstallAction {
    type: typeof SHOW_CAN_INSTALL
    showCanInstall: boolean
}

interface SetLanguageAction {
    type: typeof SET_LANGUAGE
    language: string
}

interface ShowHideSettingsAction {
    type: typeof SHOW_HIDE_SETTINGS
    showSettings: boolean
}

export type AppActionTypes = SetHasUpdateAction | SetCanInstallAction | SetLanguageAction | ShowHideSettingsAction | ShowCanInstallAction | ShowHasUpdateAction

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

export function showHasUpdate(showHasUpdate: boolean): AppActionTypes {
    return {
        type: SHOW_HAS_UPDATE,
        showHasUpdate,
    }
}

export function showCanInstall(showCanInstall: boolean): AppActionTypes {
    return {
        type: SHOW_CAN_INSTALL,
        showCanInstall,
    }
}

export function setLanguage(language: string): AppActionTypes {
    return {
        type: SET_LANGUAGE,
        language,
    }
}

export function showHideSettings(showSettings: boolean): AppActionTypes {
    return {
        type: SHOW_HIDE_SETTINGS,
        showSettings,
    }
}
