import { ConvexError, v } from "convex/values";

import {
  internalMutation,
  MutationCtx as MutationContext,
  QueryCtx as QueryContext,
} from "./_generated/server";
import { roles } from "./schema";

export const getUser = async ({
  context,
  tokenIdentifier,
}: {
  context: QueryContext | MutationContext;
  tokenIdentifier: string;
}) => {
  const user = await context.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier),
    )
    .first();
  if (!user) throw new ConvexError("User not found");

  return user;
};

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string() },
  async handler(context, arguments_) {
    await context.db.insert("users", {
      tokenIdentifier: arguments_.tokenIdentifier,
      orgIds: [],
    });
    console.log("User created");
  },
});

export const addOrgIdToUser = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
  async handler(context, arguments_) {
    const user = await getUser({
      context,
      tokenIdentifier: arguments_.tokenIdentifier,
    });
    if (!user) throw new ConvexError("User not found");

    await context.db.patch(user._id, {
      orgIds: [...user.orgIds, { orgId: arguments_.orgId, role: arguments_.role }],
    });
  },
});

export const updateRoleInOrgForUser = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
  async handler(context, arguments_) {
    const user = await getUser({
      context,
      tokenIdentifier: arguments_.tokenIdentifier,
    });
    if (!user) throw new ConvexError("User not found");

    const org = user.orgIds.find((org) => org.orgId === arguments_.orgId);
    if (!org) throw new ConvexError("User does not have access to this org");

    org.role = arguments_.role;

    await context.db.patch(user._id, {
      orgIds: [...user.orgIds, { orgId: arguments_.orgId, role: arguments_.role }],
    });
  },
});
