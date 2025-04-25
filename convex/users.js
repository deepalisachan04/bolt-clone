import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Define createUser mutation
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    if (existing.length === 0) {
      await ctx.db.insert('users', {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
      });
      console.log('User created');
    }
  },
});

// Define GetUser query
export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, args) => {
    const user = await db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .unique();
    return user;
  },
});





// import { mutation } from './_generated/server';
// import { v } from 'convex/values';
// import { query } from './_generated/server';
// import { v4 as uuid4 } from 'uuid';
// import axios from 'axios';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useContext } from 'react';
// import { UserDetailContext } from '@/context/UserDetailContext';
// import { useMutation } from 'convex/react';


// export const createUser = mutation({
//   args: {
//     name: v.string(),
//     email: v.string(),
//     picture: v.string(),
//     uid: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const existing = await ctx.db
//       .query('users')
//       .filter((q) => q.eq(q.field('email'), args.email))
//       .collect();

//     if (existing.length === 0) {
//       await ctx.db.insert('users', {
//         name: args.name,
//         email: args.email,
//         picture: args.picture,
//         uid: args.uid,
//       });
//       console.log(result);

//     }
//   },
// })

// export const GetUser = query({
//   args: {
//     email: v.string(),
//   },
//   handler: async ({ db }, args) => {
//     const user = await db
//       .query("users")
//       .filter((q) => q.eq(q.field("email"), args.email))
//       .unique();

//     return user;
//   },
// });

// // export const GetUser = query({
// //   args:{
// //     email: v.string()
// //   },
// //   handler: async (ctx, args) => {
// //     const user = await ctx.db
// //       .query('users')
// //       .filter((q) => q.eq(q.field('email'), args.email))
// //       .collect();

// //     console.log("fetching email: " + args.email);
// //     return user[0];
// //   }
// // })



