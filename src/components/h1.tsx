type H1Props = {
  children: React.ReactNode;
};

export default function H1({ children }: H1Props) {
  return <h1 className="text-lg font-semibold md:text-2xl">{children}</h1>;
}
