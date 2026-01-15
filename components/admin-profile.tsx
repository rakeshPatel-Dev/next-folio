"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";

const AdminProfile = ({ user }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>

      <Card className="shadow-lg border border-gray-200 dark:border-neutral-700">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name || "Admin"} />
            ) : (
              <AvatarFallback>
                {user?.name ? user.name.charAt(0) : "A"}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user?.name}</CardTitle>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </CardHeader>

        <Separator className="my-4" />

        <CardContent className="flex flex-col gap-4">
          <p>
            Welcome to your admin dashboard. Here you can manage projects, blogs,
            and website content.
          </p>

          <Button
            variant="destructive"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full cursor-pointer md:w-auto"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminProfile
