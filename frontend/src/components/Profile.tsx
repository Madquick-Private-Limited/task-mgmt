import { useSelector } from "react-redux"
// import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    // SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cleanUser } from "@/util/utilityFunc"

export function Profile() {
    const user = useSelector((state: any) => state.userStore.user)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>View your profile</SheetTitle>
                    <SheetDescription>
                        You can only view your profile information here.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {
                        Object.keys(cleanUser(user)).map((item: any, index: number) => {
                            return <div className="grid grid-cols-4 items-center gap-4" key={index}>
                                <Label htmlFor="name" className="text-right">
                                    {item}
                                </Label>
                                <Input id="name" readOnly value={user[item]} className="col-span-3" />
                            </div>
                        })
                    }
                </div>
                <SheetFooter>
                    {/* <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose> */}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
