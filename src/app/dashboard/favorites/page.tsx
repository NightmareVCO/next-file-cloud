"use client";

import FileUploadModal from "@components/fileUploadModal/FileUploadModal";

import { useFilesManager } from "@/ui/components/_hooks/useFilesManager";
import FileEmptyContainer from "@/ui/components/fileEmpty/FileEmptyContainer";
import FilesRenderer from "@/ui/components/filesRenderer/FilesRenderer";
import Loading from "@/ui/components/loading/Loading";
import { SearchBar } from "@/ui/search-bar";

export default function FavoritesFiles() {
  const { orgId, createFile, files, isLoading, query, setQuery } =
    useFilesManager({ favorites: true });

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && !files && (
        <FileEmptyContainer title="You have no files, upload one now!" />
      )}

      {!isLoading && files && (
        <div className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Your Files</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <FileUploadModal onSubmitFunction={createFile} orgId={orgId!} />
          </div>

          {files.length === 0 && (
            <FileEmptyContainer title="No file matched your query" />
          )}

          {files.length > 0 && <FilesRenderer files={files} />}
        </div>
      )}
    </>
  );
}
