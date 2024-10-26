"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { GridIcon, TableIcon } from "lucide-react";

import { useFilesManager } from "@/ui/components/_hooks/useFilesManager";
import FileEmptyContainer from "@/ui/components/fileEmpty/FileEmptyContainer";
import FilesBrowser from "@/ui/components/filesBrowser/FilesBrowser";
import FilesRenderer from "@/ui/components/filesRenderer/FilesRenderer";
import Loading from "@/ui/components/loading/Loading";

import FilesTable from "../FileTable/FileTable";

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
  } = useFilesManager({ favorites: favorites, deletes: deletes });

  return (
    <>
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

          {files.length === 0 && (
            <FileEmptyContainer title="No file matched your query" />
          )}

          {files.length > 0 && (
            <Tabs>
              <Tab
                key="grid"
                title={
                  <div className="flex flex-row gap-x-2 items-center justify-center">
                    <GridIcon size={24} />
                    <p>Grid</p>
                  </div>
                }
              >
                <FilesRenderer
                  files={files}
                  favoriteFiles={favoritesFiles ?? []}
                  orgId={orgId!}
                />
              </Tab>
              <Tab
                key="table"
                title={
                  <div className="flex flex-row gap-x-2 items-center justify-center">
                    <TableIcon size={24} />
                    <p>Table</p>
                  </div>
                }
              >
                <FilesTable
                  files={files}
                  users={users ?? []}
                  favoritesFiles={favoritesFiles ?? []}
                />
              </Tab>
            </Tabs>
          )}
        </div>
      )}
    </>
  );
}
