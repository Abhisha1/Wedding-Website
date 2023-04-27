import { Timeline } from '@primer/react'
import { ThemeProvider, theme } from '@primer/react'
import deepmerge from 'deepmerge'
import { motion, useInView } from 'framer-motion';
import React from 'react';
import { useRef } from 'react';
import styles from '../styles/Home.module.css';

const customTheme = deepmerge(theme, {
  fonts: {
    normal: 'Lora, serif'
  }
})

export type TimelineEvent = {
    time: String;
    title: String;
    description: String[]
}

type TimelineData = {
    timelineEvents: TimelineEvent[]
}

const TimeLine: React.FC<TimelineData> = ({ timelineEvents}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <ThemeProvider theme={customTheme}>
            <Timeline id={styles.timeline} ref={ref}>
                <>
                    
                    {
                        timelineEvents && timelineEvents.map((item, index) => (
                            <motion.span key={index}  style={{
                                transform: isInView ? "none" : "translateY(20px)",
                                opacity: isInView ? 1 : 0,
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                                transitionDelay: `${(0.5*index)+1}s`
                                    }}>
                            <Timeline.Item>
                        
    <Timeline.Badge sx={{bg: '#490a20'}}>
                    </Timeline.Badge>
                                    <Timeline.Body>
                                        <>
                        <h3>{item.time}</h3>
                        <h4>{item.title}</h4>
                        {
                            item.description.map((desc, i) => <p key={i}>{desc}</p>)
                                            }
                                </>
                    </Timeline.Body>
                    </Timeline.Item>
                    </motion.span>
                        ))
                    }
                    </>
                </Timeline>
            </ThemeProvider>
    )
}

export default TimeLine;