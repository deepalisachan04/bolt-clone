// convex/schema.js
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),
  workspace: defineTable({
    message: v.any(),
    user: v.id("users"),
    fileData: v.optional(v.any()),
  }),
});
