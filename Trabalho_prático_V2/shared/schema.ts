import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clicks = pgTable("clicks", {
  id: serial("id").primaryKey(),
  buttonId: text("button_id").notNull(), // "1", "2", "3", "4"
  dailySequence: integer("daily_sequence").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertClickSchema = createInsertSchema(clicks).pick({
  buttonId: true,
});

export type Click = typeof clicks.$inferSelect;
export type InsertClick = z.infer<typeof insertClickSchema>;

export type CreateClickRequest = InsertClick;
export type ClickResponse = Click;
