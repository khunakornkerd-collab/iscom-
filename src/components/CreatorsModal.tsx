import React from "react";
import { Users, X, Award, GraduationCap, Sparkles, CheckCircle2, Shield } from "lucide-react";

export interface Creator {
  id: number;
  name: string;
  studentNo: number;
  grade: string;
  role: string;
  roleDescription: string;
  avatarGradient: string;
  badgeColor: string;
}

export const CREATORS_LIST: Creator[] = [
  {
    id: 1,
    name: "นายคุณากร ทยะราษฎร์",
    studentNo: 1,
    grade: "ม.4/13",
    role: "หัวหน้าโครงงาน & ผู้พัฒนาหลัก",
    roleDescription: "ออกแบบระบบสถาปัตยกรรมแอปพลิเคชัน เชื่อมต่อ AI และควบคุมการพัฒนา",
    avatarGradient: "from-cyan-400 to-blue-600",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  },
  {
    id: 2,
    name: "นายพีรพัฒน์ จันทร์สุวรรณ์",
    studentNo: 11,
    grade: "ม.4/13",
    role: "ฝ่ายออกแบบ UI/UX & สื่อประกอบ",
    roleDescription: "ออกแบบ Immersive Gaming Theme คัดสรรโทนสี และจัดวางเลย์เอาต์ประสบการณ์ผู้ใช้",
    avatarGradient: "from-indigo-400 to-purple-600",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
  },
  {
    id: 3,
    name: "นายภูริทัต บุพพฤทธิ์",
    studentNo: 32,
    grade: "ม.4/13",
    role: "ฝ่ายรวบรวมข้อมูล & ฐานข้อมูลเกม",
    roleDescription: "จัดทำฐานข้อมูลเกมอินดี้และแอคชั่น วิเคราะห์สถิติเวลาเล่น และข้อมูลรางวัล",
    avatarGradient: "from-rose-400 to-pink-600",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  },
  {
    id: 4,
    name: "นายกันตพัฒน์ เหล่าอำ",
    studentNo: 35,
    grade: "ม.4/13",
    role: "ฝ่ายทดสอบระบบ & เนื้อหาแบบทดสอบ",
    roleDescription: "ออกแบบชุดคำถามประเมินสไตล์การเล่น (Quiz) และทดสอบความถูกต้องของระบบ",
    avatarGradient: "from-emerald-400 to-teal-600",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
];

interface CreatorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorsModal: React.FC<CreatorsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050507]/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0c0d15]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-[#0c0d15] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  คณะผู้จัดทำโครงงาน
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  ชั้นมัธยมศึกษาปีที่ 4/13
                </span>
              </div>
              <p className="text-xs text-slate-400">
                GameMatch: เว็บแอปพลิเคชันคัดสรรและแนะนำเกมอินดี้ & แอคชั่น
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="p-3.5 rounded-2xl bg-[#08080c] border border-white/5 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>โครงงานเทคโนโลยีและนวัตกรรมการพัฒนาเว็บแอปพลิเคชัน</span>
            </div>
            <span className="font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-xl border border-cyan-500/20">
              ม.4/13
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CREATORS_LIST.map((creator) => (
              <div
                key={creator.id}
                className="p-4 rounded-2xl bg-[#08080c] border border-white/5 hover:border-cyan-500/30 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${creator.avatarGradient} p-0.5 shadow-md flex items-center justify-center font-black text-white text-base`}
                      >
                        <div className="w-full h-full bg-[#08080c]/40 backdrop-blur-xs rounded-[14px] flex items-center justify-center">
                          {creator.studentNo}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {creator.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                          <span className="font-semibold text-slate-300">
                            เลขที่ {creator.studentNo}
                          </span>
                          <span>•</span>
                          <span className="text-cyan-400 font-bold">{creator.grade}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span
                      className={`inline-block text-[11px] px-2.5 py-0.5 rounded-lg border font-bold ${creator.badgeColor}`}
                    >
                      {creator.role}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {creator.roleDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ผู้จัดทำโครงงาน
                  </span>
                  <span>ชั้น ม.4/13</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#08080c] border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>GameMatch Project • พัฒนาโดยนักเรียนชั้น ม.4/13</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
