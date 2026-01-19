import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-overline text-[var(--color-text-muted)] mb-4">404</p>
        <h1 className="text-heading-2 text-[var(--color-text-primary)] mb-4">
          Page Not Found
        </h1>
        <p className="text-body text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </div>
    </div>
  );
}

