"use client";
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, Variants } from 'framer-motion';
import { 
  Instagram, 
  MessageCircle, 
  Code2,
  Zap,
  Mail,
  Fingerprint,
  User,
  Box,
  Target
} from "lucide-react";

// Types
interface SocialLink {
  icon: React.ReactNode;
  link: string;
}

interface Service {
  title: string;
  icon: React.ReactNode;
  desc: string;
}

export default function RotsWebLanding() {
  
  const whatsappLink = "https://wa.me/972547891342"; 
  const instagramLink = "https://www.instagram.com/rots.web";
  const emailLink = "mailto:idanrots@gmail.com"; 
  const personalInstagramLink = "https://www.instagram.com/idanrots";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { stiffness: 80, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const socialLinks: SocialLink[] = [
    { icon: <Instagram size={22} />, link: instagramLink },
    { icon: <Mail size={22} />, link: emailLink },
    { icon: <MessageCircle size={22} />, link: whatsappLink }
  ];

  const services: Service[] = [
    { 
      title: "Eco-System דיגיטלי", 
      icon: <Box strokeWidth={1.5} />, 
      desc: "מכרטיסי ביקור חכמים (NFC) ועד אתרי פרימיום ומערכות אוטומציה. אנחנו בונים את המעטפת הדיגיטלית המלאה לעסק שלך." 
    },
    { 
      title: "DNA עיצובי אישי", 
      icon: <Fingerprint strokeWidth={1.5} />, 
      desc: "אין מוצר שחוזר על עצמו. חוויית UI/UX ייחודית שנתפרת מאפס לערכי המותג שלך, ללא שימוש בתבניות מוכנות." 
    },
    { 
      title: "מנוע להמרות ומכירה", 
      icon: <Target strokeWidth={1.5} />, 
      desc: "ביצועים חסרי פשרות שחותרים לתוצאה אחת: הנעה לפעולה ושיח ישיר עם הלקוח. אתר שלא רק נראה טוב - אלא עובד בשבילך." 
    }
  ];

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Spotlight Effect Handler 
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white overflow-x-hidden scroll-smooth relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div 
        className="pointer-events-none fixed inset-0 z-[60] h-full w-full opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),transparent_100%)]" 
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-zinc-900/20 to-transparent"></div>
      </div>

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
        className="md:hidden fixed bottom-6 left-0 right-0 z-[55] flex justify-center px-6 pointer-events-none"
      >
        <motion.a 
          whileTap={{ scale: 0.92 }}
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="pointer-events-auto flex items-center justify-center gap-3 w-full py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold tracking-widest uppercase shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
        >
          <span>התחל פרויקט</span>
          <MessageCircle size={16} />
        </motion.a>
      </motion.div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.03] bg-[#050505]/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <motion.div initial={{ opacity: 0, filter: "blur(5px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1 }} className="flex items-center gap-3 cursor-pointer">
                <span className="text-2xl font-bold tracking-tighter text-zinc-100 uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  rots<span className="text-zinc-500 font-light">.web</span>
                </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center">
                <motion.a whileTap={{ scale: 0.95 }} href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-700/40 bg-white/[0.02] hover:bg-white text-zinc-300 hover:text-black font-bold text-xs transition-all duration-500 tracking-widest uppercase hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <span className="hidden sm:block">בואו נדבר</span>
                    <MessageCircle size={14} className="group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
            </motion.div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-6 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          <div className="text-right order-1 z-20">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <h1 className="text-6xl md:text-7xl lg:text-[90px] font-extrabold mb-8 leading-[0.95] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-sm flex flex-col gap-2">
                <motion.span variants={textVariants}>עיצוב שקט.</motion.span>
                <motion.span variants={textVariants} className="bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">נוכחות חזקה.</motion.span>
              </h1>
              
              <motion.p variants={textVariants} className="text-xl text-zinc-500/95 max-w-lg mb-12 font-medium leading-relaxed tracking-[0.03em]">
                אנחנו יוצרים חוויות רשת נקיות, מדויקות וממוקדות. <br />בלי רעשי רקע, רק עיצוב פרימיום.
              </motion.p>
              
              <motion.div variants={textVariants} className="hidden md:flex flex-col sm:flex-row gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-white/10 via-zinc-400/20 to-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700 animate-spin-slow pointer-events-none"></div>
                  <motion.a whileTap={{ scale: 0.95 }} href={whatsappLink} target="_blank" rel="noopener noreferrer" className="relative px-10 py-5 bg-zinc-100 text-black rounded-full font-bold transition-all hover:bg-white hover:scale-[1.02] flex items-center justify-center gap-3 tracking-tight text-lg uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <span>התחלת פרויקט</span>
                    <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                  </motion.a>
                </div>
                <motion.a whileTap={{ scale: 0.95 }} href="#services" className="px-10 py-5 rounded-full border border-zinc-800 bg-transparent hover:bg-zinc-900 transition-all font-medium text-zinc-400 hover:text-white flex items-center justify-center tracking-widest uppercase text-xs">
                  המומחיות שלנו
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} 
            className="relative order-2 flex flex-col items-center w-full perspective-1000 mt-12 lg:mt-0"
          >
            <motion.div style={{ rotateX, rotateY }} className="relative w-full max-w-[450px] rounded-[2rem] bg-white/[0.015] backdrop-blur-[30px] border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col items-center p-10 lg:p-12 gap-10 overflow-hidden">
               
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none"></div>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full relative z-10">
                  <motion.div 
                    animate={{ y: [-4, 4, -4] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-[110px] h-[230px] bg-[#0A0A0A] border-[4px] border-zinc-800/80 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center shrink-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35px] h-[10px] bg-zinc-800 rounded-b-xl z-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none"></div>
                    <div className="flex flex-col items-center w-full mt-7 space-y-3 z-10 px-3">
                       <div className="w-10 h-10 rounded-full bg-zinc-800 p-[1px] shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                          <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center">
                             <User size={16} className="text-zinc-500" />
                          </div>
                       </div>
                       <div className="text-center w-full">
                          <div className="text-[10px] font-bold text-zinc-300 tracking-tight">DIGITAL CARD</div>
                       </div>
                       <div className="w-full space-y-1.5 mt-2">
                          <div className="w-full h-6 rounded-md flex items-center justify-center bg-zinc-100 text-black text-[8px] font-bold uppercase shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                             Save
                          </div>
                       </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [4, -4, 4] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex flex-col items-center shrink-0 z-10"
                  >
                    <div className="w-[200px] sm:w-[240px] h-[130px] sm:h-[150px] bg-[#050505] border-[4px] border-zinc-800/80 rounded-t-xl relative overflow-hidden shadow-inner flex flex-col">
                       <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/[0.01] to-white/[0.05] pointer-events-none"></div>
                       <div className="w-full h-full flex flex-col z-10 px-3 py-2 opacity-90">
                          <div className="flex justify-between items-center w-full border-b border-zinc-800/50 pb-2">
                             <div className="w-8 h-1 bg-zinc-800 rounded-full"></div>
                             <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
                             </div>
                          </div>
                          <div className="flex flex-col items-center justify-center mt-5 gap-2">
                             <div className="w-3/4 h-3 bg-zinc-500/40 rounded-sm"></div>
                             <div className="w-1/2 h-1 bg-zinc-800 rounded-sm"></div>
                             <div className="w-12 h-3 bg-white/90 rounded-full mt-2 shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
                          </div>
                       </div>
                    </div>
                    <div className="w-[240px] sm:w-[280px] h-[10px] bg-zinc-800/90 rounded-b-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)]"></div>
                  </motion.div>
               </div>
               
               <motion.a 
                  whileTap={{ scale: 0.95 }}
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full h-14 bg-zinc-100 text-black rounded-full flex items-center justify-center gap-3 font-bold text-sm hover:bg-white transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] mt-2 tracking-widest uppercase relative z-10 md:hidden"
               >
                  <span>התחלת פרויקט</span>
                  <MessageCircle size={14} />
               </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-32 relative z-10 bg-zinc-950/20 border-t border-zinc-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-12 md:mb-20 relative"
          >
            <h2 className="text-4xl font-bold text-zinc-100 tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">המומחיות שלנו</h2>
            <div className="h-px w-12 bg-zinc-600 mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((item, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.15, ease: "easeOut" } }
                } as Variants}
                onMouseMove={handleSpotlight}
                whileTap={{ scale: 0.98 }}
                className="group relative p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/[0.03] transition-all duration-500 overflow-hidden"
              >
                <div 
                  className="hidden md:block pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)` }}
                />
                
                <div className="relative z-10 w-12 h-12 mb-8 rounded-2xl bg-zinc-900/80 border border-white/[0.02] flex items-center justify-center text-zinc-500 group-hover:text-white md:group-hover:scale-110 md:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="relative z-10 text-2xl font-bold mb-4 text-zinc-100 tracking-tight drop-shadow-sm">{item.title}</h3>
                <p className="font-['Segoe_UI',_system-ui,_sans-serif] relative z-10 text-zinc-500/90 text-base leading-relaxed tracking-[0.03em] font-normal">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-32 md:pb-12 px-6 text-center relative z-10 border-t border-zinc-900/40 bg-[#030303]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-5xl mx-auto relative z-10 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-12 text-zinc-300 tracking-tighter uppercase relative">
            <span className="absolute -inset-4 blur-2xl bg-white/5 rounded-full pointer-events-none"></span>
            READY TO <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">CREATE?</span>
          </h2>
          
          <div className="flex justify-center gap-8 mb-24 relative z-10">
            {socialLinks.map((social, i) => (
              <motion.a 
                key={i} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.15, color: "#fff", filter: "drop-shadow(0px 0px 8px rgba(255,255,255,0.8))" }}
                whileTap={{ scale: 0.9 }}
                className="text-zinc-600 transition-all duration-300 bg-zinc-900/50 p-3 rounded-full border border-white/[0.02] hover:border-white/20 hover:bg-zinc-800"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col items-center w-full relative z-10">
            <div className="text-2xl font-bold tracking-tighter text-zinc-100 uppercase mb-8">
                rots<span className="text-zinc-600 font-light">.web</span>
            </div>
            <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-6"></div>
            <p className="text-zinc-600 font-bold text-[10px] tracking-[0.4em] uppercase">
              © 2026 • BUILT BY <a href={personalInstagramLink} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">IDAN ROTSHTEIN</a>
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}