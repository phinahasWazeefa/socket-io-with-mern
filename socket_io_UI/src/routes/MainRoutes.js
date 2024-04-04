import { lazy,useState, useEffect } from 'react';
import io from 'socket.io-client';

// project imports
import MainLayout from '../layout/MainLayout';

import Loadable from '../ui-component/Loadable'


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard/Dashboard')));
const UsersPage = Loadable(lazy(() => import('../views/Users/Users')));
const CategoryPage = Loadable(lazy(() => import('../views/Category/Category')));
const ServicePage = Loadable(lazy(() => import('../views/Service/Service')));
const UserServicePage = Loadable(lazy(() => import('../views/UserServiceListing/UserServiceListing')));




// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/users',
            element: <UsersPage />
        },
        {
            path: '/category',
            element: <CategoryPage />
        },
        {
            path: '/service',
            element: <ServicePage />
        },
        {
            path: '/user-service-listing',
            element: <UserServicePage />
        },
       
    ]
};

export default MainRoutes;
