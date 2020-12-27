import { Dispatch } from "@reduxjs/toolkit"
import { connect } from "react-redux"
import App, { DispatchProps, StateProps } from "./App"
import { AppState } from "./state/types"

const mapStateToProps = (state: AppState): StateProps => {
    return {
        hasUpdate: state.hasUpdate,
        canInstall: state.canInstall,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {}
}

export const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);