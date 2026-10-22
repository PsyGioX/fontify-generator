/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 * Based on shadcn/ui (MIT) - https://ui.shadcn.com
 */

import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useTheme } from "@/hooks/useTheme";

const Toaster = (props: ToasterProps) => {
  const { theme } = useTheme();
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
