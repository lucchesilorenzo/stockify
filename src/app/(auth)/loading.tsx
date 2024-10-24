import Spinner from "@/components/common/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="large" />
    </div>
  );
}
