import { Doc } from "@convex/_generated/dataModel";

import FileCard from "../fileCard/FileCard";

export default function FilesRenderer({
  files,
  favoriteFiles,
  orgId,
}: {
  files: Doc<"files">[];
  favoriteFiles: Doc<"favorites">[];
  orgId: string;
}) {
  const isFavorite = (file: Doc<"files">) =>
    favoriteFiles.some((favoriteFile) => favoriteFile.fileId === file._id);

  return (
    <section className="grid grid-cols-3 gap-10 pb-4">
      {files?.map((file) => (
        <FileCard
          key={file._id}
          file={file}
          isFavorite={isFavorite(file)}
          orgId={orgId}
        />
      ))}
    </section>
  );
}
