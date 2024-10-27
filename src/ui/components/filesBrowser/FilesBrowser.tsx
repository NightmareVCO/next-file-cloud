import { Authenticated } from "convex/react";

import { SearchBar } from "@/ui/search-bar";

import FileUploadModal from "../fileUploadModal/FileUploadModal";
import { FileBrowserProperties } from "./FileBrowserProperties";

export default function FilesBrowser({
  title,
  query,
  setQuery,
  createFile,
  orgId,
}: FileBrowserProperties) {
  return (
    <div className="flex flex-col items-center justify-between gap-y-4 lg:flex-row">
      <h1 className="text-4xl font-bold">{title}</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <Authenticated>
        <FileUploadModal onSubmitFunction={createFile} orgId={orgId!} />
      </Authenticated>
    </div>
  );
}
