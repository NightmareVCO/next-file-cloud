"use client";

import { Button, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import { FileIcon } from "./icons/FileIcon";
import { StartIcon } from "./icons/StartIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

export function useSideNav() {
  const pathname = usePathname();

  const isFiles = pathname === "/dashboard/files";
  const isFavorites = pathname === "/dashboard/favorites";
  const isDeletes = pathname === "/dashboard/deletes";

  const activeColor = "bg-primary-200";

  const filesColor = isFiles ? activeColor : "";
  const favoritesColor = isFavorites ? activeColor : "";
  const deletesColor = isDeletes ? activeColor : "";

  return {
    filesColor,
    favoritesColor,
    deletesColor,
  };
}

export default function SideNav() {
  const { filesColor, favoritesColor, deletesColor } = useSideNav();

  return (
    <ul className="flex flex-col gap-y-2">
      <li>
        <Button
          as={Link}
          className={filesColor}
          href="/dashboard/files"
          variant="light"
          color="primary"
          startContent={<FileIcon />}
        >
          All Files
        </Button>
      </li>
      <li>
        <Button
          as={Link}
          className={favoritesColor}
          href="/dashboard/favorites"
          variant="light"
          color="primary"
          startContent={<StartIcon />}
        >
          Favorites
        </Button>
      </li>
      <li>
        <Button
          as={Link}
          className={deletesColor}
          href="/dashboard/deletes"
          variant="light"
          color="primary"
          startContent={<DeleteIcon/>}
        >
          Deletes
        </Button>
      </li>
    </ul>
  );
}
