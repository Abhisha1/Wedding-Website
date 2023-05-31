import { CssVarsProvider, extendTheme, Typography } from '@mui/joy'
import Head from 'next/head'
import Image from 'next/image'
import React, { useRef } from 'react';
import HorizontalList from '../components/NavMenu';
import styles from '../styles/Home.module.css';
import Couple from '../styles/assets/IMAGE_HIGHLIGHT-530.webp';
import { motion } from 'framer-motion';
import { sessionOptions } from '../lib/session';
import { User } from '../lib/user';
import { withIronSessionSsr } from "iron-session/next";
import { InferGetServerSidePropsType } from 'next';
import Info from '../components/Info';
import { EventData } from '../data/EventData';
import Event from '../components/Event';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req,res }) {
      const user: User = req.session.user ?? { isAuthenticated: false, permission: "none" };
        
        if (!user.isAuthenticated && user.permission === "none") {
            return {
                redirect: {
                  permanent: false,
                  destination: "/"
                },
                props: {
                  user: user,
                }
              }
        }
    return {
        props: {
          user: user,
        },
      };
    },sessionOptions
  );

export default function Home({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const text = "We're getting married!"

  const theme = extendTheme({
    fontFamily: {
      display: '"Playfair Display", var(--joy-fontFamily-fallback)',
      code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
      fallback:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      body: '"Source Sans Pro", var(--joy-fontFamily-fallback)',
    }, components: {
      JoyButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#490a20'
          }
        }
      }
    }
  });

  const Gift = (
    <Info title='Wishing well'
      body='Your love, laughter and presence on our wedding day is more than we could ever ask for. However, should you wish to celebrate with a gift, a wishing well will be available at the wedding for your contribution and well wishes.'
    />
  )

  const Dietary = (
    <Info title='Dietary Requirements'
      body='Please make sure that you include any dietary requirements when you RSVP to anika.priyankan@gmail.com'
    />
  );

  const Wedding = <Event {...EventData[0]} />
  const Reception = <Event {...EventData[1]} />
  const HennaNight = <Event {...EventData[2]} />

  function renderAuthenticate(user: User) {
    switch (user.permission) {
      case "wedding":
        return (
          <>
            {Wedding}
            {Gift}
          </>
        )
      case "wedding&reception":
        return (
          <>
            {Wedding}
            {Gift}
            {Reception}
            {Dietary}
          </>
        )
      case "all":
        return (
          <>
            {Wedding}
            {Gift}
            {Reception}
            {Dietary}
            {HennaNight}
          </>
        )
    }
  }


  const Authenticate =  (<>
      <HorizontalList permission={user.permission} isAuthenticated={user.isAuthenticated} />
      <div className={styles.imageTextContainer}>
        <Image
                src={Couple}
                alt=""
        priority
        width={600}
          className={styles.image}
          />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}  className={styles.textBlock}>
            <Typography level='h4' className={styles.typeWriter}>
              {text}
            </Typography>
          </motion.div>
    </div>
        <div className={styles.app}>
      {renderAuthenticate(user)}
      </div>
    </>)

  
  return (
    <div className={styles.rootContainer}>
      <Head>
        <title>Wedding Couples name</title>
        <meta name="description" content="Simple web app to have wedding info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssVarsProvider theme={theme}>
        {
          user.isAuthenticated &&
            Authenticate
        }
      </CssVarsProvider>
    </div>
  )
}