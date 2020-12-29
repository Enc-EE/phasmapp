import React from 'react'
import './App.css'
import { Button } from 'primereact/button'
import { DATA } from './data'
import GhostFilter from './GhostFilter/GhostFilter'
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'
import { TopBarConnected } from './TopBar/TopBar.connected'
import GhostCard from './GhostCard/GhostCard'
import { SettingsConnected } from './Settings/Settings.connected'

export interface StateProps {
  showSettings: boolean
}

export interface DispatchProps {
}

type Props = StateProps & DispatchProps

interface State {
  filteredGhostIndices: number[]
  needsHttpsRedirect: boolean
  shrinkEvidenceSelection: boolean
}

export default class App extends React.Component<Props, State> {
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
      filteredGhostIndices: [],
      needsHttpsRedirect: needsHttpsRedirect,
      shrinkEvidenceSelection: false,
    }

    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
      if (e.matches) {
        this.setState({
          ...this.state,
          shrinkEvidenceSelection: false,
        })
      }
    });
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

  private setGhosts = (filteredGhostIndices: number[]) => {
    this.setState({
      ...this.state,
      filteredGhostIndices: filteredGhostIndices,
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.needsHttpsRedirect
          ?
          <div>
            <FormattedMessage id="app.redirectHttps" />
          </div>
          :
          <React.Fragment>
            <TopBarConnected />
            {this.props.showSettings
              ?
              <div className="page">
                <div className="p-m-3">
                  <SettingsConnected />
                </div>
              </div>
              :
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
                  <GhostFilter filteredGhostsChanged={this.setGhosts} />
                </div>
                <div className="ghost-scroller">
                  <div className="content">
                    <div className="p-grid ghost-grid">
                      {this.state.filteredGhostIndices.map(x => DATA.ghosts[x]).map(x => (
                        <div className="p-col-12 p-lg-6 p-xl-4" key={x.name} >
                          <GhostCard ghost={x} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            }
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}