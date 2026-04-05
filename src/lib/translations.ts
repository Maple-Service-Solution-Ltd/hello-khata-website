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
