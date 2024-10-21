import { Doc } from "@convex/_generated/dataModel";
import { ActionsDotsIcon } from "@icons/ActionsDotsIcon";
import { DeleteDocumentIcon } from "@icons/DeleteDocumentIcon";
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
import React from "react";

import FileDeleteModal from "../fileDeleteModal/FileDeleteModal";

export default function FileCardActions({ file }: { file: Doc<"files"> }) {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <DropdownSection title="Danger zone">
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
