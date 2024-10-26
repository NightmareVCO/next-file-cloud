import { Doc, Id } from "@convex/_generated/dataModel";
import { ReactMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { Dispatch, SetStateAction } from "react";

export type FileBrowserProperties = {
  title: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  createFile: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        orgId: string;
        name: string;
        type: Doc<"files">["type"];
        fileId: Id<"_storage">;
      },
      null,
      string | undefined
    >
  >;
  orgId: string;
};
