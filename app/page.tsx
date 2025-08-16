import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirige al listado de zonas existente para evitar 404 mientras
  // mantenemos la estructura actual en `src/app`.
  redirect('/zones')
}
