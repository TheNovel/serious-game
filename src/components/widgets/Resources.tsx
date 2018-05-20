import * as React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Audio from '../common/Audio'
import GenericModal from './common/GenericModal'

import container from '../../services'
import TYPES from '../../services/types'
import WorldState, { StateKey } from '../../services/WorldState'

const moneyAudio = require('../../assets/money.ogg')
const peopleAudio = require('../../assets/people.ogg')
const ratingAudio = require('../../assets/rating.ogg')
const diplomacyAudio = require('../../assets/diplomacy.ogg')

const moneyAvatar = require('../../assets/minister_money.png')
const peopleAvatar = require('../../assets/minister_people.png')
const ratingAvatar = require('../../assets/minister_rating.png')
const diplomacyAvatar = require('../../assets/minister_diplomacy.png')

interface State {
    moneyIsOpen: boolean
    peopleIsOpen: boolean
    ratingIsOpen: boolean
    diplomacyIsOpen: boolean

    moneyState: string,
    peopleState: string,
    ratingState: string,
    diplomacyState: string,
}

export default class Resources extends React.Component<{}, State> {

    public state = {
        moneyIsOpen: false,
        peopleIsOpen: false,
        ratingIsOpen: false,
        diplomacyIsOpen: false,

        moneyState: '',
        peopleState: '',
        ratingState: '',
        diplomacyState: '',
    } as State

    public render() {

        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="title" color="inherit" style={{flex: 1}}>
                        Севернее Кореи
                    </Typography>
                    <Button color="inherit" onClick={this.openMoneyModal}>💰 деньги</Button>
                    <Button color="inherit" onClick={this.openPeopleModal}>👨‍👩‍👧 население</Button>
                    <Button color="inherit" onClick={this.openRatingModal}>📈 рейтинг</Button>
                    <Button color="inherit" onClick={this.openDiplomacyModal}>🏰 дипломатия</Button>
                </Toolbar>

                <React.Fragment>
                    <GenericModal
                        image={moneyAvatar}
                        title="Министр финансов"
                        open={this.state.moneyIsOpen}
                        closeModal={this.closeMoneyModal}
                    >
                        <p>{this.state.moneyState}</p>

                        {this.state.moneyIsOpen && <Audio audio={moneyAudio} /> }
                    </GenericModal>

                    <GenericModal
                        image={peopleAvatar}
                        title="Министр здравоохранения"
                        open={this.state.peopleIsOpen}
                        closeModal={this.closePeopleModal}
                    >
                        <p>{this.state.peopleState}</p>

                        {this.state.peopleIsOpen && <Audio audio={peopleAudio} /> }
                    </GenericModal>

                    <GenericModal
                        image={ratingAvatar}
                        title="Министр внутренних дел"
                        open={this.state.ratingIsOpen}
                        closeModal={this.closeRatingModal}
                    >
                        <p>{this.state.ratingState}</p>

                        {this.state.ratingIsOpen && <Audio audio={ratingAudio} /> }
                    </GenericModal>

                    <GenericModal
                        image={diplomacyAvatar}
                        title="Министр иностранных дел"
                        open={this.state.diplomacyIsOpen}
                        closeModal={this.closeDiplomacyModal}
                    >
                        <p>{this.state.diplomacyState}</p>

                        {this.state.diplomacyIsOpen && <Audio audio={diplomacyAudio} /> }
                    </GenericModal>
                </React.Fragment>
            </AppBar>
        )
    }

    public componentDidMount() {
        const service = container.get<WorldState>(TYPES.WorldState)

        service.addRefreshCallback(StateKey.MONEY, this.updateMoneyState)
        service.addRefreshCallback(StateKey.PEOPLE, this.updatePeopleState)
        service.addRefreshCallback(StateKey.INTERNAL_OPINION, this.updateRatingState)
        service.addRefreshCallback(StateKey.EXTERNAL_OPINION, this.udpdateDiplomacyState)

        this.updateMoneyState()
        this.updatePeopleState()
        this.updateRatingState()
        this.udpdateDiplomacyState()
    }

    private updateMoneyState = () => this.setState({
        moneyState: container.get<WorldState>(TYPES.WorldState).getMoney(),
    })
    private updatePeopleState = () => this.setState({
        peopleState: container.get<WorldState>(TYPES.WorldState).getPeople(),
    })
    private updateRatingState = () => this.setState({
        ratingState: container.get<WorldState>(TYPES.WorldState).getInternalOpinion(),
    })
    private udpdateDiplomacyState = () => this.setState({
        diplomacyState: container.get<WorldState>(TYPES.WorldState).getInternalOpinion(),
    })

    private openMoneyModal = () => this.setState({ moneyIsOpen: true })
    private closeMoneyModal = () => this.setState({ moneyIsOpen: false })

    private openPeopleModal = () => this.setState({ peopleIsOpen: true })
    private closePeopleModal = () => this.setState({ peopleIsOpen: false })

    private openRatingModal = () => this.setState({ ratingIsOpen: true })
    private closeRatingModal = () => this.setState({ ratingIsOpen: false })

    private openDiplomacyModal = () => this.setState({ diplomacyIsOpen: true })
    private closeDiplomacyModal = () => this.setState({ diplomacyIsOpen: false })

}
