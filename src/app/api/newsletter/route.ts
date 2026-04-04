import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// In-memory storage for demo
const subscribers: string[] = [];

const newsletterSchema = z.object({
  email: z.string().email('দয়া করে সঠিক ইমেইল ঠিকানা দিন'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'সঠিক ইমেইল ঠিকানা দিন।',
        },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check for duplicate
    if (subscribers.includes(email.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          message: 'এই ইমেইলটি আগেই সাবস্ক্রাইব করা হয়েছে।',
        },
        { status: 400 }
      );
    }

    // Store subscriber
    subscribers.push(email.toLowerCase());

    console.log('📬 New newsletter subscriber:', {
      email,
      totalSubscribers: subscribers.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'সাবস্ক্রিপশন সফল! আমরা শীঘ্রই যোগাযোগ করব।',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'কিছু একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।',
      },
      { status: 500 }
    );
  }
}
