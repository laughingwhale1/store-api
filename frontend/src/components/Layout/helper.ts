import {IoHomeOutline} from "react-icons/io5";
import {MdOutlineProductionQuantityLimits} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";
import {TbReportSearch} from "react-icons/tb";

export const navBarLinks = [
    {
        name: 'Dashboard',
        url: '/app/dashboard',
        icon: IoHomeOutline
    },
    {
        name: 'Products',
        url: '/app/products',
        icon: MdOutlineProductionQuantityLimits
    },
    {
        name: 'Users',
        url: '/app/users',
        icon: FaRegUser
    },
    {
        name: 'Reports',
        url: '/app/reports',
        icon: TbReportSearch
    },
]
