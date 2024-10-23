import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { NormalDatePicker } from "./OurDatePicker"
import React from "react"

export function LoginSwitcher() {
    const [dob, setDob] = React.useState<Date>()

    return (
        <Tabs defaultValue="student" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="parent">Parent</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
                <Card>
                    <CardHeader>
                        <CardTitle>Student Login</CardTitle>
                        <CardDescription>
                            Enter your code below, and date of birth.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="code">Code</Label>
                            <Input id="code" placeholder="AABBCC1122" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <br></br>
                            <NormalDatePicker date={dob} setDate={setDob} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="parent">
                <Card>
                    <CardHeader>
                        <CardTitle>Parent Login</CardTitle>
                        <CardDescription>
                            Enter your email and password below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}