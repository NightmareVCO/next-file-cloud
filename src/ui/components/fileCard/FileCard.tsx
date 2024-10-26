// import "pdfjs-dist/build/pdf.worker.entry";

import FileCardActions from "@components/fileCardActions/FileCardActions";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import {
  // Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
  User,
} from "@nextui-org/react";
import { useQuery } from "convex/react";
import { formatRelative } from "date-fns";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
// import { pdf } from "pdf-to-img";
import React, { ReactNode } from "react";

const typesIcon = {
  image: <ImageIcon />,
  pdf: <FileTextIcon />,
  csv: <GanttChartIcon />,
} as Record<Doc<"files">["type"], ReactNode>;

// export const getPdfPreview = (url: string): Promise<string> => {};

// function getFileUrl(fileId: Doc<"files">["fileId"]): string {
//   return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
// }

export default function FileCard({
  file,
  isFavorite,
  orgId,
}: {
  file: Doc<"files"> & { url?: string | null };
  isFavorite: boolean;
  orgId: string;
}) {
  const userProfile = useQuery(api.users.getProfile, {
    userId: file.userId,
  });

  return (
    <Card className="p-2 min-w-[200px]">
      <CardHeader>
        <p>{typesIcon[file.type]}</p>
        <Spacer x={2} />
        <h2 className="w-full text-base font-normal truncate ">{file.name}</h2>
        <FileCardActions file={file} isFavorite={isFavorite} orgId={orgId} />
      </CardHeader>
      <CardBody className="flex items-center justify-center">
        {file.type === "image" && (
          <Image src={file.url!} width={250} height={250} alt={file.name} />
        )}
        {/* {
          file.type === "pdf" && (
            {pdf()}
        } */}
      </CardBody>
      <CardFooter className="flex flex-col items-center justify-between gap-y-4">
        {/* <Button
          onClick={() => {
            window.open(file.url!, "_blank");
          }}
          variant="flat"
          color="primary"
        >
          Download
        </Button> */}
        <div className="flex items-center justify-between gap-x-4">
          <User
            className="flex-3"
            name={userProfile?.name}
            avatarProps={{ src: userProfile?.image }}
          />
          <p className="text-xs flex-2 text-default-400">
            Uploaded on{" "}
            {formatRelative(new Date(file._creationTime), new Date())}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
