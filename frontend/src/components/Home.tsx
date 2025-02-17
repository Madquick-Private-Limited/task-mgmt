import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from './ui/button';

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

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                const res: any = await Axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getAll`)

                if (res.status === 200) {
                    setTasks(res.data);
                }
            } catch (err: any) {
                console.log(err)
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
            console.log(err)
        }
    }

    return (
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
    )
}