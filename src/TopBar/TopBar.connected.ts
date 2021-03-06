import { Dispatch } from "@reduxjs/toolkit"
import { injectIntl } from "react-intl"
import { connect } from "react-redux"
import { showCanInstall, showHasUpdate, showHideSettings } from "../state/actions"
import { AppState } from "../state/types"
import TopBar, { DispatchProps, StateProps } from "./TopBar"

const mapStateToProps = (state: AppState): StateProps => {
    return {
        hasUpdate: state.hasUpdate,
        canInstall: state.canInstall,
        showSettings: state.showSettings,
        isShowCanInstall: state.showCanInstall,
        isShowHasUpdate: state.showHasUpdate,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        showHideSettings: (showSettings) => {
            dispatch(showHideSettings(showSettings))
        },
        showCanInstall: (isShowCanInstall) => {
            dispatch(showCanInstall(isShowCanInstall))
        },
        showHasUpdate: (isShowHasUpdate) => {
            dispatch(showHasUpdate(isShowHasUpdate))
        },
    }
}

export const TopBarConnected = connect(mapStateToProps, mapDispatchToProps)(injectIntl(TopBar));