import { useState } from 'react'
import { 
  Box, 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Paper,
  createTheme,
  ThemeProvider,
  Grid,
  Fade
} from '@mui/material'
import axios from 'axios'
import KenyaScene from './components/KenyaScene'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Gallery from './components/Gallery'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#7c4dff',
    },
    background: {
      default: '#0a1929',
      paper: 'rgba(13, 31, 45, 0.95)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    }
  },
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
    h4: {
      fontWeight: 700,
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(176, 190, 197, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: '#1e88e5',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0bec5',
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={<MainForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

function MainForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    university: '',
    photo: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhotoChange = (e) => {
    setFormData(prev => ({
      ...prev,
      photo: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('full_name', formData.fullName)
    data.append('university', formData.university)
    if (formData.photo) {
      data.append('photo', formData.photo)
    }

    try {
      const response = await axios.post('https://tafiti.onrender.com/api/submit/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        withCredentials: true
      })
      
      console.log('Submission response:', response.data)
      alert('Submission successful!')
      setFormData({
        fullName: '',
        university: '',
        photo: null
      })
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
      alert('Error submitting form. Please try again.')
    }
  }

  return (
    <Box>
      <Box
        sx={{
          minHeight: '100vh',
          overflow: 'hidden', // Prevent horizontal scroll
          backgroundColor: 'background.default',
          backgroundImage: 'url("/space-bg.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
        }}
      >
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box
            sx={{
              width: '100%',
              p: { xs: 0, sm: 3 },
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '@media (max-width: 600px)': {
                padding: 0,
                margin: 0,
                maxWidth: '100vw'
              }
            }}
          >
            <Fade in timeout={1000}>
              <Paper
                elevation={24}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  background: 'rgba(13, 31, 45, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: { xs: 0, sm: 2 },
                  position: 'relative',
                  overflow: 'auto',
                  maxWidth: { xs: '100%', sm: '500px' },
                  width: '100%',
                  height: { xs: '100vh', sm: 'auto' },
                  m: { xs: 0, sm: 'auto' },
                  '@media (max-width: 600px)': {
                    margin: 0,
                    maxWidth: '100%',
                    borderRadius: 0
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #1e88e5, #7c4dff)',
                  }
                }}
              >
                <Box sx={{ 
                  textAlign: 'center',
                  mb: 1,
                  mt: { xs: 0, sm: 0 }
                }}>
                  <img 
                    src="/satellite-icon.svg" 
                    alt="Satellite Icon" 
                    style={{ 
                      width: '80px', 
                      marginBottom: '1rem',
                      animation: 'float 6s ease-in-out infinite'
                    }} 
                  />
                  <Typography
                    variant="h3"
                    component="h1"
                    color="primary"
                    gutterBottom
                    sx={{ 
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #1e88e5 30%, #7c4dff 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
                      lineHeight: 1.1,
                      mb: 1,
                    }}
                  >
                    Tafiti Cubesat
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      maxWidth: '400px',
                      mx: 'auto',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      lineHeight: 1.3,
                    }}
                  >
                    The intervarsity space program
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: { xs: 3, sm: 2 },
                    mt: { xs: 2, sm: 2 },
                    '@media (max-width: 600px)': {
                      flex: 1,
                      justifyContent: 'center'
                    }
                  }}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="medium"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          height: { xs: '56px', sm: '40px' }
                        }
                      }}
                    />

                    <TextField
                      required
                      fullWidth
                      label="University"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="medium"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          height: { xs: '56px', sm: '40px' }
                        }
                      }}
                    />

                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      size="large"
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                        color: 'text.primary',
                        height: { xs: '56px', sm: '40px' },
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(30, 136, 229, 0.08)',
                        }
                      }}
                    >
                      Upload Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlePhotoChange}
                        required
                      />
                    </Button>

                    {formData.photo && (
                      <Typography 
                        variant="body2" 
                        color="primary"
                        sx={{ 
                          mt: -1,
                          fontSize: { xs: '0.9rem', sm: '0.875rem' }
                        }}
                      >
                        Selected file: {formData.photo.name}
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        mt: { xs: 'auto', sm: 1 },
                        mb: { xs: 2, sm: 0 },
                        height: { xs: '56px', sm: '40px' },
                        background: 'linear-gradient(45deg, #1e88e5 30%, #7c4dff 90%)',
                        boxShadow: '0 3px 5px 2px rgba(30, 136, 229, .3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976d2 30%, #6c3fff 90%)',
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Fade>
          </Box>
          
          <Box
            sx={{
              position: 'fixed',
              right: 0,
              top: 0,
              width: '78%',
              height: '100vh',
              display: { xs: 'none', md: 'block' },
              backgroundColor: 'rgba(13, 31, 45, 0.95)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <KenyaScene />
          </Box>
        </Box>
      </Box>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  )
}

export default App
