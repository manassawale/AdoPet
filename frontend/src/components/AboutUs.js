import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>About Us</h1>
            <p style={styles.paragraph}>
                Welcome to Adopet, your trusted platform for pet adoption! We are dedicated to connecting loving homes with pets in need. Our mission is to ensure that every animal finds a safe and loving environment where they can thrive.
            </p>

            <div style={styles.section}>
                <h2 style={styles.subtitle}>Our Mission</h2>
                <p style={styles.paragraph}>
                    At Adopet, our mission is to promote animal welfare and facilitate the adoption of pets. We strive to create a community where every pet has a chance to find a forever home, and every adopter can find their perfect companion.
                </p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subtitle}>Our Vision</h2>
                <p style={styles.paragraph}>
                    We envision a world where every pet is treated with love and respect, and where every family has the opportunity to experience the joy of pet ownership. We aim to be the leading platform for pet adoption, making the process simple, transparent, and fulfilling for both pets and their new families.
                </p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subtitle}>Our Values</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>Compassion:</strong> We believe in treating all animals with kindness and empathy.</li>
                    <li style={styles.listItem}><strong>Integrity:</strong> We operate with honesty and transparency in all our dealings.</li>
                    <li style={styles.listItem}><strong>Community:</strong> We foster a supportive community of pet lovers and advocates.</li>
                    <li style={styles.listItem}><strong>Education:</strong> We provide resources and information to help adopters make informed decisions.</li>
                    <li style={styles.listItem}><strong>Commitment:</strong> We are dedicated to the welfare of animals and the satisfaction of our adopters.</li>
                </ul>
            </div>

            <p style={styles.paragraph}>
                Join us in our mission to make a difference in the lives of pets and their future families. Together, we can create a brighter future for animals in need.
            </p>

            <div style={styles.footer}>
                <p>&copy; 2024 Adopet. All rights reserved.</p>
                <div style={styles.socialMedia}>
                    <a href="https://facebook.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh', // Ensure it takes the full height of the viewport
        maxWidth: '90vw',
        margin: '0 auto',
        padding: '30px',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#FF6F61',
        textAlign: 'center',
        fontSize: '36px',
        marginBottom: '20px',
    },
    subtitle: {
        color: '#FF6F61',
        fontSize: '28px',
        marginBottom: '10px',
        borderBottom: '2px solid rgb(45, 206, 20)',
        display: 'inline-block',
        paddingBottom: '5px',
    },
    paragraph: {
        lineHeight: 1.8,
        color: '#333333',
        fontSize: '16px',
        marginBottom: '20px',
        textAlign: 'justify',
    },
    section: {
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#ffffff',
        transition: 'transform 0.3s',
        width: '100%', // Make sections full width
        maxWidth: '800px', // Limit max width for better readability
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        padding: '10px',
        borderBottom: '1px solid #eee',
        transition: 'background-color 0.3s',
        color: '#333',
    },
    footer: {
        textAlign: 'center',
        marginTop: '40px',
        color: '#666666',
        fontSize: '14px',
    },
    socialMedia: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    icon: {
        color: '#FF6F61',
        fontSize: '24px',
        margin: '0 10px',
        transition: 'color 0.3s, transform 0.3s',
        textDecoration: 'none',
    },
    hoverEffect: {
        ':hover': {
            color: '#333',
            transform: 'scale(1.1)',
        },
    },
};

export default AboutUs;