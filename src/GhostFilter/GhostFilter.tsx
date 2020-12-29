import React from "react"
import { DATA, Evidence, EvidenceType } from "../data"
import { Checkbox } from "primereact/checkbox";
import './GhostFilter.css'
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Button } from "primereact/button";
import EvidenceView from "../EvidenceView/EvidenceView";

interface StateProps {
}

interface DispatchProps {
    filteredGhostsChanged: (filteredGhostIndices: number[]) => void
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface OwnProps {
    positiveFilter: EvidenceType[]
    negativeFilter: EvidenceType[]
}

class GhostFilter extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props)

        this.state = {
            positiveFilter: [],
            negativeFilter: [],
        }
    }

    componentDidMount() {
        this.props.filteredGhostsChanged(this.getGhosts().map(x => DATA.ghosts.indexOf(x)))
    }

    private togglePositiveFilter = (evidence: Evidence) => {
        const index = this.state.positiveFilter.indexOf(evidence.type)
        const newSelection = this.state.positiveFilter
        if (index >= 0) {
            newSelection.splice(index, 1)
        } else {
            newSelection.push(evidence.type)
        }

        const negativeIndex = this.state.negativeFilter.indexOf(evidence.type)
        const newNegativeSelection = this.state.negativeFilter
        if (negativeIndex >= 0) {
            newNegativeSelection.splice(negativeIndex, 1)
        }

        this.setState({
            ...this.state,
            positiveFilter: newSelection,
            negativeFilter: newNegativeSelection,
        })
        this.props.filteredGhostsChanged(this.getGhosts().map(x => DATA.ghosts.indexOf(x)))
    }

    private toggleNegativeFilter = (evidence: Evidence) => {
        const index = this.state.negativeFilter.indexOf(evidence.type)
        const newSelection = this.state.negativeFilter
        if (index >= 0) {
            newSelection.splice(index, 1)
        } else {
            newSelection.push(evidence.type)
        }

        this.setState({
            ...this.state,
            negativeFilter: newSelection,
        })

        this.props.filteredGhostsChanged(this.getGhosts().map(x => DATA.ghosts.indexOf(x)))
    }

    private getGhosts = () => {
        var visibleGhostNames: string[] = []
        for (let i = 0; i < DATA.ghosts.length; i++) {
            visibleGhostNames.push(DATA.ghosts[i].name)
        }

        for (const selectedEvidenceTypes of this.state.positiveFilter) {
            for (const ghostName of [...visibleGhostNames]) {
                if (DATA.ghosts.find(x => x.name === ghostName)!.evidences.indexOf(selectedEvidenceTypes) < 0) {
                    visibleGhostNames.splice(visibleGhostNames.indexOf(ghostName), 1)
                }
            }
        }

        for (const selectedNegativeEvidenceTypes of this.state.negativeFilter) {
            for (const ghostName of [...visibleGhostNames]) {
                if (DATA.ghosts.find(x => x.name === ghostName)!.evidences.indexOf(selectedNegativeEvidenceTypes) >= 0) {
                    visibleGhostNames.splice(visibleGhostNames.indexOf(ghostName), 1)
                }
            }
        }

        return DATA.ghosts.filter(x => visibleGhostNames.indexOf(x.name) >= 0);
    }

    render() {
        const filteredGhosts = this.getGhosts()
        return (
            <div>
                {DATA.evidences.map(evidence => {
                    const isPositiveFilter = this.state.positiveFilter.indexOf(evidence.type) >= 0
                    const isNegativeFilter = this.state.negativeFilter.indexOf(evidence.type) >= 0
                    const positiveFilteredGhosts = filteredGhosts.filter(x => x.evidences.indexOf(evidence.type) >= 0)
                    // const negativeFilteredGhosts = filteredGhosts.filter(x => x.evidences.indexOf(evidence.type) < 0)

                    return (
                        <div key={evidence.type} className="p-d-flex p-ai-center">
                            <Button
                                icon="fa fa-ban"
                                // label={"(" + negativeFilteredGhosts.length + ")"}
                                disabled={!isNegativeFilter && (isPositiveFilter || positiveFilteredGhosts.length === 0)}
                                className={"p-button-sm p-ml-1 p-mr-1" + (isNegativeFilter ? "" : " p-button-text")}
                                onClick={() => this.toggleNegativeFilter(evidence)} />
                            {/* <Button
                                icon="pi pi-check"
                                // label={"(" + positiveFilteredGhosts.length + ")"}
                                disabled={!(isNegativeFilter || isPositiveFilter || positiveFilteredGhosts.length > 0)}
                                className={"p-button-sm p-ml-1 p-mr-1" + (isPositiveFilter ? "" : " p-button-text")}
                                onClick={() => this.togglePositiveFilter(evidence)} /> */}
                            {/* <div className="grow" onClick={() => this.togglePositiveFilter(evidence)}>
                                <span className="p-mr-2">{"(" + positiveFilteredGhosts.length + ")"}</span>
                                <span>{this.props.intl.formatMessage({ id: evidence.name })}</span>
                            </div> */}
                            <Checkbox
                                inputId={evidence.type.toString()}
                                value={evidence}
                                disabled={!isPositiveFilter && !isNegativeFilter && positiveFilteredGhosts.length === 0}
                                onChange={() => this.togglePositiveFilter(evidence)}
                                checked={isPositiveFilter}></Checkbox>
                            <label
                                style={{ marginLeft: "0.5em" }}
                                className="grow"
                                htmlFor={evidence.type.toString()}>
                                <EvidenceView evidence={evidence} /> ({positiveFilteredGhosts.length})</label>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default injectIntl(GhostFilter)