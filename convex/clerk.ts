"use node";

import type { WebhookEvent } from "@clerk/nextjs/server";

import { v } from "convex/values";
import { Webhook } from "svix";

import { internalAction } from "./_generated/server";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

export const fulfill = internalAction({
  args: { headers: v.any(), payload: v.string() },
  handler: async (context, arguments_) => {
    const wh = new Webhook(webhookSecret);
    const payload = wh.verify(
      arguments_.payload,
      arguments_.headers,
    ) as WebhookEvent;
    return payload;
  },
});
