import { db } from '@/utils/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

const PAGE_LIMIT = 10;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '0');

  const categoriesRef = db.collection('categories');
  const total = await categoriesRef
    .count()
    .get()
    .then((snapshot) => snapshot.data().count);
  const pageTotal = Math.ceil(total / PAGE_LIMIT);

  const categoriesSnapshot = await categoriesRef
    .limit(PAGE_LIMIT)
    .offset(page * PAGE_LIMIT)
    .get();
  const data = categoriesSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });

  return NextResponse.json(
    { data, total, pageTotal },
    {
      status: 200,
      statusText: 'OK',
    }
  );
}