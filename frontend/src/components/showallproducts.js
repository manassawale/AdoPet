import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { selectUser , logout } from '../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GetAll = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser );
    const navigate=useNavigate();
    const Logout = () => {
        dispatch(logout());
        window.location.href = "/";
    };

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/v1/pets/all", {
                    headers: {
                        "x-access-token": user.token
                    },
                });
                setMsg("");
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, [user.token]);

    const getProductsSearch = async () => {
        const search2 = search;
        if (search2 === "") {
            return; // If search is empty, do nothing
        }
        const url = "http://localhost:3001/api/v1/pets/search/" + search2;
        try {
            const response = await axios.get(url, {
                headers: {
                    "x-access-token": user.token
                },
            });
            if (response.data.length === 0) {
                setMsg("No results");
                setProducts([]);
            } else {
                setMsg("");
                setProducts(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const requestToAdopt = async (id) => {
        try {
            // Send adoption request
            const response = await axios.post("http://localhost:3001/api/v1/adoptions", {
                pet_id: id,
                user_id: user.id,
            }, {
                headers: {
                    "x-access-token": user.token
                },
            });

            alert("Request to adopt sent successfully and notification has been sent to admin.");
        } catch (error) {
            console.log(error);
            alert("There was an error processing your request.");
        }
    };

    return (
        <div className='show' style={styles.outerContainer}>
            <Container sx={{ py: 8 }} maxWidth="md" style={styles.innerContainer}>
                <h1 style={styles.title}>
                    <span style={styles.titleSpanRed}>A</span>
                    do<span style={styles.titleSpanGreen}>P</span>et
                </h1>

                <button style={styles.aboutButton} onClick={() => navigate('/aboutus')}>
                    About Us
                </button>

                <TextField
                    style={styles.searchField}
                    label="Type here to search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button style={styles.searchButton} onClick={getProductsSearch}>
                    Search
                </Button>

                {msg}

                <Grid container spacing={4}>
                    {products.map((card) => (
                        <Grid item key={card._id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="div"
                                    sx={{ pt: '56.25%' }}
                                    image={"http://localhost:3001" + card.image}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2" style={styles.cardTitle}>
                                        Name: {card.petname}
                                    </Typography>
                                    <Typography>Type: {card.pettype}</Typography>
                                    <Typography>Breed: {card.petbreed}</Typography>
                                    <Typography>Age: {card.petage}</Typography>
                                    <Typography>Description: {card.description}</Typography>
                                    <Typography>Location: {card.location}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" style={styles.adoptButton} onClick={() => requestToAdopt(card._id)}>
                                        Request to Adopt
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Button variant="contained" className="logout__button" onClick={Logout} style={styles.logoutButton}>
                    Log out
                </Button>
            </Container>
        </div>
    );
};

const styles = {
    outerContainer: {
        minHeight: '100vh', // Full height of the viewport
        backgroundColor: '#f0f0f0', // Light background color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        backgroundColor: '#ffffff', // White background for the container
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        padding: '30px',
        width: '100%', // Full width
    },
    title: {
        marginRight: '80px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#A483D6',
        fontSize: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleSpanRed: {
        color: 'red',
        fontWeight: 'bold',
    },
    titleSpanGreen: {
        color: 'green',
        fontWeight: 'bold',
    },
    aboutButton: {
        backgroundColor: '#FF6F61',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0. 3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    searchField: {
        borderRadius: '10px',
        border: '1px solid #ffffff',
        color: '#fff',
        marginLeft: '545px',
        marginBottom: '20px',
        width: '300px',
        height: '43px',
        border: '0.5px solid rgba(255, 255, 255, 0.40)',
        background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #E7EBF0',
        backgroundBlendMode: 'soft-light, normal',
        boxShadow: '1.5px 1.5px 5px 0px #A6ABBD inset, -2.5px -2.5px 5px 0px #FAFBFF inset',
    },
    searchButton: {
        textTransform: 'capitalize',
        borderRadius: '14px',
        border: '1px solid #ffffff3e',
        background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
        backgroundBlendMode: 'soft-light, normal',
        boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
        color: '#fff',
        transition: 'background 0.8s',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    adoptButton: {
        marginTop: "30px",
        textTransform: 'capitalize',
        borderRadius: '8px',
        border: '1px solid #ffffff3e',
        background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
        backgroundBlendMode: 'soft-light, normal',
        boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
        color: '#fff',
        transition: 'background 0.8s',
    },
    logoutButton: {
        marginTop: "30px",
        textTransform: 'capitalize',
        borderRadius: '14px',
        border: '1px solid #ffffff3e',
        background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
        backgroundBlendMode: 'soft-light, normal',
        boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
        color: '#fff',
        transition: 'background 0.8s',
        margin: '0px 0px 0px 760px',
    },
};

export default GetAll;