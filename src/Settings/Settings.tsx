import React from "react"
import packageJson from '../../package.json';
import { FormattedMessage, injectIntl, WrappedComponentProps } from "react-intl"
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";

export interface StateProps {
    canInstall: boolean
    hasUpdate: boolean
    language: string
}

export interface DispatchProps {
    setLanguage: (language: string) => void
    showCanInstall: (showCanInstall: boolean) => void
    showHasUpdate: (showHasUpdate: boolean) => void
}

type Props = StateProps & DispatchProps & WrappedComponentProps

interface State {
}

class Settings extends React.Component<Props, State> {
    private languages = [
        { label: 'en', value: 'en' },
        { label: 'de', value: 'de' },
    ];

    private setLanguage = (language: string) => {
        console.log(language);

        this.props.setLanguage(language)
    }

    render() {
        return (
            <div>

                {this.props.canInstall &&
                    <div>
                        <Button onClick={() => this.props.showCanInstall(true)} label={this.props.intl.formatMessage({ id: "app.installAppAction" })} />
                    </div>
                }
                <h3><FormattedMessage id="common.language" /></h3>
                <SelectButton value={this.props.language} options={this.languages} onChange={(e) => this.setLanguage(e.value)}></SelectButton>
                <h3><FormattedMessage id="common.version" /></h3>
                <div>
                    V{packageJson.version}<br />
                    {this.props.hasUpdate && <Button label={this.props.intl.formatMessage({ id: "app.updateAppAction" })} className="p-mt-2" onClick={() => this.props.showHasUpdate(true)} />}
                </div>
                <h3><FormattedMessage id="common.sourceCode" /></h3>
                <a href="https://github.com/Enc-EE/phasmapp">https://github.com/Enc-EE/phasmapp</a>
            </div>
        )
    }
}

export default injectIntl(Settings)