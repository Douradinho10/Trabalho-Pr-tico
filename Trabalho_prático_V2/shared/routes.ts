import { z } from "zod";
import { insertClickSchema, clicks } from "./schema";

export const api = {
  clicks: {
    create: {
      method: "POST" as const,
      path: "/api/clicks",
      input: insertClickSchema,
      responses: {
        201: z.custom<typeof clicks.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    // Optional: Get recent clicks to show history
    list: {
      method: "GET" as const,
      path: "/api/clicks",
      responses: {
        200: z.array(z.custom<typeof clicks.$inferSelect>()),
      },
    }
  },
};
