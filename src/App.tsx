import React from 'react'
import './App.css'
import ghostly from './ghostly.png'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { DATA, EvidenceType } from './data'
import EvidenceSelection from './EvidenceSelection/EvidenceSelection'
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import packageJson from '../package.json';
import { Globals } from './globals'

export interface StateProps {
  hasUpdate: boolean
  canInstall: boolean
}

export interface DispatchProps {

}

type Props = StateProps & DispatchProps

interface State {
  selectedEvidences: EvidenceType[]
  needsHttpsRedirect: boolean
  shrinkEvidenceSelection: boolean
}

export default class App extends React.Component<Props, State> {
  toast: Toast | null | undefined
  constructor(props: Props) {
    super(props)

    const needsHttpsRedirect = typeof window !== 'undefined'
      && window.location
      && window.location.protocol === 'http:'
      && window.location.hostname !== 'localhost'

    if (needsHttpsRedirect) {
      console.log("need https redirect")
    }

    this.state = {
      selectedEvidences: [],
      needsHttpsRedirect: needsHttpsRedirect,
      shrinkEvidenceSelection: false,
    }
  }

  private reloadUpdate = () => {
    if (Globals.registration && Globals.registration.waiting) {
      Globals.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
    window.location.reload()
  }

  private installApp = () => {
    Globals.beforeinstallprompt?.prompt()
    Globals.beforeinstallprompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      this.toast?.clear()
      window.location.reload()
      Globals.beforeinstallprompt = undefined
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.hasUpdate && this.props.hasUpdate && this.toast) {
      this.toast.show({
        severity: 'info',
        sticky: true,
        detail: (
          <div className="p-flex p-flex-column" style={{ flex: '1' }}>
            <div className="p-text-center">
              <h4>App neustarten zum aktualisieren?</h4>
            </div>
            <div className="p-grid p-fluid">
              <div className="p-col-6">
                <Button type="button" label="Neustarten" onClick={this.reloadUpdate} className="p-button-success" />
              </div>
              <div className="p-col-6">
                <Button type="button" label="Später Erinnern" onClick={() => { this.toast?.clear() }} className="p-button-secondary" />
              </div>
            </div>
          </div>
        )
      })
    }
    if (!prevProps.canInstall && this.props.canInstall && this.toast) {
      this.toast.show({
        severity: 'info',
        sticky: true,
        detail: (
          <div className="p-flex p-flex-column" style={{ flex: '1' }}>
            <div className="p-text-center">
              <h4>App installieren?</h4>
              <p>Für ein besseres Benutzererlebnis ist es möglich diese App zu installieren.</p>
            </div>
            <div className="p-grid p-fluid">
              <div className="p-col-6">
                <Button type="button" label="Installieren" onClick={this.installApp} className="p-button-success" />
              </div>
              <div className="p-col-6">
                <Button type="button" label="Später Erinnern" onClick={() => { this.toast?.clear() }} className="p-button-secondary" />
              </div>
            </div>
          </div>
        )
      })
    }
  }

  componentDidMount() {
    if (this.state.needsHttpsRedirect) {
      console.log("redirecting to https")
      window.location.href = window.location.href.replace(
        /^http(?!s)/,
        'https'
      )
    }
  }

  private setEvidenceSelection = (evidences: EvidenceType[]) => {
    this.setState({
      ...this.state,
      selectedEvidences: evidences,
    })
  }

  private getGhosts = () => {
    var visibleGhostNames: string[] = []
    for (let i = 0; i < DATA.ghosts.length; i++) {
      visibleGhostNames.push(DATA.ghosts[i].name)
    }

    for (const selectedEvidenceTypes of this.state.selectedEvidences) {
      for (const ghostName of [...visibleGhostNames]) {
        if (DATA.ghosts.find(x => x.name === ghostName)!.evidences.indexOf(selectedEvidenceTypes) < 0) {
          visibleGhostNames.splice(visibleGhostNames.indexOf(ghostName), 1)
        }
      }
    }

    return DATA.ghosts.filter(x => visibleGhostNames.indexOf(x.name) >= 0);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.needsHttpsRedirect
          ?
          <div>
            Redirecting to https...
          </div>
          :
          <React.Fragment>
            <div className="p-d-flex p-ai-center top-bar">
              <img className="ghostly" src={ghostly} alt="logo"></img>
              <h3>Phasmorphobia Helper</h3>
              <div className="fill"></div>
              <div>{packageJson.version}</div>
            </div>
            <div className="page p-d-flex p-flex-column p-flex-md-row">
              <div className={"evidence-selection" + (this.state.shrinkEvidenceSelection ? " evidence-selection-small" : "")}>
                <div className="p-d-block p-d-md-none evidence-layouting-small">
                  {this.state.shrinkEvidenceSelection
                    ?
                    <Button className="p-button-text" onClick={() => this.setState({ ...this.state, shrinkEvidenceSelection: false })}><FontAwesomeIcon icon={faExpandAlt} /></Button>
                    :
                    <Button className="p-button-text" onClick={() => this.setState({ ...this.state, shrinkEvidenceSelection: true })}><FontAwesomeIcon icon={faCompressAlt} /></Button>
                  }
                </div>
                <EvidenceSelection evidences={DATA.evidences} selectionChanged={this.setEvidenceSelection} />
              </div>
              <div className="scroller">
                <div className="content">
                  <div className="p-grid ghost-grid">
                    {this.getGhosts().map(x => (
                      <div className="p-col-12 p-lg-6 p-xl-4" key={x.name} >
                        <Card className="ghost-card" title={x.name}>
                          {x.evidences.map(y => DATA.evidences.find(z => z.type === y)!.name).reduce((a, b) => a + ", " + b)}
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        }
        <Toast ref={(e) => this.toast = e} position="bottom-center" />
      </React.Fragment>
    )
  }
}