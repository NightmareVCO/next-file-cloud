// import "pdfjs-dist/build/pdf.worker.entry";

import FileCardActions from "@components/fileCardActions/FileCardActions";
import { Doc } from "@convex/_generated/dataModel";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
} from "@nextui-org/react";
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
}: {
  file: Doc<"files"> & { url?: string | null };
  isFavorite: boolean;
}) {
  console.log(file);

  return (
    <Card className="p-2 min-w-[300px]">
      <CardHeader>
        <p>{typesIcon[file.type]}</p>
        <Spacer x={2} />
        <h2 className="w-full text-xl font-bold">{file.name}</h2>
        <FileCardActions file={file} isFavorite={isFavorite} />
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
      <CardFooter className="flex items-center justify-center">
        <Button
          onClick={() => {
            console.log(file);
            console.log(file.url);
            window.open(file.url!, "_blank");
          }}
          variant="flat"
          color="primary"
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
