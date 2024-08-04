"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import FileUploadModal from "@components/fileUploadModal/FileUploadModal";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

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
    <section className="container min-h-screen pt-12 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Files</h1>
        <FileUploadModal onSubmitFunction={createFile} orgId={orgId!} />
      </div>

      <section className="grid grid-cols-4 mt-8 gap-x-10">
        {files?.map((file) => <FileCard key={file._id} file={file} />)}
      </section>
    </section>
  );
}
