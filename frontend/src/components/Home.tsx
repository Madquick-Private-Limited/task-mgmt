import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

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
        <div className='flex flex-col h-full w-full'>
            <Navbar user={{notification: ['first one', 'second']}} />
            <div className='flex flex-row justify-around items-center w-full'>
                <Button onClick={createTask}>Create dummy Task</Button>
                <div>
                    <div className='font-bold'>Tasks :</div>
                    <div>
                        {tasks.map((task: any, idx: any) => {
                            return <div key={idx}>{task.title}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}