import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { NormalDatePicker } from "./OurDatePicker";
import React from "react";
import { cn } from "~/lib/utils";

type LoginSwitcherProps = {
  onStudentLogin?: (code: string, dob: Date) => void;
  onParentLogin?: (email: string, password: string) => void;
};
import { addYears } from "date-fns";

export function LoginSwitcher({
  className,
  ...props
}: React.ComponentProps<typeof Tabs> & LoginSwitcherProps) {
  const [dob, setDob] = React.useState<Date | undefined>(addYears(Date(), -12));
  const codeRef = React.useRef<HTMLInputElement>(null);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const fifteenyrsago = new Date();
  fifteenyrsago.setFullYear(fifteenyrsago.getFullYear() - 15);

  return (
    <Tabs
      defaultValue="student"
      className={cn("flex flex-col items-center", className)}
      {...props}
    >
      <TabsContent className="w-full mt-0" value="student">
        <Card className="space-y-4">
          <CardHeader className="text-center">
            <CardTitle>Student Login</CardTitle>
            <CardDescription>
              Enter your code below, and date of birth.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="code">Code</Label>
              <Input id="code" placeholder="AABBCC1122" ref={codeRef} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dob">Date of Birth</Label>
              {/* <NormalDatePicker
                className="flex w-full"
                date={dob}
                onDateChange={setDob}
              /> */}
              <Input type="date" id="dob" value="2010-01-01" ref={dobRef}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => {
              if (codeRef.current?.value && dobRef.current?.value) {
                props.onStudentLogin?.(codeRef.current.value, new Date(Date.parse(dobRef.current.value)));
              }
            }}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent className="w-full mt-0" value="parent">
        <Card className="space-y-4">
          <CardHeader className="text-center">
            <CardTitle>Parent Login</CardTitle>
            <CardDescription>
              Enter your email and password below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" ref={emailRef} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" ref={passwordRef} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={
              () => {
                if (emailRef.current?.value && passwordRef.current?.value) {
                  props.onParentLogin?.(emailRef.current.value, passwordRef.current.value);
                }
              }
            }>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsList className="bg-black mt-4">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="parent">Parent</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
