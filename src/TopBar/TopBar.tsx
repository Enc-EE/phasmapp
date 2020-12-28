import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "primereact/button"
import React from "react"
import { FormattedMessage, WrappedComponentProps } from "react-intl"
import ghostly from '../ghostly.png'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import packageJson from '../../package.json';
import { Dialog } from "primereact/dialog"
import { Globals } from "../globals"
import './TopBar.css'

export interface StateProps {
    canInstall: boolean
    hasUpdate: boolean
    language: string
}

export interface DispatchProps {
    setLanguage: (language: string) => void
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface State {
    showCanInstall: boolean
    showHasUpdate: boolean
}

export default class TopBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showCanInstall: false,
            showHasUpdate: false,
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.hasUpdate && this.props.hasUpdate) {
            this.setState({
                ...this.state,
                showHasUpdate: true,
            })
        }
        if (!prevProps.canInstall && this.props.canInstall) {
            this.setState({
                ...this.state,
                showCanInstall: true,
            })
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

    private setLanguage = (language: string) => {
        this.props.setLanguage(language)
    }

    render() {
        return (
            <React.Fragment>
                <div className="p-d-flex p-ai-center top-bar">
                    <img className="ghostly" src={ghostly} alt="logo"></img>
                    <h3><FormattedMessage id="app.title" /></h3>
                    <div className="fill"></div>
                    {this.props.language === "de"
                        ?
                        <Button onClick={() => this.setLanguage("en")} label="en" />
                        :
                        <Button onClick={() => this.setLanguage("de")} label="de" />
                    }
                    {this.props.canInstall && <Button className="p-button-rounded" onClick={() => this.setState({ ...this.state, showCanInstall: true })}><FontAwesomeIcon icon={faPlus} /></Button>}
                    {this.props.hasUpdate && <Button className="p-button-rounded" onClick={() => this.setState({ ...this.state, showHasUpdate: true })}><FontAwesomeIcon icon={faSync} /></Button>}
                    <div>V{packageJson.version}</div>
                </div>
                <Dialog header={this.props.intl.formatMessage({ id: "app.installAppHeader" })} visible={this.state.showCanInstall} modal style={{ width: '350px' }} footer={(
                    <div>
                        <Button label={this.props.intl.formatMessage({ id: "app.installAppAction" })} onClick={this.installApp} />
                        <Button label={this.props.intl.formatMessage({ id: "app.remindLaterAction" })} onClick={() => this.setState({ ...this.state, showCanInstall: false })} className="p-button-text" />
                    </div>
                )} onHide={() => this.setState({ ...this.state, showCanInstall: false })}>
                    <div className="confirmation-content">
                        <span><FormattedMessage id="app.installAppDescription" /></span>
                    </div>
                </Dialog>
                <Dialog header={this.props.intl.formatMessage({ id: "app.updateAppHeader" })} visible={this.state.showHasUpdate} modal style={{ width: '350px' }} footer={(
                    <div>
                        <Button label={this.props.intl.formatMessage({ id: "app.updateAppAction" })} onClick={this.reloadUpdate} />
                        <Button label={this.props.intl.formatMessage({ id: "app.remindLaterAction" })} onClick={() => this.setState({ ...this.state, showHasUpdate: false })} className="p-button-text" />
                    </div>
                )} onHide={() => this.setState({ ...this.state, showHasUpdate: false })}>
                    <div className="confirmation-content">
                        <span><FormattedMessage id="app.updateAppDescription" /></span>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}