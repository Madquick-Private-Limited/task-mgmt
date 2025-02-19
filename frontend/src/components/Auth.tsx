import { useState } from 'react'
import Axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/userSlice';
import * as type from "@/types";
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,14}$/
const nameRegex = /^[A-Za-z\s]+$/

export default function Auth() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [localUser, setLocalUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email: localUser.email,
                password: localUser.password,
            })

            if (response.status === 200) {
                dispatch(setUser(response.data))
                toast({
                    title: "Logged in successfully.",
                })
                navigate("/")
            }

        } catch (error: any) {
            console.error('Login failed', error.message);
            if (error.response) {
                if (error.response.status === 404) {
                    toast({
                        variant: "destructive",
                        title: "This email is not registered with us.",
                    })
                } else if (error.response.status === 401) {
                    toast({
                        variant: "destructive",
                        title: "Wrong password",
                    })
                } else {
                    toast({
                        variant: "destructive",
                        title: "An error occurred.. Please try again later.",
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

    const handleRegister = async (e: any) => {
        e.preventDefault();
        if (localUser.name.length < 3 || localUser.name.length > 20) {
            toast({
                variant: "destructive",
                title: "Name must be between 3 and 20 characters.",
            })
            return;
        }
        if (!nameRegex.test(localUser.name)) {
            toast({
                variant: "destructive",
                title: "Name can only contain alphabetic characters and spaces.",
            })
            return;
        }
        if (!emailRegex.test(localUser.email)) {
            toast({
                variant: "destructive",
                title: "Invalid email format.",
            })
            return;
        }
        if (!passwordRegex.test(localUser.password)) {
            toast({
                variant: "destructive",
                title: "Weak password",
                description: "Password must be at least 4 characters long || Must contain (at least) : 1. one lowercase letter 2. one uppercase letter 3. one number 4. one special character",
            })
            return;
        }

        try {
            const response: AxiosResponse<type.User> = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                name: localUser.name,
                email: localUser.email,
                password: localUser.password,
            })

            if (response.status === 200) {
                dispatch(setUser(response.data))
                toast({
                    title: "Registered successfully. Welcome!",
                })
                navigate("/")
            }

        } catch (error: any) {
            console.error('Registration failed', error.response);
            toast({
                variant: "destructive",
                title: error.response.data.message,
            })
        }
    };

    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login  */}
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
                            <Input id="email" placeholder="myaddress@email.com" value={localUser.email} onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder='stronggg password' value={localUser.password} onChange={(e) => setLocalUser({ ...localUser, password: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleLogin}>Login</Button>
                    </CardFooter>
                </Card>
                <div className="space-y-1 opacity-0 py-1 cursor-default">
                    <Label htmlFor="shapeholder">shapeholder</Label>
                    <Input className='cursor-default' id="shapeholder" />
                </div>
            </TabsContent>

            {/* Register  */}
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
                            <Input id="name" placeholder='Your name here' value={localUser.name} onChange={(e) => setLocalUser({ ...localUser, name: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="myaddress@email.com" value={localUser.email} onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Password</Label>
                            <Input id="new" type="password" placeholder='stronggg password' value={localUser.password} onChange={(e) => setLocalUser({ ...localUser, password: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleRegister}>Register</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}