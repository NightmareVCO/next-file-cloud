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
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold">{title}</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <FileUploadModal onSubmitFunction={createFile} orgId={orgId!} />
    </div>
  );
}
