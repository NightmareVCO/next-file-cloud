/* eslint-disable prettier/prettier */
import { useUser } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { ActionsDotsIcon } from "@icons/ActionsDotsIcon";
import { DeleteDocumentIcon } from "@icons/DeleteDocumentIcon";
import { FavoriteDocumentIcon } from "@icons/FavoriteDocumentIcon";
import {
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { UndoIcon } from "lucide-react";
import React from "react";

import { DownloadDocumentIcon } from "@/ui/icons/DownloadDocumentIcon";

import FileDeleteModal from "../fileDeleteModal/FileDeleteModal";

export default function FileCardActions({
  file,
  isFavorite,
  orgId,
}: {
  file: Doc<"files"> & { url?: string | null };
  isFavorite: boolean;
  orgId: string;
}) {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const toogleFavorite = useMutation(api.files.toggleFavorite);
  const restoreFile = useMutation(api.files.restoreFile);
  const me = useQuery(api.users.getMe);
  const user = useUser();
  const isAdmin =
    user.user?.organizationMemberships.some(
      (membership) =>
        membership.organization.id === orgId && membership.role === "org:admin",
    ) || file.userId === me?._id ;

  console.log("isAdmin", isAdmin);
  console.log("file.userId", file.userId);
  console.log("user.user?.id", user.user?.id);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            color="primary"
            isIconOnly
            aria-label="actions"
          >
            <ActionsDotsIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection title="Actions Zone" showDivider>
            <DropdownItem
              key="download"
              className="text-primary"
              color="primary"
              description="Open the file"
              startContent={
                <DownloadDocumentIcon
                  className={cn(iconClasses, "text-primary")}
                />
              }
              onPress={() => {
                window.open(file.url!, "_blank");
              }}
            >
              Open
            </DropdownItem>
            <DropdownItem
              key="favorite"
              className="text-primary"
              color="primary"
              description="Add to favorites files"
              startContent={
                isFavorite ? (
                  <FavoriteDocumentIcon
                    className={cn(iconClasses, "fill-primary stroke-primary")}
                  />
                ) : (
                  <FavoriteDocumentIcon
                    className={cn(iconClasses, "text-primary")}
                  />
                )
              }
              onPress={() => toogleFavorite({ fileId: file._id })}
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger Zone">
            {file.shouldDelete ? (
              <DropdownItem
                key="restore"
                className="text-success"
                color="success"
                description="Restore the file"
                startContent={
                  <UndoIcon className={cn(iconClasses, "text-success")} />
                }
                onPress={() => restoreFile({ fileId: file._id })}
              >
                Restore file
              </DropdownItem>
            ) : (isAdmin ? (
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                description="Permanently delete the file"
                startContent={
                  <DeleteDocumentIcon
                    className={cn(iconClasses, "text-danger")}
                  />
                }
                onPress={onOpen}
              >
                Delete file
              </DropdownItem>
            ) : (
              <DropdownItem
                key="delete"
                className="text-default-500"
                color="default"
                description="Not enough permissions to delete the file"
                startContent={
                  <DeleteDocumentIcon
                    className={cn(iconClasses, "text-default")}
                  />
                }
              >
                Only admin can delete files
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <FileDeleteModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        file={file}
      />
    </>
  );
}
