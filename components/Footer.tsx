import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const Footer = ({ user, type = "desktop" }: FooterProps) => {
    const router = useRouter();

    const handleLogOut = async () => {
        const loggedOut = await logoutAccount();
        if (loggedOut) {
            router.push('/sign-in');
        }
    }
  return (
    <footer className='footer'>
        <div className={type === "desktop" ? "footer_name" : "footer_name-mobile"}>
            <p className='text-xl font-bold text-gray-700'>
                {user?.firstName[0]}
            </p>
        </div>

        <div className={type === "desktop" ? "footer_email" : "footer_email-mobile"}>
            <h1 className='text-14 truncate font-semibold text-gray-700'>
                {user?.firstName}
            </h1>
            <p className='text-14 font-semibold text-gray-400'>
                {user?.email}
            </p>
        </div>

        <div className={type === "desktop" ? "footer_image" : "footer_image-mobile"} onClick={handleLogOut}>
            <Image
                src="/icons/logout.svg"
                fill
                alt={user.name}
            />
        </div>
    </footer>
  )
}

export default Footer