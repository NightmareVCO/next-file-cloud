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
                Are you sure you want to delete this file?
              </ModalHeader>
              <ModalBody>
                <p>
                  This action is irreversible and will permanently delete the
                  file from the cloud.
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
                    toast.error("File deleted successfully", {
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
