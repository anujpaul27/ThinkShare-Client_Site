export default function Loader() {
  return (
    <div className="flex h-48 w-full items-center justify-center p-4 gap-2 flex-col">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <span className="text-sm text-base-content/70">Loading...</span>
    </div>
  );
}
