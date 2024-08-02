"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles);

  return (
    <section className="container min-h-screen">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file) => <div key={file._id}>{file.name}</div>)}

      <Button
        onPress={() =>
          createFile({
            name: "My File",
          })
        }
      >
        Click Me
      </Button>
    </section>
  );
}
