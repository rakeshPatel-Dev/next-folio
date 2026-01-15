
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import AdminProfile from "@/components/admin-profile";



export default async function AdminProfilePage() {
  // Server-side session check
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== process.env.ADMIN_EMAILS) {
    redirect("/admin/login");
  }

  const user = session.user;

  return (
    <AdminProfile user={user} />
  );
}
