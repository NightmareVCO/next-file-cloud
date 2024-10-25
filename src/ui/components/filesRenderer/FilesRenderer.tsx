import { Doc } from "@convex/_generated/dataModel";

import FileCard from "../fileCard/FileCard";

export default function FilesRenderer({
  files,
  favoriteFiles,
}: {
  files: Doc<"files">[];
  favoriteFiles: Doc<"favorites">[];
}) {
  const isFavorite = (file: Doc<"files">) =>
    favoriteFiles.some((favoriteFile) => favoriteFile.fileId === file._id);

  return (
    <section className="grid grid-cols-3 gap-x-10">
      {files?.map((file) => (
        <FileCard key={file._id} file={file} isFavorite={isFavorite(file)} />
      ))}
    </section>
  );
}
