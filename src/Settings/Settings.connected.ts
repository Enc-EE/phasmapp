import { Dispatch } from "@reduxjs/toolkit"
import { connect } from "react-redux"
import { setLanguage, showCanInstall, showHasUpdate } from "../state/actions"
import { AppState } from "../state/types"
import Settings, { DispatchProps, StateProps } from "./Settings"

const mapStateToProps = (state: AppState): StateProps => {
    return {
        hasUpdate: state.hasUpdate,
        canInstall: state.canInstall,
        language: state.language,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        setLanguage: (language) => {
            dispatch(setLanguage(language))
        },
        showCanInstall: (isShowCanInstall) => {
            dispatch(showCanInstall(isShowCanInstall))
        },
        showHasUpdate: (isShowHasUpdate) => {
            dispatch(showHasUpdate(isShowHasUpdate))
        },
    }
}

export const SettingsConnected = connect(mapStateToProps, mapDispatchToProps)(Settings);