import React from "react"
import { DATA, Ghost } from "../data"
import { Card } from 'primereact/card'
import './GhostCard.css'
import { Button } from "primereact/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons"
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl"

interface StateProps {
    ghost: Ghost
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface State {
    isExpanded: boolean
}

class GhostCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isExpanded: false
        }
    }
    render() {
        return (
            <Card className="ghost-card" title={(
                <div>
                    <FormattedMessage id={this.props.ghost.name} />
                    {this.state.isExpanded
                        ?
                        <Button className="p-button-text collapse-expand" onClick={() => this.setState({ ...this.state, isExpanded: false })}><FontAwesomeIcon icon={faCompressAlt} /></Button>
                        :
                        <Button className="p-button-text collapse-expand" onClick={() => this.setState({ ...this.state, isExpanded: true })}><FontAwesomeIcon icon={faExpandAlt} /></Button>
                    }
                </div>)}>

                {this.state.isExpanded
                    ?
                    <div>
                        <p className="p-m-0">
                            <FormattedMessage id={this.props.ghost.description} />
                        </p>
                        <h3><FormattedMessage id="data.ghost.common.strengths" /></h3>
                        <p className="p-m-0">
                            <FormattedMessage id={this.props.ghost.strengths} />
                        </p>
                        <h3><FormattedMessage id="data.ghost.common.weaknesses" /></h3>
                        <p className="p-m-0">
                            <FormattedMessage id={this.props.ghost.weaknesses} />
                        </p>
                        <h3><FormattedMessage id="data.ghost.common.evidences" /></h3>
                        <p className="p-m-0">{this.props.ghost.evidences.map(y => DATA.evidences.find(z => z.type === y)!.name).map(x => this.props.intl.formatMessage({ id: x })).reduce((a, b) => a + ", " + b)}</p>
                    </div>
                    :
                    this.props.ghost.evidences.map(y => DATA.evidences.find(z => z.type === y)!.name).map(x => this.props.intl.formatMessage({ id: x })).reduce((a, b) => a + ", " + b)
                }
            </Card>
        )
    }
}

export default injectIntl(GhostCard)