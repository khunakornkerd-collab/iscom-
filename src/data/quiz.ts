import { QuizQuestion } from "../types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "คุณมีเวลาและสมาธิในการเล่นเกมแต่ละวันประมาณเท่าไหร่?",
    description: "ช่วยประเมินความยาวและสเกลของเกมที่เหมาะกับตารางชีวิตของคุณ",
    options: [
      {
        label: "เล่นรอบละ 20 - 45 นาที จบเป็นตาๆ พักผ่อนสบายๆ",
        description: "สไตล์ Roguelike หรือ Deckbuilder เล่นจบเป็นรอบๆ เช่น Balatro, Hades, Dave the Diver",
        icon: "Zap",
        points: { category: "indie", tags: ["Roguelike", "เล่นเพลิน ผ่อนคลาย"], targetGameIds: ["balatro", "hades", "dave-the-diver"] }
      },
      {
        label: "มีเวลา 1 - 2 ชั่วโมง อยากได้แอคชั่นเดือดๆ หรือเสพเนื้อเรื่องเข้มข้น",
        description: "แอคชั่นฟันดาบ ผจญภัย หรือยิงปืนสุดมันส์ เช่น Dead Cells, Sifu, Katana ZERO",
        icon: "Flame",
        points: { category: "indie-action", tags: ["Fast-Paced", "2D Action"], targetGameIds: ["katana-zero", "dead-cells", "sifu", "ghostrunner-2"] }
      },
      {
        label: "มีเวลายาวๆ วันหยุด ดื่มด่ำโลกกว้าง 40 - 100+ ชั่วโมง",
        description: "โลกเปิด RPG อภิมหาโปรเจกต์ เช่น Elden Ring, Cyberpunk 2077, Hollow Knight",
        icon: "Globe",
        points: { category: "action", tags: ["Open World", "Souls-like"], targetGameIds: ["elden-ring", "cyberpunk-2077", "hollow-knight"] }
      }
    ]
  },
  {
    id: 2,
    question: "เวลากดเล่นเกมแล้ว 'ตัวละครตายซ้ำๆ' คุณรู้สึกอย่างไรมากที่สุด?",
    description: "วัดระดับความพร้อมในการเผชิญหน้ากับความยากและความท้าทาย",
    options: [
      {
        label: "ไม่ชอบหัวร้อน อยากเล่นชิลล์ๆ เสพภาพ เสพเพลง บรรยากาศอบอุ่น",
        description: "เกมสบายๆ เล่นเพลิน มีเสน่ห์ ผ่อนคลายสมอง",
        icon: "Smile",
        points: { difficulty: "Easy", tags: ["เล่นเพลิน ผ่อนคลาย", "ดนตรีไพเราะ"], targetGameIds: ["dave-the-diver", "balatro"] }
      },
      {
        label: "ท้าทายได้พอประมาณ ขอให้เกมเพลย์ลื่นไหล มีระบบช่วยหรืออัปเกรดตัวเก่งขึ้นได้",
        description: "ความยากระดับมาตรฐานที่คุ้มค่าทุกครั้งที่เล่นซ้ำ",
        icon: "Sparkles",
        points: { difficulty: "Medium", tags: ["Roguelike", "Platformer"], targetGameIds: ["hades", "celeste", "tunic", "ori-and-the-will-of-the-wisps"] }
      },
      {
        label: "ยิ่งยากยิ่งชอบ! บอสยิ่งตบตายยิ่งสะใจ ขอการดวลดาบหรือบอสไฟต์สุดหิน!",
        description: "สายฮาร์ดคอร์ Souls-like และเกมท้าทายฝีมือสูงสุด",
        icon: "Skull",
        points: { difficulty: "Soulslike", tags: ["Souls-like", "ยากท้าทาย", "ปัดป้องดาบ (Deflect)"], targetGameIds: ["sekiro", "elden-ring", "lies-of-p", "hollow-knight", "ultrakill"] }
      }
    ]
  },
  {
    id: 3,
    question: "องค์ประกอบไหนที่ทำให้คุณ 'อิน' กับเกมมากที่สุด?",
    description: "เลือกหัวใจหลักของประสบการณ์เกมที่คุณต้องการ",
    options: [
      {
        label: "ระบบการต่อสู้ (Combat) ที่คมกริบ ตอบสนองเร็ว ฟันหรือยิงมันส์สะใจ",
        description: "เน้นปฏิกิริยา Reflex, การแพรี่, คอมโบสวยงาม",
        icon: "Sword",
        points: { category: "action", tags: ["Fast-Paced", "ปัดป้องดาบ (Deflect)", "FPS สุดเดือด"], targetGameIds: ["sekiro", "doom-eternal", "ultrakill", "ghostrunner-2", "armored-core-vi"] }
      },
      {
        label: "งานศิลปะ ดนตรี และความลับที่ซ่อนอยู่ในโลกของเกม",
        description: "ภาพวาดมีเอกลักษณ์ ดนตรีตราตรึง และการค้นพบสิ่งที่ซ่อนอยู่",
        icon: "Palette",
        points: { category: "indie", tags: ["Metroidvania", "ดนตรีไพเราะ", "Pixel Art"], targetGameIds: ["hollow-knight", "ori-and-the-will-of-the-wisps", "celeste", "tunic"] }
      },
      {
        label: "อิสระในการสร้าง Build / ปรับแต่งตัวละคร และคอมโบพลังโกง",
        description: "การจัดเซ็ตไอเทม อาวุธ การ์ด หรือชิ้นส่วนหุ่นยนต์",
        icon: "Cpu",
        points: { category: "indie-action", tags: ["Roguelike", "Customization"], targetGameIds: ["balatro", "hades", "risk-of-rain-2", "armored-core-vi", "cyberpunk-2077"] }
      }
    ]
  },
  {
    id: 4,
    question: "แพลตฟอร์มหลักที่คุณมักใช้เล่นเกมคืออะไร?",
    description: "เราจะช่วยคัดเลือกเกมที่มีให้บริการบนเครื่องของคุณอย่างดีที่สุด",
    options: [
      {
        label: "PC / Steam / Steam Deck (เล่นบนคอมหรือเครื่องพกพา PC)",
        description: "รองรับคลังเกมอินดี้และแอคชั่นที่ครอบคลุมที่สุด",
        icon: "Monitor",
        points: { targetGameIds: ["hades", "hollow-knight", "balatro", "elden-ring", "dead-cells", "ultrakill"] }
      },
      {
        label: "คอนโซล PlayStation 5 / Xbox Series X|S ต่อทีวีจอยักษ์",
        description: "ภาพอลังการ เสียงกระหึ่ม เฟรมเรตลื่นไหล",
        icon: "Gamepad2",
        points: { targetGameIds: ["elden-ring", "cyberpunk-2077", "sekiro", "lies-of-p", "armored-core-vi"] }
      },
      {
        label: "Nintendo Switch หรือเล่นบนมือถือ (เน้นพกพาสะดวก)",
        description: "หยิบมาเล่นได้ทุกที่ ทุกเวลา นอนเล่นบนเตียง",
        icon: "Smartphone",
        points: { targetGameIds: ["balatro", "hollow-knight", "celeste", "dave-the-diver", "dead-cells"] }
      }
    ]
  }
];

export interface ArchetypeResult {
  title: string;
  subtitle: string;
  badge: string;
  descriptionTh: string;
  traitsTh: string[];
  recommendedGameIds: string[];
}

export const ARCHETYPES: Record<string, ArchetypeResult> = {
  hardcore_duelist: {
    title: "The Master Duelist (ยอดนักดวลสะบั้นดาบ)",
    subtitle: "สายบอสไฟต์ สมาธิเหล็กกล้า ปัดป้องเสี้ยววินาที",
    badge: "⚔️ สายฮาร์ดคอร์แอคชั่น",
    descriptionTh: "คุณคือเกมเมอร์ที่ไม่ยอมแพ้ต่อความยาก ยิ่งบอสโหดยิ่งปลุกไฟในตัวคุณ ทุกจังหวะแพรี่และคอมโบดาบคือความสุขที่แท้จริงของคุณ",
    traitsTh: ["ความอดทนและสมาธิสูงเลิศ", "ชื่นชอบระบบการต่อสู้ที่ลึกซึ้ง", "ภาคภูมิใจเมื่อผ่านอุปสรรคหินๆ"],
    recommendedGameIds: ["sekiro", "elden-ring", "lies-of-p", "sifu"]
  },
  indie_explorer: {
    title: "The Soulful Wanderer (นักผจญภัยเสพงานศิลป์)",
    subtitle: "สายดื่มด่ำบรรยากาศ ดนตรีเพราะ เนื้อเรื่องลึกซึ้ง",
    badge: "🎨 สายอินดี้มาสเตอร์พีซ",
    descriptionTh: "คุณมองวิดีโอเกมเป็นงานศิลปะ คุณหลงรักโลกที่ถูกสร้างอย่างประณีต ดนตรีที่กินใจ และการค้นพบความลับที่ไม่มีใครบอก",
    traitsTh: ["ชื่นชอบเพลงประกอบและภาพสวย", "รักการสำรวจแบบไร้รอยต่อ", "ชอบเกมที่มีความหมายและปมประเด็นลึกซึ้ง"],
    recommendedGameIds: ["hollow-knight", "ori-and-the-will-of-the-wisps", "celeste", "tunic"]
  },
  combo_rogue: {
    title: "The Build Crafter (จอมวางแผนคอมโบมหากาฬ)",
    subtitle: "สาย Roguelike เล่นซ้ำไม่มีเบื่อ สร้างบิลด์สุดโกง",
    badge: "🃏 สายคอมโบดูดเวลา",
    descriptionTh: "คุณชื่นชอบการทดลองผสมผสานไอเทม การ์ด หรือพรเทพเจ้าเพื่อสร้างตัวละครที่ทรงพลังไร้เทียมทาน ทุกรอบการเล่นคือความสดใหม่เสมอ",
    traitsTh: ["ชอบการคิดคำนวณและ Synergy", "เล่นซ้ำได้เป็นร้อยชั่วโมง", "สนุกกับการเสี่ยงดวงและกลยุทธ์"],
    recommendedGameIds: ["hades", "balatro", "dead-cells", "risk-of-rain-2"]
  },
  adrenaline_rusher: {
    title: "The Cyber Adrenaline (มือสังหารความเร็วแสง)",
    subtitle: "สาย Fast-Paced FPS ปาร์กูร์เลือดสาด ไวสะใจ",
    badge: "⚡ สายสปีดเดือดทะลุปรอท",
    descriptionTh: "คุณต้องการความเร็ว แสงไฟนีออน และเพลงเมทัล/ซินธ์เวฟที่เร้าอารมณ์ ไม่มีการหยุดพัก ยิง ฟัน สไลด์ แดช อย่างต่อเนื่องไม่มีสะดุด",
    traitsTh: ["ปฏิกิริยา Reflex ฉับไว", "ชอบเพลงร็อก/ซินธ์เวฟเร้าใจ", "บู๊ลุยแหลกไม่ต้องคิดเยอะ"],
    recommendedGameIds: ["doom-eternal", "ultrakill", "ghostrunner-2", "katana-zero"]
  },
  cozy_diver: {
    title: "The Cozy Adventurer (นักผจญภัยสายสโลว์ไลฟ์)",
    subtitle: "สายเล่นเพลิน คลายเครียด สนุกกับทุกช่วงเวลา",
    badge: "🌊 สายผ่อนคลายเพลิดเพลิน",
    descriptionTh: "เกมสำหรับคุณคือการได้ผ่อนคลายจากวันที่เหน็ดเหนื่อย ดำน้ำ ล่าปลา ทำอาหาร หรือเล่นไพ่ฟังสบายโดยไม่ต้องกังวลเรื่องการตายหรือหัวร้อน",
    traitsTh: ["รักความอบอุ่นและเสียงหัวเราะ", "ชอบเกมเพลย์ที่เข้าถึงง่าย", "เล่นได้ยาวๆ ไม่เครียด"],
    recommendedGameIds: ["dave-the-diver", "balatro", "celeste", "tunic"]
  }
};
