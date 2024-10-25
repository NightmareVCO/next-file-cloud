"use client";

import { useFilesManager } from "@/ui/components/_hooks/useFilesManager";
import FileEmptyContainer from "@/ui/components/fileEmpty/FileEmptyContainer";
import FilesBrowser from "@/ui/components/filesBrowser/FilesBrowser";
import FilesRenderer from "@/ui/components/filesRenderer/FilesRenderer";
import Loading from "@/ui/components/loading/Loading";

export default function FavoritesFiles() {
  const {
    orgId,
    createFile,
    files,
    favoritesFiles,
    isLoading,
    query,
    setQuery,
  } = useFilesManager({ favorites: true });

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && !files && (
        <FileEmptyContainer title="You have no files, upload one now!" />
      )}

      {!isLoading && files && (
        <div className="flex flex-col gap-y-8">
          <FilesBrowser
            title="Favorites"
            query={query}
            setQuery={setQuery}
            createFile={createFile}
            orgId={orgId!}
          />

          {files.length === 0 && (
            <FileEmptyContainer title="No file matched your query" />
          )}

          {files.length > 0 && (
            <FilesRenderer files={files} favoriteFiles={favoritesFiles ?? []} />
          )}
        </div>
      )}
    </>
  );
}
