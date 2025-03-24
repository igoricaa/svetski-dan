export const metadata = {
  title: 'Svetski dan CMS',
  description: 'CMS za Svetski dan Adherence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
