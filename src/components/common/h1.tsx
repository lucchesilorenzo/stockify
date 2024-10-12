type H1Props = {
  children: React.ReactNode;
};

export default function H1({ children }: H1Props) {
  return (
    <h1 className="text-lg font-semibold md:text-2xl lg:text-3xl xl:text-4xl">
      {children}
    </h1>
  );
}
