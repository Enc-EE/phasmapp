import { Button } from "primereact/button"
import React from "react"
import { FormattedMessage, WrappedComponentProps } from "react-intl"
import ghostly from '../ghostly.png'
import { Dialog } from "primereact/dialog"
import { Globals } from "../globals"
import './TopBar.css'

export interface StateProps {
    canInstall: boolean
    hasUpdate: boolean
    showSettings: boolean
    isShowCanInstall: boolean
    isShowHasUpdate: boolean
}

export interface DispatchProps {
    showHideSettings: (showSettings: boolean) => void
    showCanInstall: (showCanInstall: boolean) => void
    showHasUpdate: (showHasUpdate: boolean) => void
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface State {
}

export default class TopBar extends React.Component<Props, State> {
    componentDidUpdate(prevProps: Props) {
        if (!prevProps.hasUpdate && this.props.hasUpdate) {
            this.props.showHasUpdate(true)
        }
        if (!prevProps.canInstall && this.props.canInstall) {
            this.props.showCanInstall(true)
        }
    }

    private reloadUpdate = () => {
        if (Globals.registration && Globals.registration.waiting) {
            Globals.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
        window.location.reload()
    }

    private installApp = () => {
        if (Globals.beforeinstallprompt) {
            Globals.beforeinstallprompt.prompt()
            Globals.beforeinstallprompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt')
                    this.setState({
                        ...this.state,
                        showCanInstall: false,
                    })
                } else {
                    console.log('User dismissed the A2HS prompt')
                }
                Globals.beforeinstallprompt = undefined
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="p-d-flex p-ai-center top-bar">
                    <img className="ghostly" src={ghostly} alt="logo"></img>
                    <h3><FormattedMessage id="app.title" /></h3>
                    <div className="fill"></div>
                    <span className="p-overlay-badge">
                        <Button
                            icon="fa fa-cog"
                            className={(this.props.canInstall || this.props.hasUpdate || this.props.showSettings ? "" : "p-button-text")}
                            onClick={() => this.props.showHideSettings(!this.props.showSettings)} />
                        {(this.props.canInstall || this.props.hasUpdate) && <span className="p-badge p-badge-warning">!</span>}
                    </span>
                </div>
                <Dialog header={this.props.intl.formatMessage({ id: "app.installAppHeader" })} visible={this.props.isShowCanInstall} modal style={{ width: '350px' }} footer={(
                    <div>
                        <Button label={this.props.intl.formatMessage({ id: "app.installAppAction" })} onClick={this.installApp} />
                        <Button label={this.props.intl.formatMessage({ id: "app.remindLaterAction" })} onClick={() => this.props.showCanInstall(false)} className="p-button-text" />
                    </div>
                )} onHide={() => this.props.showCanInstall(false)}>
                    <div className="confirmation-content">
                        <span><FormattedMessage id="app.installAppDescription" /></span>
                    </div>
                </Dialog>
                <Dialog header={this.props.intl.formatMessage({ id: "app.updateAppHeader" })} visible={this.props.isShowHasUpdate} modal style={{ width: '350px' }} footer={(
                    <div>
                        <Button label={this.props.intl.formatMessage({ id: "app.updateAppAction" })} onClick={this.reloadUpdate} />
                        <Button label={this.props.intl.formatMessage({ id: "app.remindLaterAction" })} onClick={() => this.props.showHasUpdate(false)} className="p-button-text" />
                    </div>
                )} onHide={() => this.props.showHasUpdate(false)}>
                    <div className="confirmation-content">
                        <span><FormattedMessage id="app.updateAppDescription" /></span>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}