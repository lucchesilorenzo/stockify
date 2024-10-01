export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="lg:grid lg:grid-cols-2">{children}</main>;
}
