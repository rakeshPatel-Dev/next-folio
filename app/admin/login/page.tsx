import { GoogleSignInButton } from "./components/GoogleSigninButton"
import { LOGINPAGE_METADATA } from "@/lib/metadata"

export const metadata = LOGINPAGE_METADATA;

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen px-6 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Admin Access</h1>
        <p className="text-muted-foreground"> Verify your gmail to get the access of admin panel. </p>

        <GoogleSignInButton />
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 my-4">
          <p className="text-sm text-yellow-800"><strong>Caution:</strong> This is an admin-only area. Unauthorized login attempts are not permitted.</p>
        </div>
      </div>
    </div>

  )
}
