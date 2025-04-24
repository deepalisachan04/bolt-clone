import { mutation } from "./server";
import { v } from "convex/values";

export const CreateWorkspace = mutation({
  args: {
    message: v.any(), 
    user: v.id("users"),
    fileData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      message: args.message,
      user: args.user,
      fileData: args.fileData,
    });
    return workspaceId;
  },
});
