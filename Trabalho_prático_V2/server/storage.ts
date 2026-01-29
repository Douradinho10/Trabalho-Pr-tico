import { db } from "./db";
import { clicks, type InsertClick, type Click } from "@shared/schema";
import { sql, desc } from "drizzle-orm";

export interface IStorage {
  createClick(click: InsertClick): Promise<Click>;
  getRecentClicks(): Promise<Click[]>;
}

export class DatabaseStorage implements IStorage {
  async createClick(insertClick: InsertClick): Promise<Click> {
    // Calculate the daily sequence PER BUTTON
    // Each button has its own counter that resets daily
    
    const result = await db.execute(
      sql`SELECT COUNT(*) as count FROM ${clicks} WHERE created_at >= CURRENT_DATE AND button_id = ${insertClick.buttonId}`
    );
    
    const count = parseInt(result.rows[0].count as string) || 0;
    const nextSequence = count + 1;

    const [newClick] = await db
      .insert(clicks)
      .values({
        ...insertClick,
        dailySequence: nextSequence,
      })
      .returning();

    return newClick;
  }

  async getRecentClicks(): Promise<Click[]> {
    return await db
      .select()
      .from(clicks)
      .orderBy(desc(clicks.createdAt))
      .limit(20);
  }
}

export const storage = new DatabaseStorage();
