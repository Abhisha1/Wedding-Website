import { CssVarsProvider, extendTheme, Sheet, Typography, TextField, Button, Modal, LinearProgress, } from '@mui/joy'
import Head from 'next/head'
import React, { useState } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { sessionOptions } from '../lib/session';
import { User } from '../lib/user';
import { withIronSessionSsr } from "iron-session/next";
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/navigation';
import LoadingImage from '../styles/assets/LoadingImage.jpg';

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
      const user: User = req.session.user ?? { isAuthenticated: false, permission: "none" };
    if (user.isAuthenticated) {
      return {
        redirect: {
          permanent: false,
          destination: "/details"
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

export default function Home({user}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const theme = extendTheme({
    fontFamily: {
      display: '"Playfair Display", var(--joy-fontFamily-fallback)',
      code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
      body: '"Open Sans", var(--joy-fontFamily-fallback)',
    }, components: {
      JoyButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#490a20',
            color: 'white',
            borderColor: 'white',
          }
        }
      }
    }
  });
  const [value, setValue] = useState<string>("");
  const [open, _] = useState(true)
  const router = useRouter();
  const [error, setError] = useState(false)
  const [load, setLoad] = useState(false)

    const submitPassword = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setLoad(true);
        const res = await fetch('/api/password', {
            body: JSON.stringify({
                password: value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
      console.log("fetched");
        await res.json().then((data) => {
            let response: User = data
          if (!response.isAuthenticated) {
                console.log("not authenticated");
                setLoad(false);
                setError(true)
          } else {
            console.log("authenticated");
              router.push("/details")
            }
        })
        .catch((e) => console.log(e.message))
    }


  
  return (
    <div className={styles.rootContainer}>
      <Head>
        <title>Wedding Couples name</title>
        <meta name="description" content="Simple web app to have wedding info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssVarsProvider theme={theme}>
          <div style={{display: 'flex'}} className={styles.landingPage}>
        <Sheet
            variant="outlined"
          sx={{
            height: '100vh',
            width: '50%',
            p: 3,
            backgroundColor: '#490a20',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white'
          }}
          >
            <>
            <Typography level='h4' className={styles.typeWriter} id={styles.landingTitle}>
              Welcome to our wedding website!
            </Typography>
          <Typography
            component="h2"
            id={styles.closeModalTitle}
            level="h4"
            textColor="inherit"
            fontWeight="lg"
          >
            Guest access. Enter your passcode to view wedding details
                    </Typography>
                    <br />
              <form onSubmit={submitPassword} method="post">
              {load && <LinearProgress variant="soft" />}
            <TextField
                color="neutral"
                disabled={false}
                  variant="outlined"
                  sx={{fontFamily: "Segoe UI"}}
                            value={value}
                            error={error}
                            helperText={error && "You entered an incorrect password"}
                onChange={(e) => setValue(e.target.value)}
                required
                        />
            <br />
            <Button variant="soft" type="submit" sx={{fontFamily: "Segoe UI"}}>Enter</Button>
              </form>
              </>
          </Sheet>
          <div className={styles.loadingImageBlock} >
            <Image className={styles.loadingImage} src={LoadingImage} alt='landing page decor' width={500} />
          </div>
          </div>
      </CssVarsProvider>
    </div>
  )
}