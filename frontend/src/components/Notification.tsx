import { useState } from 'react'

export default function Notification({user} : {user: any}) {
    const [panelShown, setPanelShown] = useState(false)

    function handleClick() {
        setPanelShown((panelShown) => !panelShown)
    }

    return (
        <>
            {/* Notif icon */}
            <button onClick={handleClick} className='text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 pt-3 mr-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
            </button>

            {/* Panel */}
            {panelShown && <NotificationPanel notifications={user.notifications} handleClick={handleClick} />}
        </>
    )
}


function NotificationPanel({ notifications, handleClick }: { notifications: string[], handleClick: () => void }) {
    const blurStyle = {
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }

    return (
        <>
            {/* blur screen */}
            <div aria-hidden="true" className="fixed z-40 w-screen h-screen top-0 left-0" style={blurStyle}></div>

            {/* panel */}
            <div aria-hidden="true" className="overflow-y-auto overflow-x-hidden absolute top-1/4 left-1/3 z-50 w-full max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            {/* Heading */}
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Notifications
                            </h3>
                            {/* Close button */}
                            <button onClick={handleClick} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5">
                            <ul className="my-4 space-y-3">
                                {notifications.map((item: string, index: number) => (
                                    <li key={index}>
                                        <a className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                            <span className="flex-1 ms-3 whitespace-nowrap">{item}</span>
                                            {/* {isNew &&
                                                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">New</span>
                                            } */}
                                        </a>
                                    </li>
                                )).reverse()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}