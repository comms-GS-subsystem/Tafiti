import { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Container
} from '@mui/material'
import axios from 'axios'

function Gallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://tafiti.onrender.com/api/images/')
      setImages(response.data)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        backgroundImage: 'url("/space-bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #1e88e5 30%, #7c4dff 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
          }}
        >
          Tafiti Gallery
        </Typography>

        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={24}
                sx={{
                  p: 2,
                  background: 'rgba(13, 31, 45, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <img
                  src={image.photo_url}
                  alt={`Uploaded by ${image.full_name}`}
                  style={{ 
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <Box>
                  <Typography variant="h6" color="text.primary">
                    {image.full_name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {image.university}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Gallery
