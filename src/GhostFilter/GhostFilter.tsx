import React from "react"
import { DATA, Evidence, EvidenceType } from "../data"
import './GhostFilter.css'
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Button } from "primereact/button";
import EvidenceView from "../EvidenceView/EvidenceView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface StateProps {
}

interface DispatchProps {
    filteredGhostsChanged: (filteredGhostIndices: number[]) => void
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface OwnProps {
    positiveFilter: EvidenceType[]
    negativeFilter: EvidenceType[]
    shrinkEvidenceSelection: boolean
}

class GhostFilter extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props)

        this.state = {
            positiveFilter: [],
            negativeFilter: [],
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

    private newGame = () => {
        this.setState({
            ...this.state,
            negativeFilter: [],
            positiveFilter: [],
        })
    }

    render() {
        const filteredGhosts = this.getGhosts()
        return (
            <div className={"evidence-selection"}>
                <div className={(this.state.shrinkEvidenceSelection ? "evidence-selection-small" : "")}>
                    {/* {DATA.evidences.map(evidence => {
                        const isPositiveFilter = this.state.positiveFilter.indexOf(evidence.type) >= 0
                        const isNegativeFilter = this.state.negativeFilter.indexOf(evidence.type) >= 0
                        const positiveFilteredGhosts = filteredGhosts.filter(x => x.evidences.indexOf(evidence.type) >= 0)
                        // const negativeFilteredGhosts = filteredGhosts.filter(x => x.evidences.indexOf(evidence.type) < 0)

                        return (
                            <div key={evidence.type} className="p-d-flex p-ai-center">
                                <Button
                                    icon="fa fa-ban"
                                    disabled={!isNegativeFilter && (isPositiveFilter || positiveFilteredGhosts.length === 0)}
                                    className={"p-button-sm p-ml-1 p-mr-1" + (isNegativeFilter ? "" : " p-button-text")}
                                    onClick={() => this.toggleNegativeFilter(evidence)} />
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
                    })} */}
                    {DATA.evidences.map(evidence => {
                        const isPositiveFilter = this.state.positiveFilter.indexOf(evidence.type) >= 0
                        const isNegativeFilter = this.state.negativeFilter.indexOf(evidence.type) >= 0
                        const positiveFilteredGhosts = filteredGhosts.filter(x => x.evidences.indexOf(evidence.type) >= 0)
                        // const negativeFilteredGhosts = filteredGhosts.filter(x => x.evidences.indexOf(evidence.type) < 0)

                        return (
                            <div key={evidence.type} className="p-d-flex p-ai-center p-m-1">
                                <div className="p-d-flex p-selectbutton grow p-buttonset p-component" role="group">
                                    <div className={"p-button p-component"
                                        + (!isNegativeFilter && (isPositiveFilter || positiveFilteredGhosts.length === 0) ? " p-disabled" : "")
                                        + (isNegativeFilter ? " p-highlight" : "")} role="button"
                                        onClick={() => this.toggleNegativeFilter(evidence)}>
                                        <span className="p-button-label p-c"><FontAwesomeIcon icon={faBan} /></span>
                                    </div>
                                    <div className={"p-button p-component grow"
                                        + (!isPositiveFilter && !isNegativeFilter && positiveFilteredGhosts.length === 0 ? " p-disabled" : "")
                                        + (isPositiveFilter ? " p-highlight" : "")} role="button"
                                        onClick={() => this.togglePositiveFilter(evidence)}>
                                        <span className="p-button-label p-c"><EvidenceView evidence={evidence} /> ({positiveFilteredGhosts.length})</span>
                                        <FontAwesomeIcon className="p-button-icon-right" icon={faCheck} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div >
                <div>
                    {(this.state.negativeFilter.length > 0 || this.state.positiveFilter.length > 0) && <Button className="p-button-text" label={this.props.intl.formatMessage({ id: "common.newGame" })} onClick={this.newGame} />}
                    <Button className="p-d-block p-d-md-none p-button-text right" onClick={() => this.setState({ ...this.state, shrinkEvidenceSelection: !this.state.shrinkEvidenceSelection })}><FontAwesomeIcon icon={(this.state.shrinkEvidenceSelection ? faChevronDown : faChevronUp)} /></Button>
                </div>
            </div>
        )
    }
}

export default injectIntl(GhostFilter)