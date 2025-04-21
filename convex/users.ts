import { query } from "./_generated/server";
import { v } from "convex/values";



export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, args) => {
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    return user;
  },
});
