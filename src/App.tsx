import React from 'react'
import './App.css'
import ghostly from './ghostly.png'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { DATA, EvidenceType } from './data'
import EvidenceSelection from './EvidenceSelection/EvidenceSelection'
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface StateProps {
  selectedEvidences: EvidenceType[]
  needsHttpsRedirect: boolean
  shrinkEvidenceSelection: boolean
}

export default class App extends React.Component<{}, StateProps> {
  constructor(props: {}) {
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
              <div>V0.3.0</div>
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
      </React.Fragment>
    )
  }
}