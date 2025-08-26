import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {randomUUID} from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Entry = { name: string; email: string; self?: string; notes?: string; };
type Payload = { locale?: string; mode: 'solo'|'team'; entries: Entry[]; };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    if (!body?.mode || !Array.isArray(body.entries) || body.entries.length < 1)
      return NextResponse.json({ok:false, error:'Invalid payload'},{status:400});

    const {mode, locale} = body;
    const entries = body.entries.slice(0,2);
    if (mode === 'solo' && entries.length !== 1)
      return NextResponse.json({ok:false, error:'Solo expects exactly 1 entry'},{status:400});
    if (mode === 'team' && entries.length !== 2)
      return NextResponse.json({ok:false, error:'Team expects exactly 2 entries'},{status:400});

    const teamId = mode === 'team' ? `team_${randomUUID()}` : null;

    const rows = entries.map(e => ({
      locale: locale ?? null,
      mode,
      teamId,
      name: (e.name ?? '').trim(),
      email: (e.email ?? '').trim(),
      selfIdentification: e.self ?? null,
      notes: e.notes ?? null
    }));
    if (rows.some(r => !r.name || !r.email))
      return NextResponse.json({ok:false, error:'Name and email are required'},{status:400});

    await prisma.participant.createMany({data: rows});
    return NextResponse.json({ok:true, teamId},{status:201});
  } catch (err:any) {
    console.error('POST /api/register', err);
    return NextResponse.json({ok:false, error: err?.message ?? 'Server error'},{status:500});
  }
}
