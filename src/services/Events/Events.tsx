import * as React from 'react'

import { injectable } from 'inversify'

import WorldState from '../WorldState'
import EventsInterface from './index'

// tslint:disable:max-line-length
const events = [
    {
        title: 'Промышленная реформа',
        image: 'factory.png',
        description:
            <React.Fragment>
                <p>Людей всегда не хватает, поэтому эффективность работы не оптимальна. Вы должны принять это или изменить. Вы устали от людей, населяющих вашу страну. Они хрупкие. Они непостоянные. Они становятся голодными, злыми и грустными, они заболевают и пропускают работу, они теряют конечности по своей тупости и не перестают работать. Они страдают и умирают. Но механоиды иные: они просто работают, только время от времени останавливаясь для дозаправки. Этим людям нужна надежда, чтобы выжить, но машинам — нет, они идеальные граждан: послушные и покорные, молчаливые и всем довольные...</p>
                <p>В очередной раз Вы пытаетесь оставаться гуманным и пускаете большие ресурсы на промышленность и социальные нужды, но Ваш народ, к сожалению недалек, в силу Ваших предыдущих действий - Вы сами наступили на те грабли, которые положили 12 лет назад: Вы хотите, а Ваш народ не может. Вы вновь перед выбором... Что выберете теперь?</p>
            </React.Fragment>,
        options: [
            {
                title: 'Автоматизация',
                description: 'Грохнуть весь народ. И закупить роботов из Гермазии.',
                consequences: (state: WorldState) => {
                    state.applyChanges({
                        autocracy: '+20',
                        people: '-40',
                        money: '+30',
                        internalOpinion: '-40',
                        externalOpinion: '-30',
                    })

                    return 'Ваше население не оценило принятого решения и начало активно эмигрировать. "Не нравится держава, езжай своя Пендосия" - подумали Вы. скакнули пару раз в кабинете, кинули краба и заварили отвар с боярышником.'
                },
            },
            {
                title: 'Сохранение народа',
                description: 'Согнать все население в Северные районы, раздать каждому по ключу, и поставить охранников по периметру.',
                consequences: (state: WorldState) => {
                    state.applyChanges({
                        autocracy: '+10',
                        people: '-20',
                        money: '+30',
                        internalOpinion: '-10',
                        externalOpinion: '-20',
                    })

                    return 'Ваше население тяжело приняло Ваше решение, но вспомнило, что скрепы - это надежная опора. На некоторых пунктах выдачи ключей даже наблюдались драки.'
                },
            },
            {
                title: 'Перераспределение средств',
                description: 'Раздать бабло людям.',
                consequences: (state: WorldState) => {
                    state.applyChanges({
                        democracy: '+10',
                        people: '+10',
                        money: '-30',
                        internalOpinion: '+10',
                        externalOpinion: '+10',
                    })

                    return 'Что-то пошло не так, но Ваши рейтинги практически рухнули в одночасье - не поверил Вам народ, что-то неладное Вы задумали. К Вашему удивлению, это только лишь повысило экстремисткое настроение общества.'
                },
            },
            {
                title: 'Оставить все как есть',
                description: 'Забухать.',
                consequences: (state: WorldState) => {
                    state.applyChanges({
                        liberalism: '+10',
                        money: '-10',
                        internalOpinion: '-10',
                        externalOpinion: '+10',
                    })

                    return 'Жизнь шла почти своим чередом. Ваши рейтинги даже немного подросли - Вы полностью оправдали ожидание Вашего народа.'
                },
            },
        ],
    },
    {
        title: 'В государстве коррупция',
        image: 'opposition.png',
        description: `
            Вам принесли доклад о том, что тот самый оппозиционный и осужденный персонаж провел расследование и как обычно, разместил видео на территории свободы о том, что на пруду у Волкова есть даже домик для уточки. Это вызвало большой резонанс и недовольство общества. Кроме этого, удалось установить, что Волков только за три месяца заказал себе 73 футболки, 20 пар кроссовок и 30 пар плавок. Одежда и обувь заказывались только для одного человека — все одинакового размера, одни бренды, одни магазины и так далее. Уточки и шмотье стали символами того, на что тратят бюджетные средства ваши подопечные. "Ну хорошо, что никто не вспомнил про собак и самолет Тувалова," - подумали вы, - "но с Волковым все же что-то надо делать!"
        `,
        options: [
            {
                title: 'Наказать',
                description: 'Заставить Волкова продать дом для уточки и купить ей нормальный коттедж.',
                consequences: (state: WorldState) => {
                    state.applyChanges({
                        autocracy: '+15',
                        money: '-5',
                        internalOpinion: '-20',
                        externalOpinion: '-5',
                    })

                    return 'Вы вновь удивлены, что не понимаете свой народ. Вместо того, чтобы порадоваться за уточку, эти безмозглые бандерлоги вновь вышли на улицу.'
                },
            },
            {
                title: 'Простить',
                description: 'Простить Волкова и дать ему возможность пристрелить эту утку.',
                consequences: (state: WorldState) => {
                    state.applyChanges({
                        liberalism: '+10',
                        internalOpinion: '+20',
                    })

                    return 'Ваш народ ликовал! "Черт его пойми эту обывательскую душу!" - подумали вы.'
                },
            },
            {
                title: 'Ничего не делать',
                description: '"Эх Волков, Волков..." - подумали вы, - "Дурак ты законченный! Ничему тебя жизнь не учит! Пусть эти же грабли тебе еще раз да по лбу заедут!"',
                consequences: (state: WorldState) => {
                    state.applyChanges({
                        autocracy: '+50',
                        internalOpinion: '-10',
                    })

                    return 'Наверное это было вашим лучшим решением! Стабильность - ваше все, как и ваша глупость.'
                },
            },
        ],
    },
]

@injectable()
export default class Events implements EventsInterface {
    public getNext() {
        return events.shift()
    }
}
