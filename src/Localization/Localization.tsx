import React from "react"
import { IntlProvider } from "react-intl"
import messages_de from '../locale/de.json'
import messages_en from '../locale/en.json'
import { connect } from "react-redux"
import { AppState } from "../state/types"

const messages: any = {
    'de': messages_de,
    'en': messages_en,
};

export interface StateProps {
    language: string
}

type Props = StateProps & any

class LocalizationP extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
                    {this.props.children}
                </IntlProvider>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        language: state.language,
    }
}

export const Localization = connect(mapStateToProps)(LocalizationP);