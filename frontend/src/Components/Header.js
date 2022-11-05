import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <AppBar position="static" style={{backgroundColor: "black"}}>
            <Toolbar>
                <div style={{marginRight: 'auto'}}>
                    <Button color="inherit" onClick={() => navigate('/')}>
                        <Typography variant="h4">LBREP</Typography>
                    </Button>
                </div>
                <div>
                    <Button color="inherit" onClick={() => navigate('/listings')}>
                        <Typography variant="h6" style={{marginRight: '2rem'}}>Listings</Typography>
                    </Button>
                    <Button color="inherit">
                        <Typography variant="h6" style={{marginLeft: '2rem'}}>Agencies</Typography>
                    </Button>
                </div>
                <div style={{marginLeft: "auto", marginRight: "5rem"}}>
                    <Button
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            width: "15rem",
                            fontSize: "1.1rem",
                            marginRight: "1rem"
                        }}>
                        Add Property
                    </Button>
                    <Button
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            width: "15rem",
                            fontSize: "1.1rem",
                            marginLeft: "1rem"
                        }}
                        onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;