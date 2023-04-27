import { EventProps } from "../components/Event";
import Two from '../styles/assets/pexels-anastasia-shuraeva-8752675.jpg';
import Mirror from '../styles/assets/pexels-anastasia-shuraeva-8752665.jpg';
import Henna from '../styles/assets/pexels-checan-6716575.jpg';

export const EventData: EventProps[] = [{
    date:'Friday, March 24',
    ceremony:'Hindu Wedding',
    subtitle:'Please join us to celebrate our Hindu wedding ceremony',
    venue:['Grand Ballroom, The Manor on High',
            '519 High Street,',
        'Epping VIC 3076'],
    venueLink:'https://goo.gl/maps/G79dUkqfahwjqPor9',
    dressCode:'Semi-formal or Traditional attire (Sarees for ladies, Sherwani/Veshti for men)',
    timelineEvents:[
        { time: "8:15 am", title: "Guest arrival", description: ["Tea and coffee on arrival"] },
        { time: "8:30 am", title: "Groom entry", description: [] },
        { time: "8:45 am", title: "Muhurtham ceremony after Ganesha Puja", description: ["Morning tea will be served during the ceremony"] },
        { time: "11:00 am", title: "Formalities conclude", description: ["Lunch", "Guests will be invited to bless the couple", "Group photos"] }
    ],
    supplementaryImage:Two,
}, {
    date:'Sunday, March 26',
            ceremony:'Reception',
            subtitle:'Join us for a night of dancing and fun',
            venue:['Aerial',
                    '17 Dukes Walk,',
                'South Wharf VIC 3006'],
            venueLink:'https://goo.gl/maps/sVr9n3fwgjFLGL9f7',
            dressCode:'Formal attire',
            timelineEvents:[
                { time: "6:00 pm", title: "Guest arrival", description: ["Drinks and canapes on arrival"] },
                { time: "6:30 pm", title: "Reception", description: [] },
                { time: "11:00 pm", title: "Reception concludes", description: [] }
            ],
            supplementaryImage:Mirror,
            infoLeft:false
    }, {
        date:'Wednesday, March 22',
        ceremony:'Henna night',
        subtitle:'Come celebrate our henna night',
        venue:['17 Dukes Walk,',
            'South Wharf VIC 3006'],
        venueLink:'https://goo.gl/maps/sVr9n3fwgjFLGL9f7',
        dressCode:'Indian party attire',
        supplementaryImage:Henna
}]