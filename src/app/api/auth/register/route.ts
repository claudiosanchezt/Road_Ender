import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, userType } = await request.json()

    // Validaciones básicas
    if (!firstName || !lastName || !email || !password || !userType) {
      return NextResponse.json(
        { error: true, message: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      )
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: true, message: 'Email inválido' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: true, message: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    if (!['client', 'guide'].includes(userType)) {
      return NextResponse.json(
        { error: true, message: 'Tipo de usuario inválido' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe (simulación)
    const existingEmails = ['cliente@demo.com', 'guia@demo.com']
    if (existingEmails.includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: true, message: 'Este email ya está registrado' },
        { status: 409 }
      )
    }

    // Crear nuevo usuario (simulación)
    const newUser = {
      id: `user_${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      userType,
      createdAt: new Date().toISOString(),
      isActive: true
    }

    // Generar token (en producción usarías JWT real)
    const token = `demo_token_${newUser.id}_${Date.now()}`

    // En una aplicación real, aquí guardarías en la base de datos
    console.log('Nuevo usuario registrado:', newUser)

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: newUser
    }, { status: 201 })

  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: true, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
