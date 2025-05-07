import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Header } from "@/components/layout/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-auto">
                <Outlet />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </SignedIn>
    </>
  ),
});
