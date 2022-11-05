import {Button, Typography} from "@mui/material";

//Assets
import city from './Assets/city.jpg'

function Home() {
    return (
        <>
            <div style={{position: 'relative'}}>
                <img src={city} style={{width: '100%', height: '92vh'}}/>
                <div style={{position: 'absolute', zIndex: '100', top: '100px', left: '20px', textAlign: "center"}}>
                    <Typography variant='h1' style={{color: 'white', fontWeight: 'bold'}}>FIND YOUR <span
                        style={{color: 'green'}}>NEXT PROPERTY</span> ON TEH LBREP WEBSITE</Typography>
                    <Button variant='contained' style={{
                        fontSize: '3.5rem',
                        borderRadius: '15px',
                        backgroundColor: 'green',
                        marginTop: '2rem',
                        boxShadow: '3px 3px 3px white'
                    }}>SEE ALL PROPERTY</Button>
                </div>
            </div>
        </>
    );
}

export default Home;