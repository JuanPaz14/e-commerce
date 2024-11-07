 // Asegúrate de que este archivo exporta la configuración de NextAuth
import { redirect } from 'next/navigation';
import { auth } from '../../../auth';

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  // Obtén la sesión usando getServerSession
  const session = await auth();

  // Si el usuario ya está autenticado, redirige
  if (session?.user) {
    redirect('/');
  }

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        {children}
      </div>
    </main>
  );
}
