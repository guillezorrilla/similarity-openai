import Assistant from '@/components/Assistant';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Similarity API | Assistant',
  description: 'Free & open-source text similarity API'
};
const page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id }
  });

  const activeApiKey = apiKeys.find((key) => key.enabled);
  if (!activeApiKey) return notFound();
  return (
    <div className=" py-3 px-6 mx-auto mt-4">
      {activeApiKey ? (
        <Assistant apiKeyKey={activeApiKey} />
      ) : (
        <div>Request API Key</div>
      )}
    </div>
  );
};

export default page;
