"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/app/ThemeProvider";

export function CardExamples() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-8">
        <Button 
          variant="outline" 
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? "Hide Cards" : "Show Cards"}
        </Button>
      </div>
      
      {isVisible && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Card with Footer at Bottom */}
          <Card>
            <CardHeader>
              <CardTitle>Default Footer Position</CardTitle>
              <CardDescription>Footer is fixed at the bottom</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has its footer positioned at the bottom by default.</p>
              <p className="mt-2">The content area has bottom padding to ensure text doesn't overlap with the footer.</p>
            </CardContent>
            <CardFooter position="bottom">
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          {/* Card with After-Content Footer */}
          <Card>
            <CardHeader>
              <CardTitle>After-Content Footer</CardTitle>
              <CardDescription>Footer follows the content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has its footer positioned right after the content, not fixed at the bottom.</p>
              <p className="mt-2">This is useful when you want the card height to adjust based on content.</p>
            </CardContent>
            <CardFooter position="after-content">
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          {/* Card with CSS Animation */}
          <Card animate animationVariant="scale" animationDuration="default">
            <CardHeader>
              <CardTitle>CSS Animation</CardTitle>
              <CardDescription>Using CSS variables for animation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card uses CSS transitions for its animation effects.</p>
              <p className="mt-2">The animation timing is controlled by theme variables.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          {/* Card with Framer Motion */}
          <Card useFramerMotion animate animationVariant="slide" animationDuration="slow">
            <CardHeader>
              <CardTitle>Framer Motion</CardTitle>
              <CardDescription>Enhanced animations with Framer</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card uses Framer Motion for more advanced animation capabilities.</p>
              <p className="mt-2">Current theme: <strong>{theme}</strong></p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          {/* Card with Fade Animation */}
          <Card useFramerMotion animate animationVariant="fade" animationDuration="fast">
            <CardHeader>
              <CardTitle>Fast Fade Animation</CardTitle>
              <CardDescription>Quick fade-in effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card demonstrates a fast fade-in animation using Framer Motion.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          {/* Card with Long Content */}
          <Card>
            <CardHeader>
              <CardTitle>Long Content Example</CardTitle>
              <CardDescription>Shows how footer positioning works</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has more content to demonstrate how the footer positioning handles longer content.</p>
              <p className="mt-2">When the footer is positioned at the bottom, it stays fixed regardless of content length.</p>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl.</p>
              <p className="mt-2">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </CardContent>
            <CardFooter position="bottom">
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}