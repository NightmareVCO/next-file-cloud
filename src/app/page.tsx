"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

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
    <section className="container min-h-screen">
      {files?.map((file) => <div key={file._id}>{file.name}</div>)}

      <Button
        onPress={() => {
          if (!orgId) return;

          createFile({
            name: "My File",
            orgId: orgId,
          });
        }}
      >
        Click Me
      </Button>
    </section>
  );
}
