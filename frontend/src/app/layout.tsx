import './globals.css'; // Use a relative path within `src/app`

export const metadata = {
  title: 'Perplexity Clone',
  description: 'A clone of the Perplexity interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
