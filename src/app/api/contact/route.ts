import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (01XXXXXXXXX)'),
  businessType: z.string().min(1, 'দোকানের ধরন নির্বাচন করুন'),
  district: z.string().min(1, 'জেলা নির্বাচন করুন'),
  message: z.string().min(5, 'বার্তা কমপক্ষে ৫ অক্ষরের হতে হবে'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          success: false,
          message: 'ফর্মে কিছু ত্রুটি আছে। দয়া করে সঠিক তথ্য দিন।',
          errors,
        },
        { status: 400 }
      );
    }

    const { name, phone, businessType, district, message } = result.data;

    // Log the submission (for now — no email sending)
    console.log('📩 New contact form submission:', {
      name,
      phone,
      businessType,
      district,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।',
      },
      { status: 500 }
    );
  }
}
