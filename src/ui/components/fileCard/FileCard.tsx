import FileCardActions from "@components/fileCardActions/FileCardActions";
import { Doc } from "@convex/_generated/dataModel";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";

export default function FileCard({ file }: { file: Doc<"files"> }) {
  return (
    <Card className="p-2">
      <CardHeader>
        <h2 className="w-full text-xl font-bold">{file.name}</h2>
        <FileCardActions file={file} />
      </CardHeader>
      <CardBody>
        <h3>{file.fileId}</h3>
      </CardBody>
      <CardFooter>
        <Button color="secondary">Download</Button>
      </CardFooter>
    </Card>
  );
}
