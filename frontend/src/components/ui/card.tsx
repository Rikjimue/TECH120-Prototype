import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: 'low' | 'medium' | 'high';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, severity, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border shadow-sm",
        severity === 'high' && 'bg-red-50 border-red-300 text-red-700',
        severity === 'medium' && 'bg-yellow-50 border-yellow-300 text-yellow-700',
        severity === 'low' && 'bg-green-50 border-green-300 text-green-700',
        !severity && 'bg-card text-card-foreground',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 p-6", className)} {...props}>
      {icon && <span className="text-xl">{icon}</span>}
      <div className="flex flex-col space-y-1.5">{children}</div>
    </div>
  )
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  icon?: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, icon, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight flex items-center gap-2", className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {props.children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isGrid?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, isGrid, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0",
        isGrid ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "",
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justifyContent?: 'start' | 'center' | 'end';
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justifyContent = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        justifyContent === 'center' && 'justify-center',
        justifyContent === 'end' && 'justify-end',
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
