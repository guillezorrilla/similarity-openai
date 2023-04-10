import TryIt from '@/components/TryIt';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Similarity API | Try it Out',
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
    <div className="max-w-7xl mx-auto mt-16">
      {activeApiKey ? (
        <TryIt apiKeyId={activeApiKey.id} />
      ) : (
        <div>Request API Key</div>
      )}
    </div>
  );
};

export default page;
