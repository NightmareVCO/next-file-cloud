"use client";

import { ClerkLoading, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import FileUploadModal from "@components/fileUploadModal/FileUploadModal";
import { Button, Spinner } from "@nextui-org/react";
import Image from "next/image";

import { useFilesManager } from "../_hooks/useFilesManager";

export default function FileEmptyContainer({ title }: { title: string }) {
  const { createFile, orgId } = useFilesManager({});

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-8">
      <Image
        className="mt-8"
        src="/empty.svg"
        alt="Empty directory image illustration"
        width={550}
        height={550}
        priority
      />
      <p className="text-2xl font-medium text-primary-400">{title}</p>

      <SignedIn>
        <FileUploadModal onSubmitFunction={createFile} orgId={orgId!} />
      </SignedIn>

      <ClerkLoading>
        <Spinner size="lg" color="secondary" />
      </ClerkLoading>

      <SignedOut>
        <SignInButton>
          <Button variant="shadow" color="secondary">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
