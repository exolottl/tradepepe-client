import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "@tanstack/react-router";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  const { state } = useRouter();
  const pathname = state.location.pathname;

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg, i, arr) => {
      const href = "/" + arr.slice(0, i + 1).join("/");
      return { name: seg.charAt(0).toUpperCase() + seg.slice(1), href };
    });

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background">
      {/* Sidebar Trigger on the left */}
      <div className="flex items-center">
        <SidebarTrigger />
      </div>

      {/* Breadcrumb in the center */}
      <div className="flex-1 mx-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, idx) => (
              <span key={segment.href} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {idx === segments.length - 1 ? (
                    <BreadcrumbPage>{segment.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={segment.href}>
                      {segment.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Placeholder for user/avatar/actions */}
      <div />
    </header>
  );
};
