/**
 * Fontify Generator
 * Copyright (c) 2025-2026 PsyGioX
 * https://github.com/PsyGioX/fontify-generator
 */

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/language-context";
import { useTheme, type Theme } from "@/hooks/useTheme";

const OPTIONS: { value: Theme; icon: typeof Sun; key: "theme.light" | "theme.dark" | "theme.system" }[] = [
  { value: "light", icon: Sun, key: "theme.light" },
  { value: "dark", icon: Moon, key: "theme.dark" },
  { value: "system", icon: Monitor, key: "theme.system" },
];

export default function ThemeToggle() {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const Current = OPTIONS.find((o) => o.value === theme)?.icon ?? Monitor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("theme.toggle")}>
          <Current />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, icon: Icon, key }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={theme === value ? "bg-accent" : ""}
          >
            <Icon className="mr-2 h-4 w-4" />
            {t(key)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
