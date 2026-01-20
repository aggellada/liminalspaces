import { useFormStatus } from "react-dom";
import { LoaderIcon, CornerDownLeft } from "lucide-react";

function SubmitButton({ hasText }: { hasText: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || !hasText}
      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all ${
        hasText ? "text-indigo-400 hover:bg-indigo-500/10" : "text-zinc-700"
      }`}
    >
      {pending ? <LoaderIcon className="animate-spin w-5 h-5" /> : <CornerDownLeft className="w-5 h-5" />}
    </button>
  );
}

export default SubmitButton;
