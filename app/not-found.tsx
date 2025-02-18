import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full px-4 text-center text-black dark:text-white">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl mt-4 font-semibold">Page Not Found</h2>
      <p className="text-lg mt-2 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button className="mt-6">Go Back Home</Button>
      </Link>
    </div>
  );
}
