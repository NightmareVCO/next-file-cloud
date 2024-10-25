import { Protect, useUser } from "@clerk/nextjs";
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
import { useMutation } from "convex/react";
import React from "react";

import FileDeleteModal from "../fileDeleteModal/FileDeleteModal";

export default function FileCardActions({
  file,
  isFavorite,
  orgId
}: {
  file: Doc<"files">;
  isFavorite: boolean;
  orgId: string;
}) {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const toogleFavorite = useMutation(api.files.toggleFavorite);
  const user = useUser();
  const isAdmin = user.user?.organizationMemberships.some(
    (membership) => membership.organization.id === orgId && membership.role === "org:admin"
  ) ?? false;

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
              Favorite
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger Zone">
            {isAdmin ? (
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
          )}
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