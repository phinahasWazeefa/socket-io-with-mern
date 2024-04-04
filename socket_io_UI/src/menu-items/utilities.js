// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'category',
            title: 'Category',
            type: 'item',
            url: '/category',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'service',
            title: 'Service',
            type: 'item',
            url: '/service',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'userService',
            title: 'User Service',
            type: 'item',
            url: '/user-service-listing',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
       
    ]
};

export default dashboard;

// Example 
// {
//     id: 'icons',
//     title: 'Icons',
//     type: 'collapse',
//     icon: icons.IconWindmill,
//     children: [
//         {
//             id: 'tabler-icons',
//             title: 'Tabler Icons',
//             type: 'collapse',
//             url: '/icons/tabler-icons',
//             breadcrumbs: false,
//             children: [
//                 {
//                     id: 'material-icons',
//                     title: 'Material Icons',
//                     type: 'item',
//                     url: '/icons/material-icons',
//                     breadcrumbs: false
//                 }
//             ]
//         },
//         {
//             id: 'material-icons',
//             title: 'Material Icons',
//             type: 'item',
//             url: '/icons/material-icons',
//             breadcrumbs: false
//         }
//     ]
// }