import React from "react"
import { DATA, Evidence, EvidenceType } from "../data"
import { Checkbox } from "primereact/checkbox";
import './EvidenceSelection.css'
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBan } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBan } from '@fortawesome/free-solid-svg-icons';

library.add(faBan)

interface StateProps {
    evidences: Evidence[]
}

interface DispatchProps {
    selectionChanged: (selectedEvidences: EvidenceType[]) => void
    negativeSelectionChanged: (selectedEvidences: EvidenceType[]) => void
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface OwnProps {
    selection: EvidenceType[]
    negativeSelection: EvidenceType[]
}

class EvidenceSelection extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props)

        this.state = {
            selection: [],
            negativeSelection: [],
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

        const negativeIndex = this.state.negativeSelection.indexOf(evidence.type)
        const newNegativeSelection = this.state.negativeSelection
        if (negativeIndex >= 0) {
            newNegativeSelection.splice(negativeIndex, 1)
        }

        this.setState({
            ...this.state,
            selection: newSelection,
            negativeSelection: newNegativeSelection,
        })
        this.props.selectionChanged(newSelection)
    }

    private toggleNegativeSelect = (evidence: Evidence) => {
        const index = this.state.negativeSelection.indexOf(evidence.type)
        const newSelection = this.state.negativeSelection
        if (index >= 0) {
            newSelection.splice(index, 1)
        } else {
            newSelection.push(evidence.type)
        }

        this.setState({
            ...this.state,
            negativeSelection: newSelection,
        })
        this.props.negativeSelectionChanged(newSelection)
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

        for (const selectedNegativeEvidenceTypes of this.state.negativeSelection) {
            for (const ghostName of [...visibleGhostNames]) {
                if (DATA.ghosts.find(x => x.name === ghostName)!.evidences.indexOf(selectedNegativeEvidenceTypes) >= 0) {
                    visibleGhostNames.splice(visibleGhostNames.indexOf(ghostName), 1)
                }
            }
        }

        return DATA.ghosts.filter(x => visibleGhostNames.indexOf(x.name) >= 0);
    }

    render() {
        return (
            <div>
                {this.props.evidences.map(evidence => {
                    const isEvidenceSelected = this.state.selection.indexOf(evidence.type) >= 0
                    const filteredGhosts = this.getGhosts()
                        .filter(x => x.evidences.indexOf(evidence.type) >= 0)
                    const isNegativeFilter = this.state.negativeSelection.indexOf(evidence.type) >= 0
                    return (
                        <div key={evidence.type} className="p-d-flex p-ai-center">
                            <Button
                                disabled={!isNegativeFilter && (isEvidenceSelected || filteredGhosts.length === 0)}
                                className={"p-button-sm" + (isNegativeFilter ? "" : " p-button-text")}
                                onClick={() => this.toggleNegativeSelect(evidence)}><FontAwesomeIcon icon={faBan} /></Button>
                            <Checkbox
                                inputId={evidence.type.toString()}
                                value={evidence}
                                disabled={!isNegativeFilter && filteredGhosts.length === 0}
                                onChange={() => this.toggleSelect(evidence)}
                                checked={isEvidenceSelected}></Checkbox>
                            <label
                                style={{ marginLeft: "0.5em" }}
                                className="grow"
                                htmlFor={evidence.type.toString()}>
                                {this.props.intl.formatMessage({ id: evidence.name })} ({filteredGhosts.length})</label>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default injectIntl(EvidenceSelection)