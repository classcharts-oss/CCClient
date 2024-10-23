import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

type TabsContextType = {
  value: string | undefined;
};

const TabsContext = React.createContext<TabsContextType | null>(null);

const useTabs = () => {
  const value = React.useContext(TabsContext);
  if (!value) throw new Error("useTabs should be nested within a <Tabs>");
  return value;
};

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(
  (
    { value: valueProp, defaultValue, onValueChange, children, ...props },
    ref
  ) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue,
    });
    return (
      <TabsPrimitive.Root
        value={value}
        onValueChange={setValue}
        ref={ref}
        {...props}
      >
        <TabsContext.Provider value={{ value }}>
          {children}
        </TabsContext.Provider>
      </TabsPrimitive.Root>
    );
  }
);
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, value, ...props }, ref) => {
  const { value: currentValue } = useTabs();
  return (
    <div className="relative">
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "relative z-10 inline-flex w-fit items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-500 data-[state=active]:text-foreground data-[state=active]:shadow",
          className
        )}
        value={value}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
      {value === currentValue && (
        <motion.div
          className="bg-muted absolute inset-0 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          layoutId="indicator"
        />
      )}
    </div>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
