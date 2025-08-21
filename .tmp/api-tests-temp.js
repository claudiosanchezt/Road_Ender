// 🧪 Tourist Guides API - Test Suite Completo
// Pruebas automatizadas para todos los endpoints

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuración base
const API_BASE_URL = 'http://127.0.0.1:4000/api';
const TEST_RESULTS_FILE = path.join(__dirname, 'test-results.json');

// Variables globales para tokens y datos de prueba
let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4YzMyODhlLTNiNGUtNGViYy1iM2JkLWIwOTkyN2RmZTNkNyIsImVtYWlsIjoidGVzdC1jbGllbnRAZWplbXBsby5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzU1NDA0OTY3LCJleHAiOjE3NTYwMDk3Njd9.46ZotsQJbpv4Woh5nvvLg8y9EWmQq4Unnyr3QkyvFss';
let refreshToken = '';
let userId = '';
let guideId = '';
let bookingId = '';
let zoneId = '';

// Datos de prueba
const testData = {
  client: {
    email: 'test-client@ejemplo.com',
    password: 'TestPassword123!',
    firstName: 'Ana',
    lastName: 'Torres',
    phone: '+56987654321',
    userType: 'client'
  },
  guide: {
    email: 'test-guide@ejemplo.com',
    password: 'TestPassword123!',
    firstName: 'Carlos',
    lastName: 'González',
    phone: '+56912345678',
    userType: 'guide'
  },
  admin: {
    email: 'admin@ejemplo.com',
    password: 'AdminPassword123!',
    firstName: 'Admin',
    lastName: 'Sistema',
    phone: '+56900000000',
    userType: 'admin'
  }
};

// Configuración de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Utilidades de testing
class TestSuite {
  constructor() {
    this.results = {
      totalTests: 0,
      passed: 0,
      failed: 0,
      errors: [],
      startTime: new Date(),
      endTime: null,
      categories: {}
    };
  }

  async runTest(category, testName, testFunction) {
    console.log(`🧪 Testing ${category}: ${testName}`);
    this.results.totalTests++;
    
    if (!this.results.categories[category]) {
      this.results.categories[category] = { passed: 0, failed: 0, tests: [] };
    }

    try {
      await testFunction();
      this.results.passed++;
      this.results.categories[category].passed++;
      this.results.categories[category].tests.push({
        name: testName,
        status: 'PASSED',
        timestamp: new Date()
      });
      console.log(`✅ ${testName} - PASSED`);
    } catch (error) {
      this.results.failed++;
      this.results.categories[category].failed++;
      this.results.categories[category].tests.push({
        name: testName,
        status: 'FAILED',
        error: error.message,
        timestamp: new Date()
      });
      this.results.errors.push({
        category,
        test: testName,
        error: error.message,
        stack: error.stack
      });
      console.log(`❌ ${testName} - FAILED: ${error.message}`);
    }
  }

  saveResults() {
    this.results.endTime = new Date();
    this.results.duration = this.results.endTime - this.results.startTime;
    
    fs.writeFileSync(TEST_RESULTS_FILE, JSON.stringify(this.results, null, 2));
    console.log(`\n📊 Resultados guardados en: ${TEST_RESULTS_FILE}`);
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 RESUMEN DE PRUEBAS');
    console.log('='.repeat(60));
    console.log(`Total de pruebas: ${this.results.totalTests}`);
    console.log(`✅ Pasaron: ${this.results.passed}`);
    console.log(`❌ Fallaron: ${this.results.failed}`);
    console.log(`📊 Porcentaje de éxito: ${((this.results.passed / this.results.totalTests) * 100).toFixed(2)}%`);
    console.log(`⏱️ Duración: ${(this.results.duration / 1000).toFixed(2)}s`);
    
    console.log('\n📂 Por categoría:');
    Object.entries(this.results.categories).forEach(([category, stats]) => {
      console.log(`  ${category}: ${stats.passed}/${stats.passed + stats.failed} (${((stats.passed / (stats.passed + stats.failed)) * 100).toFixed(1)}%)`);
    });
    
    if (this.results.errors.length > 0) {
      console.log('\n🚨 ERRORES:');
      this.results.errors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.category}] ${error.test}: ${error.error}`);
      });
    }
  }
}

// Funciones de testing específicas

// 1. Tests de Sistema
async function testSystemHealth() {
  const response = await api.get('/health');
  if (response.status !== 200) throw new Error('Health check failed');
  if (!response.data.success) throw new Error('System unhealthy');
}

async function testAPIInfo() {
  const response = await api.get('/');
  if (response.status !== 200) throw new Error('API info endpoint failed');
}

// 2. Tests de Autenticación
async function testUserRegistration() {
  const response = await api.post('/auth/register', testData.client);
  if (response.status !== 201) throw new Error('Registration failed');
  if (!response.data.data.tokens.accessToken) throw new Error('No access token received');
  
  accessToken = response.data.data.tokens.accessToken;
  refreshToken = response.data.data.tokens.refreshToken;
  userId = response.data.data.user.id;
}

async function testUserLogin() {
  const response = await api.post('/auth/login', {
    email: testData.client.email,
    password: testData.client.password
  });
  if (response.status !== 200) throw new Error('Login failed');
  if (!response.data.data.tokens.accessToken) throw new Error('No access token received');
  
  accessToken = response.data.data.tokens.accessToken;
  // also capture refreshToken if present so refresh test can run
  refreshToken = response.data.data.tokens.refreshToken || refreshToken;
}

async function testTokenRefresh() {
  const response = await api.post('/auth/refresh', {
    refreshToken: refreshToken
  });
  if (response.status !== 200) throw new Error('Token refresh failed');
  if (!response.data.data.accessToken) throw new Error('No new access token received');
  
  accessToken = response.data.data.accessToken;
}

async function testGetProfile() {
  const response = await api.get('/auth/profile');
  if (response.status !== 200) throw new Error('Get profile failed');
  if (!response.data.data.user) throw new Error('No user data received');
}

async function testUpdateProfile() {
  const response = await api.put('/auth/profile', {
    firstName: 'Ana Updated',
    phone: '+56987654322'
  });
  if (response.status !== 200) throw new Error('Update profile failed');
}

// 3. Tests de Guías
async function testGuideRegistration() {
  const response = await api.post('/auth/register', testData.guide);
  if (response.status !== 201) throw new Error('Guide registration failed');
  
  guideId = response.data.data.user.id;
}

async function testSearchGuides() {
  const response = await api.get('/guides?specialty=Montañismo&page=1&limit=10');
  if (response.status !== 200) throw new Error('Search guides failed');
  if (!Array.isArray(response.data.data.guides)) throw new Error('Invalid guides data format');
}

async function testGetGuideDetails() {
  // Asumiendo que existe un guía con ID 1
  try {
    const response = await api.get('/guides/1');
    if (response.status !== 200 && response.status !== 404) {
      throw new Error('Get guide details failed');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Es esperado si no hay guías en la DB
      console.log('⚠️ No guide found with ID 1 (expected in empty DB)');
    } else {
      throw error;
    }
  }
}

// 4. Tests de Zonas
async function testGetZones() {
  const response = await api.get('/zones');
  if (response.status !== 200) throw new Error('Get zones failed');
  if (!Array.isArray(response.data.data.zones)) throw new Error('Invalid zones data format');
}

async function testGetZoneDetails() {
  try {
    const response = await api.get('/zones/1');
    if (response.status !== 200 && response.status !== 404) {
      throw new Error('Get zone details failed');
    }
    if (response.status === 200) {
      zoneId = response.data.data.id;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('⚠️ No zone found with ID 1 (expected in empty DB)');
    } else {
      throw error;
    }
  }
}

// 5. Tests de Reservas
async function testCreateBookingQuote() {
  const quoteData = {
    guideId: 1,
    tourDate: '2024-08-15',
    duration: 4,
    groupSize: 3,
    specialtyId: 1
  };
  
  try {
    const response = await api.post('/bookings/quote', quoteData);
    if (response.status !== 200 && response.status !== 404) {
      throw new Error('Create booking quote failed');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('⚠️ Quote calculation failed - guide not found (expected in empty DB)');
    } else {
      throw error;
    }
  }
}

async function testCreateBooking() {
  const bookingData = {
    guideId: 1,
    zoneId: 1,
    tourDate: '2024-08-15',
    startTime: '09:00',
    duration: 4,
    groupSize: 3,
    meetingPoint: 'Entrance Torres del Paine',
    specialRequests: 'Test booking'
  };
  
  try {
    const response = await api.post('/bookings', bookingData);
    if (response.status !== 201 && response.status !== 404) {
      throw new Error('Create booking failed');
    }
    if (response.status === 201) {
      bookingId = response.data.data.id;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('⚠️ Booking creation failed - guide/zone not found (expected in empty DB)');
    } else {
      throw error;
    }
  }
}

async function testGetMyBookings() {
  const response = await api.get('/bookings/my');
  if (response.status !== 200) throw new Error('Get my bookings failed');
  if (!Array.isArray(response.data.data.bookings)) throw new Error('Invalid bookings data format');
}

// 6. Tests de Favoritos
async function testGetFavoriteGuides() {
  const response = await api.get('/favorites/guides');
  if (response.status !== 200) throw new Error('Get favorite guides failed');
  if (!Array.isArray(response.data.data.favoriteGuides)) throw new Error('Invalid favorite guides data format');
}

async function testGetFavoriteZones() {
  const response = await api.get('/favorites/zones');
  if (response.status !== 200) throw new Error('Get favorite zones failed');
  if (!Array.isArray(response.data.data.favoriteZones)) throw new Error('Invalid favorite zones data format');
}

// 7. Tests de Pagos
async function testGetPaymentMethods() {
  const response = await api.get('/payments/methods');
  if (response.status !== 200) throw new Error('Get payment methods failed');
  if (!Array.isArray(response.data.data.methods)) throw new Error('Invalid payment methods data format');
}

// 8. Tests de Seguridad
async function testUnauthorizedAccess() {
  // Guardar token actual
  const currentToken = accessToken;
  accessToken = '';
  
  try {
    await api.get('/auth/profile');
    throw new Error('Unauthorized access should fail');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Comportamiento esperado
    } else {
      throw new Error('Unexpected error for unauthorized access');
    }
  }
  
  // Restaurar token
  accessToken = currentToken;
}

async function testInvalidToken() {
  // Guardar token actual
  const currentToken = accessToken;
  accessToken = 'invalid-token-12345';
  
  try {
    await api.get('/auth/profile');
    throw new Error('Invalid token access should fail');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Comportamiento esperado
    } else {
      throw new Error('Unexpected error for invalid token');
    }
  }
  
  // Restaurar token
  accessToken = currentToken;
}

// 9. Tests de Rate Limiting
async function testRateLimit() {
  const requests = [];
  
  // Intentar hacer muchas requests rápidas
  for (let i = 0; i < 25; i++) {
    requests.push(api.get('/health'));
  }
  
  try {
    await Promise.all(requests);
    console.log('⚠️ Rate limiting might not be active (all requests succeeded)');
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Rate limiting funcionando
    } else {
      throw new Error('Unexpected error during rate limit test');
    }
  }
}

// Función principal de testing
async function runAllTests() {
  console.log('🚀 Iniciando Test Suite de Tourist Guides API');
  console.log('='.repeat(60));
  
  const testSuite = new TestSuite();
  
  try {
    // 1. Tests de Sistema
    await testSuite.runTest('Sistema', 'Health Check', testSystemHealth);
    await testSuite.runTest('Sistema', 'API Info', testAPIInfo);
    
    // 2. Tests de Autenticación
    // Primero intentamos login con el usuario seed; si falla intentamos registro como fallback.
    await testSuite.runTest('Autenticación', 'Login de Usuario (seed)', async () => {
      try {
        await testUserLogin();
      } catch (err) {
        console.log('Login seed failed, attempting registration as fallback');
        await testUserRegistration();
      }
    });
    await testSuite.runTest('Autenticación', 'Refresh Token', testTokenRefresh);
    await testSuite.runTest('Autenticación', 'Obtener Perfil', testGetProfile);
    await testSuite.runTest('Autenticación', 'Actualizar Perfil', testUpdateProfile);
    
    // 3. Tests de Guías
    await testSuite.runTest('Guías', 'Registro de Guía', testGuideRegistration);
    await testSuite.runTest('Guías', 'Búsqueda de Guías', testSearchGuides);
    await testSuite.runTest('Guías', 'Detalles de Guía', testGetGuideDetails);
    
    // 4. Tests de Zonas
    await testSuite.runTest('Zonas', 'Obtener Zonas', testGetZones);
    await testSuite.runTest('Zonas', 'Detalles de Zona', testGetZoneDetails);
    
    // 5. Tests de Reservas
    await testSuite.runTest('Reservas', 'Crear Cotización', testCreateBookingQuote);
    await testSuite.runTest('Reservas', 'Crear Reserva', testCreateBooking);
    await testSuite.runTest('Reservas', 'Obtener Mis Reservas', testGetMyBookings);
    
    // 6. Tests de Favoritos
    await testSuite.runTest('Favoritos', 'Obtener Guías Favoritos', testGetFavoriteGuides);
    await testSuite.runTest('Favoritos', 'Obtener Zonas Favoritas', testGetFavoriteZones);
    
    // 7. Tests de Pagos
    await testSuite.runTest('Pagos', 'Obtener Métodos de Pago', testGetPaymentMethods);
    
    // 8. Tests de Seguridad
    await testSuite.runTest('Seguridad', 'Acceso No Autorizado', testUnauthorizedAccess);
    await testSuite.runTest('Seguridad', 'Token Inválido', testInvalidToken);
    
    // 9. Tests de Rate Limiting
    await testSuite.runTest('Rate Limiting', 'Límite de Requests', testRateLimit);
    
  } catch (error) {
    console.error('🚨 Error fatal durante las pruebas:', error.message);
  }
  
  testSuite.printSummary();
  testSuite.saveResults();
  
  return testSuite.results;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runAllTests().then((results) => {
    process.exit(results.failed > 0 ? 1 : 0);
  });
}

module.exports = {
  runAllTests,
  TestSuite,
  testData
};
