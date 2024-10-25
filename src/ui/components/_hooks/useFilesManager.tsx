import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export function useFilesManager({
  typeOfFiles,
  favorites,
}: {
  typeOfFiles?: string;
  favorites?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState<string>("");
  console.log("typeOfFiles", typeOfFiles);

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const createFile = useMutation(api.files.createFile);
  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites } : "skip",
  );
  const isLoading = files === undefined;

  return { orgId, isLoading, createFile, files, query, setQuery };
}
