import React from 'react'
import './App.css'
import { Card } from 'primereact/card'
import { DATA, EvidenceType } from './data'
import EvidenceSelection from './EvidenceSelection/EvidenceSelection'
import { Toolbar } from 'primereact/toolbar';

interface StateProps {
  selectedEvidences: EvidenceType[]
}

export default class App extends React.Component<{}, StateProps> {
  constructor(props: {}) {
    super(props)
    this.state = {
      selectedEvidences: []
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
    )
  }
}