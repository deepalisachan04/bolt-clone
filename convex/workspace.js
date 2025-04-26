/**
 * @module workspace
 */
import { mutation, query } from "./server";
import { v } from "convex/values";


export const CreateWorkspace=mutation({
     args:{
        messages: v.any(),
        users: v.id("users"),
    },
    handler: async (ctx, args) => {
        const workspaceId = await ctx.db.insert("workspace", {
            messages: args.messages,
            user: args.users,
        });
        console.log("workspaceId", workspaceId);
        console.log(v);
        return workspaceId;

    },
});

export const GetWorkspace=query({
    args:{
        workspaceId: v.id('workspace')
    },
    handler: async(ctx, args)=>{
        const result=await ctx.db.get(args.workspaceId);
        return result;
    }
})
