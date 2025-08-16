'use client'

import { Navbar, Nav, Container, NavDropdown, Button, Badge } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import WeatherWidget from './WeatherWidget'

interface NavigationBarProps {
  selectedZone?: string
  showWeather?: boolean
}

export default function NavigationBar({ selectedZone, showWeather = true }: NavigationBarProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  // Detectar hidratación del cliente
  useEffect(() => {
    setIsClient(true)
    
    // Verificar si el usuario está logueado
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      setUser(null)
      router.push('/')
    }
  }

  const getProfileLink = () => {
    if (!user) return '/'
    return user.userType === 'guide' ? '/guide-profile' : '/client-profile'
  }

  const getUserInitials = () => {
    if (!user) return 'U'
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
  }

  return (
    <Navbar 
      expand="lg" 
      className="shadow-sm sticky-top"
      style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
      variant="dark"
    >
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} href="/" className="fw-bold d-flex align-items-center">
          <i className="bi bi-geo-alt-fill me-2" style={{ fontSize: '1.5rem' }}></i>
          <span className="d-none d-sm-inline">Road Ender</span>
          <span className="d-sm-none">RE</span>
        </Navbar.Brand>

        {/* Zona seleccionada (solo si existe) */}
        {selectedZone && (
          <div className="d-flex align-items-center me-auto ms-3">
            <Badge bg="info" className="small d-none d-md-inline" style={{ fontSize: '0.7rem' }}>
              📍 {selectedZone.length > 20 ? selectedZone.substring(0, 20) + '...' : selectedZone}
            </Badge>
          </div>
        )}

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            
            <NavDropdown 
              title={
                <span>
                  <i className="bi bi-compass me-1"></i>
                  Explorar
                </span>
              } 
              id="explore-dropdown"
              className="fw-semibold"
            >
              <NavDropdown.Item as={Link} href="/#guias">
                <i className="bi bi-people me-2"></i>
                Buscar Guías
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/#zonas">
                <i className="bi bi-geo me-2"></i>
                Explorar Zonas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="/#populares">
                <i className="bi bi-fire me-2"></i>
                Zonas Populares
              </NavDropdown.Item>
            </NavDropdown>

            {user && (
              <NavDropdown 
                title={
                  <span>
                    <i className="bi bi-person me-1"></i>
                    Mi Cuenta
                  </span>
                } 
                id="account-dropdown"
                className="fw-semibold"
              >
                <NavDropdown.Item as={Link} href={getProfileLink()}>
                  <i className="bi bi-person-circle me-2"></i>
                  Mi Perfil
                </NavDropdown.Item>
                
                {user.userType === 'client' && (
                  <>
                    <NavDropdown.Item as={Link} href="/my-bookings">
                      <i className="bi bi-calendar-check me-2"></i>
                      Mis Reservas
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/favorites">
                      <i className="bi bi-heart me-2"></i>
                      Favoritos
                    </NavDropdown.Item>
                  </>
                )}

                {user.userType === 'guide' && (
                  <>
                    <NavDropdown.Item as={Link} href="/guide-dashboard">
                      <i className="bi bi-graph-up me-2"></i>
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/guide-bookings">
                      <i className="bi bi-calendar-event me-2"></i>
                      Mis Tours
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/guide-earnings">
                      <i className="bi bi-cash me-2"></i>
                      Ingresos
                    </NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/settings">
                  <i className="bi bi-gear me-2"></i>
                  Configuración
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {/* Widget de Clima con Geolocalización */}
          {showWeather && (
            <div className="d-none d-lg-flex align-items-center mx-4">
              <WeatherWidget compact={true} showLocation={true} />
            </div>
          )}

          {/* User Actions */}
          <Nav className="align-items-lg-center">
            {isClient ? (
              user ? (
                // Usuario logueado
                <NavDropdown
                  title={
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center me-2"
                        style={{ width: '30px', height: '30px', fontSize: '0.8rem', fontWeight: 'bold' }}
                      >
                        {getUserInitials()}
                      </div>
                      <span className="d-none d-lg-inline fw-semibold">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  }
                  id="user-dropdown"
                  align="end"
                  className="fw-semibold"
                >
                  <NavDropdown.Header>
                    <div className="text-center">
                      <div 
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-2"
                        style={{ width: '40px', height: '40px', fontSize: '1rem', fontWeight: 'bold' }}
                      >
                        {getUserInitials()}
                      </div>
                      <div className="fw-bold">{user.firstName} {user.lastName}</div>
                      <small className="text-muted">{user.email}</small>
                      <br />
                      <Badge 
                        bg={user.userType === 'guide' ? 'success' : 'primary'}
                        className="mt-1"
                      >
                        {user.userType === 'guide' ? '🧭 Guía' : '👤 Cliente'}
                      </Badge>
                    </div>
                  </NavDropdown.Header>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item as={Link} href={getProfileLink()}>
                    <i className="bi bi-person-circle me-2"></i>
                    Ver Perfil
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item as={Link} href="/settings">
                    <i className="bi bi-gear me-2"></i>
                    Configuración
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // Usuario no logueado
                <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
                  <Link href="/login" passHref>
                    <Button 
                      variant="outline-light" 
                      size="sm" 
                      className="fw-semibold"
                      style={{ 
                        borderRadius: '20px',
                        minWidth: '120px'
                      }}
                    >
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Iniciar Sesión
                    </Button>
                  </Link>
                  
                  <Link href="/register" passHref>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      className="fw-semibold text-dark"
                      style={{ 
                        borderRadius: '20px',
                        minWidth: '120px'
                      }}
                    >
                      <i className="bi bi-person-plus me-1"></i>
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )
            ) : (
              // Loading state durante hidratación
              <div className="d-flex gap-2">
                <div 
                  className="placeholder-glow"
                  style={{ width: '120px', height: '31px', borderRadius: '20px' }}
                >
                  <span className="placeholder w-100 h-100"></span>
                </div>
                <div 
                  className="placeholder-glow"
                  style={{ width: '120px', height: '31px', borderRadius: '20px' }}
                >
                  <span className="placeholder w-100 h-100"></span>
                </div>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
