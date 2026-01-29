import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.clicks.create.path, async (req, res) => {
    try {
      const input = api.clicks.create.input.parse(req.body);
      const click = await storage.createClick(input);
      res.status(201).json(click);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.clicks.list.path, async (req, res) => {
    const history = await storage.getRecentClicks();
    res.json(history);
  });

  return httpServer;
}
