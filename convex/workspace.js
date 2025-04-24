/**
 * @module workspace
 */
import { mutation } from "./server";
import { v } from "convex/values";

export const CreateWorkspace = mutation({
  args: {
    message: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      message: args.message,
      user: args.user,
    });
    return workspaceId;
  },
});
// import { mutation } from './_generated/server';
// import { v } from 'convex/values';

// export const CreateWorkspace = mutation({
//   args: {
//     messages: v.any(),
//     user: v.id("users"),
//   },
//   handler: async (ctx, args) => {
//     const workspaceId = await ctx.db.insert('workspace', {
//       messages: args.messages,
//       user: args.user,
//     });
//     return workspaceId;
//   },
// });
