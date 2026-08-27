import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI securely on server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Game Recommendation Endpoint
app.post("/api/recommend", async (req: Request, res: Response) => {
  try {
    const { prompt, preferences, mode } = req.body;

    let systemInstruction = `You are a master gaming journalist and game recommendation expert specializing in Indie Games (เกมอินดี้) and Action Games (เกมแอคชั่น).
Respond in natural, engaging, friendly Thai language (ภาษาไทย).
Provide accurate game recommendations, why they are great, difficulty ratings, combat/gameplay style, playtime, and suitable platforms.
Return response in clean structured format.`;

    const userPrompt = `
ผู้ใช้ต้องการคำแนะนำเกม:
คำขอ/แนวที่อยากเล่น: "${prompt || "แนะนำเกมอินดี้และแอคชั่นที่ห้ามพลาด"}"
ความชอบ/เงื่อนไขเพิ่มเติม:
- สไตล์เกม: ${preferences?.type || "ทั้งอินดี้และแอคชั่น"}
- ความยากที่รับได้: ${preferences?.difficulty || "ทุกระดับ"}
- แพลตฟอร์ม: ${preferences?.platform || "PC / Console"}
- ระยะเวลาเล่น: ${preferences?.playtime || "ทุกความยาว"}
- สไตล์ภาพ/อารมณ์: ${preferences?.vibe || "ตามความเหมาะสม"}
- โหมด: ${mode || "general"}

กรุณาแนะนำเกมที่ดีที่สุด 3-4 เกม โดยแต่ละเกมให้ระบุ:
1. ชื่อเกม (ภาษาอังกฤษ)
2. หมวดหมู่ (เกมอินดี้ หรือ เกมแอคชั่น หรือ Indie-Action)
3. ไฮไลท์จุดเด่นสั้นๆ (Hook line)
4. ทำไมคุณถึงจะหลงรักเกมนี้ (เหตุผลและระบบการเล่นที่น่าสนใจ)
5. ระดับความยาก (ง่าย / ปานกลาง / ท้าทาย / โหดหินสไตล์ Soulslike)
6. เวลาเล่นโดยประมาณ (ชั่วโมง)
7. แพลตฟอร์มที่เล่นได้
8. เหมาะกับคนที่ชอบเกมอะไร (เช่น "ถ้าชอบ Dark Souls จะต้องรักเกมนี้")

เขียนในโทนเกมเมอร์ที่ตื่นเต้น เป็นกันเอง อ่านง่าย ใช้ bullet point และ emoji ให้สวยงาม
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text || "ไม่พบข้อมูลคำแนะนำ กรุณาลองใหม่อีกครั้ง",
    });
  } catch (error: any) {
    console.error("Gemini Recommend Error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI ผู้แนะนำเกม",
    });
  }
});

// AI Game Comparison Endpoint
app.post("/api/compare", async (req: Request, res: Response) => {
  try {
    const { game1, game2 } = req.body;

    if (!game1 || !game2) {
      return res.status(400).json({ error: "กรุณาระบุชื่อเกมทั้ง 2 เกม" });
    }

    const systemInstruction = `You are a professional video game reviewer. Compare two games in Thai with deep insights on combat depth, pacing, art style, story, difficulty, and value for time.`;

    const prompt = `
เปรียบเทียบเกม 2 เกมนี้สำหรับผู้เล่นที่กำลังตัดสินใจเลือกซื้อ/เล่น:
เกมที่ 1: ${game1}
เกมที่ 2: ${game2}

กรุณาวิเคราะห์เปรียบเทียบในหัวข้อดังนี้:
1. ภาพรวม & สไตล์หลักของแต่ละเกม
2. ระบบการต่อสู้ / เกมเพลย์ (Combat & Mechanics)
3. ระดับความยาก & การเข้าถึง (Difficulty & Learning Curve)
4. กราฟิก ดนตรี และบรรยากาศ (Art & Soundtrack)
5. ความคุ้มค่าและระยะเวลาเล่น (Playtime & Replayability)
6. สรุปฟันธง: คุณควรเลือกเกมไหนถ้าคุณเป็นผู้เล่นสายไหน

เขียนสรุปเป็นภาษาไทยที่กระชับ ชัดเจน เป็นกลางและน่าอ่าน
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error("Gemini Compare Error:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "ไม่สามารถเปรียบเทียบเกมได้ในขณะนี้",
    });
  }
});

// Vite Middleware for Dev and Static fallback for Prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
