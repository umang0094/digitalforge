"use client";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const VerifyEmail = ({ token }: { token: string }) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl"> There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          this token is not valid or might be expired. Please try again
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src={"/hippo-email-sent.png"} fill alt="email sent" />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-1 text-sm">
          Thank you for verifying your email
        </p>
        <Link
          href={"/sign-in"}
          className={cn(
            buttonVariants({
              className: "mt-4",
            })
          )}
        >
          Sign in{" "}
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-zing-400" />
        <h3 className="font-semibold text-xl">Verifying....</h3>
        <p className="text-muted-foreground text-sm">this will not take long</p>
      </div>
    );
  }
};

export default VerifyEmail;
