import { useState } from 'react'
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const nameRegex = /^[A-Za-z\s]+$/


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
        try {
            const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email: user.email,
                password: user.password,
            })

            if (response.status === 200) {
                console.log('Logged in successfully.', response.data)
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
        if (user.name.length < 3 || user.name.length > 20) {
            toast({
                variant: "destructive",
                title: "Name must be between 3 and 20 characters.",
            })
            return;
        }
        if (!nameRegex.test(user.name)) {
            toast({
                variant: "destructive",
                title: "Name can only contain alphabetic characters and spaces.",
            })
            return;
        }
        if (!emailRegex.test(user.email)) {
            toast({
                variant: "destructive",
                title: "Invalid email format.",
            })
            return;
        }
        if (!passwordRegex.test(user.password)) {
            toast({
                variant: "destructive",
                title: "Password must be at least 8 characters long and contain both letters and numbers.",
            })
            return;
        }

        try {
            const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                name: user.name,
                email: user.email,
                password: user.password,
            })

            if (response.status === 200) {
                console.log('Registered successfully.', response.data)
                toast({
                    title: "Registered successfully. Please login.",
                })
            }

        } catch (error: any) {
            console.error('Registration failed', error.message);
            toast({
                variant: "destructive",
                title: "An error occurred. Please try again later.",
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
                            <Input id="email" placeholder="myaddress@email.com" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder='stronggg password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
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
                            <Input id="name" placeholder='Your name here' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="myaddress@email.com" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Password</Label>
                            <Input id="new" type="password" placeholder='stronggg password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
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