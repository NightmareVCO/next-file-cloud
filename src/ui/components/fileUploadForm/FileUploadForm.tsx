import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input as NextInput, Spacer } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Input as ShadInput } from "@/components/ui/input";

import { FileUploadProperties } from "../fileUploadModal/FileUploadModal";
const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character" })
    .max(100, { message: "Title must be at most 100 characters" }),
  file: z
    .custom<FileList>((value) => value instanceof FileList, "Required")
    .refine((files) => files.length > 0, "Required"),
});

export type FileUploadFormProperties = {
  properties: FileUploadProperties;
  onClose: () => void;
  setSubmitButtonDisable: (status: boolean) => void;
};

const types = {
  "image/png": "image",
  "image/jpeg": "image",
  "image/jpg": "image",
  "image/webp": "image",
  "application/pdf": "pdf",
  "text/csv": "csv",
} as Record<string, Doc<"files">["type"]>;

export function useFileUploadForm({
  properties,
  onClose,
  setSubmitButtonDisable,
}: FileUploadFormProperties) {
  const { orgId, onSubmitFunction } = properties;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!orgId) return;
    setSubmitButtonDisable(true);

    const { title, file } = values;
    const { type: fileType } = file[0];

    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: file[0],
    });
    const { storageId } = await result.json();

    try {
      await onSubmitFunction({
        name: title,
        orgId,
        fileId: storageId,
        type: types[fileType],
      });

      toast.success("File uploaded successfully", {
        description: new Date().toLocaleString(),
      });
      form.reset();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          "File type not supported. Only images, documents and csv.",
          {
            description: new Date().toLocaleString(),
          },
        );
      }
    } finally {
      setSubmitButtonDisable(false);
    }
  };
  return { form, onSubmit };
}
export default function FileUploadForm({
  properties,
  onClose,
  setSubmitButtonDisable,
}: FileUploadFormProperties) {
  const { form, onSubmit } = useFileUploadForm({
    properties,
    onClose,
    setSubmitButtonDisable,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <section>
      <form id="uploadForm" onSubmit={handleSubmit(onSubmit)}>
        <NextInput
          id="title"
          type="text"
          label="Title"
          variant="bordered"
          placeholder="Enter the title of your file"
          isRequired
          isClearable
          {...register("title")}
        />
        <Spacer y={3} />
        <ShadInput type="file" {...register("file")} required />
        <Spacer y={3} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </form>
    </section>
  );
}
