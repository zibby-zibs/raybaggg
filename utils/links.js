import { FaHome, FaIdBadge} from 'react-icons/fa'
import { IoMdContacts } from 'react-icons/io'
import {BsCurrencyExchange } from 'react-icons/bi'
import { HiCurrencyDollar } from 'react-icons/hi'

export const data = [
    {
        id: 1,
        text: 'Home',
        icon: <FaHome className='text-2xl '/>,
        push: '/'
    },
    {
        id: 2,
        text: 'Investments',
        icon: <HiCurrencyDollar className='text-2xl '/>,
        push: '/activeInvestment'
    },
    {
        id: 3,
        text: 'Contact Us',
        icon: <IoMdContacts className='text-2xl '/>,
        push: '/about'
    },
    {
        id: 4,
        text: 'Profile',
        icon: <FaIdBadge className='text-2xl '/>,
        push: '/profile'
    },
]