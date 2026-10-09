import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_ITEMS, SECTION_IDS, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";

function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      data-ocid="nav.home_link"
      className={cn(
        "font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary",
        className,
      )}
    >
      LUTIX<span className="text-primary"> DEEPTECH</span>
    </a>
  );
}

export function Header() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
          data-ocid="nav.primary"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-ocid={`nav.${item.id}_link`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-full bg-primary px-5 font-medium text-primary-foreground shadow-glow-primary transition-smooth hover:-translate-y-0.5 hover:bg-primary/90 md:inline-flex"
          >
            <a href="#contact" data-ocid="nav.cta_button">
              Get in Touch
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                data-ocid="nav.open_modal_button"
                className="md:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              data-ocid="nav.sheet"
              className="border-border bg-card"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-left">
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-1 px-4"
                data-ocid="nav.mobile"
              >
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <a
                      href={`#${item.id}`}
                      data-ocid={`nav.mobile.${item.id}_link`}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        active === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    asChild
                    className="mt-4 rounded-full bg-primary font-medium text-primary-foreground"
                  >
                    <a href="#contact" data-ocid="nav.mobile.cta_button">
                      Get in Touch
                    </a>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
