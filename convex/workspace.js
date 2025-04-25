/**
 * @module workspace
 */
import { mutation } from "./server";
import { v } from "convex/values";


export const GetWorkspace=query({
     args:{
        workspaceId: v.id('workspace')
    },
    handler: async (ctx, args) => {
        const workspaceId = await ctx.db.insert("workspace", {
            messages: args.messages,
            user: args.user,
        });
        console.log("workspaceId", workspaceId);
        console.log(v);
        return workspaceId;

    },
});
