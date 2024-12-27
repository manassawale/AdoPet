import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { selectUser , logout } from '../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { red } from '@mui/material/colors';

const AdminView = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser );
    const [products, setProducts] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const contactNumber="+91 8007001540";
    const location="Alandi,Pune" ;
    const ownerName="Manas Sawale";
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/v1/pets/all", {
                    headers: {
                        "x-access-token": user.token
                    },
                });
                setProducts(response.data);
                console.log("From adminview: ",products);
            } catch (error) {
                console.log(error);
            }
        };

        const getAdoptions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/v1/requests", {
                    headers: {
                        "x-access-token": user.token
                    },
                });
                setAdoptions(response.data);
                console.log("Adoption from admin view:",adoptions);
            } catch (error) {
                console.log(error);
            }
        };

        getProducts();
        getAdoptions();
    }, [user.token]);

    const Logout = () => {
        dispatch(logout());
        window.location.reload();
    };
    async function deleteProduct(id) {

        //confirm before deleting
        if (!window.confirm("Are you sure you want to delete this pet?")) {
            return;
        }

        await axios.delete("http://localhost:3001/api/v1/pets/" + id, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleAccept = async (id, email1, username1) => {
        try {
            console.log("From handleAccept:", email1);
            // Send email notification for acceptance
            await axios.post('http://localhost:3001/send', {
                from: "shivghyar538@gmail.com",
                to: email1,
                subject: "Request Accepted for Adopting Pet",
                message: `<!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .email-container {
                                        max-width: 600px;
                                        margin: 20px auto;
                                        background: #ffffff;
                                        border: 1px solid #ddd;
                                        border-radius: 8px;
                                        overflow: hidden;
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        background-color:rgb(16, 174, 29); /* A warm coral color */
                                        color: white;
                                        text-align: center;
                                        padding: 20px;
                                    }
                                    .content {
                                        padding: 20px;
                                        text-align: left;
                                        color: #333333;
                                    }
                                    .content h1 {
                                        font-size: 24px;
                                        color:rgb(17, 156, 14); /* Match header color */
                                        margin-bottom: 10px;
                                    }
                                    .content p {
                                        font-size: 16px;
                                        line-height: 1.5;
                                        margin-bottom: 20px;
                                    }
                                    .footer {
                                        background-color: #f9f9f9;
                                        text-align: center;
                                        padding: 10px;
                                        font-size: 14px;
                                        color: #666666;
                                        border-top: 1px solid #ddd;
                                    }
                                    .button {
                                        display: inline-block;
                                        padding: 10px 20px;
                                        background-color:rgb(23, 125, 221); /* Match header color */
                                        color: black;
                                        text-decoration: none;
                                        border-radius: 5px;
                                        font-size: 16px;
                                        margin-top: 10px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="header">
                                        <h1>Welcome to Adopet!</h1>
                                    </div>
                                    <div class="content">
                                        <h1>Your Adoption Request Has Been Approved!</h1>
                                        <p>Dear <strong>${username1}</strong>,</p>
                                        <p>Congratulations! Your request to adopt a pet has been successfully approved. Below is the information of the owner you can contact:</p>
                                        <p>Owner Details:</p>
                                        <p>Name: <strong>Manas Sawale</strong></p>
                                        <p>Contact Number: <strong>+91 8007001540</strong></p>
                                        <p>Location: <strong>Alandi,Pune</strong></p>
                                        <p>We’re excited to have you onboard and look forward to your valuable contributions in enhancing Adopet.</p>
                                        <p>Continue adopting more animals and make a difference!</p>
                                        <button><a href="https://www.adopet.com/admin-login" class="button">Log In Now</a></button>
                                        
                                    </div>
                                    <div class="footer">
                                        <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@adopet.com">support@adopet.com</a>.</p>
                                        <p>&copy; 2024 Adopet. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>
    ` 
            });
    
            // Delete the request after sending the email
            await axios.delete(`http://localhost:3001/api/v1/requests/${id}`);
    
            alert('The adoption request has been accepted. An email has been sent to the user.');
    
        } catch (error) {
            console.error('Error verifying admin:', error);
            alert('There was an error accepting the adoption request. Please try again later.');
        }
    };
    
    const handleReject = async (id, email1, username1) => {
        try {
            // Send email notification for rejection
            await axios.post('http://localhost:3001/send', {
                from: "shivghyar538@gmail.com",
                to: email1,
                subject: "Request Rejected",
                message: `<!DOCTYPE html>
                        <html>
                        <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 20px auto;
                                background: #ffffff;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                background-color: #f44336;
                                color: white;
                                text-align: center;
                                padding: 20px;
                            }
                            .content {
                                padding: 20px;
                                text-align: left;
                                color: #333333;
                            }
                            .content h1 {
                                font-size: 24px;
                                color: #f44336;
                                margin-bottom: 10px;
                            }
                            .content p {
                                font-size: 16px;
                                line-height: 1.5;
                                margin-bottom: 20px;
                            }
                            .footer {
                                background-color: #f9f9f9;
                                text-align: center;
                                padding: 10px;
                                font-size: 14px;
                                color: #666666;
                                border-top: 1px solid #ddd;
                            }
                        </style>
                        </head>
                        <body>
                        <div class="email-container">
                            <div class="header">
                                <h1>Request for Pet Adoption has been rejected.</h1>
                            </div>
                            <div class="content">
                                <p>Dear <strong>${username1}</strong>,</p>
                                <p>We regret to inform you that your request for pet adoption has not been approved. Please try again later. Sorry for  inconvenience</p>
                                <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@AdoPet.com">support@adopet.com</a>.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; 2024 AdoPet. All rights reserved.</p>
                            </div>
                        </div>
                        </body>
                        </html>
    ` 
            });
    
            // Delete the request after sending the email
            await axios.delete(`http://localhost:3001/api/v1/requests/${id}`);
    
            alert('The adoption request has been rejected. An email has been sent to the user.');
    
        } catch (error) {
            console.error('Error rejecting admin:', error);
            alert('There was an error rejecting the adoption request. Please try again later.');
        }
    };
    return (
        <Container sx={{ py: 8, maxWidth: '100%' }} style={{ backgroundColor: '#f5f5f5' }}>
            <h1 style={{
                margin: '0 80px',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#A483D6',
                fontSize: '48px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <span style={{
                    color: 'red',
                    fontWeight: 'bold'
                }}>A</span>
                do<span style={{
                    color: 'green',
                    fontWeight: 'bold'
                }}>P</span>et
            </h1>

            <Button 
                sx={{ mb: 4 }}
                variant="contained" 
                color="primary" 
                href="/addpet"
                style={{
                    textTransform: 'capitalize',
                    borderRadius: '12px', 
                    border: '1px solid #ffffff3e',
                    background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
                    backgroundBlendMode: 'soft-light, normal',
                    boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                    color: '#fff',
                    transition: 'background 0.8s',
                    margin: '0 0 50px auto',
                    display: 'block',
                    width: 'fit-content'
                }}> 
                Add New Pet
            </Button>

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
                                <Typography gutterBottom variant="h5" component="h2">
                                    Name: {card.petname}
                                </Typography>
                                <Typography>Type: {card.pettype}</Typography>
                                <Typography>Breed: {card.petbreed}</Typography>
                                <Typography>Age: {card.petage}</Typography>
                                <Typography>Description: {card.description}</Typography>
                                <Typography>Location: {card.location}</Typography>
                            </CardContent>
                            <CardActions>
                                {user.userType === "b2 uyer" ? (
                                    <Button size="small">Order</Button>
                                ) : (
                                    <>
                                        <Button size="small" variant="outlined" onClick={() => { window.location.href = "/addpet/" + card._id }}>Edit</Button>
                                        <Button color="error" variant="outlined" size="small" onClick={() => { deleteProduct(card._id) }}>Delete</Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <br />
            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>
                Pet Adoption Requests
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Requested Date</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Requested User</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Requested Pet</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adoptions.map((row) => (
                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {new Date(row.date).toUTCString()}
                                </TableCell>
                                <TableCell align="right">{row.user_name}</TableCell>
                                <TableCell align="right">{row.pet_name}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="success" onClick={() => handleAccept(row._id, row.email, row.user_name)}>Accept</Button>
                                    <Button variant="contained" color="error" onClick={() => handleReject(row._id, row.email, row.user_name)}>Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Button variant="contained" className="logout__button" onClick={Logout} style={{
                textTransform: 'capitalize',
                borderRadius: '12px',
                width: '60', height: '40',
                border: '1px solid #ffffff3e',
                background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
                backgroundBlendMode: 'soft-light, normal',
                boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                color: '#fff',
                transition: 'background 0.8s',
                margin: '0 0 0 auto'
            }}>
                Log out
            </Button>
        </Container>
    );
}

export default AdminView;