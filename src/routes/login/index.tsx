import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";

export const Route = createFileRoute("/login/")({
  component: () => (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn path="/login" routing="path" />
    </div>
  ),
});

