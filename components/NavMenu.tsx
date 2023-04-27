import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import styles from '../styles/Home.module.css';
import ListItemButton from '@mui/joy/ListItemButton';
import { User } from '../lib/user';

export default function HorizontalList(user: User) {
  
  return (
    <Box component="nav" aria-label="My site" className={styles.navBox}>
      <style global jsx>
  {` html { scroll-behavior: smooth; }`}
</style>
      <List role="menubar" row size="lg" sx={{
          '--List-radius': '8px',
          '--List-padding': '1rem',
              '--List-gap': '8px',
        placeContent: 'center'
        }}>
        <ListItem role="none">
          <ListItemButton className={styles.navList} role='menuitem' component="a" href="#Hindu Wedding">
            Wedding
          </ListItemButton>
        </ListItem>
        {
          (user.permission == "wedding&reception" || user.permission == "all") && 
          <ListItem role="none">
          <ListItemButton className={styles.navList} role="menuitem" component="a" href="#Reception">
            Reception
          </ListItemButton>
        </ListItem>
        }
        {
          (user.permission == "all") && 
          <ListItem role="none">
          <ListItemButton className={styles.navList} role="menuitem" component="a" href="#Henna Night">
            Henna Night
          </ListItemButton>
        </ListItem>
        }
      </List>
    </Box>
  );
}