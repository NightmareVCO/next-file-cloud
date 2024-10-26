import { Doc } from "@convex/_generated/dataModel";
import { Select, SelectItem } from "@nextui-org/react";

export default function FileTypeSelector({
  type,
  setType,
}: {
  type: Doc<"files">["type"] & "all";
  setType: (type: Doc<"files">["type"] & "all") => void;
}) {
  return (
    <Select
      selectedKeys={[type]}
      label="Select a type of file"
      onSelectionChange={(selectedKeys) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setType(selectedKeys.currentKey as any);
      }}
    >
      <SelectItem key="all" value="All">
        All
      </SelectItem>
      <SelectItem key="image" value="image">
        Image
      </SelectItem>
      <SelectItem key="csv" value="csv">
        CSV
      </SelectItem>
      <SelectItem key="pdf" value="pdf">
        PDF
      </SelectItem>
    </Select>
  );
}
