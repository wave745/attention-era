import type { Express } from "express";
import { storage } from "./storage";

export function registerRoutes(app: Express): void {
  // API endpoint for submitting contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { codename, email, message } = req.body;
      
      // Validate input
      if (!codename || !email || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // In a real application, this would store the data or send an email
      // For this example, we'll just return a success response
      
      res.status(200).json({ 
        message: "Message received successfully",
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error("Error processing contact form:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
}
