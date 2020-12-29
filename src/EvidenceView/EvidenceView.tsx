import { faBolt, faBookOpen, faFingerprint, faGenderless, faPhoneVolume, faThermometerEmpty } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { injectIntl, WrappedComponentProps } from "react-intl"
import { Evidence, EvidenceType } from "../data"
import './EvidenceView.css'

interface StateProps {
    evidence: Evidence
    small?: boolean
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface State {
}

class EvidenceView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isExpanded: false
        }
    }

    icon(evidence: Evidence) {
        switch (evidence.type) {
            case EvidenceType.EmfLevel5:
                return <FontAwesomeIcon icon={faBolt} fixedWidth />
            case EvidenceType.Fingerprints:
                return <FontAwesomeIcon icon={faFingerprint} fixedWidth />
            case EvidenceType.FreezingTemperatures:
                return <FontAwesomeIcon icon={faThermometerEmpty} fixedWidth />
            case EvidenceType.GhostOrb:
                return <FontAwesomeIcon icon={faGenderless} fixedWidth />
            case EvidenceType.GhostWriting:
                return <FontAwesomeIcon icon={faBookOpen} fixedWidth />
            case EvidenceType.SpiritBox:
                return <FontAwesomeIcon icon={faPhoneVolume} fixedWidth />
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.icon(this.props.evidence)}
                {!this.props.small && <span className="p-ml-2">{this.props.intl.formatMessage({ id: this.props.evidence.name })}</span>}
            </React.Fragment>
        )
    }
}

export default injectIntl(EvidenceView)