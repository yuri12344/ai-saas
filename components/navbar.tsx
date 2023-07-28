import { UserButton } from '@clerk/nextjs';
import MobileSidebar from '@/components/mobile-sidebar';
import { getApiLimit } from '@/lib/api-limit';


const Navbar = async () => {
    const apiLimitCount = await getApiLimit()

    return (
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount}/>
            <div className="flex w-full justify-end">
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar