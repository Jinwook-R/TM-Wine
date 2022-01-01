import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// WineRecommendation routing
const WineLabelImageRecommendation = Loadable(
    lazy(() => import('views/pages/wine-recomendation/wine-label-image-recommendation/WineLabelImageRecommendation'))
);

const WineKeywordRecommendation = Loadable(
    lazy(() => import('views/pages/wine-recomendation/wine-keyword-recommendation/WineKeywordRecommendation'))
);

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
            path: '/wineLabel',
            element: <WineLabelImageRecommendation />
        },
        {
            path: '/wineKeyword',
            element: <WineKeywordRecommendation />
        }
    ]
};

export default MainRoutes;
