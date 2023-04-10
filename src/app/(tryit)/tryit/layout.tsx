import '@/styles/globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section className="p-20">{children}</section>;
}
