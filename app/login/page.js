import { Suspense } from "react";
import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-light-grey px-4 py-12">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
