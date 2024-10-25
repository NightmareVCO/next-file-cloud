import { Doc } from "@convex/_generated/dataModel";

import FileCard from "../fileCard/FileCard";

export default function FilesRenderer({ files }: { files: Doc<"files">[] }) {
  return (
    <section className="grid grid-cols-3 gap-x-10">
      {files?.map((file) => <FileCard key={file._id} file={file} />)}
    </section>
  );
}
