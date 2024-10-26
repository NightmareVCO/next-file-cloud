import { ConvexError, v } from "convex/values";

import {
  internalMutation,
  MutationCtx as MutationContext,
  query,
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

export const getProfile = query({
  args: { userId: v.id("users") },
  async handler(context, arguments_) {
    const user = await context.db.get(arguments_.userId);
    if (!user) throw new ConvexError("User not found");

    return {
      name: user.name,
      image: user.image,
    };
  },
});

//getProfiles based on a list of userIds
export const getProfiles = query({
  args: { userIds: v.array(v.id("users")) },
  async handler(context, arguments_) {
    const users = await context.db.query("users").collect();

    const profiles = [];

    for (const user of users) {
      if (arguments_.userIds.includes(user._id)) {
        profiles.push({
          id: user._id,
          name: user.name,
          image: user.image,
        });
      }
    }

    return profiles;
  },
});

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
  async handler(context, arguments_) {
    await context.db.insert("users", {
      tokenIdentifier: arguments_.tokenIdentifier,
      orgIds: [],
      name: arguments_.name,
      image: arguments_.image,
    });
  },
});

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
  async handler(context, arguments_) {
    const user = await getUser({
      context,
      tokenIdentifier: arguments_.tokenIdentifier,
    });

    await context.db.patch(user._id, {
      name: arguments_.name,
      image: arguments_.image,
    });
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
      orgIds: [
        ...user.orgIds,
        { orgId: arguments_.orgId, role: arguments_.role },
      ],
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
      orgIds: [
        ...user.orgIds,
        { orgId: arguments_.orgId, role: arguments_.role },
      ],
    });
  },
});

export const getMe = query({
  async handler(context) {
    const identity = await context.auth.getUserIdentity();
    if (!identity) throw new ConvexError("You must be signed in");

    const user = await getUser({
      context,
      tokenIdentifier: identity.tokenIdentifier,
    });
    if (!user) throw new ConvexError("User not found");

    return user;
  },
});
