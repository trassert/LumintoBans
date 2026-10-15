"use client"

import { ReactNode, useState } from "react"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { useLang } from "@/lib/language/components/language-provider"

import { siteConfig } from "@config/site"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WebsiteLogo } from "@/components/images/website-logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps {
  bans: number;
  mutes: number;
  warns: number;
  kicks: number;
}

export const MobileNav = ({ bans, mutes, warns, kicks}: MobileNavProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { dictionary } = useLang()

  const sections = [
    { href: "/bans", label: dictionary.words.bans.plural, count: bans },
    { href: "/mutes", label: dictionary.words.mutes.plural, count: mutes },
    { href: "/warns", label: dictionary.words.warns.plural, count: warns },
    { href: "/kicks", label: dictionary.words.kicks.plural, count: kicks }
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <WebsiteLogo 
            width={24}
            height={24}
            className="mr-2"
          />
          <span className="font-bold">{siteConfig.title}</span>
        </MobileLink>
        <ScrollArea className="my-4 pl-6">
          <nav className="flex flex-col space-y-3">
            {sections.map(({ href, label, count }) => {
              const active = pathname.startsWith(href)

              return (
                <MobileLink
                  key={href}
                  href={href}
                  className={cn("transition-colors pr-12 inline-flex w-full", active ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
                  onOpenChange={setOpen}
                >
                  {label}<Badge variant={active ? "default" : "secondary"} className="!px-1 !py-0 ml-auto">{count}</Badge>
                </MobileLink>
              )
            })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  className?: string
}

export function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  const isExternal = href.toString().startsWith("http")
  return (
    <Link
      href={href}
      onClick={() => {
        if (!isExternal) router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      target={isExternal ? "_blank" : undefined}
      {...props}
    >
      {children}
    </Link>
  )
}