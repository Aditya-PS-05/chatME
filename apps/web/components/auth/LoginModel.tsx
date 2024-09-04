import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function LoginModal() {
  const handleGoogleLogin = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting start</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to QuickChat</DialogTitle>
          <DialogDescription>
            QuickChat makes it effortless to create secure chat links and start
            conversations in seconds.
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleGoogleLogin}>
          <Image
            src="/images/google.png"
            className=" mr-4"
            width={25}
            height={25}
            alt="google"
          />
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
