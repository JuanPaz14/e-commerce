
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function ProfilePage() {

  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" />

      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3 className="text-3xl mb-10">{ session.user.role }</h3>
    </div>
  );
}
