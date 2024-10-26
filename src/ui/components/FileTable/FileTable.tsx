"use client";

import { Doc, Id } from "@convex/_generated/dataModel";
import { Icon } from "@iconify/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { formatRelative } from "date-fns";
import React, { Key } from "react";

import FileCardActions from "../fileCardActions/FileCardActions";

export const columns = [
  { name: "Name", uid: "nameId", sortDirection: "ascending" },
  { name: "Type", uid: "typeId" },
  { name: "User", uid: "userId" },
  { name: "Uploaded On", uid: "dateId" },
  { name: "Actions", uid: "actionsId" },
];

export type ColumnsKey =
  | "nameId"
  | "typeId"
  | "userId"
  | "actionsId"
  | "dateId";

export default function FilesTable({
  files,
  users,
  favoritesFiles,
}: {
  files: Doc<"files">[];
  users: { id: Id<"users">; name: string; image: string }[];
  favoritesFiles: Doc<"favorites">[];
}) {
  const renderCell = ({
    file,
    user,
    columnKey,
  }: {
    file: Doc<"files">;
    user: {
      name: string;
      image: string;
    };
    columnKey: Key;
  }) => {
    const keys = columnKey as ColumnsKey;

    switch (keys) {
      case "nameId": {
        return (
          <div className="flex items-center gap-1">
            <Icon
              className="h-[16px] w-[16px] text-default-300"
              icon="solar:file"
            />
            <p className="capitalize text-nowrap text-small text-default-foreground">
              {file.name}
            </p>
          </div>
        );
      }
      case "typeId": {
        return (
          <div className="flex items-center gap-1">
            <Icon
              className="h-[16px] w-[16px] text-default-300"
              icon="solar:file"
            />
            <p className="capitalize text-nowrap text-small text-default-foreground">
              {file.type}
            </p>
          </div>
        );
      }
      case "userId": {
        return (
          <User
            avatarProps={{ src: user.image }}
            classNames={{
              name: "text-default-foreground",
              description: "text-default-500",
            }}
            name={user.name}
          />
        );
      }
      case "dateId": {
        return (
          <div className="flex items-center gap-1">
            <Icon
              className="h-[16px] w-[16px] text-default-300"
              icon="solar:calendar-minimalistic-linear"
            />
            <p className="capitalize text-nowrap text-small text-default-foreground">
              {formatRelative(new Date(file._creationTime), new Date())}
            </p>
          </div>
        );
      }
      case "actionsId": {
        const isFavorite = (file: Doc<"files">) =>
          favoritesFiles.some(
            (favoriteFile) => favoriteFile.fileId === file._id,
          );
        return (
          <FileCardActions
            file={file}
            isFavorite={isFavorite(file)}
            orgId={file.orgId}
          />
        );
      }
      default: {
        return;
      }
    }
  };

  return (
    <div className="w-full">
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        classNames={{
          td: "before:bg-transparent",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
              className={cn([
                column.uid === "actions"
                  ? "flex items-center justify-end px-[20px]"
                  : "",
              ])}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Files uploaded found"} items={files}>
          {(file) => (
            <TableRow key={file._id}>
              {(columnKey) => {
                const user = users.find((user) => user.id === file.userId);
                const userProfile = {
                  name: user?.name ?? "Loading...",
                  image: user?.image ?? "",
                };
                return (
                  <TableCell>
                    {renderCell({ file, user: userProfile, columnKey })}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
