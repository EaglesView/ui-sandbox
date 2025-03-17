"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function ExtendingDocs() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Extending the Component Library</CardTitle>
        <CardDescription>
          Guidelines for creating new components and themes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <section>
          <h3 className="text-lg font-medium mb-2">Creating New Components</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              1. Use Radix UI primitives as a foundation for accessibility and behavior
            </p>
            <p>
              2. Apply theme variables using the <code className={cn("px-1 py-0.5 bg-muted rounded-radius-sm font-mono text-xs")}>cn()</code> utility
            </p>
            <p>
              3. Use class-variance-authority for component variants
            </p>
            <p>
              4. Ensure components reference CSS variables instead of hard-coded values
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-radius-md">
            <pre className="text-xs font-mono overflow-x-auto">
{`
import * as React from "react";
import * as RadixPrimitive from "@radix-ui/react-primitive";
import { cn } from "@/lib/utils";

export interface MyComponentProps { /* ... */ }

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-radius-md p-4",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
MyComponent.displayName = "MyComponent";
`}            
            </pre>
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-medium mb-2">Creating New Themes</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              1. Extend the ThemeConfig type with your theme definition
            </p>
            <p>
              2. Add CSS variables to globals.css under a new theme class
            </p>
            <p>
              3. Register your theme in the themes.ts file
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-radius-md">
            <pre className="text-xs font-mono overflow-x-auto">
{`
// Add to themes.ts
export const customTheme: ThemeConfig = {
  name: "custom",
  ...baseTheme,
  colors: {
    background: "#f5f5f5",
    foreground: "#111111",
    // Define remaining colors...
  },
};

// Add to theme type
export type ThemeName = "light" | "dark" | "custom";
`}            
            </pre>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}