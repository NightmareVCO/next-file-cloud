import { Doc, Id } from "@convex/_generated/dataModel";
import { Tab, Tabs } from "@nextui-org/react";
import { GridIcon, TableIcon } from "lucide-react";

import FilesRenderer from "../filesRenderer/FilesRenderer";
import FilesTable from "../FileTable/FileTable";

export default function FilesTabs({
  files,
  favoritesFiles,
  orgId,
  users,
}: {
  files: Doc<"files">[];
  favoritesFiles: Doc<"favorites">[];
  orgId: string;
  users: { id: Id<"users">; name: string; image: string }[];
}) {
  return (
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
  );
}
