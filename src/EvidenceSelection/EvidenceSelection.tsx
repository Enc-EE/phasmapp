import React from "react"
import { DATA, Evidence, EvidenceType } from "../data"
import { Checkbox } from "primereact/checkbox";

interface StateProps {
    evidences: Evidence[]
}

interface DispatchProps {
    selectionChanged: (selectedEvidences: EvidenceType[]) => void
}

type Props = StateProps & DispatchProps

interface OwnProps {
    selection: EvidenceType[]
}

export default class EvidenceSelection extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props)

        this.state = {
            selection: []
        }
    }

    private toggleSelect = (evidence: Evidence) => {
        const index = this.state.selection.indexOf(evidence.type)
        const newSelection = this.state.selection
        if (index >= 0) {
            newSelection.splice(index, 1)
        } else {
            newSelection.push(evidence.type)
        }

        this.setState({
            ...this.state,
            selection: newSelection,
        })
        this.props.selectionChanged(newSelection)
    }

    private isSelected = (evidenceType: EvidenceType) => {
        return this.state.selection.indexOf(evidenceType) >= 0
    }

    private getGhosts = () => {
      var visibleGhostNames: string[] = []
      for (let i = 0; i < DATA.ghosts.length; i++) {
        visibleGhostNames.push(DATA.ghosts[i].name)
      }
  
      for (const selectedEvidenceTypes of this.state.selection) {
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
                {this.props.evidences.map(evidence => (
                    <div key={evidence.name} style={{margin: "0.5em"}}>
                        <Checkbox inputId={evidence.type.toString()} value={evidence} disabled={this.getGhosts().filter(x => x.evidences.indexOf(evidence.type) >= 0).length === 0} onChange={() => this.toggleSelect(evidence)} checked={this.isSelected(evidence.type)}></Checkbox>
                        <label style={{marginLeft: "0.5em"}} htmlFor={evidence.type.toString()} >{evidence.name} ({this.getGhosts().filter(x => x.evidences.indexOf(evidence.type) >= 0).length})</label>
                    </div>
                ))}
            </div>
        )
    }
}