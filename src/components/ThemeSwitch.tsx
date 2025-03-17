"use client";

import * as React from "react";
import { useTheme } from "../app/ThemeProvider";
import { Switch } from "./ui/Switch";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        checked={theme === "darkpurple"}
        onCheckedChange={(checked) => setTheme(checked ? "darkpurple" : "light")}
      />
      <label
        htmlFor="theme-switch"
        className="text-sm font-medium cursor-pointer"
      >
        {theme === "darkpurple" ? "Dark Mode" : "Light Mode"}
      </label>
    </div>
  );
}