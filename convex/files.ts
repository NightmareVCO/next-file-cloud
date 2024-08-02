import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
  },
  async handler(context, arguments_) {
    const identity = context.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be signed in to upload a file");

    await context.db.insert("files", {
      name: arguments_.name,
    });
  },
});

export const getFiles = query({
  args: {},
  async handler(context, arguments_) {
    const identity = context.auth.getUserIdentity();

    if (!identity) return [];

    return await context.db.query("files").collect();
  },
});
