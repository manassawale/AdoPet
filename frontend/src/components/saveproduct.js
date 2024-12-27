import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Container, Grid, Paper } from "@mui/material";
import { selectUser  } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
    const { id } = useParams();
    const user = useSelector(selectUser );

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [pettype, setPettype] = useState("");
    const [petbreed, setPetbreed] = useState("");
    const [petage, setPetage] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    useEffect(() => {
        async function getCompany(id) {
            await axios.get("http://localhost:3001/api/v1/pets/" + id, {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                setName(response.data.petname);
                setImage(response.data.image);
                setPettype(response.data.pettype);
                setPetbreed(response.data.petbreed);
                setDescription(response.data.description);
                setLocation(response.data.location);
                setPetage(response.data.petage);
                setOwnerName(response.data.ownerName);
                setContactNumber(response.data.contactNumber);
                setEmail(response.data.email); // Set email if available
            }).catch((error) => {
                console.log(error);
            });
        }

        if (id) { getCompany(id) }
    }, [id, user.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("petname", name);
        formData.append("image", image);
        formData.append("pettype", pettype);
        formData.append("petbreed", petbreed);
        formData.append("petage", petage);
        formData.append("email", email);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("ownerName", ownerName);
        formData.append("contactNumber", contactNumber);

        if (id) {
            await axios.put("http://localhost:3001/api/v1/pets/" + id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                window.location.href = "/dashboard";
            }).catch((error) => {
                console.log(error);
            });
            return;
        }

        await axios.post("http://localhost:3001/api/v1/pets", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.href = "/dashboard";
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div style={{height:"90vh", display:"flex" ,justifyContent:"center"}}>
      
        <Container maxWidth="sm" sx={{ paddingTop: 1 }}>
            <Paper elevation={2} sx={{ padding: 2 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Enter Pet Details
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Type"
                                variant="outlined"
                                value={pettype}
                                onChange={(e) => setPettype(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Breed"
                                variant="outlined"
                                value={petbreed}
                                onChange={(e) => setPetbreed(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                full label="Age"
                                variant="outlined"
                                value={petage}
                                onChange={(e) => setPetage(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Location"
                                variant="outlined"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Owner Name"
                                variant="outlined"
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                variant="outlined"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <label htmlFor="image-upload">
                                <Button variant="outlined" component="span" fullWidth>
                                    Upload Image
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    marginTop: 2,
                                    textTransform: 'capitalize',
                                    borderRadius: '4px',
                                    background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
                                    boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                                    color: '#fff',
                                    transition: 'background 0.8s',
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        </div>
    );
}

export default CreateProduct;