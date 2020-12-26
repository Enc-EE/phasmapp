import React from 'react'
import './App.css'
import { Card } from 'primereact/card'
import { DATA, EvidenceType } from './data'
import EvidenceSelection from './EvidenceSelection/EvidenceSelection'

interface StateProps {
  selectedEvidences: EvidenceType[]
  needsHttpsRedirect: boolean
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
      <div>
        {this.state.needsHttpsRedirect
          ?
          <div>
            Redirecting to https...
          </div>
          :
          <div>
            <div className="p-d-flex p-jc-center top-bar"><h3>Phasmorphobia Helper</h3></div>
            <EvidenceSelection evidences={DATA.evidences} selectionChanged={this.setEvidenceSelection} />
            <div className="content">
              <div className="p-grid ghost-grid">
                {this.getGhosts().map(x => (
                  <div className="p-col-12 p-md-6 p-xl-3">
                    <Card className="ghost-card" key={x.name} title={x.name}>
                      {x.evidences.map(y => DATA.evidences.find(z => z.type === y)!.name).reduce((a, b) => a + ", " + b)}
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}