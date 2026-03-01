import { RouteProps } from 'react-router-dom'
import { MainPage } from 'pages/MainPage'
import { AboutPage } from 'pages/AboutPage'
import { NotFoundPage } from 'pages/NotFoundPage/ui/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    // last
    NOT_FOUND = 'not_found'
}

export const RouthPath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RouthPath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RouthPath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RouthPath.profile,
        element: <ProfilePage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RouthPath.not_found,
        element: <NotFoundPage />,
    },
}
