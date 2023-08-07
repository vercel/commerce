import { search } from '@orama/orama';
import { createOramaInstance } from 'lib/orama';
import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams.get('q');
  const orama = await createOramaInstance();

  const result = await search(orama, {
    term: searchParams || '',
    groupBy: {
      properties: ['collection.title']
    }
  });

  return NextResponse.json(result);
}
