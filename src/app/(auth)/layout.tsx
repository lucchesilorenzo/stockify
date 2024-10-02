type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <main className="lg:grid lg:grid-cols-2">{children}</main>;
}
