import { RouteObject } from 'react-router-dom';
import { ExtensionPage } from './pages/ExtensionPage';
import { HomePage } from './pages/HomePage';

const routes: RouteObject[] = [
    {
        path: '/extension/:share_id',
        element: <ExtensionPage />,
    },
    {
        path: '/',
        element: <HomePage />,
    },
];

export default routes;
