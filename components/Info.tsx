import { Sheet, Typography } from "@mui/joy";
import styles from '../styles/Home.module.css';

type InfoProps = {
    title: string,
    body: string;
}

export default function Info({title, body}: InfoProps){
    return (<>
    <Sheet id={title} className={styles.pattern}>
      <div className={styles.infoSection}>
        <Typography level="h2" className={styles.typeWriter}>{title}</Typography>
                <Typography level="body1">{body}</Typography>
        </div>  
      </Sheet>
      </>
    )
}