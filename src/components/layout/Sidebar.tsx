import { Link, useRouter } from "@tanstack/react-router";
import { Book, BarChart3, HomeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    title: "Journal",
    path: "/journal",
    icon: Book,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  item.path === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(item.path);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : ""
                      }
                    >
                      <Link to={item.path}>
                        <item.icon
                          className={`h-5 w-5 ${isActive ? "text-pepe-green" : ""}`}
                        />
                        <span>
                          {isActive ? (
                            <strong>{item.title}</strong>
                          ) : (
                            item.title
                          )}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SignedIn>
        <SidebarFooter>
          <UserButton />
        </SidebarFooter>
      </SignedIn>
    </Sidebar>
  );
}
