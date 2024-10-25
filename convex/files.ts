import { ConvexError, v } from "convex/values";

import { Id } from "./_generated/dataModel";
import {
  mutation,
  MutationCtx as MutationContext,
  query,
  QueryCtx as QueryContext,
} from "./_generated/server";
import { fileType } from "./schema";
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
  args: {
    name: v.string(),
    orgId: v.string(),
    fileId: v.id("_storage"),
    type: fileType,
  },
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
      type: arguments_.type,
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
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
    favorites: v.optional(v.boolean()),
  },
  async handler(context, arguments_) {
    const identity = await context.auth.getUserIdentity();
    if (!identity) return [];

    const hasAccess = await hasAccessToOrg({
      context,
      tokenIdentifier: identity.tokenIdentifier,
      orgId: arguments_.orgId,
    });
    if (!hasAccess) return [];

    let files = await context.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", arguments_.orgId))
      .collect();

    if (arguments_.query) {
      files = files.filter((file) =>
        file.name.toLowerCase().includes(arguments_.query!.toLowerCase()),
      );
    }

    if (arguments_.favorites) {
      const user = await getUser({
        context,
        tokenIdentifier: identity.tokenIdentifier,
      });

      const favorites = await context.db
        .query("favorites")
        .withIndex("by_userId__orgId_fileId", (q) =>
          q.eq("userId", user._id).eq("orgId", arguments_.orgId),
        )
        .collect();

      // not suitable for large datasets
      files = files.filter((file) =>
        favorites.some((favorite) => favorite.fileId === file._id),
      );
    }

    return await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await context.storage.getUrl(file.fileId),
      })),
    );
  },
});

export const getAllFavorites = query({
  args: { orgId: v.string() },
  async handler(context, arguments_) {
    const identity = await context.auth.getUserIdentity();
    if (!identity) return [];

    const user = await getUser({
      context,
      tokenIdentifier: identity.tokenIdentifier,
    });

    const access = await hasAccessToOrg({
      context,
      orgId: arguments_.orgId,
      tokenIdentifier: identity.tokenIdentifier,
    });
    if (!access) return [];

    const favorites = await context.db
      .query("favorites")
      .withIndex("by_userId__orgId_fileId", (q) =>
        q.eq("userId", user._id).eq("orgId", arguments_.orgId),
      )
      .collect();

    return favorites;
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  async handler(context, arguments_) {
    const access = await hasAccessToFile({
      context,
      fileId: arguments_.fileId,
    });
    if (!access) throw new ConvexError("You do not have access to this file");

    await context.db.delete(arguments_.fileId);
  },
});

export const toggleFavorite = mutation({
  args: { fileId: v.id("files") },
  async handler(context, arguments_) {
    const access = await hasAccessToFile({
      context,
      fileId: arguments_.fileId,
    });
    if (!access) throw new ConvexError("You do not have access to this file");
    const { user, file } = access;

    const favorite = await context.db
      .query("favorites")
      .withIndex("by_userId__orgId_fileId", (q) =>
        q.eq("userId", user._id).eq("orgId", file.orgId).eq("fileId", file._id),
      )
      .first();

    await (favorite
      ? context.db.delete(favorite._id)
      : context.db.insert("favorites", {
          userId: user._id,
          fileId: file._id,
          orgId: file.orgId,
        }));
  },
});

async function hasAccessToFile({
  context,
  fileId,
}: {
  context: QueryContext | MutationContext;
  fileId: Id<"files">;
}) {
  const identity = await context.auth.getUserIdentity();
  if (!identity) return;

  const file = await context.db.get(fileId);
  if (!file) return;

  const hasAccess = await hasAccessToOrg({
    context,
    tokenIdentifier: identity.tokenIdentifier,
    orgId: file.orgId,
  });
  if (!hasAccess) return;

  const user = await context.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .first();
  if (!user) return;

  return { user, file };
}
