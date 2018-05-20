import * as React from 'react'

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import { css } from 'emotion'

import GenericModal from './common/GenericModal'

import EventModel, { Option as OptionModel } from '../../models/Event'
import container from '../../services'
import EventsService from '../../services/Events'
import TYPES from '../../services/types'
import WorldState from '../../services/WorldState'
import SecretaryAudio from './common/SecretaryAudio'

const secretaryAvatar = require('../../assets/secretary.png')

interface State {
    event?: EventModel
    modalIsOpen: boolean
    endText?: any
    gameOver: boolean

    report: string,
    reportIsOpen: boolean,
}

const styles = {
    footer: css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;

        width: calc(100% - 4rem);
        position: absolute;
        bottom: -2rem;
    `,
}

export default class Event extends React.PureComponent<{}, State> {

    public state = {
        event: undefined,
        modalIsOpen: false,

        report: '',
        reportIsOpen: false,

        endText: undefined,
        gameOver: false,
    } as State

    public render() {
        return (
            <React.Fragment>
                <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.handleNexWeek}
                >
                    Завершить неделю
                </Button>

                {this.state.event &&
                    <GenericModal
                        image={this.state.event.image && require(`../../assets/${this.state.event.image}`)}
                        title={this.state.event.title}
                        open={this.state.modalIsOpen}
                    >
                        <p>{this.state.event.description}</p>

                        <footer className={styles.footer}>
                            {this.state.event.options.map((option) =>
                                <Tooltip key={option.title} title={option.description}>
                                    <Button variant="outlined" onClick={this.handleDecision(option)}>
                                        {option.title}
                                    </Button>
                                </Tooltip>,
                            )}
                        </footer>
                    </GenericModal>
                }

                {this.state.report &&
                    <GenericModal
                        image={secretaryAvatar}
                        title="Отчет"
                        open={this.state.reportIsOpen}
                        closeModal={this.closeReport}
                    >
                        <p>{this.state.report}</p>

                        {this.state.reportIsOpen && <SecretaryAudio />}
                    </GenericModal>
                }

                {this.state.endText && this.state.gameOver &&
                    <GenericModal title="Игра закончена" open={this.state.gameOver}>
                        {this.state.endText}
                    </GenericModal>
                }
            </React.Fragment>
        )
    }

    private handleNexWeek = () => {
        const event = container.get<EventsService>(TYPES.Events).getNext()

        this.setState({
            event,
            modalIsOpen: true,
        })

        if (!event) {
            this.setState({
                endText: container.get<WorldState>(TYPES.WorldState).getEndScreen(),
                gameOver: true,
            })
        }
    }

    private handleDecision = (option: OptionModel) =>
        () => {
            this.setState({ modalIsOpen: false })

            const report = option.consequences(container.get<WorldState>(TYPES.WorldState))

            this.setState({
                report,
                reportIsOpen: true,
            })
        }

    private closeReport = () => this.setState({ reportIsOpen: false })

}
