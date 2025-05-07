import { Link } from "@tanstack/react-router";
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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.path}
                        className="[&.active]:bg-accent"
                        activeOptions={{ exact: true }}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
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
