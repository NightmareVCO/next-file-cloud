import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation } from "convex/react";
import React from "react";
import { toast, Toaster } from "sonner";

type FileDeleteModalProperties = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  file: Doc<"files">;
};

export default function FileDeleteModal(properties: FileDeleteModalProperties) {
  const { isOpen, onOpenChange, file } = properties;
  const deleteFile = useMutation(api.files.deleteFile);

  return (
    <>
      <Toaster position="bottom-right" expand={true} closeButton richColors />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to mark this file as deleted?
              </ModalHeader>
              <ModalBody>
                <p>
                  This action will move the file to the deleted files section.
                  You can restore it or will be permanently deleted after 30
                  days.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    deleteFile({ fileId: file._id });
                    toast.error("File moved to deletes files", {
                      description: new Date().toLocaleString(),
                    });
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
