import type { Request, Response } from "express";
import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app);

// Vercel Node Functions expect a (req, res) handler export.
export default function handler(req: Request, res: Response) {
  return app(req, res);
}

export const config = {
  runtime: "nodejs20.x",
};

