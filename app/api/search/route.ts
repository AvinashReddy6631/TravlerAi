import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, from, to } = body;

    // Validate input
    if (!mode || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required fields: mode, from, to' },
        { status: 400 }
      );
    }

    // Mock search results based on mode
    const mockResults = {
      train: [
        `Train from ${from} to ${to} - Express Service - ₹850 - 6h 30m`,
        `Train from ${from} to ${to} - Superfast - ₹1200 - 5h 45m`,
        `Train from ${from} to ${to} - Local - ₹420 - 8h 15m`
      ],
      bus: [
        `Bus from ${from} to ${to} - AC Sleeper - ₹650 - 7h 30m`,
        `Bus from ${from} to ${to} - AC Seater - ₹450 - 8h 00m`,
        `Bus from ${from} to ${to} - Non-AC - ₹320 - 9h 15m`
      ],
      flight: [
        `Flight from ${from} to ${to} - IndiGo - ₹4500 - 1h 30m`,
        `Flight from ${from} to ${to} - SpiceJet - ₹4200 - 1h 45m`,
        `Flight from ${from} to ${to} - Air India - ₹5200 - 1h 25m`
      ]
    };

    const results = mockResults[mode as keyof typeof mockResults] || [];

    return NextResponse.json({
      success: true,
      results,
      query: { mode, from, to }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}