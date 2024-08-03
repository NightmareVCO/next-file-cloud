import FileUploadForm from "@components/fileUploadForm/FileUploadForm";
import { Id } from "@convex/_generated/dataModel";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { Toaster } from "sonner";

export type FileUploadProperties = {
  orgId: string;
  onSubmitFunction: ({
    name,
    orgId,
    fileId,
  }: {
    name: string;
    orgId: string;
    fileId: Id<"_storage">;
  }) => void;
};

export default function FileUploadModal(properties: FileUploadProperties) {
  const { orgId, onSubmitFunction } = properties;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);

  return (
    <>
      <Toaster position="bottom-right" expand={true} closeButton richColors />
      <Button variant="flat" color="secondary" onPress={onOpen}>
        Upload File
      </Button>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload your file here
                <Spacer y={1} />
              </ModalHeader>
              <ModalBody>
                <FileUploadForm
                  properties={{ orgId, onSubmitFunction }}
                  onClose={onClose}
                  setSubmitButtonDisable={setSubmitButtonDisable}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  type="submit"
                  form="uploadForm"
                  isDisabled={submitButtonDisable}
                  isLoading={submitButtonDisable}
                >
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
