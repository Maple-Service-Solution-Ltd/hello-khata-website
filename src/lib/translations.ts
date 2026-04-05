import type { Language } from './language-store';

/* ─────────────────────────────────────────────
   HelloKhata — Comprehensive Translation Dictionary
   Organized by section / component
   ───────────────────────────────────────────── */

type SectionMap = {
  [key: string]: string | SectionMap;
};

type TranslationSections = {
  nav: SectionMap;
  footer: SectionMap;
  hero: SectionMap;
  cta: SectionMap;
  pricing: SectionMap;
  contact: SectionMap;
  transformation: SectionMap;
  howItWorks: SectionMap;
  trustedBy: SectionMap;
  statsTicker: SectionMap;
  interactiveDemo: SectionMap;
  liveActivity: SectionMap;
  khataStory: SectionMap;
  about: SectionMap;
  market: SectionMap;
  vision: SectionMap;
  blog: SectionMap;
  newsletter: SectionMap;
  features: SectionMap;
  voice: SectionMap;
  voiceDemo: SectionMap;
  businessTypes: SectionMap;
  testimonials: SectionMap;
  comparison: SectionMap;
  common: SectionMap;
};

const translations = {
  /* ══════════════════════════════════════════
     NAVIGATION
     ══════════════════════════════════════════ */
  bn: {
    nav: {
      links: {
        features: 'পণ্য',
        voice: 'ভয়েস',
        batch: 'ব্যাচ',
        stories: 'গল্প',
        pricing: 'মূল্য',
        about: 'সম্পর্কে',
        vision: 'দৃষ্টিভঙ্গি',
        blog: 'ব্লগ',
        contact: 'যোগাযোগ',
      },
      home: 'হোম',
      ctaButton: 'অ্যাপ নামান',
      search: 'Search',
      mobileMenuCurrent: 'বর্তমান',
      languageSwitchBn: 'ভাষা বাংলায় পরিবর্তন হয়েছে',
      languageSwitchEn: 'Language switched to English',
      languageSwitchEnDesc: 'English version coming soon!',
    },

    /* ══════════════════════════════════════════
       FOOTER
       ══════════════════════════════════════════ */
    footer: {
      tagline: 'বাংলাদেশের ব্যবসার জন্য তৈরি।',
      taglineEn: 'Built in Bangladesh. For Bangladesh.',
      description:
        'বাংলাদেশের ক্ষুদ্র ও মাঝারি ব্যবসার জন্য সবচেয়ে সহজ ব্যবসা পরিচালনা অ্যাপ। ভয়েস কমান্ড, ব্যাচ ম্যানেজমেন্ট এবং AI দিয়ে আপনার দোকানকে ডিজিটাল করুন।',
      columns: {
        product: 'পণ্য',
        company: 'কোম্পানি',
        support: 'সহায়তা',
        download: 'নামান',
      },
      links: {
        features: 'Features',
        voice: 'Voice',
        batch: 'Batch',
        pricing: 'Pricing',
        download: 'Download',
        about: 'About',
        vision: 'Vision',
        team: 'Team',
        blog: 'Blog',
        contact: 'Contact',
        whatsapp: 'WhatsApp',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      madeIn: 'Made in Bangladesh 🇧🇩',
      builtIn: 'Designed and built in 🇧🇩 Bangladesh',
      backToHome: 'Back to home',
      getEmail: 'GET IT ON',
      downloadOn: 'Download on the',
    },

    /* ══════════════════════════════════════════
       HERO SECTION
       ══════════════════════════════════════════ */
    hero: {
      eyebrow: 'Voice-Powered · AI-Driven · Made for Bangladesh',
      headline: ['খাতা এখন', 'কথা বলে।'],
      headlineEn: ['Your khata', 'now speaks.'],
      body: 'বাংলাদেশের দোকানদারদের জন্য তৈরি — প্রথম AI-powered, voice-first ব্যবসা ম্যানেজমেন্ট সিস্টেম। শুধু বলুন। HelloKhata বাকিটা করবে।',
      cta: 'অ্যাপটি নামান',
      how: 'কীভাবে কাজ করে →',
      whatsapp: 'WhatsApp এ কথা বলুন',
      sub: 'কোনো কার্ড লাগবে না · ৩০ দিন ফ্রি · বাংলায় সব',
      stats: {
        shops: 'দোকান',
        districts: 'জেলা',
        entries: 'এন্ট্রি',
      },
      scroll: 'নিচে দেখুন',
    },

    /* ══════════════════════════════════════════
       CTA SECTION
       ══════════════════════════════════════════ */
    cta: {
      headline: ['আজই শুরু করুন।', 'বিনামূল্যে।'],
      headlineEn: ['Start today.', 'Free forever.'],
      sub: 'আপনার ব্যবসা কাগজের খাতার চেয়ে ভালো।',
      subEn: 'Your business deserves better than a paper notebook.',
      playStore: 'Google Play থেকে নামান',
      appStore: 'App Store থেকে নামান',
      whatsapp: 'WhatsApp এ কথা বলুন',
      trust: 'কোনো কার্ড লাগবে না · ৩০ দিন ফ্রি · যেকোনো সময় বন্ধ করা যায়',
      badges: {
        ssl: 'SSL সুরক্ষিত',
        install: '৫ মিনিটে ইন্সটল',
        noCard: 'কোনো কার্ড লাগবে না',
      },
    },

    /* ══════════════════════════════════════════
       PRICING SECTION
       ══════════════════════════════════════════ */
    pricing: {
      header: 'সহজ মূল্য। কোনো লুকানো কথা নেই।',
      headerSub: 'Transparent pricing. Cancel anytime. No contracts.',
      toggle: {
        monthly: 'Monthly',
        yearly: 'Yearly',
      },
      savings: 'সাশ্রয়',
      tier: {
        shuru: {
          name: 'শুরু',
          nameEn: 'Shuru — Beginning',
          icon: '🌱',
          for: 'যারা এইমাত্র শুরু করছেন',
          priceMonthly: 'বিনামূল্যে',
          priceYearly: 'বিনামূল্যে',
          cta: 'বিনামূল্যে শুরু করুন',
          features: [
            '১টি ব্যবসা',
            'প্রতিদিন ৫০টি এন্ট্রি',
            'ভয়েস কমান্ড (দৈনিক ২০টি)',
            'বেসিক রিপোর্ট',
            'কাস্টমার খাতা',
            '১ জন স্টাফ',
          ],
        },
        bikash: {
          name: 'বিকাশ',
          nameEn: 'Bikash — Growth',
          icon: '🚀',
          for: 'বেশিরভাগ দোকানের জন্য সেরা',
          priceMonthly: '৳৪৯৯/মাস',
          priceYearly: '৳৩৯৯/মাস',
          cta: 'বিকাশ শুরু করুন',
          badge: 'সবচেয়ে জনপ্রিয়',
          features: [
            'সব শুরু ফিচার',
            'আনলিমিটেড এন্ট্রি',
            'আনলিমিটেড ভয়েস কমান্ড',
            'ব্যাচ ম্যানেজমেন্ট',
            'এক্সপায়ারি ট্র্যাকিং',
            'সাপ্লায়ার ম্যানেজমেন্ট',
            'অ্যাডভান্সড রিপোর্ট',
            '৫ জন পর্যন্ত স্টাফ',
            'SMS রিমাইন্ডার',
            'প্রায়োরিটি সাপোর্ট',
          ],
        },
        utthan: {
          name: 'উত্থান',
          nameEn: 'Utthan — Rise',
          icon: '👑',
          for: 'একাধিক শাখা, বড় টিম',
          priceMonthly: '৳৯৯৯/মাস',
          priceYearly: '৳৭৯৯/মাস',
          cta: 'উত্থান শুরু করুন',
          features: [
            'সব বিকাশ ফিচার',
            'মাল্টি-ব্রাঞ্চ',
            'আনলিমিটেড স্টাফ',
            'AI ইনসাইট',
            'কাস্টম রিপোর্ট',
            'API অ্যাক্সেস',
            'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার',
            'যেকোনো সংখ্যক ব্যবসা',
            'হোয়াইটলেবেল অপশন',
            'কাস্টম ইন্টিগ্রেশন',
            'SLA গ্যারান্টি',
            'ট্রেনিং ও অনবোর্ডিং',
            'প্রায়োরিটি সাপোর্ট',
            'আপটাইম গ্যারান্টি ৯৯.৯%',
          ],
        },
      },
      mostPopular: 'সবচেয়ে জনপ্রিয়',
      mostPopularEn: 'Most Popular',
      comparison: {
        header: 'ফিচার',
        rows: [
          { feature: 'ব্যবসা', shuru: '১টি', bikash: '৩টি', utthan: 'আনলিমিটেড' },
        ],
      },
      guarantee: {
        badge: '১০০% গ্যারান্টি',
        headline: '৩০ দিনের মানি-ব্যাক গ্যারান্টি।',
        body: 'পছন্দ না হলে সম্পূর্য টাকা ফেরত। কোনো প্রশ্ন ছাড়া।',
      },
      faq: {
        header: 'সচরাচর জিজ্ঞাসা',
        headerSub: 'Frequently asked questions',
        items: [
          {
            q: 'HelloKhata কি অফলাইনে কাজ করে?',
            a: 'হ্যাঁ, ইন্টারনেট ছাড়াও ব্যবহার করতে পারবেন। আপনার ডেটা স্থানীয়ভাবে সংরক্ষিত থাকবে এবং ইন্টারনেট পেলে অটো-সিঙ্ক হয়ে যাবে।',
          },
          {
            q: 'আমার ডেটা কি নিরাপদ?',
            a: 'আপনার সব ডেটা encrypted আকারে সংরক্ষিত। আমরা industry-standard security ব্যবহার করি এবং আপনার ডেটা কখনো তৃতীয় পক্ষের সাথে শেয়ার করি না।',
          },
          {
            q: 'কোনো কার্ড লাগবে?',
            a: 'না, কোনো কার্ড লাগবে না। শুরু প্ল্যান সম্পূর্ণ বিনামূল্যে। প্রিমিয়াম প্ল্যানে bKash, Nagad বা ব্যাংক ট্রান্সফারে পেমেন্ট করতে পারবেন।',
          },
          {
            q: 'বাংলায় কি সব পাবো?',
            a: 'হ্যাঁ, পুরো অ্যাপ বাংলায় পাবেন। ভয়েস কমান্ডও বাংলায় কাজ করে। আমরা বাংলাদেশের দোকানদারদের জন্যই তৈরি করেছি।',
          },
          {
            q: 'যেকোনো সময় বন্ধ করা যাবে?',
            a: 'হ্যাঁ, যেকোনো সময় বন্ধ করতে পারবেন। কোনো locked-in contract নেই। আপনার সব ডেটা এক্সপোর্ট করে নিতে পারবেন।',
          },
        ],
      },
    },

    /* ══════════════════════════════════════════
       CONTACT SECTION
       ══════════════════════════════════════════ */
    contact: {
      headline: 'আমাদের সাথে কথা বলুন।',
      headlineEn: "We're real people. We pick up the phone.",
      sub: 'প্রশ্ন থাকলে জিজ্ঞেস করুন। Demo দেখতে চাইলে বলুন।',
      subEn: 'Ask us anything. Want a demo? Just say the word.',
      cards: {
        whatsapp: {
          title: 'WhatsApp এ লিখুন',
          subtitle: 'সকাল ৯টা – রাত ৯টা',
          badge: 'সবচেয়ে দ্রুত উত্তর পাবেন',
          action: 'সরাসরি মেসেজ করুন',
          button: 'WhatsApp এ কথা বলুন',
        },
        phone: {
          title: 'ফোন কল',
          action: 'সরাসরি কল করুন',
          button: 'কল করুন',
        },
        email: {
          title: 'ইমেইল',
          action: '২৪ ঘণ্টায় উত্তর',
          button: 'ইমেইল করুন',
        },
      },
      inPerson: {
        headline: 'আমাদের টিম আপনার দোকানে আসবে।',
        headlineEn: 'Our team will come to your shop. In person.',
        bodyEn: "We'll show you everything. No pressure.",
        button: 'দোকান ভিজিট বুক করুন',
      },
      form: {
        heading: 'বার্তা পাঠান',
        sub: 'আমরা শীঘ্রই যোগাযোগ করব',
        labels: {
          name: 'আপনার নাম',
          phone: 'মোবাইল নম্বর',
          businessType: 'দোকানের ধরন',
          district: 'জেলা',
          message: 'বার্তা',
        },
        placeholders: {
          name: 'আপনার পুরো নাম',
          phone: '০১XXXXXXXXX',
          businessType: 'দোকানের ধরন নির্বাচন করুন',
          district: 'আপনার জেলা নির্বাচন করুন',
          message: 'আপনার বার্তা লিখুন...',
        },
        businessTypes: [
          'মুদি দোকান',
          'ফার্মেসি',
          'কাপড়ের দোকান',
          'হার্ডওয়্যার দোকান',
          'রেস্টুরেন্ট / খাবারের দোকান',
          'মোবাইল দোকান',
          'কসমেটিক দোকান',
          'ফুটপাতের দোকান',
          'পাইকারি ব্যবসা',
          'কারখানা / ছোট শিল্প',
          'সার্ভিস ব্যবসা',
          'অন্যান্য',
        ],
        submit: 'পাঠান →',
        submitting: 'পাঠানো হচ্ছে...',
        note: 'আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।',
        success: {
          title: 'আপনার বার্তা পাঠানো হয়েছে!',
          body: 'আমরা শীঘ্রই যোগাযোগ করব।',
          anotherMessage: 'আরেকটি বার্তা পাঠান',
        },
        errors: {
          serverError: 'কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।',
          networkError: 'নেটওয়ার্কে সমস্যা হচ্ছে। ইন্টারনেট সংযোগ চেক করুন।',
          phoneInvalid: 'সঠিক নম্বর দিন',
          nameRequired: 'নাম দিন',
          nameMinLength: 'নাম কমপক্ষে ২ অক্ষরের হতে হবে',
          phoneRequired: 'মোবাইল নম্বর দিন',
          phoneInvalidFormat: 'সঠিক বাংলাদেশি নম্বর দিন (০১XXXXXXXXX)',
          businessTypeRequired: 'দোকানের ধরন নির্বাচন করুন',
          districtRequired: 'জেলা নির্বাচন করুন',
          messageMinLength: 'বার্তা কমপক্ষে ৫ অক্ষরের হতে হবে',
        },
      },
    },

    /* ══════════════════════════════════════════
       TRANSFORMATION SECTION
       ══════════════════════════════════════════ */
    transformation: {
      before: 'এর আগে',
      after: 'HelloKhata দিয়ে',
      chaosCards: {
        dues: 'কার কত বাকি?',
        stock: 'Stock শেষ?',
        profit: 'লাভ না ক্ষতি?',
      },
      afterFeatures: [
        'হিসাব পরিষ্কার ✓',
        'Stock নিয়ন্ত্রণে ✓',
        'লাভ দেখা যাচ্ছে ✓',
      ],
      body: 'HelloKhata দিয়ে আপনার পুরো ব্যবসা এখন আঙুলের ছোঁয়ায়। ভয়েসে বলুন, বাকিটা AI সামলাবে।',
      dashboard: {
        header: 'Dashboard',
        sales: 'বিক্রি',
        profit: 'লাভ',
        dues: 'দেনা',
        stock: 'Stock',
        weeklySales: 'সাপ্তাহিক বিক্রি',
        allUpdated: 'সব হিসাব আপটুডেট',
      },
    },

    /* ══════════════════════════════════════════
       HOW IT WORKS SECTION
       ══════════════════════════════════════════ */
    howItWorks: {
      eyebrow: '৩টি ধাপে শুরু',
      headline: 'কীভাবে কাজ করে',
      subtitle: 'Get started in three simple steps',
      stepLabel: 'ধাপ',
      cta: 'এখনই শুরু করুন',
      step1Title: 'অ্যাপ ডাউনলোড করুন',
      step1Description: 'Google Play বা App Store থেকে HelloKhata নামিয়ে নিন। ৩০ সেকেন্ডে রেজিস্ট্রেশন সম্পন্ন।',
      step2Title: 'ভয়েসে বলুন',
      step2Description: 'বাংলায় বলুন — \'আজকের বিক্রি দেখাও\', \'কাস্টমার খাতা দেখাও\'। AI বুঝবে।',
      step3Title: 'সব স্বয়ংক্রিয়',
      step3Description: 'এন্ট্রি, রিপোর্ট, রিমাইন্ডার — সব HelloKhata করবে। আপনি শুধু ব্যবসা চালান।',
    },

    /* ══════════════════════════════════════════
       TRUSTED BY SECTION
       ══════════════════════════════════════════ */
    trustedBy: {
      eyebrow: 'কে বিশ্বাস করছেন',
      headline: 'বাংলাদেশের বিশ্বাস আমাদের উপর ভরসা করে।',
      statsActiveBusiness: 'সক্রিয় ব্যবসা',
      statsDistricts: 'জেলায়',
      statsDataEntries: 'ডেটা এন্ট্রি',
      statsUptime: 'আপটাইম',
      badgeSsl: 'SSL সুরক্ষিত',
      badgeMobile: 'মোবাইল ফ্রেন্ডলি',
      badgeData: 'বাংলাদেশি ডেটা',
      badgeCloud: 'ক্লাউড সেভ',
    },

    /* ══════════════════════════════════════════
       STATS TICKER SECTION
       ══════════════════════════════════════════ */
    statsTicker: {
      eyebrow: 'রিয়েল-টাইম পরিসংখ্যান',
      headline: 'প্রতিদিন বাড়ছে বিশ্বাস',
      subtitle: 'Growing trust, one shop at a time',
      activeShops: 'সক্রিয় দোকান',
      districtCoverage: 'জেলা কভারেজ',
      totalEntries: 'মোট এন্ট্রি',
      uptime: 'আপটাইম',
      avgRating: 'গড় রেটিং',
      support: 'সাপোর্ট',
    },

    /* ══════════════════════════════════════════
       INTERACTIVE DEMO SECTION
       ══════════════════════════════════════════ */
    interactiveDemo: {
      eyebrow: 'ইন্টারেক্টিভ ডেমো',
      headline: 'নিজে চেষ্টা করুন',
      subtitle: 'Try it yourself — explore every feature in the simulator below',
      bottomHint: 'এটি একটি সিমুলেটর। আসল অ্যাপ ডাউনলোড করে পুরো অভিজ্ঞতা নিন।',
      tabsVoice: 'ভয়েস',
      tabsDashboard: 'ড্যাশবোর্ড',
      tabsReport: 'রিপোর্ট',
      voiceListening: 'শুনছি...',
      voiceTapToStart: 'ট্যাপ করুন',
      voicePlaceholder: 'ভয়েস কমান্ড এখানে দেখা যাবে...',
      voiceProcessing: 'প্রসেসিং হচ্ছে...',
      voiceSuccess: 'সফল',
      voiceTryCommands: 'কমান্ড ট্রাই করুন ↓',
      cmdShowSales: 'আজকের বিক্রি দেখাও',
      cmdShowCustomers: 'কাস্টমার খাতা দেখাও',
      cmdCheckDues: 'বাকি কত?',
      cmdUpdateStock: 'স্টক আপডেট করো',
      resultShowSales: 'আজকের বিক্রি: ৳ ১২,৫০০',
      resultShowCustomers: '৩২ জন কাস্টমার',
      resultCheckDues: 'মোট বাকি: ৳ ৪৫,২০০',
      resultUpdateStock: 'স্টক আপডেট হয়েছে ✓',
      dashSummary: 'সারসংক্ষেপ',
      dashToday: 'আজ, মঙ্গলবার',
      dashTrendGood: 'ভালো',
      dashLabelTodaySales: 'আজকের বিক্রি',
      dashLabelTotalDues: 'মোট বাকি',
      dashLabelStockAlerts: 'স্টক সতর্কতা',
      dashLabelCustomers: 'কাস্টমার',
      dashChangeUp: '+৮%',
      dashChangeDues: '১২ জন',
      dashChangeLess: '২ কম',
      dashChangeNew: '+৩ নতুন',
      dashRecentEntries: 'সাম্প্রতিক এন্ট্রি',
      reportWeeklyReport: 'সাপ্তাহিক রিপোর্ট',
      reportWeeklySales: 'এই সপ্তাহের বিক্রি',
      reportTotalSales: 'মোট বিক্রি',
      reportProfit: 'মুনাফা',
      reportComparisonBefore: 'গত সপ্তাহের চেয়ে ',
      reportComparisonHighlight: '১৮% বেশি',
      reportComparisonAfter: ' বিক্রি হয়েছে।',
    },

    /* ══════════════════════════════════════════
       LIVE ACTIVITY SECTION
       ══════════════════════════════════════════ */
    liveActivity: {
      eyebrow: 'লাইভ অ্যাক্টিভিটি',
      headline: 'প্রতি সেকেন্ডে কিছু না কিছু হচ্ছে',
      onlineNow: 'জন এখন অনলাইনে',
      todayActivity: 'আজকের সক্রিয়তা',
      weeklyGrowth: 'গত সপ্তাহের চেয়ে ১২% বেশি সক্রিয়তা',
      statVoiceEntry: 'ভয়েস এন্ট্রি',
      statSales: 'বিক্রি',
      statNewShops: 'নতুন দোকান',
      statDuesCollected: 'বাকি আদায়',
      actionNewSale: 'নতুন বিক্রি: ৳ ২,৫০০',
      actionStockUpdate: 'স্টক আপডেট',
      actionDuesCollected: 'বাকি তোলা হয়েছে: ৳ ৩,২০০',
      actionVoiceEntry: 'ভয়েস এন্ট্রি',
      actionDailyReport: 'ডেইলি রিপোর্ট',
      actionNewCustomer: 'নতুন কাস্টমার যোগ',
      actionBatchExpiry: 'ব্যাচ এক্সপায়ারি রিমাইন্ডার',
      actionMonthlyReport: 'মাসিক রিপোর্ট তৈরি',
      timeJustNow: 'এইমাত্র',
      time2MinAgo: '২ মিনিট আগে',
      time5MinAgo: '৫ মিনিট আগে',
      time7MinAgo: '৭ মিনিট আগে',
      time10MinAgo: '১০ মিনিট আগে',
      time12MinAgo: '১২ মিনিট আগে',
      time15MinAgo: '১৫ মিনিট আগে',
      time20MinAgo: '২০ মিনিট আগে',
    },

    /* ══════════════════════════════════════════
       KHATA STORY SECTION
       ══════════════════════════════════════════ */
    khataStory: {
      eyebrow: 'The Origin Story',
      chapter: {
        prefix: 'অধ্যায়',
        one: 'অধ্যায় ০১',
        two: 'অধ্যায় ০২',
        three: 'অধ্যায় ০৩',
      },
      ch1Title: 'একজন দোকানদারের সকাল',
      ch1Body1: 'ভোর ৬টায় উঠে, ঝাঁপ খুলে, ১৫০ জন মানুষের সেবা করে, রাত ১০টায় বাড়ি ফেরেন মোঃ করিম ভাই। তাঁর মাথায় তখনও ঘুরছে — \u201cরহিমের বাকি কত? চালের stock কতটুকু? আজকে লাভ হলো কি?\u201d',
      ch1Body2: 'করিম ভাই ভালোবেসে এই দোকান চালান। কিন্তু হিসাবের কারণে তিনি রাতে ঘুমাতে পারেন না। কাগজের খাতায় যা লেখেন, সেটা ঠিক আছে কি না তার কোনো নিশ্চয়তা নেই। বাকি টাকা নিয়ে গ্রাহকের সাথে ঝগড়া হয়। কোন পণ্য কত আছে তার হদিস নেই।',
      ch1Italics: "This isn't a story about technology. It's a story about dignity.",
      ch2Title: '৩০ বছরের পুরনো সমস্যা',
      ch2Body1: 'বাংলাদেশে প্রায় ৮০ লাখ ক্ষুদ্র ও মাঝারি ব্যবসা আছে। এর মধ্যে বেশিরভাগের হিসাব পদ্ধতি একই — একটা খাতা, একটা কলম, আর অনেক সন্দেহ। এই পদ্ধতি বাবার বাবার আমল থেকে চলে আসছে। কেউ পরিবর্তন করতে চায় না, কারণ নতুন কিছু শেখার সময় নেই।',
      ch2Pullquote: '\u201c৮৩% বাংলাদেশি ক্ষুদ্র ব্যবসায়ী এখনো সম্পূর্ণ কাগজে হিসাব রাখেন।\u201d',
      ch2PullquoteSource: '— SME Foundation Survey, 2023',
      ch2Body2: 'এই কাগজের খাতা কেবল সময় নষ্ট করে না — এটি সম্ভাবনা নষ্ট করে। দোকানদাররা বুঝতে পারেন না তাদের ব্যবসা আসলে কেমন চলছে। কোথায় লাভ, কোথায় ক্ষতি — কোনো পরিষ্কার ছবি নেই। মাস শেষে শুধু অনুমান করতে হয়।',
      ch3Title: 'আমরা যা দেখলাম',
      ch3Body1: 'আমরা ঢাকার গলিতে, চট্টগ্রামের বাজারে, সিলেটের চায়ের দোকানে, রাজশাহীর মাঠের পাশে — সর্বত্র একই দৃশ্য দেখলাম। পরিশ্রমী মানুষ, যারা ভোরে উঠে রাত পর্যন্ত কাজ করে, কিন্তু তাদের নিজের ব্যবসার হিসাব রাখতে পারে না।',
      ch3Body2: 'তারা জানে কী চায় — একটা সহজ উপায়, যেখানে কথা বলেই হিসাব রাখা যাবে। ইংরেজি না জেনে, কোডিং না জেনে, শুধু বাংলায় কথা বলে। তাদের মতো করে। তাদের ভাষায়।',
      ch3Closing: 'HelloKhata আসে এই মুহূর্তটা থেকে।',
      painsEyebrow: 'The Real Problem',
      painsHeadline: 'দোকানদারের আসল যন্ত্রণা।',
      closing: 'HelloKhata এই ছয়টা সমস্যার সমাধান করে। একটা অ্যাপে। বাংলায়।',
      cta: 'কীভাবে দেখুন →',
    },

    /* ══════════════════════════════════════════
       ABOUT SECTION
       ══════════════════════════════════════════ */
    about: {
      mission: 'ব্যবসা চালানো কথা বলার মতোই সহজ হওয়া উচিত।',
      missionEn: 'Business management should feel as easy as speaking and as familiar as a khata.',
      timelineHeading: 'আমাদের গল্প',
      timelineSub: 'How it all started',
      teamHeading: 'যারা বানাচ্ছেন।',
      teamSub: 'The team behind HelloKhata',
      valuesHeading: 'আমাদের মূল্যবোধ',
      valuesSub: 'What we stand for',
    },

    /* ══════════════════════════════════════════
       MARKET SECTION
       ══════════════════════════════════════════ */
    market: {
      eyebrow: 'বাজারের আকার',
      headline: '১ কোটি ৭০ লাখ',
      sub: 'ক্ষুদ্র ব্যবসা চালু আছে বাংলাদেশে।',
      subEn: '17 million small businesses in Bangladesh. Only 2% have any digital management tool. That is the opportunity HelloKhata is built for.',
      stats: {
        noDigital: {
          bn: 'এখনো কোনো ডিজিটাল টুল ব্যবহার করে না।',
          en: 'Still use zero digital management tools.',
        },
        smartphone: {
          bn: 'স্মার্টফোন ব্যবহার করেন।',
          en: 'Own a smartphone already.',
        },
        profitable: {
          bn: 'ডিজিটাল ব্যবসা বেশি লাভজনক।',
          en: 'Digital businesses are 3.7× more profitable.',
        },
      },
      mapCaption: 'HelloKhata presence across Bangladesh',
      pullQuote: '\u201cThe last billion people to come online will not use software that was designed for Silicon Valley. They will use software that speaks their language, literally.\u201d',
      bottomStats: '৫০,০০০+ ব্যবসা \u00a0·\u00a0 ৬৪ জেলা \u00a0·\u00a0 ১ কোটি+ এন্ট্রি',
    },

    /* ══════════════════════════════════════════
       VISION SECTION
       ══════════════════════════════════════════ */
    vision: {
      opening: {
        line1: '১৭ কোটি মানুষ।',
        line2: '১ কোটি ৭০ লাখ ছোট ব্যবসা।',
        line3: '২% ডিজিটাল।',
        subtitle: 'That is the opportunity. HelloKhata captures it.',
      },
      realityHeading: 'বাজারের বাস্তবতা',
      realitySub: 'The market reality',
      advantageHeading: 'কেন HelloKhata জিতবে।',
      advantageSub: 'Competitive advantage',
      roadmapHeading: 'রোডম্যাপ',
      roadmapSub: 'From retail to platform',
      cta: {
        heading: 'আমরা বাংলাদেশকে বদলাতে চাই। একটা দোকান থেকে।',
        subtitle: 'Join us.',
        pitchDeck: 'Pitch Deck ডাউনলোড',
        contact: 'যোগাযোগ করুন',
      },
      dimensions: ['ভয়েস কমান্ড (বাংলা)', 'অফলাইন ফার্স্ট', 'বাংলা UI', 'স্থানীয় পেমেন্ট', 'প্রাইসিং'],
      competitorKeys: ['HelloKhata', 'Generic App', 'Paper Khata', 'ERP System'],
      dimensionLabel: 'ডাইমেনশন',
      phaseLabel: 'পর্যায়',
      marketStat0Value: '৳ ২,৮০,০০ কোটি',
      marketStat0Desc: 'ছোট ব্যবসায় বার্ষিক লেনদেন',
      marketStat0Context: '$28 Billion annual transaction volume',
      marketStat1Value: '৯৮%',
      marketStat1Desc: 'ডিজিটাল ম্যানেজমেন্ট টুল নেই',
      marketStat1Context: 'No digital management tool',
      marketStat2Value: '৮৫%',
      marketStat2Desc: 'ইতিমধ্যে স্মার্টফোন ব্যবহার করছেন',
      marketStat2Context: 'Already have smartphones',
      roadmapPhase1Name: 'Retail Core',
      roadmapPhase1Status: 'চলমান',
      roadmapPhase1Features: ['Single retail management', 'Voice entries', 'Basic reports', 'Customer ledger'],
      roadmapPhase2Name: 'AI Layer',
      roadmapPhase2Status: 'শীঘ্রই',
      roadmapPhase2Features: ['Smart predictions', 'Auto-categorization', 'Demand forecasting', 'Anomaly detection'],
      roadmapPhase3Name: 'Ecosystem',
      roadmapPhase3Status: 'পরিকল্পিত',
      roadmapPhase3Features: ['Supplier marketplace', 'Multi-branch', 'Staff management', 'Inventory sync'],
      roadmapPhase4Name: 'Expansion',
      roadmapPhase4Status: 'ভবিষ্যৎ',
      roadmapPhase4Features: ['API platform', 'Third-party integrations', 'White label', 'Enterprise tier'],
      roadmapPhase5Name: 'Platform',
      roadmapPhase5Status: 'দৃষ্টি',
      roadmapPhase5Features: ['Full fintech suite', 'Credit scoring', 'Marketplace', 'Pan-Bangladesh'],
      competitorCells: {
        HelloKhata: ['true', 'true', 'true', 'true', 'true'],
        'Generic App': ['ইংরেজি শুধু', 'false', 'false', 'false', 'হাই'],
        'Paper Khata': ['false', 'true', 'true', 'true', 'true'],
        'ERP System': ['false', 'false', 'false', 'false', 'খুব বেশি'],
      },
    },

    /* ══════════════════════════════════════════
       BLOG SECTION
       ══════════════════════════════════════════ */
    blog: {
      heading: 'জ্ঞান · টিপস · গল্প',
      sub: 'বাংলাদেশের ব্যবসায়ীদের জন্য।',
      tabs: ['সব', 'ব্যবসার টিপস', 'পণ্য আপডেট', 'সাফল্যের গল্প', 'কীভাবে করবেন'],
      featured: {
        category: 'ব্যবসার টিপস',
        headline: 'কীভাবে আপনার দোকানের বাকি ৫০% কমাবেন',
        excerpt: 'বাংলাদেশের ক্ষুদ্র ব্যবসায়ীদের সবচেয়ে বড় সমস্যা হলো বাকি টাকা আদায়। ৫টি সহজ পদ্ধতিতে...',
        readTime: '৫ মিনিট পড়া',
        date: '১৫ জানুয়ারি ২০২৫',
        author: 'HelloKhata Team',
        readMore: 'পড়ুন',
      },
      readTime: '৩ মিনিট পড়া',
    },

    /* ══════════════════════════════════════════
       NEWSLETTER SECTION
       ══════════════════════════════════════════ */
    newsletter: {
      eyebrow: 'থাকে থাকে আপডেট পান',
      headline: 'নতুন ফিচার, সেরা টিপস, সাফল্যের গল্প',
      sub: 'New features, tips, and success stories — delivered to your inbox.',
      langNote: 'বাংলায় ইমেইলে পাঠান হবে',
      placeholder: 'আপনার ইমেইল ঠিকানা',
      send: 'পাঠান',
      errorInvalid: 'দয়া করে সঠিক ইমেইল ঠিকানা দিন',
      errorServer: 'কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।',
      errorNetwork: 'নেটওয়ার্ক সমস্যা। দয়া করে আবার চেষ্টা করুন।',
      successTitle: 'সাবস্ক্রাইব সফল!',
      successBody: 'আমরা শীঘ্রই যোগাযোগ করব।',
      trust: 'আমরা কখনো স্প্যাম করি না। আনসাবস্ক্রাইব করতে পারবেন।',
    },

    /* ══════════════════════════════════════════
       FEATURES SECTION
       ══════════════════════════════════════════ */
    features: {
      eyebrow: 'The Power',
      headline: '১২টি শক্তিশালী টুল। একটাই অ্যাপ।',
      sub: '12 powerful modules. One simple app. Built for the real Bangladesh shop.',
      comingSoon: 'শীঘ্রই আসছে',
      module1: {
        headline: 'আর কোনো বাকি ভুলবেন না।',
        body: 'প্রতিটি গ্রাহকের সম্পূর্ণ হিসাব — কত নিলেন, কত দিলেন, কত বাকি। অটোমেটিক SMS দিয়ে বাকি তালিকা পাঠান।',
        features: ['গ্রাহকের সম্পূর্ণ হিসাব', 'বাকি রিমাইন্ডার', 'অটোমেটিক SMS', 'পেমেন্ট হিস্ট্রি', 'ডু রিপোর্ট'],
        callout: 'গড়ে ৮৫% বাকি পরিশোধ বাড়ে',
      },
      module2: {
        headline: 'প্রতিটা বিক্রি, প্রতিটা টাকা।',
        body: 'প্রতিদিন কত বিক্রি হলো, কোন পণ্য বিক্রি হচ্ছে সবচেয়ে বেশি — সব রেকর্ড হচ্ছে অটোমেটিক।',
        features: ['দৈনিক বিক্রি রেকর্ড', 'প্রফিট ক্যালকুলেশন', 'বিক্রি রিপোর্ট', 'ডিসকাউন্ট ম্যানেজমেন্ট', 'রিটার্ন হ্যান্ডেল'],
      },
      module3: {
        headline: 'কোথায় খরচ হচ্ছে — এখন দেখা যাচ্ছে।',
        body: 'কোন supplier থেকে কত কিনলেন, পেমেন্ট স্ট্যাটাস কী — সব এক জায়গায়।',
        features: ['পারচেজ এন্ট্রি', 'সাপ্লায়ার ইনভয়েস', 'কস্ট ট্র্যাকিং', 'পেমেন্ট স্ট্যাটাস', 'পারচেজ রিপোর্ট'],
      },
      module4: {
        headline: 'Stock শেষ হওয়ার আগেই জানুন।',
        body: 'রিয়েল-টাইমে দেখুন কোন পণ্য কত আছে। লো স্টক হলেই অ্যালার্ট।',
        features: ['রিয়েল-টাইম স্টক', 'লো স্টক অ্যালার্ট', 'স্টক ইন আউট', 'ক্যাটাগরি ম্যানেজমেন্ট', 'স্টক ভ্যালুয়েশন'],
      },
      module5: {
        headline: 'ERP-এর শক্তি। দোকানদারের সহজে।',
        body: 'একই পণ্যের একাধিক batch — কোনটা আগে কিনলেন, কত দামে, কবে expire হবে। HelloKhata সব ট্র্যাক করে।',
        features: ['Batch-wise tracking', 'FIFO recommendation', 'Expiry tracking', 'Cost per batch', 'Batch report'],
        callout: 'Enterprise feature, দোকানদারের দামে।',
        pullQuote: 'Batch management at this level is typically found only in ৳5,00,000/year enterprise software.',
      },
      module6: {
        headline: 'Expired পণ্য আর ক্ষতি করবে না।',
        body: 'কোন পণ্য কবে expire হবে — আগেভাগেই জানুন। FIFO সুপারশে পুরনো পণ্য আগে বিক্রি হবে।',
        features: ['অটো এক্সপায়ারি ট্র্যাকিং', 'নিয়ার-এক্সপায়ারি অ্যালার্ট', 'FIFO সুপারশ', 'লস ক্যালকুলেশন', 'এক্সপায়ারি রিপোর্ট'],
      },
      module7: {
        headline: 'Supplier এর সব হিসাব এক জায়গায়।',
        body: 'কোন supplier থেকে কত পণ্য নিলেন, কত পাওনা — সব হিসাব এক ক্লিকে।',
        features: ['সাপ্লায়ার ডাটাবেস', 'পাওনা ট্র্যাকিং', 'অর্ডার হিস্ট্রি', 'পেমেন্ট ট্র্যাকিং'],
      },
      module8: {
        headline: 'রিটার্ন আর সমস্যা নয়।',
        body: 'পণ্য ফেরত নিলে স্টক অটোমেটিক আপডেট। কারণ ট্র্যাকিংয়ে আর কনফিউশন নেই।',
        features: ['রিটার্ন এন্ট্রি', 'স্টক অ্যাডজাস্টমেন্ট', 'রিটার্ন রিপোর্ট', 'কারণ ট্র্যাকিং'],
      },
      module9: {
        headline: 'আপনার ব্যবসার সম্পূর্ণ ছবি।',
        body: 'লাভ-ক্ষতি, সেলস ট্রেন্ড, টপ প্রোডাক্ট — সব রিপোর্ট দেখুন এক ক্লিকে।',
        features: ['প্রফিট লস রিপোর্ট', 'সেলস ট্রেন্ড', 'টপ প্রোডাক্ট', 'কাস্টমার ইনসাইট', 'ড্যাশবোর্ড'],
      },
      module10: {
        headline: 'একাধিক শাখা, এক কন্ট্রোল।',
        body: 'একাধিক দোকানের স্টক, বিক্রি, কর্মী — সব ম্যানেজ করুন এক অ্যাপ থেকে।',
        features: ['ব্রাঞ্চ ম্যানেজমেন্ট', 'স্টক ট্রান্সফার', 'ব্রাঞ্চ রিপোর্ট', 'সেন্ট্রাল কন্ট্রোল'],
      },
      module11: {
        headline: 'কর্মীদের পারফরম্যান্স দেখুন।',
        body: 'কোন কর্মী কত বিক্রি করছে, কে কখন এসেছে — সব ট্র্যাক করুন।',
        features: ['স্টাফ একাউন্ট', 'রোল বেসড এক্সেস', 'সেলস ট্র্যাকিং', 'অ্যাটেন্ড্যান্স'],
      },
      module12: {
        headline: 'AI আপনার ব্যবসা বোঝে।',
        body: 'স্মার্ট ইনসাইট দিয়ে সিদ্ধান্ত নিন — কোন পণ্য বাড়াবেন, কোনটা কমাবেন।',
        features: ['স্মার্ট ইনসাইট', 'প্রেডিক্টিভ অ্যালার্ট', 'প্রফিট অপটিমাইজেশন'],
      },
    },

    /* ══════════════════════════════════════════
       VOICE SECTION
       ══════════════════════════════════════════ */
    voiceDemo: {
      eyebrow: 'লাইভ ডেমো',
      headline: 'নিজে চেষ্টা করুন',
      subtitle: 'Try it yourself — tap a command and watch the magic',
      disclaimer: 'এটি একটি ডেমো। আসল অ্যাপে আপনার ভয়েসে কাজ করবে।',
    },

    voice: {
      headline: 'শুধু বলুন।',
      speaking: 'Speaking',
      response: 'Response',
      totalDue: 'Total Due',
      todaysSales: "Today's Sales",
      stockAlerts: 'Stock Alerts',
      low: 'Low',
      expiredItems: 'Expired Items',
      added: 'Product Added',
      profit7Day: '7-Day Profit',
      fromLastWeek: '↑ 12% from last week',
      smartSuggestion: '💡 স্মার্ট সুপারশ',
      prediction: '⚠️ প্রেডিকশন',
      profitOptimization: '📈 প্রফিট অপটিমাইজেশন',
    },

    /* ══════════════════════════════════════════
       BATCH SECTION
       ══════════════════════════════════════════ */
    batch: {
      eyebrow: "HelloKhata's most powerful feature",
      headline: 'ERP সফটওয়্যারের শক্তি।\nআপনার দোকানের দামে।',
      sub: 'Enterprise-grade batch management for the shop on your street.',
      howItWorks: 'কীভাবে কাজ করে?',
      howItWorksSub: '৪টি সহজ ধাপে batch ম্যানেজমেন্ট কাজ করে',
      step1: {
        title: 'পণ্য কেনার সময় batch তৈরি হয়',
        body: 'প্রতিবার পণ্য কিনলে HelloKhata অটোমেটিক একটা নতুন batch তৈরি করে — তারিখ, ক্রয়মূল্য, supplier সব রেকর্ড হয়ে যায়।',
      },
      step2: {
        title: 'প্রতিটা batch এ expiry আছে',
        body: 'একই পণ্যের ৫টা batch থাকতে পারে — প্রতিটার আলাদা expiry ডেট, আলাদা cost। HelloKhata সব আলাদা ট্র্যাক করে।',
      },
      step3: {
        title: 'পুরনো batch আগে বিক্রি হয় (FIFO)',
        body: 'বিক্রির সময় HelloKhata অটোমেটিক পুরনো batch recommend করে — যাতে কোনো batch expire না হয়।',
      },
      step4: {
        title: 'Expired batch হলে alert আসে',
        body: 'নিয়ার-এক্সপায়ারি হলে অ্যাম্বার অ্যালার্ট, এক্সপায়ার্ড হলে রেড অ্যালার্ট। ক্ষতির আগেই সিদ্ধান্ত নিন।',
      },
      whoNeedsTitle: 'কাদের দরকার?',
      whoNeedsSub: 'যাদের একই পণ্যের একাধিক batch আসে',
      whoNeedsCta: 'HelloKhata দিয়ে সমাধান সম্ভব',
      tryBatch: 'Batch ম্যানেজমেন্ট ট্রাই করুন',
      liveDemo: 'ব্যাচ ট্র্যাকিং — লাইভ ডেমো',
      product: 'পণ্য',
      fifoNote: 'FIFO অনুযায়ী এই batch আগে বিক্রি হবে',
      totalBatch: 'মোট Batch',
      totalStock: 'মোট স্টক',
      avgCost: 'এভারেজ Cost',
      whoNeeds1: {
        category: 'ফার্মেসি',
        text: 'বাংলাদেশের ফার্মেসিতে প্রতি বছর expired medicine থেকে গড় ক্ষতি ৳৩৫,০০০।',
      },
      whoNeeds2: {
        category: 'এফএমসিজি দোকান',
        text: 'একই পণ্যের ৫টা batch চলছে — কোনটা আগে বিক্রি হবে? HelloKhata জানে।',
      },
      whoNeeds3: {
        category: 'কৃষি পণ্য',
        text: 'বীজের লট ট্র্যাকিং এখন সহজ — কোন supplier থেকে, কোন season এ, কত দামে।',
      },
    },

    /* ══════════════════════════════════════════
       BUSINESS TYPES SECTION
       ══════════════════════════════════════════ */
    businessTypes: {
      eyebrow: 'কারা ব্যবহার করছেন',
      headline: 'আপনার দোকান যেটাই হোক।',
      sub: 'বাংলাদেশের প্রতিটি ধরনের দোকান — HelloKhata সবার জন্য কাজ করে।',
      manageWith: 'ম্যানেজ করুন',
      resolved: 'সমাধান হয়েছে',
      weeklySales: 'সাপ্তাহিক বিক্রি',
      close: '✕ বন্ধ করুন',
      tapHint: 'যেকোনো কার্ডে ট্যাপ করুন',
      pain1: 'বাকি ভুলে যাই',
      pain2: 'Expired medicine ক্ষতি',
      pain3: 'Stock শেষ হয়ে যায়',
      pain4: 'Purchase হিসাব নেই',
      pain5: 'Supplier বাকি জটিল',
      pain6: 'Stock অস্পষ্ট',
      pain7: 'বিক্রির ইতিহাস নেই',
      pain8: 'লাভ বোঝা যায় না',
      pain9: 'Multi-supplier chaos',
      pain10: 'Batch ট্র্যাকিং নেই',
      pain11: 'Multi-staff গোলমাল',
      pain12: 'Multi-branch অন্ধকার',
    },

    /* ══════════════════════════════════════════
       TESTIMONIALS SECTION
       ══════════════════════════════════════════ */
    testimonials: {
      eyebrow: 'বাস্তব মানুষ · বাস্তব ফলাফল',
      headline: 'তাদের কথা শুনুন।',
      sub: 'বাংলাদেশের ৫০,০০০+ দোকানদার আজ HelloKhata ব্যবহার করছেন।\nতাদের কয়েকজনের গল্প শুনুন।',
      bottomCta: 'আপনিও চাইলে',
      bottomCtaHighlight: 'আপনার গল্পটা শেয়ার',
      bottomCtaEnd: 'করতে পারেন',
      t1: {
        quote: 'আগে রাত ১২টায়ও ঘুমাতে পারতাম না — কার বাকি কত মনে করার চেষ্টায়। HelloKhata আসার পর রাতে শান্তিতে ঘুমাই।',
        name: 'মোঃ আলামিন হোসেন',
        business: 'আলামিন স্টোর',
        businessType: 'মুদি দোকান',
        district: 'মিরপুর, ঢাকা',
        initial: 'আ',
        metric: 'বাকি পরিশোধ ৮৫% বেড়েছে',
      },
      t2: {
        quote: 'ফার্মেসিতে expired medicine দেখানো ছিল সবচেয়ে বড় ক্ষতি। HelloKhata শুরু করার পর এই সমস্যা নেই।',
        name: 'সুমাইয়া বেগম',
        business: 'সুমাইয়া মেডিকেল',
        businessType: 'ফার্মেসি',
        district: 'চট্টগ্রাম',
        initial: 'স',
        metric: 'Expiry loss শূন্য হয়েছে',
      },
      t3: {
        quote: "বললাম 'stock কম আছে কোনটায়?' — তুরন্ত list চলে এলো। এই জিনিস আমি কল্পনাও করিনি।",
        name: 'রফিক ভাই',
        business: 'রফিক হার্ডওয়্যার',
        businessType: 'হার্ডওয়্যার',
        district: 'সিলেট',
        initial: 'র',
        metric: 'Stock out ৯০% কমেছে',
      },
      t4: {
        quote: 'পাইকারি ব্যবসায় ৫ জন supplier এর পাওনা মাথায় রাখা অসম্ভব ছিল। HelloKhata এখন সব পরিষ্কার দেখাচ্ছে।',
        name: 'হাসান সাহেব',
        business: 'হাসান ট্রেডার্স',
        businessType: 'পাইকারি',
        district: 'রাজশাহী',
        initial: 'হ',
        metric: 'Supplier বিরোধ ৬০% কমেছে',
      },
      t5: {
        quote: 'সুপার শপে ৩ জন staff কাজ করে। কে কত বিক্রি করেছে, কে কোন পণ্য handle করছে — এসব এখন এক ক্লিকেই দেখা যায়।',
        name: 'কামরুল ইসলাম',
        business: 'কামরুল সুপার মার্কেট',
        businessType: 'সুপার শপ',
        district: 'কুমিল্লা',
        initial: 'ক',
        metric: 'Staff এফিশিয়েন্সি ৪০% বেড়েছে',
      },
      t6: {
        quote: 'মোবাইল শপে লাভ বোঝা যেত না। এখন HelloKhata বলে দেয় — আজ কত লাভ, কোন ফোন বেশি বিক্রি হচ্ছে।',
        name: 'ইমরান হোসেন',
        business: 'ইমরান মোবাইল',
        businessType: 'মোবাইল শপ',
        district: 'বগুড়া',
        initial: 'ই',
        metric: 'প্রফিট ভিজিবিলিটি ১০০%',
      },
    },

    /* ══════════════════════════════════════════
       COMPARISON SECTION
       ══════════════════════════════════════════ */
    comparison: {
      eyebrow: 'তুলনা করুন',
      headline: 'কেন HelloKhata?',
      sub: 'See how we stack up against the old way',
      features: [
        'ভয়েস এন্ট্রি',
        'অটো হিসাব',
        'ডিজিটাল রিপোর্ট',
        'ব্যাচ ম্যানেজমেন্ট',
        'AI প্রেডিকশন',
        'হাতে লেখা',
        'বাংলা সাপোর্ট',
        'বাংলাদেশি পেমেন্ট',
      ],
      featureScore: 'ফিচার স্কোর',
      ribbon: 'সুপারিশ',
      cta: 'আজই HelloKhata ব্যবহার শুরু করুন',
    },

    /* ══════════════════════════════════════════
       COMMON / SHARED STRINGS
       ══════════════════════════════════════════ */
    common: {
      backToTop: 'Back to top',
      copyright: '© 2025 HelloKhata',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },

  /* ═══════════════════════════════════════════
     ENGLISH
     ═══════════════════════════════════════════ */
  en: {
    nav: {
      links: {
        features: 'Features',
        voice: 'Voice',
        batch: 'Batch',
        stories: 'Stories',
        pricing: 'Pricing',
        about: 'About',
        vision: 'Vision',
        blog: 'Blog',
        contact: 'Contact',
      },
      home: 'Home',
      ctaButton: 'Download App',
      search: 'Search',
      mobileMenuCurrent: 'Current',
      languageSwitchBn: 'Language switched to Bengali',
      languageSwitchEn: 'Language switched to English',
      languageSwitchEnDesc: 'English version coming soon!',
    },

    footer: {
      tagline: 'Built in Bangladesh. For Bangladesh.',
      taglineEn: 'Built in Bangladesh. For Bangladesh.',
      description:
        'The easiest business management app for SMEs in Bangladesh. Voice commands, batch management and AI to digitize your shop.',
      columns: {
        product: 'Product',
        company: 'Company',
        support: 'Support',
        download: 'Download',
      },
      links: {
        features: 'Features',
        voice: 'Voice',
        batch: 'Batch',
        pricing: 'Pricing',
        download: 'Download',
        about: 'About',
        vision: 'Vision',
        team: 'Team',
        blog: 'Blog',
        contact: 'Contact',
        whatsapp: 'WhatsApp',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      madeIn: 'Made in Bangladesh 🇧🇩',
      builtIn: 'Designed and built in 🇧🇩 Bangladesh',
      backToHome: 'Back to home',
      getEmail: 'GET IT ON',
      downloadOn: 'Download on the',
    },

    hero: {
      eyebrow: 'Voice-Powered · AI-Driven · Made for Bangladesh',
      headline: ['Your khata', 'now speaks.'],
      headlineEn: ['Your khata', 'now speaks.'],
      body: "Built for Bangladesh's shopkeepers — the first AI-powered, voice-first business management system. Just speak. HelloKhata does the rest.",
      cta: 'Download the App',
      how: 'See How It Works →',
      whatsapp: 'Chat on WhatsApp',
      sub: 'No card needed · 30 days free · Everything in Bangla',
      stats: {
        shops: 'Shops',
        districts: 'Districts',
        entries: 'Entries',
      },
      scroll: 'Scroll Down',
    },

    cta: {
      headline: ['Start today.', 'Free forever.'],
      headlineEn: ['Start today.', 'Free forever.'],
      sub: 'Your business deserves better than a paper notebook.',
      subEn: 'Your business deserves better than a paper notebook.',
      playStore: 'Download from Google Play',
      appStore: 'Download from App Store',
      whatsapp: 'Chat on WhatsApp',
      trust: 'No card needed · 30 days free · Cancel anytime',
      badges: {
        ssl: 'SSL Secured',
        install: 'Install in 5 min',
        noCard: 'No card needed',
      },
    },

    pricing: {
      header: 'Transparent pricing. No hidden fees.',
      headerSub: 'Transparent pricing. Cancel anytime. No contracts.',
      toggle: {
        monthly: 'Monthly',
        yearly: 'Yearly',
      },
      savings: 'Save',
      tier: {
        shuru: {
          name: 'Shuru',
          nameEn: 'Shuru — Beginning',
          icon: '🌱',
          for: 'For beginners',
          priceMonthly: 'Free',
          priceYearly: 'Free',
          cta: 'Start Free',
          features: [
            '1 business',
            '50 entries per day',
            'Voice commands (20 per day)',
            'Basic reports',
            'Customer ledger',
            '1 staff member',
          ],
        },
        bikash: {
          name: 'Bikash',
          nameEn: 'Bikash — Growth',
          icon: '🚀',
          for: 'Best for most shops',
          priceMonthly: '৳499/month',
          priceYearly: '৳399/month',
          cta: 'Start Bikash',
          badge: 'Most Popular',
          features: [
            'All Shuru features',
            'Unlimited entries',
            'Unlimited voice commands',
            'Batch management',
            'Expiry tracking',
            'Supplier management',
            'Advanced reports',
            'Up to 5 staff',
            'SMS reminders',
            'Priority support',
          ],
        },
        utthan: {
          name: 'Utthan',
          nameEn: 'Utthan — Rise',
          icon: '👑',
          for: 'Multi-branch, large teams',
          priceMonthly: '৳999/month',
          priceYearly: '৳799/month',
          cta: 'Start Utthan',
          features: [
            'All Bikash features',
            'Multi-branch',
            'Unlimited staff',
            'AI Insights',
            'Custom reports',
            'API access',
            'Dedicated account manager',
            'Unlimited businesses',
            'White-label option',
            'Custom integration',
            'SLA guarantee',
            'Training & onboarding',
            'Priority support',
            '99.9% uptime guarantee',
          ],
        },
      },
      mostPopular: 'Most Popular',
      mostPopularEn: 'Most Popular',
      comparison: {
        header: 'Feature',
        rows: [
          { feature: 'Businesses', shuru: '1', bikash: '3', utthan: 'Unlimited' },
        ],
      },
      guarantee: {
        badge: '100% Guaranteed',
        headline: '30-Day Money-Back Guarantee.',
        body: 'Full refund if not satisfied. No questions asked.',
      },
      faq: {
        header: 'Frequently Asked Questions',
        headerSub: 'Frequently asked questions',
        items: [
          {
            q: 'Does HelloKhata work offline?',
            a: 'Yes, you can use it without internet. Your data is stored locally and auto-syncs when you get connectivity.',
          },
          {
            q: 'Is my data safe?',
            a: 'All your data is stored in encrypted form. We use industry-standard security and never share your data with third parties.',
          },
          {
            q: 'Do I need a card?',
            a: 'No card needed. The Shuru plan is completely free. For premium plans, you can pay via bKash, Nagad or bank transfer.',
          },
          {
            q: 'Is everything available in Bangla?',
            a: 'Yes, the entire app is available in Bangla. Voice commands also work in Bangla. We built this for Bangladeshi shopkeepers.',
          },
          {
            q: 'Can I cancel anytime?',
            a: 'Yes, you can cancel anytime. There are no locked-in contracts. You can export all your data.',
          },
        ],
      },
    },

    contact: {
      headline: 'Talk to us.',
      headlineEn: "We're real people. We pick up the phone.",
      sub: 'Ask us anything. Want a demo? Just say the word.',
      subEn: 'Ask us anything. Want a demo? Just say the word.',
      cards: {
        whatsapp: {
          title: 'Message on WhatsApp',
          subtitle: '9 AM – 9 PM',
          badge: 'Fastest response',
          action: 'Send a direct message',
          button: 'Chat on WhatsApp',
        },
        phone: {
          title: 'Phone Call',
          action: 'Call directly',
          button: 'Call Now',
        },
        email: {
          title: 'Email',
          action: 'Response within 24 hours',
          button: 'Send Email',
        },
      },
      inPerson: {
        headline: 'Our team will visit your shop.',
        headlineEn: 'Our team will come to your shop. In person.',
        bodyEn: "We'll show you everything. No pressure.",
        button: 'Book a Shop Visit',
      },
      form: {
        heading: 'Send a Message',
        sub: "We'll get back to you soon",
        labels: {
          name: 'Your Name',
          phone: 'Mobile Number',
          businessType: 'Business Type',
          district: 'District',
          message: 'Message',
        },
        placeholders: {
          name: 'Your full name',
          phone: '01XXXXXXXXX',
          businessType: 'Select business type',
          district: 'Select your district',
          message: 'Write your message...',
        },
        businessTypes: [
          'Grocery Store',
          'Pharmacy',
          'Clothing Store',
          'Hardware Store',
          'Restaurant / Food Shop',
          'Mobile Store',
          'Cosmetics Store',
          'Street-side Shop',
          'Wholesale Business',
          'Factory / Small Industry',
          'Service Business',
          'Other',
        ],
        submit: 'Send →',
        submitting: 'Sending...',
        note: "We'll respond within 24 hours.",
        success: {
          title: 'Message Sent!',
          body: "We'll contact you soon.",
          anotherMessage: 'Send another message',
        },
        errors: {
          serverError: 'Something went wrong. Please try again.',
          networkError: 'Network error. Please check your internet connection.',
          phoneInvalid: 'Please enter a valid number',
          nameRequired: 'Name is required',
          nameMinLength: 'Name must be at least 2 characters',
          phoneRequired: 'Mobile number is required',
          phoneInvalidFormat: 'Please enter a valid Bangladesh number (01XXXXXXXXX)',
          businessTypeRequired: 'Please select a business type',
          districtRequired: 'Please select a district',
          messageMinLength: 'Message must be at least 5 characters',
        },
      },
    },

    transformation: {
      before: 'Before',
      after: 'With HelloKhata',
      chaosCards: {
        dues: 'Who owes how much?',
        stock: 'Out of stock?',
        profit: 'Profit or loss?',
      },
      afterFeatures: [
        'Clear accounts ✓',
        'Stock controlled ✓',
        'Profit visible ✓',
      ],
      body: 'Your entire business at your fingertips. Speak, and AI handles the rest.',
      dashboard: {
        header: 'Dashboard',
        sales: 'Sales',
        profit: 'Profit',
        dues: 'Dues',
        stock: 'Stock',
        weeklySales: 'Weekly Sales',
        allUpdated: 'All accounts updated',
      },
    },

    /* ══════════════════════════════════════════
       HOW IT WORKS SECTION
       ══════════════════════════════════════════ */
    howItWorks: {
      eyebrow: 'Start in 3 Steps',
      headline: 'How It Works',
      subtitle: 'Get started in three simple steps',
      stepLabel: 'Step',
      cta: 'Start Now',
      step1Title: 'Download the app',
      step1Description: 'Download HelloKhata from Google Play or App Store. Registration in 30 seconds.',
      step2Title: 'Speak in your voice',
      step2Description: 'Speak in Bangla — "Show today\'s sales", "Show customer ledger". AI understands.',
      step3Title: 'Everything automated',
      step3Description: 'Entries, reports, reminders — HelloKhata handles it all. You just run your business.',
    },

    /* ══════════════════════════════════════════
       TRUSTED BY SECTION
       ══════════════════════════════════════════ */
    trustedBy: {
      eyebrow: 'Trusted By',
      headline: "Bangladesh's trust is placed on us.",
      statsActiveBusiness: 'Active Businesses',
      statsDistricts: 'Districts',
      statsDataEntries: 'Data Entries',
      statsUptime: 'Uptime',
      badgeSsl: 'SSL Secured',
      badgeMobile: 'Mobile Friendly',
      badgeData: 'Bangladeshi Data',
      badgeCloud: 'Cloud Saved',
    },

    /* ══════════════════════════════════════════
       STATS TICKER SECTION
       ══════════════════════════════════════════ */
    statsTicker: {
      eyebrow: 'Real-Time Statistics',
      headline: 'Growing Trust Every Day',
      subtitle: 'Growing trust, one shop at a time',
      activeShops: 'Active Shops',
      districtCoverage: 'District Coverage',
      totalEntries: 'Total Entries',
      uptime: 'Uptime',
      avgRating: 'Avg Rating',
      support: 'Support',
    },

    /* ══════════════════════════════════════════
       INTERACTIVE DEMO SECTION
       ══════════════════════════════════════════ */
    interactiveDemo: {
      eyebrow: 'Interactive Demo',
      headline: 'Try It Yourself',
      subtitle: 'Try it yourself — explore every feature in the simulator below',
      bottomHint: 'This is a simulator. Download the real app for the full experience.',
      tabsVoice: 'Voice',
      tabsDashboard: 'Dashboard',
      tabsReport: 'Report',
      voiceListening: 'Listening...',
      voiceTapToStart: 'Tap to start',
      voicePlaceholder: 'Voice commands will appear here...',
      voiceProcessing: 'Processing...',
      voiceSuccess: 'Success',
      voiceTryCommands: 'Try a command ↓',
      cmdShowSales: "Show today's sales",
      cmdShowCustomers: 'Show customer ledger',
      cmdCheckDues: 'How much dues?',
      cmdUpdateStock: 'Update stock',
      resultShowSales: "Today's sales: ৳ ১২,৫০০",
      resultShowCustomers: '32 customers',
      resultCheckDues: 'Total dues: ৳ ৪৫,২০০',
      resultUpdateStock: 'Stock updated ✓',
      dashSummary: 'Summary',
      dashToday: 'Today, Tuesday',
      dashTrendGood: 'Good',
      dashLabelTodaySales: "Today's Sales",
      dashLabelTotalDues: 'Total Dues',
      dashLabelStockAlerts: 'Stock Alerts',
      dashLabelCustomers: 'Customers',
      dashChangeUp: '+8%',
      dashChangeDues: '12 people',
      dashChangeLess: '2 less',
      dashChangeNew: '+3 new',
      dashRecentEntries: 'Recent Entries',
      reportWeeklyReport: 'Weekly Report',
      reportWeeklySales: "This Week's Sales",
      reportTotalSales: 'Total Sales',
      reportProfit: 'Profit',
      reportComparisonBefore: '',
      reportComparisonHighlight: '18% more',
      reportComparisonAfter: ' sales than last week.',
    },

    /* ══════════════════════════════════════════
       LIVE ACTIVITY SECTION
       ══════════════════════════════════════════ */
    liveActivity: {
      eyebrow: 'Live Activity',
      headline: 'Something is happening every second',
      onlineNow: 'online now',
      todayActivity: "Today's Activity",
      weeklyGrowth: '12% more activity than last week',
      statVoiceEntry: 'Voice Entries',
      statSales: 'Sales',
      statNewShops: 'New Shops',
      statDuesCollected: 'Dues Collected',
      actionNewSale: 'New sale: ৳ ২,৫০০',
      actionStockUpdate: 'Stock updated',
      actionDuesCollected: 'Dues collected: ৳ ৩,২০০',
      actionVoiceEntry: 'Voice entry',
      actionDailyReport: 'Daily report',
      actionNewCustomer: 'New customer added',
      actionBatchExpiry: 'Batch expiry reminder',
      actionMonthlyReport: 'Monthly report generated',
      timeJustNow: 'Just now',
      time2MinAgo: '2 min ago',
      time5MinAgo: '5 min ago',
      time7MinAgo: '7 min ago',
      time10MinAgo: '10 min ago',
      time12MinAgo: '12 min ago',
      time15MinAgo: '15 min ago',
      time20MinAgo: '20 min ago',
    },

    /* ══════════════════════════════════════════
       KHATA STORY SECTION
       ══════════════════════════════════════════ */
    khataStory: {
      eyebrow: 'The Origin Story',
      chapter: {
        prefix: 'Chapter',
        one: 'Chapter 01',
        two: 'Chapter 02',
        three: 'Chapter 03',
      },
      ch1Title: 'A Shopkeeper\'s Morning',
      ch1Body1: 'Mohammad Karim wakes up at 6 AM, opens his shop at 7, serves 150 people, and returns home at 10 PM. But even then, one question keeps spinning in his head — \u201cHow much does Rahim owe? How much rice is left? Did I make a profit today?\u201d',
      ch1Body2: 'Karim loves running his shop. But the bookkeeping keeps him awake at night. There is no certainty that what he writes in his paper ledger is correct. Disputes over dues ruin customer relationships. He has no idea how much stock he has.',
      ch1Italics: "This isn't a story about technology. It's a story about dignity.",
      ch2Title: 'A 30-Year-Old Problem',
      ch2Body1: 'Bangladesh has about 8 million small and medium businesses. Most of them use the same accounting method — a notebook, a pen, and a lot of doubt. This method has been passed down from their grandfathers\' time. Nobody wants to change because there is no time to learn something new.',
      ch2Pullquote: '\u201c83% of Bangladeshi small business owners still maintain their accounts entirely on paper.\u201d',
      ch2PullquoteSource: '— SME Foundation Survey, 2023',
      ch2Body2: 'This paper notebook doesn\'t just waste time — it destroys potential. Shopkeepers cannot understand how their business is truly performing. Where is the profit, where is the loss — there is no clear picture. At the end of the month, they can only guess.',
      ch3Title: 'What We Saw',
      ch3Body1: 'We saw the same scene everywhere — in the alleys of Dhaka, the markets of Chattogram, the tea shops of Sylhet, and the fields of Rajshahi. Hardworking people who rise at dawn and work until midnight, yet cannot keep their own business accounts.',
      ch3Body2: 'They know what they want — a simple way to keep accounts just by speaking. Without knowing English, without knowing coding, just speaking in Bangla. Their way. Their language.',
      ch3Closing: 'HelloKhata was born from this moment.',
      painsEyebrow: 'The Real Problem',
      painsHeadline: 'A Shopkeeper\'s Real Pain.',
      closing: 'HelloKhata solves these six problems. With one app. In Bangla.',
      cta: 'See How →',
    },

    /* ══════════════════════════════════════════
       ABOUT SECTION
       ══════════════════════════════════════════ */
    about: {
      mission: 'Business management should feel as easy as speaking.',
      missionEn: 'Business management should feel as easy as speaking and as familiar as a khata.',
      timelineHeading: 'Our Story',
      timelineSub: 'How it all started',
      teamHeading: 'The Builders.',
      teamSub: 'The team behind HelloKhata',
      valuesHeading: 'Our Values',
      valuesSub: 'What we stand for',
    },

    /* ══════════════════════════════════════════
       MARKET SECTION
       ══════════════════════════════════════════ */
    market: {
      eyebrow: 'Market Size',
      headline: '17 Million',
      sub: 'Small businesses in Bangladesh.',
      subEn: '17 million small businesses in Bangladesh. Only 2% have any digital management tool. That is the opportunity HelloKhata is built for.',
      stats: {
        noDigital: {
          bn: 'এখনো কোনো ডিজিটাল টুল ব্যবহার করে না।',
          en: 'Still use zero digital management tools.',
        },
        smartphone: {
          bn: 'স্মার্টফোন ব্যবহার করেন।',
          en: 'Own a smartphone already.',
        },
        profitable: {
          bn: 'ডিজিটাল ব্যবসা বেশি লাভজনক।',
          en: 'Digital businesses are 3.7× more profitable.',
        },
      },
      mapCaption: 'HelloKhata presence across Bangladesh',
      pullQuote: '\u201cThe last billion people to come online will not use software that was designed for Silicon Valley. They will use software that speaks their language, literally.\u201d',
      bottomStats: '50,000+ Businesses \u00a0·\u00a0 64 Districts \u00a0·\u00a0 10M+ Entries',
    },

    /* ══════════════════════════════════════════
       VISION SECTION
       ══════════════════════════════════════════ */
    vision: {
      opening: {
        line1: '170 Million People.',
        line2: '17 Million Small Businesses.',
        line3: '2% Digital.',
        subtitle: 'That is the opportunity. HelloKhata captures it.',
      },
      realityHeading: 'Market Reality',
      realitySub: 'The market reality',
      advantageHeading: 'Why HelloKhata Will Win.',
      advantageSub: 'Competitive advantage',
      roadmapHeading: 'Roadmap',
      roadmapSub: 'From retail to platform',
      cta: {
        heading: 'We want to change Bangladesh. One shop at a time.',
        subtitle: 'Join us.',
        pitchDeck: 'Download Pitch Deck',
        contact: 'Contact Us',
      },
      dimensions: ['Voice Commands (Bangla)', 'Offline First', 'Bangla UI', 'Local Payments', 'Pricing'],
      competitorKeys: ['HelloKhata', 'Generic App', 'Paper Khata', 'ERP System'],
      dimensionLabel: 'Dimension',
      phaseLabel: 'Phase',
      marketStat0Value: '$28 Billion',
      marketStat0Desc: 'Annual transaction volume in small businesses',
      marketStat0Context: 'Annual transaction volume in small businesses',
      marketStat1Value: '98%',
      marketStat1Desc: 'No digital management tool',
      marketStat1Context: 'No digital management tool',
      marketStat2Value: '85%',
      marketStat2Desc: 'Already have smartphones',
      marketStat2Context: 'Already have smartphones',
      roadmapPhase1Name: 'Retail Core',
      roadmapPhase1Status: 'Active',
      roadmapPhase1Features: ['Single retail management', 'Voice entries', 'Basic reports', 'Customer ledger'],
      roadmapPhase2Name: 'AI Layer',
      roadmapPhase2Status: 'Upcoming',
      roadmapPhase2Features: ['Smart predictions', 'Auto-categorization', 'Demand forecasting', 'Anomaly detection'],
      roadmapPhase3Name: 'Ecosystem',
      roadmapPhase3Status: 'Planned',
      roadmapPhase3Features: ['Supplier marketplace', 'Multi-branch', 'Staff management', 'Inventory sync'],
      roadmapPhase4Name: 'Expansion',
      roadmapPhase4Status: 'Future',
      roadmapPhase4Features: ['API platform', 'Third-party integrations', 'White label', 'Enterprise tier'],
      roadmapPhase5Name: 'Platform',
      roadmapPhase5Status: 'Vision',
      roadmapPhase5Features: ['Full fintech suite', 'Credit scoring', 'Marketplace', 'Pan-Bangladesh'],
      competitorCells: {
        HelloKhata: ['true', 'true', 'true', 'true', 'true'],
        'Generic App': ['English only', 'false', 'false', 'false', 'High'],
        'Paper Khata': ['false', 'true', 'true', 'true', 'true'],
        'ERP System': ['false', 'false', 'false', 'false', 'Very High'],
      },
    },

    /* ══════════════════════════════════════════
       BLOG SECTION
       ══════════════════════════════════════════ */
    blog: {
      heading: 'Knowledge · Tips · Stories',
      sub: 'For Bangladeshi business owners.',
      tabs: ['All', 'Business Tips', 'Product Updates', 'Success Stories', 'How-To'],
      featured: {
        category: 'Business Tips',
        headline: 'How to Reduce Your Shop\'s Dues by 50%',
        excerpt: 'The biggest challenge for small businesses in Bangladesh is collecting outstanding dues. With 5 simple methods...',
        readTime: '5 min read',
        date: '15 January 2025',
        author: 'HelloKhata Team',
        readMore: 'Read More',
      },
      readTime: '3 min read',
    },

    /* ══════════════════════════════════════════
       NEWSLETTER SECTION
       ══════════════════════════════════════════ */
    newsletter: {
      eyebrow: 'Stay Updated',
      headline: 'New Features, Best Tips, Success Stories',
      sub: 'New features, tips, and success stories — delivered to your inbox.',
      langNote: 'Emails will be sent in Bangla',
      placeholder: 'Your email address',
      send: 'Send',
      errorInvalid: 'Please enter a valid email address',
      errorServer: 'Something went wrong. Please try again.',
      errorNetwork: 'Network error. Please check your internet connection.',
      successTitle: 'Subscribed Successfully!',
      successBody: 'We\'ll be in touch soon.',
      trust: 'We never spam. You can unsubscribe anytime.',
    },

    /* ══════════════════════════════════════════
       FEATURES SECTION
       ══════════════════════════════════════════ */
    features: {
      eyebrow: 'The Power',
      headline: '12 Powerful Modules. One Simple App.',
      headlineBn: '১২টি শক্তিশালী টুল। একটাই অ্যাপ।',
      sub: '12 powerful modules. One simple app. Built for the real Bangladesh shop.',
      comingSoon: 'Coming Soon',
      module1: {
        headline: 'Never forget a due again.',
        body: 'Complete accounts for every customer — how much they bought, paid, and owe. Send automatic SMS reminders for dues.',
        features: ['Complete customer accounts', 'Due reminders', 'Automatic SMS', 'Payment history', 'Due report'],
        callout: 'Average 85% increase in due collection',
      },
      module2: {
        headline: 'Every sale. Every taka.',
        body: 'Daily sales, best-selling products — all recorded automatically.',
        features: ['Daily sales record', 'Profit calculation', 'Sales report', 'Discount management', 'Return handling'],
      },
      module3: {
        headline: 'Know where the money goes.',
        body: 'Which supplier, how much, payment status — everything in one place.',
        features: ['Purchase entry', 'Supplier invoice', 'Cost tracking', 'Payment status', 'Purchase report'],
      },
      module4: {
        headline: 'Know before stock runs out.',
        body: 'Real-time stock levels. Low stock alerts the moment you hit the threshold.',
        features: ['Real-time stock', 'Low stock alert', 'Stock in/out', 'Category management', 'Stock valuation'],
      },
      module5: {
        headline: 'ERP power. Shopkeeper price.',
        body: 'Multiple batches of the same product — HelloKhata tracks purchase date, cost, and expiry for each one.',
        features: ['Batch-wise tracking', 'FIFO recommendation', 'Expiry tracking', 'Cost per batch', 'Batch report'],
        callout: 'Enterprise feature, shopkeeper price.',
        pullQuote: 'Batch management at this level is typically found only in ৳5,00,000/year enterprise software.',
      },
      module6: {
        headline: 'Expired products won\'t hurt you anymore.',
        body: 'Know when products expire in advance. FIFO suggestions ensure older stock sells first.',
        features: ['Auto expiry tracking', 'Near-expiry alert', 'FIFO suggestion', 'Loss calculation', 'Expiry report'],
      },
      module7: {
        headline: 'All supplier accounts in one place.',
        body: 'How many products from which supplier, how much is owed — all at a click.',
        features: ['Supplier database', 'Due tracking', 'Order history', 'Payment tracking'],
      },
      module8: {
        headline: 'Returns are no longer a problem.',
        body: 'Product returns automatically update stock. No confusion in reason tracking.',
        features: ['Return entry', 'Stock adjustment', 'Return report', 'Reason tracking'],
      },
      module9: {
        headline: 'The complete picture of your business.',
        body: 'Profit/loss, sales trends, top products — all reports at a click.',
        features: ['Profit/loss report', 'Sales trend', 'Top product', 'Customer insight', 'Dashboard'],
      },
      module10: {
        headline: 'Multiple branches. One control.',
        body: 'Manage stock, sales, staff across multiple shops from one app.',
        features: ['Branch management', 'Stock transfer', 'Branch report', 'Central control'],
      },
      module11: {
        headline: 'Track staff performance.',
        body: 'Who sells how much, when they arrive — track everything.',
        features: ['Staff account', 'Role-based access', 'Sales tracking', 'Attendance'],
      },
      module12: {
        headline: 'AI understands your business.',
        body: 'Smart insights to make decisions — which product to increase, which to decrease.',
        features: ['Smart insight', 'Predictive alert', 'Profit optimization'],
      },
    },

    /* ══════════════════════════════════════════
       VOICE SECTION
       ══════════════════════════════════════════ */
    voiceDemo: {
      eyebrow: 'Live Demo',
      headline: 'Try it yourself',
      subtitle: 'Try it yourself — tap a command and watch the magic',
      disclaimer: 'This is a demo. In the real app, your voice will control everything.',
    },

    voice: {
      headline: 'Just speak.',
      speaking: 'Speaking',
      response: 'Response',
      totalDue: 'Total Due',
      todaysSales: "Today's Sales",
      stockAlerts: 'Stock Alerts',
      low: 'Low',
      expiredItems: 'Expired Items',
      added: 'Product Added',
      profit7Day: '7-Day Profit',
      fromLastWeek: '↑ 12% from last week',
      smartSuggestion: '💡 Smart Suggestion',
      prediction: '⚠️ Prediction',
      profitOptimization: '📈 Profit Optimization',
    },

    /* ══════════════════════════════════════════
       BATCH SECTION
       ══════════════════════════════════════════ */
    batch: {
      eyebrow: "HelloKhata's most powerful feature",
      headline: 'ERP software power.\nShopkeeper price.',
      sub: 'Enterprise-grade batch management for the shop on your street.',
      howItWorks: 'How it works',
      howItWorksSub: 'Batch management in 4 simple steps',
      step1: {
        title: 'Batch is created when you purchase',
        body: 'HelloKhata automatically creates a new batch each time you buy a product — date, cost, and supplier are all recorded.',
      },
      step2: {
        title: 'Each batch has its own expiry',
        body: 'The same product may have 5 batches — each with different expiry date and cost. HelloKhata tracks all of them separately.',
      },
      step3: {
        title: 'Older batches sell first (FIFO)',
        body: 'HelloKhata automatically recommends older batches during sales — so no batch expires.',
      },
      step4: {
        title: 'Alerts when batch expires',
        body: 'Amber alert for near-expiry, red alert when expired. Decide before the loss happens.',
      },
      whoNeedsTitle: 'Who needs this?',
      whoNeedsSub: 'For businesses with multiple batches of the same product',
      whoNeedsCta: 'Solved with HelloKhata',
      tryBatch: 'Try Batch Management',
      liveDemo: 'Batch Tracking — Live Demo',
      product: 'Product',
      fifoNote: 'FIFO — Batch #A01 sells first',
      totalBatch: 'Total Batches',
      totalStock: 'Total Stock',
      avgCost: 'Avg Cost',
      whoNeeds1: {
        category: 'Pharmacy',
        text: 'Bangladeshi pharmacies lose an average of ৳35,000/year to expired medicines.',
      },
      whoNeeds2: {
        category: 'FMCG',
        text: '5 batches of the same product running — which sells first? HelloKhata knows.',
      },
      whoNeeds3: {
        category: 'Agro',
        text: 'Lot tracking for seeds is now easy — which supplier, which season, at what price.',
      },
    },

    /* ══════════════════════════════════════════
       BUSINESS TYPES SECTION
       ══════════════════════════════════════════ */
    businessTypes: {
      eyebrow: 'Who uses HelloKhata',
      headline: 'Whatever your shop is.',
      sub: 'HelloKhata works for every type of shop in Bangladesh.',
      manageWith: 'Manage with',
      resolved: 'Problem solved',
      weeklySales: 'Weekly Sales',
      close: '✕ Close',
      tapHint: 'Tap any card',
      pain1: 'Forgetting dues',
      pain2: 'Expired medicine loss',
      pain3: 'Stock running out',
      pain4: 'No purchase tracking',
      pain5: 'Supplier chaos',
      pain6: 'Unclear stock',
      pain7: 'No sales history',
      pain8: 'Unclear profit',
      pain9: 'Multi-supplier chaos',
      pain10: 'No batch tracking',
      pain11: 'Multi-staff chaos',
      pain12: 'Multi-branch chaos',
    },

    /* ══════════════════════════════════════════
       TESTIMONIALS SECTION
       ══════════════════════════════════════════ */
    testimonials: {
      eyebrow: 'Real people. Real results.',
      headline: 'Listen to them.',
      sub: '50,000+ shopkeepers in Bangladesh use HelloKhata today.\nHear from a few of them.',
      bottomCta: 'You can too',
      bottomCtaHighlight: 'share your story',
      bottomCtaEnd: 'with HelloKhata',
      t1: {
        quote: "I couldn't sleep at midnight — trying to remember who owes how much. Since HelloKhata, I sleep peacefully at night.",
        name: 'Md. Alamin Hossain',
        business: 'Alamin Store',
        businessType: 'Grocery',
        district: 'Mirpur, Dhaka',
        initial: 'A',
        metric: 'Due collection increased 85%',
      },
      t2: {
        quote: 'Expired medicines were the biggest loss in our pharmacy. Since HelloKhata, this problem is gone.',
        name: 'Sumaiya Begum',
        business: 'Sumaiya Medical',
        businessType: 'Pharmacy',
        district: 'Chittagong',
        initial: 'S',
        metric: 'Expiry loss reduced to zero',
      },
      t3: {
        quote: "I said 'show me which stock is low' — the list appeared instantly. I couldn't have imagined this.",
        name: 'Rafiq Bhai',
        business: 'Rafiq Hardware',
        businessType: 'Hardware',
        district: 'Sylhet',
        initial: 'R',
        metric: 'Stock outs reduced 90%',
      },
      t4: {
        quote: "Managing dues of 5 suppliers in wholesale was impossible. HelloKhata now shows everything clearly.",
        name: 'Hasan Sahaeb',
        business: 'Hasan Traders',
        businessType: 'Wholesale',
        district: 'Rajshahi',
        initial: 'H',
        metric: 'Supplier disputes reduced 60%',
      },
      t5: {
        quote: '3 staff work at our super shop. Who sold how much, which product they handle — now visible at one click.',
        name: 'Kamrul Islam',
        business: 'Kamrul Super Market',
        businessType: 'Super Shop',
        district: 'Comilla',
        initial: 'K',
        metric: 'Staff efficiency up 40%',
      },
      t6: {
        quote: "We couldn't figure out profit at the mobile shop. Now HelloKhata tells us — today's profit, which phone sells best.",
        name: 'Imran Hossain',
        business: 'Imran Mobile',
        businessType: 'Mobile Shop',
        district: 'Bogra',
        initial: 'I',
        metric: '100% profit visibility',
      },
    },

    /* ══════════════════════════════════════════
       COMPARISON SECTION
       ══════════════════════════════════════════ */
    comparison: {
      eyebrow: 'Compare',
      headline: 'Why HelloKhata?',
      sub: 'See how we stack up against the old way',
      features: [
        'Voice entry',
        'Auto calculation',
        'Digital reports',
        'Batch management',
        'AI prediction',
        'Handwritten',
        'Bangla support',
        'Bangladeshi payment',
      ],
      featureScore: 'Feature Score',
      ribbon: 'Recommended',
      cta: 'Start using HelloKhata today',
    },

    /* ══════════════════════════════════════════
       COMMON / SHARED STRINGS
       ══════════════════════════════════════════ */
    common: {
      backToTop: 'Back to top',
      copyright: '© 2025 HelloKhata',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
} as const;

/* ── Type derivation ── */
type BnTranslations = (typeof translations)['bn'];
type EnTranslations = (typeof translations)['en'];
type AllSections = BnTranslations & EnTranslations;

/**
 * Represents the full shape of a single-language translation map.
 * Every leaf must be a `string`, `string[]`, or a nested record of the same.
 */
export type Translations = {
  bn: BnTranslations;
  en: EnTranslations;
};

/**
 * Recursively resolves a dot-separated key path against a nested object.
 * Returns the matched value (string | string[] | object) or undefined.
 */
export function getTranslation(
  lang: Language,
  key: string,
): string | readonly string[] | undefined {
  const keys = key.split('.');
  let result: unknown = translations[lang];
  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  if (typeof result === 'string' || Array.isArray(result)) {
    return result;
  }
  return undefined;
}

export { translations };
