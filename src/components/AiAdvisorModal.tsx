import React, { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  Gamepad2,
  Flame,
  HelpCircle,
  Clock,
  Compass,
  CheckCircle,
  Copy,
  Check
} from "lucide-react";

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchGame: (gameName: string) => void;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSearchGame,
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState("ทั้งอินดี้และแอคชั่น");
  const [selectedDifficulty, setSelectedDifficulty] = useState("ทุกระดับ");
  const [selectedPlatform, setSelectedPlatform] = useState("PC / ทุกแพลตฟอร์ม");
  const [selectedVibe, setSelectedVibe] = useState("ตามความเหมาะสม");
  const [isLoading, setIsLoading] = useState(false);
  const [responseHtml, setResponseHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const presetPrompts = [
    "อยากได้เกมอินดี้ภาพสวย มีมิติ ดนตรีเพราะ เล่นจบใน 10-15 ชม.",
    "แนะนำเกมแอคชั่นฟันดาบหรือปัดป้องสุดมันส์ ท้าทายสไตล์ Soulslike",
    "หาเกม Roguelike หรือ Deckbuilder เล่นเพลินบน Steam Deck ดูดเวลา",
    "เกมแอคชั่น FPS ยิงแหลก ระบายความเครียด เพลงประกอบเมทัลเดือดๆ",
    "เกมอินดี้สายผ่อนคลาย ดำน้ำ หรือบริหารร้าน ไม่เน้นสู้ ไม่หัวร้อน",
    "เกมแอคชั่น Open World เนื้อเรื่องเข้มข้น มีอิสระในการสร้างตัวละคร"
  ];

  const handleSendRecommendation = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() && !customPrompt) return;

    setIsLoading(true);
    setResponseHtml(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          preferences: {
            type: selectedType,
            difficulty: selectedDifficulty,
            platform: selectedPlatform,
            vibe: selectedVibe,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        setResponseHtml(data.text);
      } else {
        setResponseHtml(
          "ขออภัย ไม่สามารถสร้างคำแนะนำได้ในขณะนี้: " + (data.error || "กรุณาลองใหม่อีกครั้ง")
        );
      }
    } catch (err: any) {
      setResponseHtml("เกิดข้อผิดพลาดในการเชื่อมต่อ: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!responseHtml) return;
    navigator.clipboard.writeText(responseHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050507]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#0c0d15]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-[#0c0d15] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  ผู้ช่วย AI แนะนำเกมอินดี้ & แอคชั่น
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold shadow-sm">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="text-xs text-slate-400">
                บอกแนวที่คุณชอบ บรรยากาศ หรือระดับความยากที่ต้องการ แล้วให้ AI ช่วยคัดเลือก
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#08080c]/80 hover:bg-[#161826] text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-200">
          {/* Quick Filter Criteria */}
          <div className="p-4 rounded-2xl bg-[#08080c] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              กำหนดเงื่อนไขเพิ่มเติม (Optional):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">แนวเกม</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#0d0e16] border border-white/10 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs cursor-pointer"
                >
                  <option>ทั้งอินดี้และแอคชั่น</option>
                  <option>เฉพาะเกมอินดี้</option>
                  <option>เฉพาะเกมแอคชั่น</option>
                  <option>อินดี้แอคชั่น (Indie Action)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">ระดับความยาก</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-[#0d0e16] border border-white/10 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs cursor-pointer"
                >
                  <option>ทุกระดับ</option>
                  <option>เล่นง่าย ผ่อนคลาย</option>
                  <option>ปานกลาง สนุกกำลังดี</option>
                  <option>ท้าทายฝีมือ</option>
                  <option>Soulslike / บอสโหดหิน</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">แพลตฟอร์ม</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full bg-[#0d0e16] border border-white/10 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs cursor-pointer"
                >
                  <option>PC / ทุกแพลตฟอร์ม</option>
                  <option>PC / Steam Deck</option>
                  <option>PlayStation 5</option>
                  <option>Nintendo Switch</option>
                  <option>Xbox Series</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">โทน/อารมณ์</label>
                <select
                  value={selectedVibe}
                  onChange={(e) => setSelectedVibe(e.target.value)}
                  className="w-full bg-[#0d0e16] border border-white/10 rounded-xl px-2.5 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs cursor-pointer"
                >
                  <option>ตามความเหมาะสม</option>
                  <option>ดาร์กแฟนตาซี / ลึกลับ</option>
                  <option>ไซเบอร์พังก์ / นีออน</option>
                  <option>อบอุ่น / ภาพศิลปะ</option>
                  <option>เดือดเลือดสาด / บ้าพลัง</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preset Prompts */}
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-2">
              💡 ตัวอย่างคำขอที่พบบ่อย (คลิกเพื่อค้นหาทันที):
            </span>
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(preset);
                    handleSendRecommendation(preset);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#08080c] hover:bg-[#141624] text-slate-300 hover:text-white border border-white/5 hover:border-cyan-500/40 text-xs text-left transition-all"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* User Custom Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              หรือพิมพ์ความต้องการของคุณเอง:
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendRecommendation();
                  }
                }}
                placeholder="เช่น: ชอบเกมแนว Hollow Knight กับ Celeste อยากได้เกมแนวนี้อีกแต่อยากได้แนวแฟนตาซี..."
                className="w-full bg-[#08080c] border border-white/10 focus:border-cyan-500/60 rounded-2xl pl-4 pr-28 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 shadow-inner"
              />
              <button
                id="btn-submit-ai-recommend"
                onClick={() => handleSendRecommendation()}
                disabled={isLoading || !prompt.trim()}
                className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-rose-600 hover:from-cyan-400 hover:to-rose-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>กำลังคิด...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>ส่งคำขอ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Result Card */}
          {isLoading && (
            <div className="p-8 rounded-2xl bg-[#08080c] border border-white/5 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center animate-bounce">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
              <p className="text-sm font-bold text-white">
                ผู้ช่วย AI กำลังวิเคราะห์คลังเกมอินดี้ & แอคชั่นให้คุณ...
              </p>
              <p className="text-xs text-slate-400 max-w-sm">
                คัดเลือกเกมที่มีรีวิวเยี่ยม แมตช์กับความชอบ และระบบการเล่นที่ตอบโจทย์คุณที่สุด
              </p>
            </div>
          )}

          {responseHtml && !isLoading && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#08080c] border border-cyan-500/30 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">คำแนะนำจาก AI ผู้เชี่ยวชาญ</h4>
                </div>
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-[#141624] border border-white/10 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "คัดลอกแล้ว" : "คัดลอกข้อความ"}</span>
                </button>
              </div>

              {/* Formatted Text Content */}
              <div className="whitespace-pre-line text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-2">
                {responseHtml}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#08080c] border-t border-white/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#141624] hover:bg-[#1e2236] text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
