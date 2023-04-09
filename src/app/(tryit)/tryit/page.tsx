import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Similarity API | Try it Out',
  description: 'Free & open-source text similarity API'
};
const page = async () => {
  return (
    <div className="max-w-7xl mx-auto mt-16">
      <div>Try it out</div>
    </div>
  );
};

export default page;
