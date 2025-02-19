import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { Task } from './Task';
import waves from '../assets/waves.svg'
import Footer from './Footer';

interface Task {
    title: string,
    description: string,
    status: string,
    dueDate: Date,
    priority: string,
    observer: string,
    assignedTo: string
}
export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([])
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.userStore.user)


    useEffect(() => {
        console.log('User:', user)
    }, [user])


    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const res: any = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getAll`)

                if (res.status === 200) {
                    setTasks(res.data);
                    console.log(res.data)
                }
            } catch (err: any) {
                toast({
                    variant: "destructive",
                    title: err.response.data.message || "Error occured processing this request.",
                })
                if (err.response.status === 401) {
                    navigate("/auth")
                }
            }
        }

        fetchAllTasks()
    }, [])


    const createTask = async () => {
        try {
            const dummyTask: Partial<Task> = {
                title: `Dummy Task #${Math.round(Math.random() * 10000)}`,
                description: 'Dummy Task Description',
                dueDate: new Date(),
                priority: "MEDIUM",
                observer: '67b2725361f65cc58fafb6ac',
                assignedTo: '67b2725361f65cc58fafb6ac'
            }
            const res: any = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/create`, dummyTask)

            if (res.status === 200) {
                setTasks([...tasks, dummyTask as Task]);
            }
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: err.response.data.message || "Error occured processing this request.",
            })
            if (err.response.status === 401) {
                navigate("/auth")
            }
        }
    }


    return (
        <div className='relative flex flex-col w-full h-full'>
            <Navbar />
            <div className='relative flex flex-col justify-around items-start w-full'>
                <Button className='ml-40 mt-10' onClick={createTask}>Create Task</Button>
                <div className='flex flex-row flex-wrap gap-4 p-8 justify-center'>
                    {tasks.map((task: any, idx: any) => {
                        return <Task key={idx} task={task}></Task>
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
