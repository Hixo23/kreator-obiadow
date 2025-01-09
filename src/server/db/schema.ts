import { relations } from "drizzle-orm";
import { integer, pgTableCreator, text, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `kreator-obiadow-v2_${name}`,
);

export const recipes = createTable("recipe", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  preparationTime: integer("preparation_time").notNull(),
  ingredients: text("ingredients").notNull(),
  portions: integer("portions").notNull(),
  image: text("imageurl").notNull(),
  preparationProcess: text("preparation_process").notNull(),
  category: text("category"),
  subcategory: text("subcategory"),
  userId: varchar("user_id", { length: 255 }).notNull(),
});

export const comments = createTable("comment", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  content: varchar("content", { length: 255 }).notNull(),
  postId: varchar("post_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  recipe: one(recipes, {
    fields: [comments.postId],
    references: [recipes.id],
  }),
}));
