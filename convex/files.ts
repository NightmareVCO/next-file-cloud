import { ConvexError, v } from "convex/values";

import {
  mutation,
  MutationCtx as MutationContext,
  query,
  QueryCtx as QueryContext,
} from "./_generated/server";
import { getUser } from "./users";

export const hasAccessToOrg = async ({
  context,
  tokenIdentifier,
  orgId,
}: {
  context: MutationContext | QueryContext;
  tokenIdentifier: string;
  orgId: string;
}) => {
  const user = await getUser({
    context,
    tokenIdentifier,
  });

  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

  return hasAccess;
};

export const createFile = mutation({
  args: { name: v.string(), orgId: v.string(), fileId: v.id("_storage") },
  async handler(context, arguments_) {
    const identity = await context.auth.getUserIdentity();
    if (!identity)
      throw new ConvexError("You must be signed in to upload a file");

    const hasAccess = await hasAccessToOrg({
      context,
      tokenIdentifier: identity.tokenIdentifier,
      orgId: arguments_.orgId,
    });
    if (!hasAccess) throw new ConvexError("You do not have access to this org");

    await context.db.insert("files", {
      name: arguments_.name,
      orgId: arguments_.orgId,
      fileId: arguments_.fileId,
    });
  },
});

export const generateUploadUrl = mutation(async (context) => {
  const identity = await context.auth.getUserIdentity();
  if (!identity)
    throw new ConvexError("You must be signed in to upload a file");

  return await context.storage.generateUploadUrl();
});

export const getFiles = query({
  args: { orgId: v.string() },
  async handler(context, arguments_) {
    const identity = await context.auth.getUserIdentity();
    if (!identity) return [];

    const hasAccess = await hasAccessToOrg({
      context,
      tokenIdentifier: identity.tokenIdentifier,
      orgId: arguments_.orgId,
    });
    if (!hasAccess) return [];

    return await context.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", arguments_.orgId))
      .collect();
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  async handler(context, arguments_) {
    const identity = await context.auth.getUserIdentity();
    if (!identity)
      throw new ConvexError("You must be signed in to delete a file");

    const file = await context.db.get(arguments_.fileId);
    if (!file) throw new ConvexError("File not found");

    const hasAccess = await hasAccessToOrg({
      context,
      tokenIdentifier: identity.tokenIdentifier,
      orgId: file.orgId,
    });
    if (!hasAccess)
      throw new ConvexError("You do not have access to delete this file");

    await context.db.delete(arguments_.fileId);
  },
});
