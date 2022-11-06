import React, {useState, useEffect} from "react";
import Axios from "axios";
// React leaflet
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Icon} from 'leaflet'

//MUI
import Grid2 from "@mui/material/Unstable_Grid2";
import {AppBar, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Typography} from "@mui/material";

//Map icons
import houseIconPng from './Assets/Mapicons/house.png'
import apartmentIconPng from './Assets/Mapicons/apartment.png'
import officeIconPng from './Assets/Mapicons/office.png'

//Assets
import img1 from './Assets/img1.jpg';
import myListings from "./Assets/Data/Dummydata";


function Listings() {

    // const url = 'http://127.0.0.1:8000/api/listings/'
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => console.log(data))


    const houseIcon = new Icon({
        iconUrl: houseIconPng,
        iconSize: [40, 40],
    });
    const apartmentIcon = new Icon({
        iconUrl: apartmentIconPng,
        iconSize: [40, 40],
    });
    const officeIcon = new Icon({
        iconUrl: officeIconPng,
        iconSize: [40, 40],
    });

    const [latitude, setLatitude] = useState(51.487367667938344)
    const [longitude, setLongitude] = useState(-0.12633011870915023)

    const [allListings, setAllListings] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    useEffect(() => {
        const source = Axios.CancelToken.source();
        async function GetAllListings() {
            try {
                const response = await Axios.get("http://127.0.0.1:8000/api/listings/", {cancelToken: source.token});
                setAllListings(response.data)
                setDataLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        GetAllListings();
        return ()=> {
            source.cancel();
        }
    }, [])

    if (dataLoading === false){
            console.log(allListings[0].location);
    }

    if (dataLoading === true) {
        return (
            <Grid2 container justifyContent='center' alignItems='center' style={{height: '100vh'}}>
                <CircularProgress />
            </Grid2>

        )
    }


    return (
        <Grid2 container>
            <Grid2 item xs={4}>
                {allListings.map((listing) => {
                    return (
                        <Card key={listing.id}
                              style={{margin: '0.5rem', border: '1px solid black', position: 'relative'}}>
                            <CardHeader
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVertIcon/>
                                //     </IconButton>
                                // }
                                title={listing.title}
                            />
                            <CardMedia
                                style={{paddingRight: '1rem', paddingLeft: '1rem', height: '20rem', width: '30rem'}}
                                component="img"
                                image={listing.picture1}
                                alt={listing.title}
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    {listing.description.substring(0, 200)}...
                                </Typography>
                            </CardContent>

                            {listing.property_status === "Sale" ? (
                                <Typography
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'green',
                                        color: 'white',
                                        top: '65px',
                                        left: '16px',
                                        padding: '5px'
                                    }}>
                                    {listing.listing_type}:
                                    ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </Typography>
                            ) : (
                                <Typography
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'green',
                                        color: 'white',
                                        top: '65px',
                                        left: '16px',
                                        padding: '5px'
                                    }}>
                                    {listing.listing_type}:
                                    ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / {listing.rental_frequency}
                                </Typography>)
                            }

                            {/*<Typography*/}
                            {/*    style={{*/}
                            {/*        position: 'absolute',*/}
                            {/*        backgroundColor: 'green',*/}
                            {/*        color: 'white',*/}
                            {/*        top: '65px',*/}
                            {/*        left: '16px',*/}
                            {/*        padding: '5px'*/}
                            {/*    }}>*/}
                            {/*    ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                            {/*</Typography>*/}
                            {/*<CardActions disableSpacing>*/}
                            {/*    <IconButton aria-label="add to favorites">*/}
                            {/*        <FavoriteIcon/>*/}
                            {/*    </IconButton>*/}
                            {/*    <IconButton aria-label="share">*/}
                            {/*        <ShareIcon/>*/}
                            {/*    </IconButton>*/}
                            {/*</CardActions>*/}
                        </Card>
                    )
                })
                }
            </Grid2>
            <Grid2 item xs={8} style={{marginTop: '0.5rem'}}>
                <AppBar position='sticky'>
                    <div style={{height: "100vh"}}>
                        <MapContainer center={[51.505, -0.09]} zoom={15} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {allListings.map((listing) => {
                                function IconDisplay() {
                                    if (listing.listing_type === 'House') {
                                        return houseIcon;
                                    } else if (listing.listing_type === 'Apartment') {
                                        return apartmentIcon;
                                    } else if (listing.listing_type === 'Office') {
                                        return officeIcon;
                                    }
                                }

                                return (
                                    <Marker
                                        key={listing.id}
                                        icon={IconDisplay()}
                                        position={[
                                            listing.location.coordinates[0],
                                            listing.location.coordinates[1],
                                        ]}
                                    >
                                        <Popup>
                                            <Typography variant='h5'>{listing.title}</Typography>
                                            <img src={listing.picture1} style={{height: '14rem', width: '18rem'}}/>
                                            <Typography
                                                variant='body1'>{listing.description.substring(0, 150)}...</Typography>
                                            <Button variant='contained' fullWidth>Details</Button>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {/*<Marker icon={officeIcon} position={[latitude, longitude]}>*/}
                            {/*    <Popup>*/}
                            {/*        <img src={img1} style={{height: '14rem', width: '18rem'}}/>*/}
                            {/*        <Button variant='contained' fullWidth>A LINK</Button>*/}
                            {/*    </Popup>*/}
                            {/*</Marker>*/}
                        </MapContainer>
                    </div>
                </AppBar>
            </Grid2>
        </Grid2>
    );
}

export default Listings;