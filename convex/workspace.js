import { mutation } from './_generated/server';
import { v } from 'convex/values';
import * as api from '@/convex/_generated/api';


export const CreateWorkspace = mutation({
    args: {
        messages: v.any(),
        user: v.id("users")
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
