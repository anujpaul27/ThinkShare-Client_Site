import { Spinner } from "@heroui/react";

export default function Loader() {
  return (
    <div className="flex h-48 w-full items-center justify-center p-4">
      <Spinner size="lg" color="primary" label="Loading..." />
    </div>
  );
}
