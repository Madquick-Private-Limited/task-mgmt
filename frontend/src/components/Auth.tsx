import { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "../hooks/use-toast"


export default function Auth() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleLogin = async (e: any) => {
        e.preventDefault();
        let response
        try {
            response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                
            })

            if (response.status === 200) {
                console.log('Logged in successfully.', response.data)
                toast({
                    title: "Logged in successfully.",
                })
                navigate("/")
            }

        } catch (error:any) {
            console.error('Login failed', error.message);
            if (error.response) {
                if (error.response.status === 404) {
                    toast({
                        variant: "destructive",
                        title: "This email is not registerd with us.",
                    })
                } else if (error.response.status === 401) {
                    toast({
                        variant: "destructive",
                        title: "Wrong password",
                    })
                } else {
                    toast({
                        variant: "destructive",
                        title: "An error occurred. Please try again later.",
                    })
                }
            } else {
                toast({
                    variant: "destructive",
                    title: "An error occurred. Please try again later.",
                })
            }
        }
    };


    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Existing users can login here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="myaddress@email.com" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder='stronggg password' />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            If you are new here, please register.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder='Your name here' />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="myaddress@email.com" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Password</Label>
                            <Input id="new" type="password" placeholder='stronggg password' />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Register</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}