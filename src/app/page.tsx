"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTheme } from "./ThemeProvider";
import { ExtendingDocs } from "@/components/ExtendingDocs";
import { CardExamples } from "@/components/CardExamples";
import Switch from "@/components/Showcase/Switch";
/**
 * Rough draft of the home page so far
 * This is just to test many things at once, and will be properly separated like a messy nextjs project
 * enjoy!
 * 
 */
export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl md:text-6xl font-bold md:font-thin">ATOTUI</h1>
      </header>

      <main className="space-y-10">
        <section className="mb-12">
          <h2 className="text-2xl mb-4">About This Library</h2>
          <p className="max-w-3xl text-lg text-muted-foreground">
            This is a themeable component library built with Radix UI Primitives and Tailwind CSS.
            The goal is to create a library that is fully customizeable.
          </p>
        </section>
        <section id="components" className="grid grid-flow-col gap-2 grid-cols-5 grid-rows-4">
          <Card id="button-variants" className="col-span-4 row-span-2">
            <CardHeader>
              <h2 className="text-2xl font-semibold mb-6">Button Variants</h2>
            </CardHeader>
            <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link Button</Button>
            </div>
            </CardContent>

            
          </Card>
          <Card className="flex flex-wrap items-center gap-4 row-span-2 col-span-2">
            <CardHeader>
              <h2 className="text-2xl font-semibold mb-6">Button Sizes</h2>
            </CardHeader>
            <CardContent className="gap-4 flex items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔍</Button>
            </CardContent>

          </Card>
          <Card className="flex flex-wrap flex-col items-center gap-4 row-span-2 col-span-2">
            <CardHeader>
              <h2 className="text-2xl font-semibold mb-6">Switches</h2>
            </CardHeader>
            <CardContent className="gap-4 w-full flex flex-col flex-wrap items-center justify-center">
              <Card className="w-full p-2">
              <h2>Light Themes</h2>
              <Switch title="Light "/>
              </Card>
             <Card className="dark w-full p-2">
             <h2>Dark Themes</h2>
             <Switch title="Dark" className="dark"/>
             </Card>
            </CardContent>

          </Card>
        </section>

  

        <section>
          <h2 className="text-2xl font-semibold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content of the card. It can contain any elements.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle>Card with Secondary Color</CardTitle>
                <CardDescription>Showcase a product feature</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card demonstrates how the component adapts to the current theme.</p>
                <p className="mt-2">Current theme: <strong>{theme}</strong></p>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Continue</Button>
              </CardFooter>
            </Card>

            <Card useFramerMotion animate animationVariant="scale" animationDuration="default" className="bg-accent">
              <CardHeader>
                <CardTitle>Card with Accent Color</CardTitle>
                <CardDescription>Styling options</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can be customized while maintaining theme consistency.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section>
          <CardExamples />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-6">Theme Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md bg-primary"></div>
              <p className="text-sm font-medium">Primary</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md bg-secondary"></div>
              <p className="text-sm font-medium">Secondary</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md bg-accent"></div>
              <p className="text-sm font-medium">Accent</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md bg-destructive"></div>
              <p className="text-sm font-medium">Destructive</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md bg-muted"></div>
              <p className="text-sm font-medium">Muted</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md bg-card border border-border"></div>
              <p className="text-sm font-medium">Card</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md" style={{ backgroundColor: "rgb(var(--background))" }}></div>
              <p className="text-sm font-medium">Background</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-20 rounded-radius-md border border-border"></div>
              <p className="text-sm font-medium">Border</p>
            </div>
          </div>
        </section>
      </main>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Extending The Library</h2>
        <ExtendingDocs />
      </section>

      <footer className="mt-20 pt-8 border-t border-border">
        <p className="text-center text-muted-foreground">
          Themeable UI Component Library built with Radix UI and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}