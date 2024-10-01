import Image from "next/image";

export default function AuthImagePreview() {
  return (
    <div className="hidden bg-muted lg:block">
      <Image
        src="/stockify-preview.jpg"
        alt="Stockify Preview"
        width="1920"
        height="1080"
        className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  );
}
