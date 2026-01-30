
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import AdminProfile from "@/components/admin-profile";
import { ADMINPROFILE_METADATA } from "@/lib/metadata";

export const metadata = ADMINPROFILE_METADATA;

export default async function AdminProfilePage() {
  // Server-side session check
  const session = await getServerSession(authOptions);



  const admins =
    process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) ?? [];

  if (
    !session ||
    !admins.includes(session.user?.email?.toLowerCase() ?? "")
  ) {
    redirect("/admin/login");
  }


  const user = session.user;

  return (
    <AdminProfile user={user} />
  );
}
