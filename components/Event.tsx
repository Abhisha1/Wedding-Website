import {  Button, Sheet, Typography } from '@mui/joy'
import Image, { StaticImageData } from 'next/image'
import React, { useRef } from 'react';
import styles from '../styles/Home.module.css';
import { motion, useInView } from 'framer-motion';
import { OpenInNew } from '@mui/icons-material';
import TimeLine, { TimelineEvent } from './Timeline';

export type EventProps = {
    date: string,
    ceremony: string,
    subtitle: string,
    venue: string[],
    venueLink: string,
    dressCode: string,
    timelineEvents?: TimelineEvent[],
    supplementaryImage: string | StaticImageData,
    infoLeft?: boolean;
};

export default function Event({date, ceremony, subtitle, venue, venueLink, dressCode, timelineEvents, supplementaryImage, infoLeft = true}: EventProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const infoBlock = <div className={styles.infoBlockChild}>
    <Typography level="h2" className={styles.infoBlockTitle} ref={ref} >{date}</Typography>
    <h3 className={styles.infoBlockChildDetailsVenue}>{ceremony}</h3>
    <p>{subtitle}</p>
    <h4  className={styles.infoBlockChildDetailsVenue}>Venue</h4>
    <h5><>
            {venue.map((venueSegment) => <React.Fragment key={venueSegment}>{venueSegment} <br /></React.Fragment>)}
            <br /></>
            <Button component="a" target="_blank" rel="noopener noreferrer" href={venueLink} startDecorator={<OpenInNew />}>Google Maps</Button>
                </h5>
                <h4 className={styles.infoBlockChildDetailsVenue}>What should I wear?</h4>
        <h5>{dressCode}</h5>
        {timelineEvents && <TimeLine timelineEvents={timelineEvents} />}
    </div>
    
    const imageBlock = <div className={styles.infoBlockChild}>
    <motion.span style={{
transform: isInView ? "none" : "translateY(20px)",
opacity: isInView ? 1 : 0,
transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
transitionDelay: '1.5s'
}}>
        <Image className={styles.imageBlock} src={supplementaryImage} alt={''} width={500} />
    </motion.span>
</div>

    return (
        <div>
            <Sheet className={styles.infoBlockV} id={ceremony} style={{
            transform: isInView ? "none" : "translateY(20px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            transitionDelay: '1s'
            }}>
                <div className={styles.boxShadow}>
                    {
                        infoLeft ? <>{infoBlock} {imageBlock}</>
                        : <>{imageBlock} {infoBlock}</>
                    }
                    </div>
            </Sheet>
        </div>
    )
}

