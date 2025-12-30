// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 最上位レイアウトは children をそのまま返すだけにします。
  // 実際の html/body タグは app/[locale]/layout.tsx が担当します。
  return children;
}