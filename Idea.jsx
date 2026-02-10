import { useState, useEffect, useRef, useCallback } from "react";

const useWidth = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return w;
};

const LANGS = {
  en: { name: "English", flag: "🇬🇧" }, hi: { name: "हिन्दी", flag: "🇮🇳" }, ta: { name: "தமிழ்", flag: "🇮🇳" },
  te: { name: "తెలుగు", flag: "🇮🇳" }, mr: { name: "मराठी", flag: "🇮🇳" }, bn: { name: "বাংলা", flag: "🇮🇳" },
  kn: { name: "ಕನ್ನಡ", flag: "🇮🇳" }, gu: { name: "ગુજરાતી", flag: "🇮🇳" }, ml: { name: "മലയാളം", flag: "🇮🇳" },
  pa: { name: "ਪੰਜਾਬੀ", flag: "🇮🇳" }, or: { name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
};

const UI = {
  en: {
    heroTag: "For Indian Families · Free During Beta",
    heroTitle1: "When someone you love passes away,",
    heroTitle2: "we guide you through the finances.",
    heroSub: "Banks, insurance, pension, property, taxes — we tell you exactly what to do, which forms to fill, which office to visit, and give you direct links to apply online. Step by step. Zero confusion.",
    startBtn: "Start Your Guided Journey →", startShort: "Get Started",
    noSignup: "No signup required · Takes 2 minutes",
    stat1: "₹2L Cr+", stat1l: "Unclaimed assets in India", stat1s: "Don't let your family's money be part of this",
    stat2: "500+", stat2l: "Hours spent by families", stat2s: "On post-death paperwork on average",
    stat3: "14+", stat3l: "Offices & processes", stat3s: "Banks, LIC, EPFO, courts, municipal offices...",
    feat1t: "Personalized Checklist", feat1d: "Answer 3 questions, get a complete action plan with exact steps, documents, office addresses & online links.",
    feat2t: "Direct Apply Links", feat2d: "No Googling. We give you the exact government portal link, form number, helpline, and office to visit.",
    feat3t: "AI Assistant", feat3d: "Ask any question in your language. Get clear, compassionate answers about claims, legal processes, or documents.",
    ctaTitle: "You don't have to figure this out alone.",
    ctaSub: "Let us carry the burden of paperwork while you take care of yourself and your family.",
    ctaBtn: "Begin Now — It's Free",
    step: "Step", of: "of",
    q1: "We're truly sorry for your loss. Who did you lose?", q1s: "This helps us personalize your action plan.",
    q2: "Which state are you in?", q2s: "Legal processes and offices vary by state.",
    q3: "What do you need help with most urgently?", q3s: "We'll prioritize your checklist based on this.",
    back: "Back",
    opt1: ["Spouse / Partner","Parent (Father)","Parent (Mother)","Sibling","Child","Other Family Member"],
    opt2: ["Maharashtra","Karnataka","Tamil Nadu","Delhi NCR","Uttar Pradesh","Gujarat","Rajasthan","West Bengal","Kerala","Telangana","Andhra Pradesh","Bihar","Odisha","Punjab","Other"],
    opt3: ["Everything — I don't know where to start","Bank accounts & FDs","Insurance claims (LIC/private)","Pension & retirement (EPF/PPF)","Property transfer","Legal certificates & court"],
    yourPlan: "Your personalized action plan", afterLosing: "After losing your",
    tasksFound: "tasks identified", completed: "completed",
    askAI: "🤖 Ask AI", closeAI: "✕ Close",
    docsRequired: "📄 Documents Required", whereToGet: "🔗 Where & How to Get This",
    applyOnline: "Apply Online", visitOffice: "📍 Office Visit Guide", helpline: "📞 Helpline",
    askAIHelp: "🤖 Ask AI for detailed help with this step",
    chatPlaceholder: "Ask anything about claims, documents...",
    chatEmpty: "Try: \"How to claim father's LIC policy?\" or \"Where to get succession certificate?\"",
    send: "Send", thinking: "AI is thinking...",
    langSelect: "Choose your language / अपनी भाषा चुनें", langSub: "Use AfterLoss in your preferred language",
    immediate: "Urgent", financial: "Financial", legal: "Legal", admin: "Admin",
    catEmoji: { immediate: "🚨", financial: "💰", legal: "⚖️", admin: "📋" },
  },
  hi: {
    heroTag: "भारतीय परिवारों के लिए · बीटा में मुफ़्त",
    heroTitle1: "जब आपका कोई अपना चला जाता है,",
    heroTitle2: "हम वित्तीय कामों में मार्गदर्शन करते हैं।",
    heroSub: "बैंक, बीमा, पेंशन, प्रॉपर्टी, टैक्स — हम बताते हैं क्या करना है, कौन सा फॉर्म भरना है, किस ऑफिस जाना है, और ऑनलाइन अप्लाई के डायरेक्ट लिंक देते हैं।",
    startBtn: "शुरू करें →", startShort: "शुरू करें",
    noSignup: "साइनअप ज़रूरी नहीं · 2 मिनट",
    stat1: "₹2L करोड़+", stat1l: "लावारिस संपत्ति", stat1s: "अपने परिवार का पैसा इसमें शामिल न होने दें",
    stat2: "500+", stat2l: "घंटे खर्च होते हैं", stat2s: "मृत्यु के बाद कागज़ी कार्रवाई में",
    stat3: "14+", stat3l: "दफ्तर और प्रक्रियाएं", stat3s: "बैंक, LIC, EPFO, कोर्ट, नगर पालिका...",
    feat1t: "व्यक्तिगत चेकलिस्ट", feat1d: "3 सवालों के जवाब दें, पूरी एक्शन प्लान पाएं — दस्तावेज़, ऑफिस पता और लिंक के साथ।",
    feat2t: "डायरेक्ट अप्लाई लिंक", feat2d: "गूगल करने की ज़रूरत नहीं। हर स्टेप के लिए सरकारी पोर्टल लिंक, फॉर्म नंबर और हेल्पलाइन।",
    feat3t: "AI सहायक", feat3d: "अपनी भाषा में कोई भी सवाल पूछें। दावों, कानूनी प्रक्रियाओं के स्पष्ट जवाब पाएं।",
    ctaTitle: "आपको अकेले यह सब नहीं समझना है।",
    ctaSub: "कागज़ी काम का बोझ हम उठाते हैं, आप अपना और परिवार का ख्याल रखें।",
    ctaBtn: "अभी शुरू करें — मुफ़्त",
    step: "चरण", of: "का",
    q1: "आपके नुकसान के लिए हमें दुख है। आपने किसे खोया?", q1s: "इससे हम आपकी एक्शन प्लान बनाएंगे।",
    q2: "आप किस राज्य में हैं?", q2s: "कानूनी प्रक्रिया हर राज्य में अलग होती है।",
    q3: "सबसे पहले किसमें मदद चाहिए?", q3s: "हम इसके हिसाब से प्राथमिकता तय करेंगे।",
    back: "वापस",
    opt1: ["पति/पत्नी","पिता","माता","भाई/बहन","बच्चा","अन्य सदस्य"],
    opt2: ["महाराष्ट्र","कर्नाटक","तमिलनाडु","दिल्ली NCR","उत्तर प्रदेश","गुजरात","राजस्थान","पश्चिम बंगाल","केरल","तेलंगाना","आंध्र प्रदेश","बिहार","ओडिशा","पंजाब","अन्य"],
    opt3: ["सब कुछ — समझ नहीं आ रहा","बैंक खाते और FD","बीमा दावे (LIC/प्राइवेट)","पेंशन (EPF/PPF)","प्रॉपर्टी ट्रांसफर","कानूनी प्रमाणपत्र"],
    yourPlan: "आपकी एक्शन प्लान", afterLosing: "खोने के बाद — आपके",
    tasksFound: "कार्य", completed: "पूरे हुए",
    askAI: "🤖 AI", closeAI: "✕ बंद",
    docsRequired: "📄 ज़रूरी दस्तावेज़", whereToGet: "🔗 कहाँ से और कैसे मिलेगा",
    applyOnline: "ऑनलाइन अप्लाई", visitOffice: "📍 ऑफिस गाइड", helpline: "📞 हेल्पलाइन",
    askAIHelp: "🤖 AI से विस्तार में पूछें",
    chatPlaceholder: "दावों, दस्तावेज़ों के बारे में पूछें...",
    chatEmpty: "पूछें: \"पिता की LIC पॉलिसी कैसे क्लेम करें?\"",
    send: "भेजें", thinking: "AI सोच रहा है...",
    langSelect: "अपनी भाषा चुनें", langSub: "AfterLoss अपनी भाषा में इस्तेमाल करें",
    immediate: "तुरंत", financial: "वित्तीय", legal: "कानूनी", admin: "प्रशासनिक",
    catEmoji: { immediate: "🚨", financial: "💰", legal: "⚖️", admin: "📋" },
  }
};
const getUI = l => UI[l] || UI.en;
const t = (obj, lang) => { if (!obj) return ""; if (typeof obj === "string") return obj; return obj[lang] || obj.hi || obj.en || ""; };

const TASKS = {
  immediate: [
    {
      id: 1, title: { en: "Obtain Death Certificate (5-10 copies)", hi: "मृत्यु प्रमाणपत्र प्राप्त करें (5-10 कॉपी)" },
      desc: { en: "The MOST important document. Every claim requires it. Apply at Municipal Corporation / Gram Panchayat within 21 days.", hi: "सबसे ज़रूरी दस्तावेज़। हर दावे के लिए चाहिए। 21 दिन में नगर निगम / ग्राम पंचायत में अप्लाई करें।" },
      priority: "critical", timeline: { en: "3-7 working days", hi: "3-7 कार्य दिवस" },
      docs: [
        { name: { en: "Hospital Death Summary / Doctor's Certificate", hi: "अस्पताल डेथ समरी / डॉक्टर का प्रमाणपत्र" }, where: { en: "Get from the hospital where death occurred → Medical Records dept. Usually free, 1-2 days.", hi: "जिस अस्पताल में मृत्यु हुई → Medical Records विभाग। मुफ़्त, 1-2 दिन।" }},
        { name: { en: "Aadhaar Card of deceased", hi: "मृतक का आधार कार्ड" }, where: { en: "If lost, download e-Aadhaar from myaadhaar.uidai.gov.in using registered mobile.", hi: "खो गया तो myaadhaar.uidai.gov.in से e-Aadhaar डाउनलोड करें।" }},
        { name: { en: "Proof of Address (Ration Card / Bill)", hi: "पते का प्रमाण (राशन कार्ड / बिल)" }, where: { en: "Any govt document with residential address. Electricity bill works everywhere.", hi: "कोई भी सरकारी दस्तावेज़। बिजली बिल हर जगह चलता है।" }},
      ],
      links: [
        { label: { en: "🌐 CRS Portal — Apply Online (All India)", hi: "🌐 CRS पोर्टल — ऑनलाइन अप्लाई" }, url: "https://crsorgi.gov.in/web/index.php/auth/signUp" },
        { label: { en: "🌐 Maharashtra — Aaplesarkar", hi: "🌐 महाराष्ट्र — आपले सरकार" }, url: "https://aaplesarkar.mahaonline.gov.in" },
        { label: { en: "🌐 Delhi — E-District", hi: "🌐 दिल्ली — E-District" }, url: "https://edistrict.delhigovt.nic.in" },
        { label: { en: "🌐 TN — E-Sevai", hi: "🌐 TN — E-Sevai" }, url: "https://www.tnesevai.tn.gov.in" },
      ],
      office: { en: "📍 Go to: Nearest Municipal Corporation / Gram Panchayat office\n→ Ask for: Birth & Death Registration counter\n→ Carry: Originals + 2 photocopies each\n→ Fee: ₹10-50 (varies by state)\n→ Tip: Go early morning. Get 10 copies — you'll need them everywhere.", hi: "📍 जाएं: नज़दीकी नगर निगम / ग्राम पंचायत\n→ पूछें: जन्म-मृत्यु पंजीकरण काउंटर\n→ ले जाएं: ओरिजिनल + 2 फोटोकॉपी\n→ फीस: ₹10-50\n→ टिप: सुबह जल्दी जाएं। 10 कॉपी लें — हर जगह लगेंगी।" },
      phone: { en: "📞 CRS Helpline: 1800-111-363 (Toll Free)", hi: "📞 CRS हेल्पलाइन: 1800-111-363 (टोल फ्री)" },
    },
    {
      id: 2, title: { en: "Inform Bank(s) & Freeze Accounts", hi: "बैंक को सूचित करें और खाते फ्रीज करें" },
      desc: { en: "Visit home branch IMMEDIATELY. Ask about ALL accounts, FDs, RDs, locker. Delay = risk of unauthorized withdrawal.", hi: "होम ब्रांच तुरंत जाएं। सभी खातों, FD, RD, लॉकर के बारे में पूछें। देरी = खतरा।" },
      priority: "critical", timeline: { en: "Within 1-2 days", hi: "1-2 दिन में" },
      docs: [
        { name: { en: "Death Certificate (original + copy)", hi: "मृत्यु प्रमाणपत्र (ओरिजिनल + कॉपी)" }, where: { en: "From Step 1. Carry 2 copies per bank.", hi: "स्टेप 1 से। हर बैंक के लिए 2 कॉपी।" }},
        { name: { en: "Your Aadhaar + PAN Card", hi: "आपका आधार + PAN कार्ड" }, where: { en: "PAN lost? Reprint: onlineservices.nsdl.com (₹50 fee)", hi: "PAN खोया? रीप्रिंट: onlineservices.nsdl.com (₹50)" }},
        { name: { en: "Deceased's Passbook / Account details", hi: "मृतक की पासबुक / अकाउंट डिटेल्स" }, where: { en: "If you don't have it, bank will print. Just give Aadhaar number.", hi: "नहीं है तो बैंक प्रिंट करेगा। बस आधार नंबर दें।" }},
        { name: { en: "Legal Heir Certificate (if no nominee)", hi: "कानूनी उत्तराधिकार प्रमाणपत्र (नॉमिनी न हो तो)" }, where: { en: "See Legal section below. If nominee exists, bank transfers directly.", hi: "नीचे कानूनी सेक्शन देखें। नॉमिनी है तो बैंक सीधे ट्रांसफर करता है।" }},
      ],
      links: [
        { label: { en: "📋 SBI — Forms Download", hi: "📋 SBI — फॉर्म डाउनलोड" }, url: "https://sbi.co.in/web/personal-banking/banking-forms" },
        { label: { en: "📋 HDFC — Forms", hi: "📋 HDFC — फॉर्म" }, url: "https://www.hdfcbank.com/personal/useful-links/forms-and-downloads" },
        { label: { en: "📋 PNB — Forms", hi: "📋 PNB — फॉर्म" }, url: "https://www.pnbindia.in/downloadforms.html" },
        { label: { en: "📋 BOB — Forms", hi: "📋 BOB — फॉर्म" }, url: "https://www.bankofbaroda.in/forms" },
      ],
      office: { en: "📍 Go to: Home branch of deceased's bank\n→ Meet: Branch Manager directly — explain the situation\n→ Ask for:\n  1) List of ALL accounts, FDs, RDs\n  2) Locker details\n  3) Any loans/liabilities\n  4) Nomination status of each account\n→ Get written acknowledgement with date\n→ Follow up after 7 days if no response", hi: "📍 जाएं: मृतक की बैंक की होम ब्रांच\n→ मिलें: ब्रांच मैनेजर से — स्थिति बताएं\n→ पूछें:\n  1) सभी खाते, FD, RD की सूची\n  2) लॉकर जानकारी\n  3) कोई लोन/देनदारी\n  4) हर खाते का नॉमिनेशन\n→ तारीख वाली रसीद लें\n→ 7 दिन बाद फॉलो अप करें" },
      phone: { en: "📞 SBI: 1800-11-2211 | HDFC: 1800-120-1243 | PNB: 1800-180-2222 | ICICI: 1800-200-3344 | BOB: 1800-102-4455", hi: "📞 SBI: 1800-11-2211 | HDFC: 1800-120-1243 | PNB: 1800-180-2222 | ICICI: 1800-200-3344 | BOB: 1800-102-4455" },
    },
    {
      id: 3, title: { en: "File Insurance Claim (LIC / Private)", hi: "बीमा दावा दर्ज करें (LIC / प्राइवेट)" },
      desc: { en: "Intimate insurer WITHIN 90 DAYS. Nominee = straightforward. No nominee = need legal heir certificate + indemnity bond.", hi: "90 दिन के अंदर बीमा कंपनी को सूचित करें। नॉमिनी = आसान। नॉमिनी नहीं = legal heir certificate चाहिए।" },
      priority: "critical", timeline: { en: "Intimate in 7 days, settlement 30-90 days", hi: "7 दिन में सूचित, सेटलमेंट 30-90 दिन" },
      docs: [
        { name: { en: "Original Policy Document", hi: "ओरिजिनल पॉलिसी" }, where: { en: "Home safe / bank locker / email (e-policy). Lost? LIC issues duplicate via Form 3783.", hi: "तिजोरी / बैंक लॉकर / ईमेल (e-policy)। खोई? LIC Form 3783 से डुप्लीकेट देता है।" }},
        { name: { en: "Death Certificate (original)", hi: "मृत्यु प्रमाणपत्र (ओरिजिनल)" }, where: { en: "LIC needs original — returned after verification.", hi: "LIC को ओरिजिनल चाहिए — वेरिफिकेशन बाद वापस।" }},
        { name: { en: "Your ID + Photo + Cancelled Cheque", hi: "आपकी ID + फोटो + कैंसल्ड चेक" }, where: { en: "Aadhaar + PAN + passport photo + cancelled cheque of YOUR bank account.", hi: "आधार + PAN + पासपोर्ट फोटो + आपके खाते का कैंसल्ड चेक।" }},
        { name: { en: "Claim Form 3816 (LIC Death Claim)", hi: "क्लेम फॉर्म 3816 (LIC)" }, where: { en: "Download from LIC site or get from branch. Called 'Claim Form A'.", hi: "LIC साइट से डाउनलोड या ब्रांच से लें। 'Claim Form A' कहते हैं।" }},
      ],
      links: [
        { label: { en: "🌐 LIC — Death Claim Online", hi: "🌐 LIC — ऑनलाइन मृत्यु दावा" }, url: "https://licindia.in/claim-services" },
        { label: { en: "📋 LIC Claim Form 3816", hi: "📋 LIC फॉर्म 3816" }, url: "https://licindia.in/claim-forms" },
        { label: { en: "🔍 Find Lost LIC Policies", hi: "🔍 खोई LIC पॉलिसी खोजें" }, url: "https://licindia.in/home/online-services" },
        { label: { en: "🌐 SBI Life Claims", hi: "🌐 SBI Life क्लेम" }, url: "https://www.sbilife.co.in/en/claims" },
        { label: { en: "🌐 HDFC Life Claims", hi: "🌐 HDFC Life क्लेम" }, url: "https://www.hdfclife.com/claims" },
        { label: { en: "🌐 ICICI Pru Claims", hi: "🌐 ICICI Pru क्लेम" }, url: "https://www.iciciprulife.com/services/death-claim.html" },
      ],
      office: { en: "📍 Go to: Nearest LIC branch (find at licindia.in/locate-us)\n→ Ask for: Claims Department\n→ Submit: All docs with covering letter\n→ Get: Acknowledgement receipt with date\n→ Follow up: After 15 days\n→ Private insurers: Call toll-free first, they may send agent to collect docs", hi: "📍 जाएं: नज़दीकी LIC ब्रांच (licindia.in/locate-us)\n→ पूछें: Claims Department\n→ जमा करें: सभी डॉक्स कवरिंग लेटर के साथ\n→ लें: तारीख वाली रसीद\n→ फॉलो अप: 15 दिन बाद\n→ प्राइवेट: पहले टोल-फ्री कॉल करें" },
      phone: { en: "📞 LIC: 022-68276827 | SBI Life: 1800-267-9090 | HDFC Life: 1860-267-9999 | ICICI Pru: 1860-266-7766", hi: "📞 LIC: 022-68276827 | SBI Life: 1800-267-9090 | HDFC Life: 1860-267-9999 | ICICI Pru: 1860-266-7766" },
    },
  ],
  financial: [
    {
      id: 4, title: { en: "Claim EPF (Provident Fund) Balance", hi: "EPF बैलेंस क्लेम करें" },
      desc: { en: "Salaried employee? File Form 20 (PF) + Form 10-D (Pension). Contact employer's HR first — they must certify the form.", hi: "नौकरीपेशा थे? Form 20 (PF) + Form 10-D (पेंशन) भरें। पहले HR से संपर्क करें — उन्हें फॉर्म प्रमाणित करना होगा।" },
      priority: "high", timeline: { en: "1-3 months", hi: "1-3 महीने" },
      docs: [
        { name: { en: "Form 20 + Form 10-D", hi: "Form 20 + Form 10-D" }, where: { en: "Download from EPFO. Employer HR must certify this — contact them first.", hi: "EPFO से डाउनलोड। HR को प्रमाणित करना होगा — पहले संपर्क करें।" }},
        { name: { en: "Death Certificate", hi: "मृत्यु प्रमाणपत्र" }, where: { en: "From Step 1.", hi: "स्टेप 1 से।" }},
        { name: { en: "Cancelled cheque + Aadhaar", hi: "कैंसल्ड चेक + आधार" }, where: { en: "Your bank account where PF amount should come.", hi: "आपका बैंक खाता जहां PF राशि आनी चाहिए।" }},
      ],
      links: [
        { label: { en: "🌐 EPFO — Online Claim (UAN Portal)", hi: "🌐 EPFO — ऑनलाइन क्लेम" }, url: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/" },
        { label: { en: "📋 Download Form 20 & 10-D", hi: "📋 Form 20 & 10-D डाउनलोड" }, url: "https://www.epfindia.gov.in/site_en/Forms.php" },
        { label: { en: "🔍 Check EPF Balance", hi: "🔍 EPF बैलेंस चेक" }, url: "https://passbook.epfindia.gov.in" },
        { label: { en: "📍 Find EPFO Office", hi: "📍 EPFO ऑफिस खोजें" }, url: "https://www.epfindia.gov.in/site_en/Regional_office.php" },
      ],
      office: { en: "📍 Step 1: Contact employer's HR — they certify Form 20\n→ Step 2: Submit at EPFO regional office\n→ Step 3: Track at passbook.epfindia.gov.in\n→ If employer uncooperative: File grievance at epfigms.gov.in", hi: "📍 पहले: HR से संपर्क — Form 20 प्रमाणित करें\n→ फिर: EPFO ऑफिस में जमा करें\n→ ट्रैक: passbook.epfindia.gov.in\n→ HR मदद न करे: epfigms.gov.in पर शिकायत" },
      phone: { en: "📞 EPFO: 1800-118-005 (Toll Free) | Grievance: epfigms.gov.in", hi: "📞 EPFO: 1800-118-005 | शिकायत: epfigms.gov.in" },
    },
    {
      id: 5, title: { en: "Transfer Mutual Funds", hi: "म्यूचुअल फंड ट्रांसफर करें" },
      desc: { en: "First find ALL holdings at MFCentral.com using deceased's PAN. Then write to each AMC with transmission request.", hi: "पहले MFCentral.com पर मृतक के PAN से सभी होल्डिंग्स खोजें। फिर हर AMC को ट्रांसमिशन रिक्वेस्ट लिखें।" },
      priority: "high", timeline: { en: "2-4 weeks per AMC", hi: "हर AMC के लिए 2-4 हफ़्ते" },
      docs: [
        { name: { en: "Transmission Form (from each AMC)", hi: "ट्रांसमिशन फॉर्म (हर AMC से)" }, where: { en: "Download from AMC website or visit office. Search '[AMC] transmission form death'.", hi: "AMC वेबसाइट से डाउनलोड या ऑफिस जाएं।" }},
        { name: { en: "Death Certificate + Your KYC", hi: "मृत्यु प्रमाणपत्र + आपका KYC" }, where: { en: "KYC not done? Do it at kra.ndml.in or cvlkra.com", hi: "KYC नहीं? kra.ndml.in या cvlkra.com से करें" }},
      ],
      links: [
        { label: { en: "🔍 MFCentral — Find ALL MF Holdings", hi: "🔍 MFCentral — सभी MF खोजें" }, url: "https://www.mfcentral.com" },
        { label: { en: "🔍 CAMS Statement", hi: "🔍 CAMS स्टेटमेंट" }, url: "https://www.camsonline.com/Investors/Statements/Consolidated-Account-Statement" },
        { label: { en: "🔍 KFintech Statement", hi: "🔍 KFintech स्टेटमेंट" }, url: "https://mfs.kfintech.com/investor" },
      ],
      office: { en: "📍 Check MFCentral.com first → then visit CAMS/KFintech nearest office with all documents.", hi: "📍 पहले MFCentral.com चेक करें → फिर CAMS/KFintech ऑफिस जाएं।" },
      phone: { en: "📞 CAMS: 1800-419-2267 | KFintech: 1800-309-4001 | MFCentral: 1800-266-1415", hi: "📞 CAMS: 1800-419-2267 | KFintech: 1800-309-4001 | MFCentral: 1800-266-1415" },
    },
  ],
  legal: [
    {
      id: 8, title: { en: "Get Legal Heir Certificate", hi: "उत्तराधिकार प्रमाणपत्र लें" },
      desc: { en: "ESSENTIAL if no nomination exists. Apply at Tehsildar / Revenue office or online via state e-District portal.", hi: "नॉमिनेशन नहीं है तो ज़रूरी। तहसीलदार या राज्य e-District पोर्टल से अप्लाई करें।" },
      priority: "high", timeline: { en: "15-45 days", hi: "15-45 दिन" },
      docs: [
        { name: { en: "Death Certificate", hi: "मृत्यु प्रमाणपत्र" }, where: { en: "From Step 1.", hi: "स्टेप 1 से।" }},
        { name: { en: "Aadhaar of ALL legal heirs", hi: "सभी उत्तराधिकारियों का आधार" }, where: { en: "All surviving family (spouse, children, parents) provide Aadhaar.", hi: "सभी जीवित परिवार सदस्य अपना आधार दें।" }},
        { name: { en: "Affidavit on ₹10 stamp paper", hi: "₹10 स्टैम्प पेपर पर शपथ पत्र" }, where: { en: "Get typed outside Tehsil (₹50-100), notarized at any Notary (₹50-200). States relationship + lists all heirs.", hi: "तहसील के बाहर टाइप करवाएं (₹50-100), नोटरी से नोटराइज़ (₹50-200)।" }},
        { name: { en: "Ration Card / Family ID", hi: "राशन कार्ड / फैमिली ID" }, where: { en: "If unavailable, two witnesses with Aadhaar can substitute.", hi: "नहीं है तो आधार वाले दो गवाह चलेंगे।" }},
      ],
      links: [
        { label: { en: "🌐 Maharashtra — Aaple Sarkar", hi: "🌐 महाराष्ट्र — आपले सरकार" }, url: "https://aaplesarkar.mahaonline.gov.in" },
        { label: { en: "🌐 Delhi — E-District", hi: "🌐 दिल्ली — E-District" }, url: "https://edistrict.delhigovt.nic.in" },
        { label: { en: "🌐 Karnataka — Kaveri", hi: "🌐 कर्नाटक — कावेरी" }, url: "https://kaveri2.karnataka.gov.in" },
        { label: { en: "🌐 Tamil Nadu — E-Sevai", hi: "🌐 TN — E-Sevai" }, url: "https://www.tnesevai.tn.gov.in" },
        { label: { en: "🌐 UP — E-Sathi", hi: "🌐 UP — E-Sathi" }, url: "https://edistrict.up.gov.in" },
        { label: { en: "🌐 Gujarat — Digital Gujarat", hi: "🌐 गुजरात — डिजिटल गुजरात" }, url: "https://www.digitalgujarat.gov.in" },
        { label: { en: "🌐 Telangana — Mee Seva", hi: "🌐 तेलंगाना — Mee Seva" }, url: "https://ts.meeseva.telangana.gov.in" },
        { label: { en: "📍 Find nearest CSC Center", hi: "📍 नज़दीकी CSC सेंटर खोजें" }, url: "https://locator.csccloud.in" },
      ],
      office: { en: "📍 Go to: Tehsildar / Naib-Tehsildar office of your area\n→ OR: Nearest CSC Center (find at locator.csccloud.in)\n→ Submit application → Patwari field inquiry (may visit home)\n→ Certificate issued\n→ Tip: Go early, carry originals + 3 photocopies each", hi: "📍 जाएं: अपने क्षेत्र का तहसीलदार कार्यालय\n→ या: नज़दीकी CSC सेंटर (locator.csccloud.in)\n→ आवेदन → पटवारी जांच → प्रमाणपत्र\n→ टिप: सुबह जाएं, ओरिजिनल + 3 कॉपी ले जाएं" },
      phone: { en: "📞 CSC: 1800-121-3468 (Toll Free) | Check state e-District for local helpline", hi: "📞 CSC: 1800-121-3468 | राज्य हेल्पलाइन e-District पर देखें" },
    },
    {
      id: 9, title: { en: "Property Mutation / Transfer", hi: "प्रॉपर्टी म्यूटेशन / ट्रांसफर" },
      desc: { en: "Transfer property records to heir's name. Urban: Municipal office. Rural: Tehsil. Called 'Mutation' or 'Dakhil Kharij'.", hi: "प्रॉपर्टी रिकॉर्ड उत्तराधिकारी के नाम करें। शहर: नगर पालिका। गांव: तहसील। 'म्यूटेशन' या 'दाखिल खारिज'।" },
      priority: "medium", timeline: { en: "1-6 months", hi: "1-6 महीने" },
      docs: [
        { name: { en: "Death Certificate + Legal Heir Certificate", hi: "मृत्यु प्रमाणपत्र + उत्तराधिकार प्रमाणपत्र" }, where: { en: "From previous steps.", hi: "पिछले स्टेप्स से।" }},
        { name: { en: "Original Property Documents (Sale Deed)", hi: "ओरिजिनल प्रॉपर्टी दस्तावेज़ (सेल डीड)" }, where: { en: "Home safe / bank locker. With loan? Bank holds it — contact loan dept.", hi: "तिजोरी / बैंक लॉकर। लोन है? बैंक के पास — लोन विभाग से संपर्क करें।" }},
        { name: { en: "Encumbrance Certificate (EC)", hi: "एनकम्ब्रेंस सर्टिफिकेट (EC)" }, where: { en: "Apply at Sub-Registrar or state portal. Shows if property has disputes/loans.", hi: "सब-रजिस्ट्रार या राज्य पोर्टल से अप्लाई। विवाद/लोन दिखाता है।" }},
      ],
      links: [
        { label: { en: "🌐 Maharashtra — IGR", hi: "🌐 महाराष्ट्र — IGR" }, url: "https://igrmaharashtra.gov.in" },
        { label: { en: "🌐 Karnataka — Bhoomi", hi: "🌐 कर्नाटक — भूमि" }, url: "https://landrecords.karnataka.gov.in" },
        { label: { en: "🌐 UP — Bhulekh", hi: "🌐 UP — भूलेख" }, url: "https://upbhulekh.gov.in" },
        { label: { en: "🌐 All States — DILRMP", hi: "🌐 सभी राज्य — DILRMP" }, url: "https://dilrmp.gov.in" },
      ],
      office: { en: "📍 Urban: Municipal Corp → Property Tax dept\n→ Rural: Tehsil → Revenue office\n→ Apply for 'Mutation'/'Dakhil Kharij'", hi: "📍 शहर: नगर निगम → प्रॉपर्टी टैक्स\n→ गांव: तहसील → राजस्व कार्यालय\n→ 'म्यूटेशन' के लिए अप्लाई करें" },
      phone: { en: "📞 Contact local Sub-Registrar — numbers on state portal", hi: "📞 सब-रजिस्ट्रार से संपर्क — राज्य पोर्टल पर नंबर" },
    },
  ],
  admin: [
    {
      id: 13, title: { en: "File Deceased's Final Income Tax Return", hi: "मृतक का अंतिम ITR दाखिल करें" },
      desc: { en: "Legal heir must file ITR for April 1 to death date. Register as 'Representative Assessee' on IT portal.", hi: "उत्तराधिकारी को 1 अप्रैल से मृत्यु तक का ITR भरना होगा। IT पोर्टल पर 'Representative Assessee' रजिस्टर करें।" },
      priority: "medium", timeline: { en: "Before July 31 of next FY", hi: "अगले FY के 31 जुलाई तक" },
      docs: [
        { name: { en: "PAN of deceased + Form 16", hi: "मृतक का PAN + Form 16" }, where: { en: "PAN verify: incometax.gov.in. Form 16 from employer.", hi: "PAN जांचें: incometax.gov.in। Form 16 नियोक्ता से।" }},
        { name: { en: "Legal Heir Certificate + Your PAN", hi: "उत्तराधिकार प्रमाणपत्र + आपका PAN" }, where: { en: "To register as Representative Assessee.", hi: "Representative Assessee रजिस्टर करने के लिए।" }},
      ],
      links: [
        { label: { en: "🌐 Register as Legal Heir on IT Portal", hi: "🌐 IT पोर्टल पर रजिस्टर करें" }, url: "https://www.incometax.gov.in/iec/foportal/help/how-to-register-as-representative" },
        { label: { en: "🌐 File ITR Online", hi: "🌐 ऑनलाइन ITR दाखिल करें" }, url: "https://eportal.incometax.gov.in" },
      ],
      office: { en: "📍 Can be done entirely online. Need help? Visit any CA — typical fee ₹500-2000.", hi: "📍 पूरी तरह ऑनलाइन। मदद चाहिए? किसी CA से मिलें — फीस ₹500-2000।" },
      phone: { en: "📞 IT Helpline: 1800-103-0025 | CPC: 1800-425-2229", hi: "📞 आयकर: 1800-103-0025 | CPC: 1800-425-2229" },
    },
    {
      id: 14, title: { en: "Cancel Subscriptions & Recurring Payments", hi: "सब्सक्रिप्शन और रेकरिंग पेमेंट बंद करें" },
      desc: { en: "Check bank statements for SIPs, OTT, phone, insurance premiums, EMIs. Cancel to stop money outflow.", hi: "बैंक स्टेटमेंट में SIP, OTT, फोन, बीमा प्रीमियम, EMI देखें। बंद करें।" },
      priority: "low", timeline: { en: "Within 2 weeks", hi: "2 हफ़्ते में" },
      docs: [
        { name: { en: "Last 3 months bank statements", hi: "पिछले 3 महीने के बैंक स्टेटमेंट" }, where: { en: "Download from net banking or ask at branch. Look for same-date recurring debits.", hi: "नेट बैंकिंग से डाउनलोड या ब्रांच से मांगें।" }},
        { name: { en: "Death Certificate", hi: "मृत्यु प्रमाणपत्र" }, where: { en: "Most providers need it to cancel without penalty.", hi: "ज़्यादातर कंपनियां बिना पेनाल्टी कैंसल करने के लिए मांगती हैं।" }},
      ],
      links: [],
      office: { en: "📍 Mobile: Visit store with death certificate\n→ OTT (Netflix etc): Email support\n→ SIPs: Contact AMC/broker\n→ EMIs: Contact bank loan dept — if loan has insurance, it may be fully waived!", hi: "📍 मोबाइल: स्टोर जाएं\n→ OTT: सपोर्ट को ईमेल\n→ SIP: AMC/ब्रोकर संपर्क\n→ EMI: बैंक लोन विभाग — बीमा है तो माफ हो सकता है!" },
      phone: { en: "📞 Jio: 198 | Airtel: 198 | Vi: 199 | BSNL: 1800-180-1503", hi: "📞 Jio: 198 | Airtel: 198 | Vi: 199 | BSNL: 1800-180-1503" },
    },
  ],
};

const pColors = {
  critical: { bg: "#FEE2E2", text: "#DC2626", border: "#FECACA", label: { en: "Do First", hi: "पहले करें" }},
  high: { bg: "#FEF3C7", text: "#D97706", border: "#FDE68A", label: { en: "Important", hi: "महत्वपूर्ण" }},
  medium: { bg: "#DBEAFE", text: "#2563EB", border: "#BFDBFE", label: { en: "When Ready", hi: "जब तैयार हों" }},
  low: { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB", label: { en: "Can Wait", hi: "रुक सकता है" }},
};
const catKeys = ["immediate","financial","legal","admin"];

const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Chev = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const Back = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const Ext = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

export default function App() {
  const w = useWidth();
  const mob = w < 640, tab = w < 900;
  const [scr, setScr] = useState("landing");
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(0);
  const [rel, setRel] = useState("");
  const [uState, setUState] = useState("");
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [cat, setCat] = useState("immediate");
  const [showAI, setShowAI] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [typing, setTyping] = useState(false);
  const [langPick, setLangPick] = useState(false);
  const ref = useRef(null);
  const chatRef = useRef(null);
  const ui = getUI(lang);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [scr, step]);
  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const all = catKeys.flatMap(k => TASKS[k] || []);
  const doneN = all.filter(x => checked[x.id]).length;
  const prog = all.length ? Math.round((doneN / all.length) * 100) : 0;

  const send = async () => {
    if (!inp.trim()) return;
    const m = inp.trim(); setInp("");
    setMsgs(p => [...p, { r: "u", t: m }]); setTyping(true);
    try {
      const ln = LANGS[lang]?.name || "English";
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are AfterLoss AI, helping Indian families with finances after death. User lost ${rel} in ${uState||"India"}. RESPOND IN ${ln}. Give exact office names, forms, portal links, helplines. Warm but concise — under 200 words.`,
          messages: [{ role: "user", content: m }] })
      });
      const d = await r.json();
      setMsgs(p => [...p, { r: "a", t: d.content?.map(c => c.text||"").join("") || "Please try again." }]);
    } catch { setMsgs(p => [...p, { r: "a", t: "Connection error. Please retry." }]); }
    setTyping(false);
  };

  const LangBtn = ({ size = "md" }) => (
    <button onClick={() => setLangPick(true)} style={{
      padding: size === "sm" ? "4px 10px" : "6px 14px",
      background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 50,
      fontSize: size === "sm" ? 11 : 13, cursor: "pointer", color: "#A78BFA", fontWeight: 600,
      display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap"
    }}>
      {LANGS[lang]?.flag} {mob && size !== "force" ? "" : LANGS[lang]?.name}
    </button>
  );

  const LangModal = () => (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setLangPick(false)}>
      <div onClick={e => e.stopPropagation()} style={{
        background: scr === "landing" || scr === "onboard" ? "#1A1A2E" : "#fff", borderRadius: 20, padding: mob ? 20 : 28,
        maxWidth: 420, width: "100%", maxHeight: "80vh", overflowY: "auto",
        border: `1px solid ${scr === "landing" || scr === "onboard" ? "rgba(255,255,255,0.1)" : "#E5E7EB"}`
      }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, color: scr === "landing" || scr === "onboard" ? "#fff" : "#111" }}>{ui.langSelect}</h3>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 16 }}>{ui.langSub}</p>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 8 }}>
          {Object.entries(LANGS).map(([k, v]) => (
            <button key={k} onClick={() => { setLang(k); setLangPick(false); }} style={{
              padding: "10px 12px", borderRadius: 10, cursor: "pointer", textAlign: "left",
              background: lang === k ? "rgba(99,102,241,0.2)" : (scr === "landing" || scr === "onboard" ? "rgba(255,255,255,0.05)" : "#F9FAFB"),
              border: `1px solid ${lang === k ? "#818CF8" : (scr === "landing" || scr === "onboard" ? "rgba(255,255,255,0.08)" : "#E5E7EB")}`,
              color: scr === "landing" || scr === "onboard" ? "#fff" : "#111",
            }}>
              <span style={{ fontSize: 16 }}>{v.flag}</span> <span style={{ fontWeight: 600, fontSize: 13 }}>{v.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── LANDING ───
  if (scr === "landing") return (
    <div ref={ref} style={{ minHeight: "100vh", background: "#0A0A0A", color: "#fff", fontFamily: "'Inter',-apple-system,sans-serif", overflowX: "hidden" }}>
      {langPick && <LangModal />}
      {/* Nav */}
      <div style={{ padding: mob ? "14px 16px" : "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: mob ? 30 : 36, height: mob ? 30 : 36, borderRadius: 10, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: mob ? 14 : 18 }}>🕊️</div>
          <span style={{ fontSize: mob ? 17 : 20, fontWeight: 700, letterSpacing: "-0.5px" }}>AfterLoss</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <LangBtn />
          <button onClick={() => setScr("onboard")} style={{ padding: mob ? "8px 16px" : "10px 24px", background: "#fff", color: "#000", border: "none", borderRadius: 50, fontWeight: 600, fontSize: mob ? 12 : 14, cursor: "pointer" }}>{mob ? ui.startShort : ui.startBtn.replace(" →","")}</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: mob ? "50px 18px 30px" : "80px 24px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "5px 14px", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 50, fontSize: mob ? 11 : 13, color: "#A78BFA", marginBottom: 20, fontWeight: 500 }}>{ui.heroTag}</div>
        <h1 style={{ fontSize: mob ? 28 : tab ? 38 : 52, fontWeight: 800, lineHeight: 1.12, letterSpacing: "-1px", margin: "0 0 16px" }}>
          {ui.heroTitle1}<br/><span style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{ui.heroTitle2}</span>
        </h1>
        <p style={{ fontSize: mob ? 14 : 17, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>{ui.heroSub}</p>
        <button onClick={() => setScr("onboard")} style={{ padding: mob ? "14px 32px" : "16px 40px", background: "linear-gradient(135deg, #3B82F6, #7C3AED)", color: "#fff", border: "none", borderRadius: 50, fontSize: mob ? 14 : 16, fontWeight: 600, cursor: "pointer", boxShadow: "0 0 40px rgba(99,102,241,0.3)", width: mob ? "100%" : "auto" }}>{ui.startBtn}</button>
        <p style={{ fontSize: 12, color: "#6B7280", marginTop: 12 }}>{ui.noSignup}</p>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 800, margin: "30px auto", padding: "0 16px", display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
        {[[ui.stat1,ui.stat1l,ui.stat1s],[ui.stat2,ui.stat2l,ui.stat2s],[ui.stat3,ui.stat3l,ui.stat3s]].map(([n,l,s],i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: mob ? 18 : 24, textAlign: "center", display: mob ? "flex" : "block", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: mob ? 22 : 26, fontWeight: 800, background: "linear-gradient(135deg, #3B82F6, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", minWidth: mob ? 80 : "auto" }}>{n}</div>
            <div style={{ textAlign: mob ? "left" : "center" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E5E7EB" }}>{l}</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{s}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ maxWidth: 800, margin: "50px auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
          {[[ui.feat1t,ui.feat1d,"🎯"],[ui.feat2t,ui.feat2d,"🔗"],[ui.feat3t,ui.feat3d,"🤖"]].map(([tt,d,ic],i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: mob ? 18 : 24 }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{ic}</div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{tt}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: mob ? "40px 18px 60px" : "60px 24px 80px" }}>
        <h2 style={{ fontSize: mob ? 22 : 26, fontWeight: 700, marginBottom: 10 }}>{ui.ctaTitle}</h2>
        <p style={{ color: "#9CA3AF", marginBottom: 24, fontSize: 14 }}>{ui.ctaSub}</p>
        <button onClick={() => setScr("onboard")} style={{ padding: "14px 36px", background: "#fff", color: "#000", border: "none", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", width: mob ? "100%" : "auto" }}>{ui.ctaBtn}</button>
      </div>
    </div>
  );

  // ─── ONBOARD ───
  if (scr === "onboard") {
    const qs = [{ q: ui.q1, s: ui.q1s, o: ui.opt1 },{ q: ui.q2, s: ui.q2s, o: ui.opt2 },{ q: ui.q3, s: ui.q3s, o: ui.opt3 }];
    return (
      <div ref={ref} style={{ minHeight: "100vh", background: "#0A0A0A", color: "#fff", fontFamily: "'Inter',-apple-system,sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: mob ? 18 : 24 }}>
        {langPick && <LangModal />}
        <div style={{ maxWidth: 500, width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 6, flex: 1 }}>
              {[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? "linear-gradient(90deg, #3B82F6, #8B5CF6)" : "rgba(255,255,255,0.1)" }} />)}
            </div>
            <div style={{ marginLeft: 12 }}><LangBtn size="force" /></div>
          </div>
          <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{ui.step} {step + 1} {ui.of} 3</div>
          <h2 style={{ fontSize: mob ? 20 : 22, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.3px", lineHeight: 1.3 }}>{qs[step].q}</h2>
          <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 22 }}>{qs[step].s}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, maxHeight: mob ? 340 : 400, overflowY: "auto" }}>
            {qs[step].o.map((o, i) => (
              <button key={i} onClick={() => {
                if (step === 0) setRel(o); else if (step === 1) setUState(o);
                setTimeout(() => step < 2 ? setStep(step + 1) : setScr("dashboard"), 120);
              }} style={{
                padding: mob ? "12px 14px" : "13px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, color: "#fff", fontSize: mob ? 13 : 14, textAlign: "left", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>{o} <Chev/></button>
            ))}
          </div>
          {step > 0 && <button onClick={() => setStep(step - 1)} style={{ marginTop: 16, background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Back/> {ui.back}</button>}
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  const cur = TASKS[cat] || [];
  const catDone = cur.filter(x => checked[x.id]).length;

  return (
    <div ref={ref} style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Inter',-apple-system,sans-serif", overflowX: "hidden" }}>
      {langPick && <LangModal />}
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: mob ? "10px 12px" : "12px 16px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🕊️</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>AfterLoss</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <LangBtn size="sm" />
            <button onClick={() => setShowAI(!showAI)} style={{
              padding: "5px 12px", borderRadius: 50, fontSize: 11, fontWeight: 600, cursor: "pointer",
              background: showAI ? "#EEF2FF" : "#F3F4F6", border: `1px solid ${showAI ? "#818CF8" : "#E5E7EB"}`, color: showAI ? "#4F46E5" : "#374151"
            }}>{showAI ? ui.closeAI : ui.askAI}</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: mob ? "14px 12px" : "20px 16px" }}>
        {/* Progress */}
        <div style={{ background: "linear-gradient(135deg, #1E293B, #0F172A)", borderRadius: mob ? 14 : 18, padding: mob ? 18 : 24, color: "#fff", marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "#94A3B8" }}>{ui.yourPlan}</div>
          <div style={{ fontSize: mob ? 16 : 18, fontWeight: 700, marginTop: 3 }}>{ui.afterLosing} {rel.toLowerCase()}</div>
          <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{uState && `📍 ${uState}`} · {all.length} {ui.tasksFound}</div>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 50, height: 7, overflow: "hidden", marginTop: 12 }}>
            <div style={{ height: "100%", width: `${prog}%`, background: "linear-gradient(90deg, #3B82F6, #8B5CF6)", borderRadius: 50, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginTop: 5 }}>
            <span style={{ color: "#94A3B8" }}>{doneN}/{all.length} {ui.completed}</span>
            <span style={{ color: "#A78BFA", fontWeight: 600 }}>{prog}%</span>
          </div>
        </div>

        {/* AI Chat */}
        {showAI && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", marginBottom: 14, overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", background: "#EEF2FF", borderBottom: "1px solid #E5E7EB", fontSize: 13, fontWeight: 600, color: "#312E81" }}>🤖 AI Assistant</div>
            <div ref={chatRef} style={{ maxHeight: mob ? 200 : 240, overflowY: "auto", padding: 12 }}>
              {msgs.length === 0 && <div style={{ textAlign: "center", padding: 14, color: "#9CA3AF", fontSize: 12 }}>{ui.chatEmpty}</div>}
              {msgs.map((m, i) => (
                <div key={i} style={{ marginBottom: 8, display: "flex", justifyContent: m.r === "u" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "9px 12px", borderRadius: 11, fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap",
                    background: m.r === "u" ? "#4F46E5" : "#F3F4F6", color: m.r === "u" ? "#fff" : "#1F2937" }}>{m.t}</div>
                </div>
              ))}
              {typing && <div style={{ color: "#9CA3AF", fontSize: 11 }}>{ui.thinking}</div>}
            </div>
            <div style={{ padding: "9px 12px", borderTop: "1px solid #E5E7EB", display: "flex", gap: 6 }}>
              <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={ui.chatPlaceholder}
                style={{ flex: 1, padding: "8px 10px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, outline: "none" }} />
              <button onClick={send} disabled={typing} style={{ padding: "8px 16px", background: "#4F46E5", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: typing ? "not-allowed" : "pointer", opacity: typing ? 0.6 : 1 }}>{ui.send}</button>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 6, marginBottom: 12, WebkitOverflowScrolling: "touch" }}>
          {catKeys.map(k => {
            const ct = TASKS[k]||[], d = ct.filter(x => checked[x.id]).length;
            return (
              <button key={k} onClick={() => setCat(k)} style={{
                padding: mob ? "6px 10px" : "7px 14px", borderRadius: 50, fontSize: mob ? 11 : 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                background: cat === k ? "#1E293B" : "#fff", color: cat === k ? "#fff" : "#64748B",
                border: `1px solid ${cat === k ? "#1E293B" : "#E5E7EB"}`, flexShrink: 0
              }}>{ui.catEmoji[k]} {ui[k]} {d}/{ct.length}</button>
            );
          })}
        </div>

        {/* Tasks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {cur.map(task => {
            const done = checked[task.id], exp = expanded === task.id;
            const p = pColors[task.priority];
            return (
              <div key={task.id} style={{ background: "#fff", borderRadius: mob ? 12 : 14, border: `1px solid ${done ? "#D1FAE5" : "#E5E7EB"}`, overflow: "hidden", opacity: done ? 0.65 : 1 }}>
                {/* Header */}
                <div style={{ padding: mob ? "12px 12px" : "14px 16px", display: "flex", gap: mob ? 10 : 12, alignItems: "flex-start", cursor: "pointer" }} onClick={() => setExpanded(exp ? null : task.id)}>
                  <button onClick={e => { e.stopPropagation(); setChecked(p => ({...p, [task.id]: !p[task.id]})); }} style={{
                    width: 22, height: 22, minWidth: 22, borderRadius: 6, border: `2px solid ${done ? "#10B981" : "#D1D5DB"}`,
                    background: done ? "#10B981" : "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", marginTop: 1, color: "#fff", flexShrink: 0
                  }}>{done && <Check/>}</button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 3 }}>
                      <span style={{ fontSize: mob ? 13 : 14, fontWeight: 600, color: done ? "#9CA3AF" : "#111", textDecoration: done ? "line-through" : "none" }}>{t(task.title, lang)}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 7px", borderRadius: 50, background: p.bg, color: p.text, border: `1px solid ${p.border}`, whiteSpace: "nowrap" }}>{t(p.label, lang)}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{t(task.desc, lang)}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>⏱ {t(task.timeline, lang)}</div>
                  </div>
                  <div style={{ color: "#9CA3AF", transform: exp ? "rotate(90deg)" : "none", transition: "transform 0.2s", marginTop: 3, flexShrink: 0 }}><Chev/></div>
                </div>

                {/* Expanded */}
                {exp && (
                  <div style={{ padding: mob ? "0 12px 14px 12px" : "0 16px 16px 50px", borderTop: "1px solid #F3F4F6" }}>
                    <div style={{ paddingTop: 12 }}>
                      {/* Docs */}
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>{ui.docsRequired}</div>
                      {task.docs.map((d, i) => (
                        <div key={i} style={{ marginBottom: 10, padding: mob ? 10 : 12, background: "#F9FAFB", borderRadius: 10, border: "1px solid #F3F4F6" }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#1F2937", marginBottom: 3 }}>📎 {t(d.name, lang)}</div>
                          <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.6, paddingLeft: 8, borderLeft: "2px solid #E5E7EB" }}>
                            {ui.whereToGet}: {t(d.where, lang)}
                          </div>
                        </div>
                      ))}

                      {/* Links */}
                      {task.links?.length > 0 && (
                        <div style={{ marginTop: 14 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>{ui.applyOnline}</div>
                          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: 6 }}>
                            {task.links.map((lnk, i) => (
                              <a key={i} href={lnk.url} target="_blank" rel="noopener noreferrer" style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px",
                                background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 9, fontSize: 12,
                                color: "#4338CA", fontWeight: 500, textDecoration: "none", cursor: "pointer", gap: 6,
                                wordBreak: "break-word"
                              }}>
                                <span style={{ flex: 1 }}>{t(lnk.label, lang)}</span>
                                <span style={{ flexShrink: 0 }}><Ext/></span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Office */}
                      {task.office && (
                        <div style={{ marginTop: 12, padding: mob ? 12 : 14, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>{ui.visitOffice}</div>
                          <div style={{ fontSize: 11, color: "#78350F", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{t(task.office, lang)}</div>
                        </div>
                      )}

                      {/* Phone */}
                      {task.phone && (
                        <div style={{ marginTop: 8, padding: mob ? 10 : 12, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "#166534", lineHeight: 1.5, wordBreak: "break-all" }}>{t(task.phone, lang)}</div>
                        </div>
                      )}

                      {/* Ask AI */}
                      <button onClick={() => { setShowAI(true); setInp(`${t(task.title, lang)} — ${lang !== "en" ? "विस्तार से बताएं, कहाँ जाएं, क्या करें" : "Give detailed steps, where to go, what to do"}`); }} style={{
                        marginTop: 12, padding: "9px 14px", background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 8,
                        fontSize: 12, fontWeight: 600, color: "#4F46E5", cursor: "pointer", width: "100%", textAlign: "center"
                      }}>{ui.askAIHelp}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ height: 50 }} />
      </div>
    </div>
  );
}