import { Dispatch } from "@reduxjs/toolkit"
import { injectIntl } from "react-intl"
import { connect } from "react-redux"
import { setLanguage } from "../state/actions"
import { AppState } from "../state/types"
import TopBar, { DispatchProps, StateProps } from "./TopBar"

const mapStateToProps = (state: AppState): StateProps => {
    return {
        hasUpdate: state.hasUpdate,
        canInstall: state.canInstall,
        language: state.language,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        setLanguage: (language: string) => {
            dispatch(setLanguage(language))
        }
    }
}

export const TopBarConnected = connect(mapStateToProps, mapDispatchToProps)(injectIntl(TopBar));