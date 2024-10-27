"use client";

import { useFilesManager } from "@/ui/components/_hooks/useFilesManager";
import FileEmptyContainer from "@/ui/components/fileEmpty/FileEmptyContainer";
import FilesBrowser from "@/ui/components/filesBrowser/FilesBrowser";
import Loading from "@/ui/components/loading/Loading";

import FilesTabs from "../filesTabs/FilesTabs";
import FileTypeSelector from "../fileTypeSelector/FileTypeSelector";

export default function FilesContainer({
  favorites,
  deletes,
}: {
  favorites: boolean;
  deletes: boolean;
}) {
  const {
    orgId,
    createFile,
    files,
    favoritesFiles,
    isLoading,
    users,
    query,
    setQuery,
    type,
    setType,
  } = useFilesManager({ favorites: favorites, deletes: deletes });

  return (
    <div className="p-4 lg:p-4">
      {isLoading && <Loading />}

      {!isLoading && !files && (
        <FileEmptyContainer title="You have no files, upload one now!" />
      )}

      {!isLoading && files && (
        <div className="flex flex-col gap-y-8">
          <FilesBrowser
            title="Your Files"
            query={query}
            setQuery={setQuery}
            createFile={createFile}
            orgId={orgId!}
          />

          <FileTypeSelector type={type} setType={setType} />

          {files.length === 0 && (
            <FileEmptyContainer title="No file matched your query" />
          )}

          {files.length > 0 && (
            <FilesTabs
              files={files}
              favoritesFiles={favoritesFiles ?? []}
              orgId={orgId!}
              users={users ?? []}
            />
          )}
        </div>
      )}
    </div>
  );
}
