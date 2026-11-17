import { RouteObject } from 'react-router-dom';
import { CombinedPage } from './pages/CombinedPage';
import { ExtensionPage } from './pages/ExtensionPage';
import { HomePage } from './pages/HomePage';
import { MockCombinedPage } from './pages/MockLocalPage';

const routes: RouteObject[] = [
    {
        path: '/run/:share_id',
        element: <CombinedPage />,
    },
    {
        path: '/mock/:name',
        element: <MockCombinedPage />,
    },
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
