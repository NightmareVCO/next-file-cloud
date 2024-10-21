"use client";

import {
  // ClerkLoaded,
  ClerkLoading,
  // OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  // SignOutButton,
  // UserButton,
} from "@clerk/nextjs";
import { useOrganization, useUser } from "@clerk/nextjs";
import FileUploadModal from "@components/fileUploadModal/FileUploadModal";
import { api } from "@convex/_generated/api";
import { Button, Spinner } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

import FileCard from "@/ui/components/fileCard/FileCard";

export function useHome() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return { orgId, createFile, files };
}

export default function Home() {
  const { orgId, createFile, files } = useHome();

  return (
    <section className="container h-full mx-auto">
      {/* {files === undefined && (
        <div className="flex flex-col items-center w-full mt-24">
          <Spinner size="lg" color="secondary" label="Loading..." />
        </div>
      )} */}

      {files && files?.length > 0 && (
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-4xl font-bold">Your Files</h1>
          <FileUploadModal onSubmitFunction={createFile} orgId={orgId!} />
        </div>
      )}

      {(files === undefined || files.length === 0) && (
        <div className="flex flex-col items-center justify-center w-full gap-y-8">
          <Image
            className="mt-8"
            src="empty.svg"
            width={650}
            height={650}
            alt="Empty directory image illustration"
          />
          <p className="text-2xl font-medium text-primary-400">
            {"You have no files, upload one now!"}
          </p>

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
      )}

      <section className="grid grid-cols-4 mt-8 gap-x-10">
        {files?.map((file) => <FileCard key={file._id} file={file} />)}
      </section>
    </section>
  );
}
