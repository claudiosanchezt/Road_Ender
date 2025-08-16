import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: true, message: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Aquí normalmente conectarías con tu base de datos
    // Por ahora, usaremos cuentas demo para testing
    const demoAccounts = {
      'cliente@demo.com': {
        id: '1',
        email: 'cliente@demo.com',
        firstName: 'Juan',
        lastName: 'Pérez',
        userType: 'client',
        password: 'demo123'
      },
      'guia@demo.com': {
        id: '2',
        email: 'guia@demo.com',
        firstName: 'María',
        lastName: 'González',
        userType: 'guide',
        password: 'demo123'
      },
      'ana@demo.com': {
        id: '3',
        email: 'ana@demo.com',
        firstName: 'Ana',
        lastName: 'Martínez',
        userType: 'client',
        password: 'demo123'
      }
    }

    const user = demoAccounts[email.toLowerCase() as keyof typeof demoAccounts]

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: true, message: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Generar token (en producción usarías JWT real)
    const token = `demo_token_${user.id}_${Date.now()}`

    // Remover password de la respuesta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: true, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
