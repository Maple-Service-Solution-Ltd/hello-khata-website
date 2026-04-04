'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, CheckCircle2, Send, AlertCircle } from 'lucide-react';

/* ── Business Types ── */
const BUSINESS_TYPES = [
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
];

/* ── Districts ── */
const DISTRICTS = [
  'ঢাকা',
  'চট্টগ্রাম',
  'খুলনা',
  'রাজশাহী',
  'সিলেট',
  'রংপুর',
  'বরিশাল',
  'ময়মনসিংহ',
  'কুমিল্লা',
  'গাজীপুর',
  'নারায়ণগঞ্জ',
  'দিনাজপুর',
  'বগুড়া',
  'যশোর',
  'কক্সবাজার',
  'টাঙ্গাইল',
  'নাটোর',
  'পাবনা',
  'ফরিদপুর',
  'নোয়াখালী',
];

/* ── Phone validation regex ── */
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Contact Method Card ── */
function ContactCard({
  icon: Icon,
  title,
  subtitle,
  badge,
  badgeColor,
  value,
  action,
  buttonLabel,
  buttonStyle,
  primary = false,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  value: string;
  action: string;
  buttonLabel: string;
  buttonStyle: 'green' | 'outline';
  primary?: boolean;
}) {
  const isGreen = buttonStyle === 'green';
  return (
    <motion.div
      className="relative flex flex-col items-center text-center p-6 md:p-8 rounded-[var(--card-r)]"
      style={{
        background: primary
          ? 'linear-gradient(145deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))'
          : 'var(--white)',
        border: primary
          ? '1.5px solid rgba(201,169,110,0.2)'
          : '1px solid var(--canvas-border)',
      }}
      variants={fadeUp}
    >
      {/* Badge */}
      {badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-body font-semibold"
          style={{
            background: badgeColor || 'var(--gold)',
            color: 'white',
          }}
        >
          {badge}
        </div>
      )}

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: isGreen
            ? 'rgba(201,169,110,0.12)'
            : 'rgba(13,15,14,0.04)',
        }}
      >
        <Icon
          className="w-7 h-7"
          style={{ color: isGreen ? 'var(--gold)' : 'var(--text-body)' }}
        />
      </div>

      {/* Title */}
      <h3 className="font-bengali text-lg mb-1" style={{ color: 'var(--text-ink)' }}>
        {title}
      </h3>

      {/* Subtitle */}
      {subtitle && (
        <p className="font-body text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}

      {/* Value */}
      <p
        className="font-body text-base font-semibold mb-4"
        style={{ color: 'var(--text-ink)' }}
      >
        {value}
      </p>

      {/* Action text */}
      <p className="font-body text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        {action}
      </p>

      {/* Button */}
      <motion.button
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold"
        style={
          isGreen
            ? { background: 'var(--gold)', color: 'white' }
            : {
                background: 'transparent',
                color: 'var(--text-ink)',
                border: '1px solid var(--canvas-border-strong)',
              }
        }
        whileHover={
          isGreen
            ? { scale: 1.04, boxShadow: '0 0 24px rgba(201,169,110,0.35)' }
            : { scale: 1.04, borderColor: 'var(--text-ink)' }
        }
        whileTap={{ scale: 0.97 }}
      >
        {buttonLabel}
      </motion.button>
    </motion.div>
  );
}

/* ── Form Input Component ── */
function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  error?: string;
}) {
  const hasError = !!error;
  const borderStyle = hasError
    ? '1.5px solid var(--crimson)'
    : '1px solid var(--canvas-border)';

  const baseStyles: React.CSSProperties = {
    background: 'var(--white)',
    border: borderStyle,
    borderRadius: '14px',
    fontSize: '15px',
    color: 'var(--text-ink)',
    width: '100%',
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color var(--t-base), box-shadow var(--t-base)',
    boxShadow: hasError ? '0 0 0 3px rgba(220, 38, 38, 0.08)' : 'none',
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-bengali text-sm"
        style={{ color: 'var(--text-body)' }}
      >
        {label}
        {required && <span style={{ color: 'var(--crimson)' }}> *</span>}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            ...baseStyles,
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: '40px',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          style={{
            ...baseStyles,
            resize: 'vertical',
            minHeight: '100px',
          }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={baseStyles}
        />
      )}
      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.p
            className="font-bengali text-xs flex items-center gap-1"
            style={{ color: 'var(--crimson)' }}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 2 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Contact Section ── */
export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-40px' });
  const promiseRef = useRef<HTMLDivElement>(null);
  const isPromiseInView = useInView(promiseRef, { once: true, margin: '-60px' });

  /* Form state */
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    district: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear field error on change
      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }

      // Phone-specific: live validation feedback
      if (name === 'phone') {
        if (value.length > 0 && !BD_PHONE_REGEX.test(value)) {
          // Only show error if they've typed enough to potentially be valid
          if (value.length >= 11) {
            setFieldErrors((prev) => ({
              ...prev,
              phone: 'সঠিক নম্বর দিন',
            }));
          }
        } else {
          setFieldErrors((prev) => {
            const next = { ...prev };
            delete next.phone;
            return next;
          });
        }
      }

      // Clear server error on any change
      if (serverError) setServerError('');
    },
    [fieldErrors, serverError]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setFieldErrors({});

    // Client-side phone validation before sending
    if (!BD_PHONE_REGEX.test(formData.phone)) {
      setFieldErrors((prev) => ({
        ...prev,
        phone: 'সঠিক নম্বর দিন',
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors (400)
        if (response.status === 400 && data.errors) {
          const errors: Record<string, string> = {};
          for (const err of data.errors) {
            errors[err.field] = err.message;
          }
          setFieldErrors(errors);
        }
        // Show server message
        setServerError(data.message || 'কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
        return;
      }

      // Success!
      setSubmitted(true);
    } catch {
      setServerError('নেটওয়ার্কে সমস্যা হচ্ছে। ইন্টারনেট সংযোগ চেক করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* ── Opening ── */}
      <div
        className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6"
        style={{
          background: 'var(--cream)',
        }}
      >
        {/* Subtle texture */}
        <div className="texture-nakshi-subtle absolute inset-0 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="font-bengali mb-4"
            style={{ fontSize: 'var(--fs-h1)', color: 'var(--text-ink)', lineHeight: 1.15 }}
            variants={fadeUp}
          >
            আমাদের সাথে কথা বলুন।
          </motion.h2>

          <motion.p
            className="font-bengali mb-3"
            style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--text-body)' }}
            variants={fadeUp}
          >
            প্রশ্ন থাকলে জিজ্ঞেস করুন। Demo দেখতে চাইলে বলুন।
          </motion.p>

          <motion.p
            className="font-display italic"
            style={{ fontSize: '17px', color: 'var(--text-muted)' }}
            variants={fadeUp}
          >
            We&apos;re real people. We pick up the phone.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Three Contact Method Cards ── */}
      <div className="relative z-10 w-full max-w-[var(--site-max)] mx-auto px-6 py-[clamp(80px,10vw,160px)]">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp এ লিখুন"
            subtitle="সকাল ৯টা – রাত ৯টা"
            badge="সবচেয়ে দ্রুত উত্তর পাবেন"
            badgeColor="var(--gold)"
            value="+880 1XXX-XXXXXX"
            action="সরাসরি মেসেজ করুন"
            buttonLabel="WhatsApp এ কথা বলুন"
            buttonStyle="green"
            primary
          />
          <ContactCard
            icon={Phone}
            title="ফোন কল"
            value="+880 1XXX-XXXXXX"
            action="সরাসরি কল করুন"
            buttonLabel="কল করুন"
            buttonStyle="outline"
          />
          <ContactCard
            icon={Mail}
            title="ইমেইল"
            value="hello@hellokhata.com"
            action="২৪ ঘণ্টায় উত্তর"
            buttonLabel="ইমেইল করুন"
            buttonStyle="outline"
          />
        </motion.div>
      </div>

      {/* ── In-Person Promise (dark with green glow) ── */}
      <div
        ref={promiseRef}
        className="relative overflow-hidden py-[clamp(80px,10vw,160px)] px-6"
        style={{ background: 'var(--ink)' }}
      >
        {/* Green glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(201,169,110,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Nakshi texture at low opacity */}
        <div
          className="texture-nakshi-subtle absolute inset-0 pointer-events-none"
          style={{ opacity: 0.05 }}
        />

        <motion.div
          className="relative z-10 max-w-2xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isPromiseInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="font-bengali text-white mb-4"
            style={{ fontSize: 'var(--fs-h1)', lineHeight: 1.15 }}
            variants={fadeUp}
          >
            আমাদের টিম আপনার দোকানে আসবে।
          </motion.h2>

          <motion.p
            className="font-display italic mb-2"
            style={{ fontSize: '20px', color: 'var(--text-cream-muted)' }}
            variants={fadeUp}
          >
            Our team will come to your shop. In person.
          </motion.p>

          <motion.p
            className="font-body mb-8"
            style={{ fontSize: 'var(--fs-body)', color: 'var(--text-cream-muted)' }}
            variants={fadeUp}
          >
            We&apos;ll show you everything. No pressure.
          </motion.p>

          <motion.div variants={fadeUp}>
            <motion.button
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body text-[15px] font-semibold text-white"
              style={{ background: 'var(--gold)' }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 32px rgba(201,169,110,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <MapPin className="w-4 h-4" />
              দোকান ভিজিট বুক করুন
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Contact Form ── */}
      <div
        ref={formRef}
        className="relative py-[clamp(80px,10vw,160px)] px-6"
        style={{ background: 'var(--cream)' }}
      >
        <div className="texture-nakshi-subtle absolute inset-0 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-[640px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isFormInView ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div className="text-center mb-10" variants={fadeUp}>
            <h3
              className="font-bengali mb-2"
              style={{ fontSize: 'var(--fs-h2)', color: 'var(--text-ink)' }}
            >
              বার্তা পাঠান
            </h3>
            <p
              className="font-body"
              style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)' }}
            >
              আমরা শীঘ্রই যোগাযোগ করব
            </p>
          </motion.div>

          {/* Success State */}
          {submitted ? (
            <motion.div
              className="text-center py-16 rounded-[var(--card-r)] px-6"
              style={{
                background: 'var(--white)',
                border: '1px solid rgba(201,169,110,0.2)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.15,
                }}
              >
                <CheckCircle2
                  className="w-16 h-16 mx-auto mb-5"
                  style={{ color: 'var(--gold)' }}
                />
              </motion.div>
              <motion.p
                className="font-bengali text-xl mb-2"
                style={{ color: 'var(--text-ink)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                আপনার বার্তা পাঠানো হয়েছে!
              </motion.p>
              <motion.p
                className="font-body"
                style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                আমরা শীঘ্রই যোগাযোগ করব।
              </motion.p>
              <motion.button
                className="mt-6 px-5 py-2 rounded-full font-body text-sm font-medium"
                style={{
                  border: '1px solid var(--canvas-border-strong)',
                  color: 'var(--text-body)',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', businessType: '', district: '', message: '' });
                  setFieldErrors({});
                  setServerError('');
                }}
              >
                আরেকটি বার্তা পাঠান
              </motion.button>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              onSubmit={handleSubmit}
              className="khata-lines rounded-[var(--card-r)] p-6 md:p-10"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--canvas-border)',
              }}
              variants={fadeUp}
            >
              <div className="flex flex-col gap-5">
                <FormField
                  label="আপনার নাম"
                  name="name"
                  placeholder="আপনার পুরো নাম"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  error={fieldErrors.name}
                />

                <FormField
                  label="মোবাইল নম্বর"
                  name="phone"
                  type="tel"
                  placeholder="০১XXXXXXXXX"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  error={fieldErrors.phone}
                />

                <FormField
                  label="দোকানের ধরন"
                  name="businessType"
                  placeholder="দোকানের ধরন নির্বাচন করুন"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  options={BUSINESS_TYPES.map((t) => ({ value: t, label: t }))}
                  error={fieldErrors.businessType}
                />

                <FormField
                  label="জেলা"
                  name="district"
                  placeholder="আপনার জেলা নির্বাচন করুন"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  options={DISTRICTS.map((d) => ({ value: d, label: d }))}
                  error={fieldErrors.district}
                />

                <FormField
                  label="বার্তা"
                  name="message"
                  placeholder="আপনার বার্তা লিখুন..."
                  value={formData.message}
                  onChange={handleChange}
                  error={fieldErrors.message}
                />

                {/* Server error banner */}
                <AnimatePresence>
                  {serverError && (
                    <motion.div
                      className="flex items-center gap-2 p-4 rounded-xl"
                      style={{
                        background: 'rgba(220, 38, 38, 0.06)',
                        border: '1px solid rgba(220, 38, 38, 0.15)',
                      }}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--crimson)' }} />
                      <p className="font-bengali text-sm" style={{ color: 'var(--crimson)' }}>
                        {serverError}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-body text-[15px] font-semibold text-white"
                  style={{
                    background: isSubmitting ? 'rgba(201,169,110,0.6)' : 'var(--gold)',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                  }}
                  whileHover={
                    isSubmitting
                      ? {}
                      : {
                          scale: 1.02,
                          boxShadow: '0 0 28px rgba(201,169,110,0.35)',
                        }
                  }
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      পাঠান →
                    </>
                  )}
                </motion.button>
              </div>

              <p
                className="font-body text-center mt-5"
                style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}
              >
                আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।
              </p>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
