import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export function useFilesManager({
  favorites,
  deletes,
}: {
  favorites?: boolean;
  deletes?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<Doc<"files">["type"] & "all">("all");

  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favoritesFiles = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip",
  );

  const createFile = useMutation(api.files.createFile);
  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          query,
          favorites,
          deletes,
          type: type === "all" ? undefined : type,
        }
      : "skip",
  );

  const userIds = files?.map((file) => file.userId) ?? [];

  const allUsersFromFiles = useQuery(api.users.getProfiles, {
    userIds,
  });

  const allProfilesFromFiles = allUsersFromFiles?.map((user) => ({
    id: user.id,
    name: user.name ?? "Unknown",
    image: user.image ?? "Unknown",
  }));

  const isLoading = files === undefined && allProfilesFromFiles === undefined;

  return {
    orgId,
    isLoading,
    favoritesFiles,
    createFile,
    files,
    query,
    users: allProfilesFromFiles,
    setQuery,
    type,
    setType,
  };
}
