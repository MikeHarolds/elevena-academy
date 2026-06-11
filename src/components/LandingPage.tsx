import { useState } from 'react';
import {
  Sparkles, BookOpen, Code, Brain, Palette, GraduationCap,
  Shield, ShieldCheck, Users, Clock, Star, CheckCircle,
  ChevronDown, ChevronUp, Heart, Lock, Eye, MessageSquare,
  Smartphone, Award, FileText, Search, Presentation,
  Globe, AlertTriangle, Phone, Mail, User, Zap,
  Rocket, Menu, X, Bot, Wand2, Monitor, Wifi, Home as HomeIcon,
  DollarSign, Trophy, ChevronRight, LogIn
} from 'lucide-react';

export interface Registration {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAge: string;
  course: string;
  ticketType: string;
  numChildren: string;
  consent: boolean;
  updates: boolean;
  registeredAt: string;
  status: 'pending' | 'paid' | 'confirmed';
}

export function saveRegistration(reg: Omit<Registration, 'id' | 'registeredAt' | 'status'>) {
  const registrations: Registration[] = JSON.parse(localStorage.getItem('Elevena_registrations') || '[]');
  const newReg: Registration = {
    ...reg,
    id: `REG-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    registeredAt: new Date().toISOString(),
    status: 'pending',
  };
  registrations.push(newReg);
  localStorage.setItem('Elevena_registrations', JSON.stringify(registrations));
  return newReg;
}



// ==================== NAVBAR ====================
function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'What We Offer', href: '#offer' },
    { label: 'Courses', href: '#courses' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Safety', href: '#safety' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Register', href: 'https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0A1E]/95 backdrop-blur-xl border-b border-violet-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-[Fredoka_One] text-white">
              Elevena Wealth <span className="text-violet-400">Academy</span>
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-violet-400 font-semibold transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}

          </div>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2 text-gray-300 hover:text-violet-400 hover:bg-white/5 rounded-lg font-semibold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setIsOpen(false); onAdminClick(); }}
              className="block w-full text-left px-4 py-2 text-gray-500 hover:text-violet-400 hover:bg-white/5 rounded-lg font-semibold transition-colors"
            >
              Admin Login
            </button>
            <a
              href="https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00"
              className="block text-center bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm mt-2"
              onClick={() => setIsOpen(false)}
            >
              Register Now 🚀
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

// ==================== HERO SECTION ====================
function Hero() {
  return (
    <section id="hero" className="hero-gradient pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-32 left-20 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-violet-500/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-violet-300">Online Learning Camp for Kids Ages 5–16</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Fredoka_One] text-white leading-tight mb-6">
              Turn Your Child's
              <span className="gradient-text block">Holiday Into a</span>
              <span className="gradient-text-warm">Superpower! 🦸</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A fun, structured online learning camp for ages 5–16 in French, Spanish, Web Dev, and Design
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all animate-pulse-glow"
              >
                <Rocket className="w-5 h-5" />
                Reserve Your Child's Spot
              </a>
              <a
                href="#offer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-violet-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all border border-violet-500/20"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {['🧒🏽', '👧🏻', '🧒🏼', '👧🏾'].map((emoji, i) => (
                  <div key={i} className="w-10 h-10 bg-[#231B3A] rounded-full flex items-center justify-center text-lg shadow-md border-2 border-[#231B3A]" style={{ zIndex: 4 - i }}>
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-gray-500 font-semibold">Trusted by 500+ families</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-violet-500/20 bg-[#1A1230]">
              <img
                src="/images/hero-children.png"
                alt="Cartoon children learning together on a laptop"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-6 bg-[#231B3A] rounded-2xl p-4 shadow-xl border border-violet-500/20 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">100% Online</p>
                  <p className="text-xs text-gray-400">Learn from home</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 md:top-4 md:-right-6 bg-[#231B3A] rounded-2xl p-4 shadow-xl border border-violet-500/20 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">AI Powered</p>
                  <p className="text-xs text-gray-400">Future skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== WHAT WE OFFER ====================
function WhatWeOffer() {
  const offers = [
    { icon: <Bot className="w-8 h-8" />, title: 'French & Spanish Language Learning', desc: 'Kids practise speaking, reading, and writing basic French and Spanish through games, songs, and interactive exercises — building confidence in a fun, age-appropriate way.', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-500/10', borderColor: 'border-violet-500/20' },
    { icon: <Code className="w-8 h-8" />, title: 'Introduction to Web Development', desc: 'Children create their first web page and learn the basics of coding using visual, hands-on exercises that make programming exciting and understandable.', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
    { icon: <Brain className="w-8 h-8" />, title: 'Digital Literacy & Online Safety', desc: 'Children learn how to navigate the digital world safely, understanding responsible online behaviour and developing critical thinking around content.', color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
    { icon: <Palette className="w-8 h-8" />, title: 'Showcase and Presentation', desc: 'Children share their language, coding, and design creations with parents, boosting confidence, communication, and pride in their achievements.', color: 'from-pink-500 to-rose-500', bg: 'bg-pink-500/10', borderColor: 'border-pink-500/20' },
    { icon: <Wand2 className="w-8 h-8" />, title: 'Problem Solving Skills', desc: 'Fun challenges and puzzles that develop computational thinking and logical reasoning.', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    { icon: <Presentation className="w-8 h-8" />, title: 'Showcase & Presentations', desc: 'Children present their creations to parents, building confidence and communication skills.', color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-500/10', borderColor: 'border-teal-500/20' },
  ];

  return (
    <section id="offer" className="py-16 md:py-24 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-violet-500/10 text-violet-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-violet-500/20">
            ✨ What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-[Fredoka_One] text-white mb-4">
            A Camp Packed With
            <span className="gradient-text"> Future Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our online camp is designed to give your child a head start in languages, Web Development, and digital creativity — all while having fun and staying engaged!
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {offers.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} rounded-2xl p-6 md:p-8 card-hover border ${item.borderColor}`}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== OUTCOME ====================
function Outcome() {
  const outcomes = [
    { emoji: '🗣️', title: 'Daily cartoon-style conversation bursts in French & Spanish.' },
    { emoji: '🌐', title: 'Foundations of HTML, CSS, and showcasing projects online.' },
    { emoji: '🎯', title: 'Mindful routines and project planning for ages 5–16.' },
    { emoji: '🛡️', title: 'Poster briefs that stretch imagination and focus.' },
    { emoji: '🏆', title: 'Certificate of Completion and digital badges' },
    { emoji: '📣', title: 'Progress recaps, recordings, and certificates straight to you.' },
  ];

  return (
    <section className="py-16 md:py-24 section-dark-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-violet-500/20 bg-[#1A1230]">
              <img
                src="/images/girl-learning.png"
                alt="Cartoon girl learning online at home"
                className="w-full h-72 md:h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#231B3A] rounded-2xl p-5 shadow-xl border border-violet-500/20 hidden md:block">
              <div className="text-center">
                <p className="text-4xl font-[Fredoka_One] gradient-text">6hrs</p>
                <p className="text-sm font-bold text-gray-400">Of Structured Learning</p>
              </div>
            </div>
          </div>
          <div>
            <span className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-emerald-500/20">🎯 Learning Outcomes</span>
            <h2 className="text-3xl md:text-4xl font-[Fredoka_One] text-white mb-6">What Your Child Will <span className="gradient-text">Take Away</span></h2>
            <p className="text-gray-400 text-lg mb-8">After 6 Months - 1 Year of fun-filled learning, your child will walk away with real digital skills and creative confidence.</p>
            <div className="space-y-4">
              {outcomes.map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#231B3A]/80 rounded-xl p-4 border border-violet-500/10 card-hover">
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="font-semibold text-gray-300">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== WHO IT'S FOR ====================
function WhoItsFor() {
  const groups = [
    { emoji: '🧒', title: 'Curious Kids Ages 5–7', desc: 'Fun, simple, and colourful activities in French, Spanish, basic digital creativity, shapes, colours, songs, and guided design tasks. Perfect for young learners who need gentle support.', color: 'border-pink-500/30 bg-pink-500/10' },
    { emoji: '👦', title: 'Creative Minds Ages 8–11', desc: 'Interactive French and Spanish practice, beginner web page activities, creative graphics projects, and simple digital tasks that help children build confidence while learning.', color: 'border-blue-500/30 bg-blue-500/10' },
    { emoji: '🧑‍💻', title: 'Future Builders Ages 12–16', desc: 'More focused learning in language communication, web development basics, design layouts, digital projects, and presentation skills. Ideal for children ready to build practical future skills.', color: 'border-violet-500/30 bg-violet-500/10' },
  ];

  return (
    <section className="py-16 md:py-24 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-amber-500/20">👨‍👩‍👧‍👦 Who Is This For?</span>
          <h2 className="text-3xl md:text-5xl font-[Fredoka_One] text-white mb-4">Designed for <span className="gradient-text">Every Young Learner</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Whether your child is a beginner or already tech-savvy, our camp adapts to different age groups and skill levels.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {groups.map((group, i) => (
            <div key={i} className={`${group.color} border-2 rounded-2xl p-6 md:p-8 text-center card-hover`}>
              <span className="text-6xl block mb-4">{group.emoji}</span>
              <h3 className="text-xl font-bold text-white mb-3">{group.title}</h3>
              <p className="text-gray-400">{group.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-3xl overflow-hidden shadow-xl shadow-violet-500/10 border border-violet-500/20 bg-[#1A1230]">
          <img
            src="/images/classroom-children.png"
            alt="Cartoon children learning together in a classroom"
            className="w-full h-56 md:h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// ==================== RESERVE SPOT ====================
function ReserveSpot() {
  const benefits = [
    { icon: <HomeIcon className="w-6 h-6" />, title: 'No travel', desc: 'Learn from the comfort of home' },
    { icon: <Clock className="w-6 h-6" />, title: 'No drop-off or pick-up', desc: 'No stressful logistics' },
    { icon: <DollarSign className="w-6 h-6" />, title: 'Lower cost', desc: 'Than many physical holiday clubs' },
    { icon: <Trophy className="w-6 h-6" />, title: 'Tangible outcomes', desc: 'Real digital learning results' },
  ];

  return (
    <section className="py-16 md:py-24 section-dark-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-600/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="inline-block bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-amber-500/20">🏡 A Smarter Holiday Activity From Home</span>
            <h2 className="text-3xl md:text-4xl font-[Fredoka_One] text-white mb-6">Reserve Your Child's <span className="text-amber-400">Spot</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">Many physical holiday clubs cost more once you add travel, food, logistics and sibling costs. This online camp gives your child <strong className="text-white">6 hours of structured, future-focused learning</strong> from home.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="bg-[#231B3A]/80 rounded-xl p-5 border border-violet-500/10 card-hover flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20">{b.icon}</div>
                  <div><p className="font-bold text-white">{b.title}</p><p className="text-sm text-gray-400">{b.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-violet-500/20 bg-[#1A1230]">
              <img
                src="/images/girl-laptop.png"
                alt="Cartoon girl using laptop for learning"
                className="w-full h-72 md:h-[450px] object-cover"
              />
            </div>
            <div className="absolute -top-4 left-4 bg-[#231B3A] rounded-2xl p-4 shadow-xl border border-violet-500/20 animate-float">
              <div className="flex items-center gap-2"><span className="text-2xl">🎯</span><div><p className="font-bold text-white text-sm">6 Hours</p><p className="text-xs text-gray-400">Structured learning</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== ALL INCLUDED ====================
function AllIncluded() {
  const bonuses = [
    { num: 'BONUS 1', icon: <ShieldCheck className="w-7 h-7" />, title: 'Parent Guide to Online Learning', desc: 'Simple guidance to help parents support their child’s learning at home.', color: 'from-red-400 to-rose-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { num: 'BONUS 2', icon: <Zap className="w-7 h-7" />, title: 'Language Practice Cheat Sheet', desc: 'Fun French and Spanish exercises, words, and phrases children can practise after the camp.', color: 'from-amber-400 to-yellow-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { num: 'BONUS 3', icon: <BookOpen className="w-7 h-7" />, title: 'Web & Design Workbook', desc: 'A creative workbook with mini coding and design projects to reinforce skills learned during the camp.', color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { num: 'BONUS 4', icon: <Award className="w-7 h-7" />, title: 'Certificate of Completion', desc: 'Elevena Academy certificate to celebrate their achievement.', color: 'from-violet-400 to-purple-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { num: 'BONUS 5', icon: <Star className="w-7 h-7" />, title: 'AI Creator Badge', desc: 'Fun badges recognising your child’s accomplishments in web development and creative design.', color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { num: 'BONUS 6', icon: <Users className="w-7 h-7" />, title: 'Parent Showcase Invitation', desc: 'Parents are invited to view and celebrate what their child created during the camp.', color: 'from-pink-400 to-rose-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { num: 'BONUS 7', icon: <Globe className="w-7 h-7" />, title: 'Kids Learning Hub Preview', desc: 'A preview of pathways for ongoing language, coding, and design learning after the camp.', color: 'from-teal-400 to-cyan-500', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    { num: 'BONUS 8', icon: <Search className="w-7 h-7" />, title: 'Digital Safety & Tips Guide', desc: 'Practical tips for children to stay safe online and use digital tools responsibly.', color: 'from-indigo-400 to-blue-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  ];

  return (
    <section className="py-16 md:py-24 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-violet-500/10 text-violet-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-violet-500/20">🎁 All Included</span>
          <h2 className="text-3xl md:text-5xl font-[Fredoka_One] text-white mb-4">Included When You <span className="gradient-text">Register</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Seven bonuses bundled with every ticket — designed to keep the learning going.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonuses.map((b, i) => (
            <div key={i} className={`${b.bg} rounded-2xl p-6 card-hover ${b.border} border relative overflow-hidden`}>
              <div className="absolute top-3 right-3"><span className="text-[10px] font-bold bg-white/5 text-gray-500 px-2 py-0.5 rounded-full">{b.num}</span></div>
              <div className={`w-14 h-14 bg-gradient-to-br ${b.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>{b.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== COURSES DATA ====================
interface CourseData {
  title: string;
  desc: string;
  fullDesc: string;
  image: string | null;
  icon?: string;
  age: string;
  duration: string;
  sessions: string;
  price: string;
  color: string;
  borderColor: string;
  tag: string;
  gradientBg?: boolean;
  highlights: string[];
  curriculum: { day: string; title: string; topics: string[] }[];
  outcomes: string[];
  requirements: string[];
}

const coursesData: CourseData[] = [
  {
    title: 'Web Development for Kids',
    desc: 'Children learn to build their own websites using HTML, CSS & JavaScript — real coding skills made fun and accessible.',
    fullDesc: 'This hands-on course teaches children how to build real websites from scratch. Using beginner-friendly tools, kids will learn HTML to structure pages, CSS to style them beautifully, and basic JavaScript to add interactivity. By the end of the course, every child will have a live website they built themselves — a portfolio piece they can proudly share with family and friends.',
    image: '/images/course-webdev.png',
    age: 'Ages 7–16',
    duration: '6 Months',
    sessions: '6 sessions (2hrs each)',
    price: '£30 Monthly',
    color: 'from-violet-500 to-blue-500',
    borderColor: 'border-violet-500/25',
    tag: '💻 Most Popular',
    highlights: ['Build a real website', 'Learn HTML, CSS & JS basics', 'No experience needed', 'Take home a live site'],
    curriculum: [
      { day: 'Month 1-2', title: 'Getting Started with HTML', topics: ['What is a website?', 'Your first HTML page', 'Headings, paragraphs & images', 'Links and lists'] },
      { day: 'Month 3-4', title: 'Styling with CSS', topics: ['Adding colours and fonts', 'Backgrounds and borders', 'Layout basics with flexbox', 'Making it look amazing'] },
      { day: 'Month 5-6', title: 'Interactivity & Publishing', topics: ['Introduction to JavaScript', 'Adding buttons and alerts', 'Simple animations', 'Publishing your website live'] },
    ],
    outcomes: ['A published personal website', 'Understanding of web fundamentals', 'Confidence to continue coding', 'Certificate of completion'],
    requirements: ['A laptop or computer with internet', 'No prior coding experience needed', 'Curiosity and enthusiasm!'],
  },
  {
    title: 'Canva Design for Kids',
    desc: 'Kids explore graphic design by creating posters, cards, and social media graphics using Canva — unleashing their inner artist.',
    fullDesc: 'This creative course introduces children to the world of digital design using Canva — a fun, drag-and-drop design platform. Kids will learn about colours, typography, layout and composition while creating real projects like posters, greeting cards, presentation slides and social media graphics. Perfect for young artists who love to create and express themselves visually.',
    image: '/images/course-canva.png',
    age: 'Ages 6–14',
    duration: '6 Months',
    sessions: '4 sessions (2hrs each)',
    price: '£30 Monthly',
    color: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-500/25',
    tag: '🎨 Creative',
    highlights: ['Create real design projects', 'Learn design principles', 'Use Canva confidently', 'Build a creative portfolio'],
    curriculum: [
      { day: 'Month 1-3', title: 'Design Basics & Canva Fundamentals', topics: ['Introduction to Canva', 'Understanding colours and fonts', 'Working with shapes and images', 'Create your first poster'] },
      { day: 'Month 4-6', title: 'Creative Projects & Portfolio', topics: ['Designing greeting cards', 'Creating presentation slides', 'Social media graphics', 'Building your design portfolio'] },
    ],
    outcomes: ['A digital design portfolio', 'Understanding of design principles', 'Canva proficiency', 'Certificate of completion'],
    requirements: ['A laptop or tablet with internet', 'No design experience needed', 'A love for creativity!'],
  },
  {
    title: 'French Language for Kids',
    desc: 'A fun, interactive introduction to French — children learn greetings, colours, numbers and everyday phrases through games and songs.',
    fullDesc: 'Bonjour! This immersive French course makes language learning exciting for children. Through interactive games, songs, stories and role-play, kids will learn everyday French vocabulary and phrases. The course covers greetings, colours, numbers, animals, food, family members and basic conversation — all taught in a way that feels like play, not study.',
    image: '/images/course-french.png',
    age: 'Ages 5–12',
    duration: '6 Months - 1 year',
    sessions: '8 sessions (1.5hrs each)',
    price: '£30 Monthly',
    color: 'from-blue-500 to-indigo-500',
    borderColor: 'border-blue-500/25',
    tag: '🇫🇷 Language',
    highlights: ['Learn French through play', 'Native speaker methods', 'Songs, games & stories', 'Everyday conversation skills'],
    curriculum: [
      { day: '1 - 3 Months', title: 'Bonjour! Greetings & Introductions', topics: ['Saying hello and goodbye', 'My name is… How are you?', 'Numbers 1–20', 'French songs and rhymes'] },
      { day: '4 - 6 Months', title: 'Colours, Animals & the World Around Us', topics: ['Colours in French', 'Animal names and sounds', 'Days of the week', 'Weather expressions'] },
      { day: '7 - 9 Months', title: 'Food, Family & Daily Life', topics: ['French food vocabulary', 'Family members', 'Likes and dislikes', 'Simple sentences'] },
      { day: '10 - 12 Months', title: 'Conversations & Celebration', topics: ['Ordering food in French', 'Asking and answering questions', 'Role-play activities', 'French culture & celebration'] },
    ],
    outcomes: ['200+ French vocabulary words', 'Basic conversation ability', 'Cultural awareness', 'Certificate of completion'],
    requirements: ['A laptop or computer with internet', 'No French experience needed', 'A willingness to have fun!'],
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Kids discover how AI works through hands-on experiments — training models, creating AI art and understanding smart technology.',
    fullDesc: 'This fascinating course demystifies Artificial Intelligence for young minds. Children will learn how AI works through fun, hands-on experiments — training machine learning models, creating AI-generated art, understanding how voice assistants work, and exploring the ethics of AI. The course balances technical understanding with creativity, giving kids a real head start in the technology shaping their future.',
    image: '/images/course-ai.png',
    age: 'Ages 8–16',
    duration: '3 Months',
    sessions: '6 sessions (2hrs each)',
    price: '£30 Monthly',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/25',
    tag: '🤖 STEM',
    highlights: ['Train a real AI model', 'Create AI-generated art', 'Understand how AI thinks', 'Explore AI ethics & safety'],
    curriculum: [
      { day: 'Month 1', title: 'What is AI? How Machines Learn', topics: ['What is Artificial Intelligence?', 'How machines learn from data', 'Training vs inference', 'AI in everyday life'] },
      { day: 'Month 2', title: 'Hands-On AI Experiments', topics: ['Training an image classifier', 'Creating AI-generated art', 'Natural language processing', 'Building a simple chatbot'] },
      { day: 'Month 3', title: 'AI Safety & Future Skills', topics: ['Spotting AI mistakes', 'Deepfakes and misinformation', 'AI ethics for kids', 'Your future with AI'] },
    ],
    outcomes: ['Understanding of AI fundamentals', 'Hands-on ML experience', 'AI safety awareness', 'Certificate of completion'],
    requirements: ['A laptop or computer with internet', 'No AI experience needed', 'Curiosity about technology!'],
  },
  {
    title: 'Scratch Coding & Games',
    desc: 'Children build their own interactive games and animations using Scratch — a visual coding platform designed just for young learners.',
    fullDesc: 'Scratch is the world\'s most popular coding platform for kids, and this course teaches children how to use it to create their own games, animations and interactive stories. Using colourful drag-and-drop code blocks, kids learn programming concepts like loops, conditions, variables and events — all while having a blast building projects they can share with friends and family.',
    image: '/images/course-scratch.png',
    age: 'Ages 5–12',
    duration: '6 Months',
    sessions: '6 sessions (2hrs each)',
    price: '£30 Monthly',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/25',
    tag: '🎮 Fun',
    highlights: ['Build your own games', 'Visual drag-and-drop coding', 'No reading required', 'Share projects online'],
    curriculum: [
      { day: 'Month 1', title: 'Your First Scratch Project', topics: ['Introduction to Scratch', 'Sprites, backdrops and sounds', 'Moving and animating characters', 'Create a simple animation'] },
      { day: 'Month 2', title: 'Building Interactive Games', topics: ['Loops and conditions', 'Scoring and variables', 'Collision detection', 'Build a catching game'] },
      { day: 'Month 3', title: 'Advanced Projects & Sharing', topics: ['Creating a platformer game', 'Adding levels and power-ups', 'Sharing your project online', 'Game design showcase'] },
    ],
    outcomes: ['2-3 completed games', 'Understanding of coding logic', 'Problem-solving skills', 'Certificate of completion'],
    requirements: ['A laptop or computer with internet', 'No coding experience needed', 'Imagination and creativity!'],
  },
  {
    title: 'Python Programming',
    desc: 'A beginner-friendly introduction to Python — kids write real code, solve puzzles, and build mini projects while learning core logic.',
    fullDesc: 'Python is one of the world\'s most popular programming languages, and this course makes it accessible for young learners. Children will write real Python code from day one — solving puzzles, building calculators, creating text-based games and automating simple tasks. The course emphasises logical thinking and problem-solving while keeping things fun and achievable for young coders.',
    image: '/images/course-python.png',
    age: 'Ages 9–16',
    duration: '6 Months',
    sessions: '8 sessions (2hrs each)',
    price: '£30 Monthly',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/25',
    tag: '🐍 Coding',
    highlights: ['Write real Python code', 'Build mini projects', 'Learn programming logic', 'Industry-standard language'],
    curriculum: [
      { day: 'Month 1-2', title: 'Python Basics & First Programs', topics: ['What is Python?', 'Variables and data types', 'Print statements and input', 'Build a simple calculator'] },
      { day: 'Month 3-4', title: 'Logic & Decision Making', topics: ['If/else statements', 'Loops (for and while)', 'Building a number guessing game', 'Creating patterns with code'] },
      { day: 'Month 5', title: 'Functions & Data Structures', topics: ['Writing functions', 'Lists and dictionaries', 'Working with text', 'Build a quiz program'] },
      { day: 'Month 6', title: 'Final Project & Beyond', topics: ['Text-based adventure game', 'Turtle graphics art', 'Debugging techniques', 'Next steps in Python'] },
    ],
    outcomes: ['Multiple Python projects', 'Core programming concepts', 'Logical thinking skills', 'Certificate of completion'],
    requirements: ['A laptop or computer with internet', 'Basic keyboard skills', 'No Python experience needed'],
  },
  {
    title: 'Spanish Language for Kids',
    desc: 'A fun, interactive introduction to Spanish — children learn greetings, colours, numbers and everyday',
    fullDesc: '¡Hola! This immersive Spanish course makes language learning exciting for children. Through interactive games, songs, stories and role-play, kids will learn everyday Spanish vocabulary and phrases. The course covers greetings, colours, numbers, animals, food, family members and basic conversation, all taught in a way that feels like play, not study.',
    image: '/images/spanish-image.png',
    icon: '🎨',
    age: 'Ages 6–14',
    duration: '6 Months - 1 Year',
    sessions: '4 sessions (2hrs each)',
    price: '£30 Monthly',
    color: 'from-fuchsia-500 to-pink-500',
    borderColor: 'border-fuchsia-500/25',
    tag: ' Language',
    gradientBg: true,
    highlights: ['Learn Spanish through play', 'Native speaker methods', 'Songs, games and stories', 'Everyday conversation skills'],
    curriculum: [
      { day: 'Month 1-3', title: 'Hola! Greetings and Introductions', topics: ['Saying hello and goodbye', 'My name is… How are you?', 'Numbers 1–100', 'Spanish songs and rhymes'] },
      { day: 'Month 3-6', title: 'Colours, Animals & the World Around Us', topics: ['Colours in French', 'Animal names and sounds', 'Days of the week', 'Weather expressions'] },
      { day: 'Month 6 - 9', title: 'Food, Family & Daily Life', topics: ['Spanish food vocabulary', 'Family members', 'Likes and dislikes', 'Simple sentences'] },
      { day: 'Month 9 - 12', title: 'Conversations & Celebration', topics: ['Ordering food in Spanish', 'Asking and answering questions', 'Role-play activities', 'Spanish culture & celebration'] },
    ],
    outcomes: ['200+ Spanish vocabulary words', 'Basic conversation ability', 'Cultural awareness', 'Certificate of completion'],
    requirements: ['A laptop or tablet with internet', 'No Spanish experience needed', 'A willingness to have fun!'],
  },
  // {
  //   title: 'Maths & Problem Solving',
  //   desc: 'Interactive maths challenges and logic puzzles that make numbers exciting — building confidence and critical thinking skills.',
  //   fullDesc: 'This course transforms maths from a subject into an adventure! Through interactive puzzles, logic challenges, pattern recognition and real-world problem solving, children develop a love for numbers. The course adapts to different age groups — younger children focus on number sense and patterns, while older children tackle logic puzzles, basic algebra concepts and mathematical thinking strategies.',
  //   image: null,
  //   icon: '🧮',
  //   age: 'Ages 5–14',
  //   duration: '6 Months - 1 Year',
  //   sessions: '6 sessions (1.5hrs each)',
  //   price: '£60',
  //   color: 'from-cyan-500 to-blue-500',
  //   borderColor: 'border-cyan-500/25',
  //   tag: '🧠 Logic',
  //   gradientBg: true,
  //   highlights: ['Make maths fun', 'Logic puzzles & challenges', 'Build number confidence', 'Critical thinking skills'],
  //   curriculum: [
  //     { day: 'Day 1', title: 'Numbers & Patterns Adventure', topics: ['Fun with numbers', 'Pattern recognition', 'Number puzzles and tricks', 'Mental maths strategies'] },
  //     { day: 'Day 2', title: 'Logic & Problem Solving', topics: ['Logic puzzles and riddles', 'Word problem strategies', 'Spatial reasoning challenges', 'Working backwards technique'] },
  //     { day: 'Day 3', title: 'Maths Games & Brain Teasers', topics: ['Maths-based board games', 'Strategy and probability', 'Real-world maths challenges', 'Maths competition style questions'] },
  //   ],
  //   outcomes: ['Improved number confidence', 'Problem-solving strategies', 'Logical thinking skills', 'Certificate of completion'],
  //   requirements: ['A laptop or computer with internet', 'No advanced maths needed', 'A curious mind!'],
  // },
];

// ==================== COURSE DETAIL MODAL ====================
function CourseDetailModal({ course, onClose }: { course: CourseData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-8 md:pt-16 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#140E28] rounded-3xl shadow-2xl shadow-violet-500/20 max-w-4xl w-full border border-violet-500/20 overflow-hidden mb-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${course.color} flex items-center justify-center`}>
              <span className="text-9xl opacity-60">{course.icon}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140E28] via-[#140E28]/60 to-transparent" />

          {/* Tag & Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-white/10">
              {course.tag}
            </span>
            <h2 className="text-2xl md:text-4xl font-[Fredoka_One] text-white">{course.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Users className="w-4 h-4" />, label: 'Age Range', value: course.age },
              { icon: <Clock className="w-4 h-4" />, label: 'Duration', value: course.duration },
              { icon: <GraduationCap className="w-4 h-4" />, label: 'Sessions', value: course.sessions },
              { icon: <DollarSign className="w-4 h-4" />, label: 'Price', value: course.price },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1A1230] rounded-xl p-4 border border-violet-500/10 text-center">
                <div className="flex items-center justify-center gap-1.5 text-violet-400 mb-1">{stat.icon}<span className="text-xs font-semibold text-gray-500">{stat.label}</span></div>
                <p className="font-bold text-white text-sm">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-400" /> Course Overview
            </h3>
            <p className="text-gray-300 leading-relaxed">{course.fullDesc}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" /> Course Highlights
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {course.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 bg-violet-500/5 rounded-lg p-3 border border-violet-500/10">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-gray-300">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-violet-400" /> Curriculum Breakdown
            </h3>
            <div className="space-y-4">
              {course.curriculum.map((day, i) => (
                <div key={i} className="bg-[#1A1230] rounded-2xl overflow-hidden border border-violet-500/10">
                  {/* Day Header */}
                  <div className={`bg-gradient-to-r ${course.color} px-5 py-3 flex items-center gap-3`}>
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-white/70 text-xs font-bold uppercase">{day.day}</p>
                      <p className="text-white font-bold text-sm">{day.title}</p>
                    </div>
                  </div>
                  {/* Topics */}
                  <div className="p-5">
                    <div className="grid sm:grid-cols-2 gap-2">
                      {day.topics.map((topic, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color} shrink-0`} />
                          <span className="text-sm text-gray-400">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Learning Outcomes */}
            <div className="bg-emerald-500/5 rounded-2xl p-5 border border-emerald-500/15">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5" /> What Your Child Will Gain
              </h3>
              <div className="space-y-2">
                {course.outcomes.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-gray-300">{o}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-amber-500/5 rounded-2xl p-5 border border-amber-500/15">
              <h3 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> What You'll Need
              </h3>
              <div className="space-y-2">
                {course.requirements.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-sm text-gray-300">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00"
              onClick={onClose}
              className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r ${course.color} text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all`}
            >
              <GraduationCap className="w-5 h-5" />
              Enrol in This Course
            </a>
            <button
              onClick={onClose}
              className="px-8 py-4 rounded-xl font-bold text-gray-400 bg-[#1A1230] border border-violet-500/15 hover:bg-white/5 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== COURSES SECTION ====================
function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  return (
    <>
      <section id="courses" className="py-16 md:py-24 section-dark-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block bg-violet-500/10 text-violet-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-violet-500/20">
              📚 Our Courses
            </span>
            <h2 className="text-3xl md:text-5xl font-[Fredoka_One] text-white mb-4">
              Exciting Courses for <span className="gradient-text">Every Interest</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From coding to languages — choose the perfect course to spark your child's passion for learning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coursesData.map((course, i) => (
              <div
                key={i}
                className={`group bg-[#231B3A]/80 rounded-2xl overflow-hidden card-hover border ${course.borderColor} relative flex flex-col`}
              >
                {/* Course Image */}
                <div className="relative h-44 overflow-hidden">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                      <span className="text-7xl opacity-80">{course.icon}</span>
                    </div>
                  )}
                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {course.tag}
                    </span>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231B3A] via-transparent to-transparent" />
                </div>

                {/* Course Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{course.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{course.desc}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5" />
                      <span>{course.age}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{course.price}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${course.color} text-white py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-[1.02] transition-all`}
                  >
                    Explore Course
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <a
              href="https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all"
            >
              <GraduationCap className="w-5 h-5" />
              View All Courses & Register
            </a>
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  );
}

// ==================== PRICING ====================
function Pricing() {
  const plans = [
    { name: 'Early Bird', price: '£60', desc: 'Limited places', features: ['Full 6 Months - 1 Year class access', 'All 8 bonuses included', 'Certificate & badge', 'Parent showcase invite'], cta: 'Secure Early Bird Place', color: 'from-amber-400 to-orange-500', popular: false },
    { name: 'Standard Child Ticket', price: '£75', desc: 'Full 6 Months - 1 Year online class access', features: ['Full 6 Months - 1 Year camp access', 'All 8 bonuses included', 'Certificate & badge', 'Parent showcase invite', 'Priority support'], cta: 'Register Your Child', color: 'from-violet-500 to-blue-500', popular: true },
    { name: 'Sibling Ticket', price: '£60', desc: 'For additional children', features: ['Full 6 Months - 1 Year class access', 'All 8 bonuses included', 'Certificate & badge', 'Parent showcase invite'], cta: 'Book Sibling Place', color: 'from-emerald-400 to-green-500', popular: false },
    { name: 'Family Bundle', price: '£150', desc: 'Up to 3 children', features: ['Full 6 Months - 1 Year class for 3 kids', 'All 8 bonuses per child', 'Certificates & badges', 'Parent showcase invite', 'Best value for families'], cta: 'Choose Family Bundle', color: 'from-pink-400 to-rose-500', popular: false },
  ];

//   return (
//     <section id="pricing" className="py-16 md:py-24 section-dark-alt">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12 md:mb-16">
//           <span className="inline-block bg-violet-500/10 text-violet-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-violet-500/20">💰 Simple Family-Friendly Pricing</span>
//           <h2 className="text-3xl md:text-5xl font-[Fredoka_One] text-white mb-4">Choose the Right <span className="gradient-text">Plan for Your Family</span></h2>
//         </div>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {plans.map((plan, i) => (
//             <div key={i} className={`bg-[#231B3A]/80 rounded-2xl p-6 md:p-8 card-hover relative border ${plan.popular ? 'border-violet-500/40 shadow-xl shadow-violet-500/10 ring-1 ring-violet-500/30' : 'border-violet-500/10'}`}>
//               {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR ⭐</div>}
//               <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
//               <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
//               <div className="mb-6"><span className="text-4xl font-[Fredoka_One] text-white">{plan.price}</span></div>
//               <div className="space-y-3 mb-8">
//                 {plan.features.map((f, j) => (
//                   <div key={j} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /><span className="text-sm text-gray-400">{f}</span></div>
//                 ))}
//               </div>
//               <a href="https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00" className={`block text-center bg-gradient-to-r ${plan.color} text-white py-3 rounded-full font-bold hover:shadow-lg transition-all`}>{plan.cta}</a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
}

// ==================== SAFETY FIRST ====================
function SafetyFirst() {
  const safetyItems = [
    { icon: <Users className="w-5 h-5" />, text: 'Parent or responsible adult should be nearby during sessions' },
    { icon: <MessageSquare className="w-5 h-5" />, text: 'No private messaging between facilitators and children' },
    { icon: <Eye className="w-5 h-5" />, text: 'Session chat will be moderated' },
    { icon: <Lock className="w-5 h-5" />, text: 'Children are reminded not to share private information' },
    { icon: <Shield className="w-5 h-5" />, text: 'AI tools are demonstrated and guided responsibly' },
    { icon: <Heart className="w-5 h-5" />, text: 'Age-appropriate examples only' },
    { icon: <FileText className="w-5 h-5" />, text: 'Parent consent is required for registration' },
    { icon: <Smartphone className="w-5 h-5" />, text: 'Recordings, screenshots or testimonials are only used with parent permission' },
  ];

  return (
    <section id="safety" className="py-16 md:py-24 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <span className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-emerald-500/20">🛡️ Safety First</span>
            <h2 className="text-3xl md:text-4xl font-[Fredoka_One] text-white mb-6">Built With Children's <span className="text-emerald-400">Online Safety</span> in Mind</h2>
            <div className="space-y-4 mb-8">
              {safetyItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/20">{item.icon}</div>
                  <p className="text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-500/5 rounded-2xl p-6 border border-emerald-500/20">
              <p className="text-gray-300 leading-relaxed"><strong className="text-emerald-400">Our goal</strong> is to create a safe, positive and creative online learning space where children can explore AI with confidence. 💚</p>
            </div>
          </div>
          <div>
            <div className="bg-[#231B3A]/80 rounded-2xl p-8 border border-violet-500/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20"><Lock className="w-6 h-6 text-white" /></div>
                <h3 className="text-xl font-bold text-white">Data Protection</h3>
              </div>
              <h4 className="font-bold text-white text-lg mb-3">We Keep Children's Information Minimal and Protected</h4>
              <p className="text-gray-400 mb-6">We only collect the information needed to register your child and deliver the camp safely.</p>
              <div className="space-y-3 mb-6">
                {['Parent/guardian name', 'Parent/guardian email and phone', 'Child\'s first name', 'Child\'s age range', 'Parent consent preferences'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400 shrink-0" /><span className="text-gray-400 text-sm">{item}</span></div>
                ))}
              </div>
              <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
                <p className="text-sm text-gray-400 leading-relaxed"><AlertTriangle className="w-4 h-4 text-amber-400 inline mr-1" />Children will <strong className="text-white">not</strong> be asked to share private information such as home address, school name, passwords or personal account details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FAQ ====================
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-violet-500/15 rounded-xl overflow-hidden bg-[#231B3A]/50">
      <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-bold text-white pr-4">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-violet-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-violet-400 shrink-0" />}
      </button>
      {isOpen && <div className="px-5 pb-5 pt-0"><p className="text-gray-400 leading-relaxed">{answer}</p></div>}
    </div>
  );
}

function FAQ() {
  const faqs = [
    { q: 'What is AI Creator Camp for Kids Online?', a: 'It\'s a fun, structured 6 Months - 1 Year online camp where children aged 5-16 learn about AI, create digital projects, build web pages, and develop future-ready skills — all from the comfort of home.' },
    { q: 'Is it fully online?', a: 'Yes! The entire camp is delivered online via live, interactive sessions. Your child can join from home using a computer or laptop with internet access.' },
    { q: 'How long is each session?', a: 'The camp runs over 6 Months - 1 Year with 2-hour sessions each day, totaling 6 hours of structured learning, activities and creative projects.' },
    { q: 'Does my child need previous AI experience?', a: 'Not at all! The camp is beginner-friendly. Our facilitators guide children step-by-step, adapting to different age groups and experience levels.' },
    { q: 'Does my child need to create AI accounts?', a: 'No. AI tools are demonstrated by the facilitator. Children participate through guided activities without needing to create their own accounts.' },
    { q: 'Should a parent stay nearby?', a: 'Yes, we recommend a parent or responsible adult is nearby during sessions for safety and support, especially for younger children.' },
    { q: 'Is this safe for children?', a: 'Absolutely. We have comprehensive safety measures including moderated chats, no private messaging, responsible AI demonstration, age-appropriate content, and required parent consent.' },
    { q: 'Will the sessions be recorded?', a: 'Sessions may be recorded for quality purposes only with parent permission. Recordings are not shared publicly.' },
    { q: 'What will my child create?', a: 'Your child will create AI-generated artwork, build a simple web page, learn prompting skills, and complete a creative digital project they can showcase to you!' },
    { q: 'Is this like a normal holiday club?', a: 'It\'s better! No travel costs, no logistics, and your child gains tangible digital skills. Plus, all the fun and social interaction of a holiday club from home.' },
    { q: 'Does this require DBS checks?', a: 'Yes, all our facilitators undergo appropriate background checks including DBS clearance to ensure children\'s safety.' },
    { q: 'Will my child get a certificate?', a: 'Yes! Every child receives a Elevena Academy Certificate of Completion and an AI Creator Badge to celebrate their achievement.' },
    { q: 'What happens after the camp?', a: 'Your child receives a workbook, prompting cheat sheet, and access to the Kids Learning Hub preview for continued learning.' },
    { q: 'How do I register?', a: 'Simply fill out the registration form below with your details and your child\'s information. Complete the payment to secure their place.' },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 section-dark-alt">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-blue-500/20">❓ Got Questions?</span>
          <h2 className="text-3xl md:text-5xl font-[Fredoka_One] text-white mb-4">Parent Questions, <span className="gradient-text">Answered</span></h2>
        </div>
        <div className="space-y-3">{faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}</div>
      </div>
    </section>
  );
}

// ==================== REGISTRATION FORM ====================
function RegisterForm() {
  const [formData, setFormData] = useState({
    parentName: '', parentEmail: '', parentPhone: '', childName: '', childAge: '', course: '', ticketType: '', numChildren: '', consent: false, updates: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  const handleSubmit = () => {
    if (!formData.parentName || !formData.parentEmail || !formData.childName || !formData.consent) return;
    saveRegistration(formData);
    setSubmitted(true);
    setFormData({ parentName: '', parentEmail: '', parentPhone: '', childName: '', childAge: '', course: '', ticketType: '', numChildren: '', consent: false, updates: false });
  };

  const inputClass = "w-full pl-12 pr-4 py-3.5 rounded-xl border border-violet-500/20 bg-[#1A1230] text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all";
  const selectClass = "w-full px-4 py-3.5 rounded-xl border border-violet-500/20 bg-[#1A1230] text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all";

  // return (
  //   <section id="register" className="py-16 md:py-24 section-dark relative overflow-hidden">
  //     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-3xl" />
  //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
  //       <div className="text-center mb-12">
  //         <span className="inline-block bg-violet-500/10 text-violet-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-violet-500/20">📝 Registration</span>
  //         <h2 className="text-3xl md:text-5xl font-[Fredoka_One] text-white mb-4">Reserve Your Child's <span className="gradient-text">Spot</span></h2>
  //         <p className="text-gray-400 text-lg">Limited places. Beginner-friendly. Parent-aware.</p>
  //       </div>

  //       {submitted ? (
  //         <div className="bg-[#231B3A] rounded-3xl shadow-xl p-8 md:p-12 text-center border border-emerald-500/30">
  //           <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
  //             <CheckCircle className="w-10 h-10 text-emerald-400" />
  //           </div>
  //           <h3 className="text-2xl font-bold text-white mb-3">Registration Successful! 🎉</h3>
  //           <p className="text-gray-400 mb-6">Thank you for registering your child. We'll send a confirmation email with all the details.</p>
  //           <button onClick={() => setSubmitted(false)} className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">Register Another Child</button>
  //         </div>
  //       ) : (
  //         <div className="bg-[#231B3A]/80 rounded-3xl shadow-xl p-6 md:p-10 border border-violet-500/15 backdrop-blur-sm">
  //           <div className="grid md:grid-cols-2 gap-6">
  //             <div className="md:col-span-2">
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Parent / Guardian Full Name *</label>
  //               <div className="relative">
  //                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
  //                 <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Enter your full name" className={inputClass} />
  //               </div>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Parent / Guardian Email *</label>
  //               <div className="relative">
  //                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
  //                 <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
  //               </div>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Parent / Guardian Phone *</label>
  //               <div className="relative">
  //                 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
  //                 <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} placeholder="Your phone number" className={inputClass} />
  //               </div>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Child First Name *</label>
  //               <div className="relative">
  //                 <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
  //                 <input type="text" name="childName" value={formData.childName} onChange={handleChange} placeholder="Child's first name" className={inputClass} />
  //               </div>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Child Age *</label>
  //               <select name="childAge" value={formData.childAge} onChange={handleChange} className={selectClass}>
  //                 <option value="">Select age</option>
  //                 {Array.from({ length: 12 }, (_, i) => i + 5).map(age => <option key={age} value={age}>{age} years</option>)}
  //               </select>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Select Course *</label>
  //               <select name="course" value={formData.course} onChange={handleChange} className={selectClass}>
  //                 <option value="">Choose a course</option>
  //                 <option value="webdev">💻 Web Development for Kids</option>
  //                 <option value="canva">🎨 Canva Design for Kids</option>
  //                 <option value="french">🇫🇷 French Language for Kids</option>
  //                 <option value="ai">🤖 AI & Machine Learning</option>
  //                 <option value="scratch">🎮 Scratch Coding & Games</option>
  //                 <option value="python">🐍 Python Programming</option>
  //                 <option value="digitalart">🖌️ Digital Art & Illustration</option>
  //                 <option value="maths">🧮 Maths & Problem Solving</option>
  //               </select>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Ticket Type *</label>
  //               <select name="ticketType" value={formData.ticketType} onChange={handleChange} className={selectClass}>
  //                 <option value="">Choose ticket</option>
  //                 <option value="early">Early Bird – £60</option>
  //                 <option value="standard">Standard Child Ticket – £75</option>
  //                 <option value="sibling">Sibling Ticket – £60</option>
  //                 <option value="family">Family Bundle – £150</option>
  //               </select>
  //             </div>
  //             <div>
  //               <label className="block text-sm font-bold text-gray-300 mb-2">Number of Children *</label>
  //               <select name="numChildren" value={formData.numChildren} onChange={handleChange} className={selectClass}>
  //                 <option value="">Select number</option>
  //                 <option value="1">1</option>
  //                 <option value="2">2</option>
  //                 <option value="3">3</option>
  //               </select>
  //             </div>
  //             <div className="md:col-span-2 space-y-3 mt-2">
  //               <label className="flex items-start gap-3 cursor-pointer">
  //                 <input type="checkbox" name="consent" checked={formData.consent} onChange={handleCheckbox} className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#1A1230] text-violet-600 focus:ring-violet-500" />
  //                 <span className="text-sm text-gray-400">I confirm I am the parent/guardian and consent to my child attending this online camp. *</span>
  //               </label>
  //               <label className="flex items-start gap-3 cursor-pointer">
  //                 <input type="checkbox" name="updates" checked={formData.updates} onChange={handleCheckbox} className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#1A1230] text-violet-600 focus:ring-violet-500" />
  //                 <span className="text-sm text-gray-400">I agree to receive updates from Elevena Academy.</span>
  //               </label>
  //             </div>
  //           </div>
  //           <div className="mt-8 flex flex-col sm:flex-row gap-4">
  //             <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-violet-600 to-blue-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all flex items-center justify-center gap-2">
  //               <GraduationCap className="w-5 h-5" /> Complete Registration
  //             </button>
  //             <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
  //               <DollarSign className="w-5 h-5" /> Pay Now
  //             </button>
  //           </div>
  //           <div className="mt-4 text-center">
  //             <a href="https://wa.me/" className="inline-flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition-colors"><Phone className="w-5 h-5" />WhatsApp Us</a>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </section>
  // );
}

// ==================== PARENT TRUST ====================
function ParentTrust() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-violet-900 via-[#1A1040] to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">🤖</div>
        <div className="absolute bottom-10 right-10 text-9xl">🎨</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">💻</div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-[Fredoka_One] text-white mb-6">Trusted by Parents, Loved by Kids 💜</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join hundreds of families who have already discovered the power of AI learning for their children.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[{ num: '500+', label: 'Happy Children' }, { num: '6hrs', label: 'Of Fun Learning' }, { num: '8', label: 'Amazing Bonuses' }, { num: '100%', label: 'Online & Safe' }].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-violet-500/10">
              <p className="text-3xl md:text-4xl font-[Fredoka_One] text-white mb-1">{stat.num}</p>
              <p className="text-gray-400 text-sm font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-[#080612] text-white pt-16 pb-8 border-t border-violet-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20"><Sparkles className="w-6 h-6 text-white" /></div>
              <span className="text-xl font-[Fredoka_One]">Elevena<span className="text-violet-400">Academy</span></span>
            </div>
            <p className="text-gray-500 leading-relaxed">Empowering the next generation with AI, coding, and digital creativity skills.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[{ label: 'What We Offer', href: '#offer' }, { label: 'Pricing', href: '#pricing' }, { label: 'Safety', href: '#safety' }, { label: 'FAQ', href: '#faq' }, { label: 'Register', href: 'https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00' }].map((link) => (
                <a key={link.label} href={link.href} className="block text-gray-500 hover:text-violet-400 transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Camp Details</h4>
            <div className="space-y-3 text-gray-500">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-violet-400" /><span>6 Months - 1 Year, 2hrs per day</span></div>
              <div className="flex items-center gap-2"><Monitor className="w-4 h-4 text-violet-400" /><span>100% Online</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-violet-400" /><span>Ages 5–16</span></div>
              <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-violet-400" /><span>Live & Interactive</span></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-500">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-violet-400" /><span>hello@Elevenaacademy.co.uk</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-violet-400" /><span>+44 20 1234 5678</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-400" /><span>WhatsApp Us</span></div>
            </div>
            <div className="mt-6">
              <a href="https://buy.stripe.com/fZubIU4rE4184pQcOJ7IY00" className="inline-block bg-gradient-to-r from-violet-600 to-blue-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg transition-all">Register Now 🚀</a>
            </div>
          </div>
        </div>
        <div className="border-t border-violet-500/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Elevena Academy. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Safeguarding</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN LANDING PAGE ====================
export default function LandingPage({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <div className="min-h-screen bg-[#0F0A1E]">
      <Navbar onAdminClick={onAdminClick} />
      <Hero />
      <WhatWeOffer />
      <Outcome />
      <WhoItsFor />
      <ReserveSpot />
      <AllIncluded />
      <Courses />
      <Pricing />
      <ParentTrust />
      <SafetyFirst />
      <FAQ />
      <RegisterForm />
      <Footer />
    </div>
  );
}
