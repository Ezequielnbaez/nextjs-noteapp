import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//Hacemos la tabla para la base de datos
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    //Como ordenar esto
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});
