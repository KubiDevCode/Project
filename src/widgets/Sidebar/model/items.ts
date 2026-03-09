import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg'
import Articles from 'shared/assets/icons/articles.svg'

export interface SidebarItemType {
    path: string
    text: string
    icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}

export const SidebarItemList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        icon: MainIcon,
        text: 'MainPage',
    },
    {
        path: RoutePath.about,
        icon: AboutIcon,
        text: 'AboutPage',
    },
    {
        path: RoutePath.profile,
        icon: ProfileIcon,
        text: 'ProfilePage',
        authOnly: true,
    },
    {
        path: RoutePath.articles,
        icon: Articles,
        text: 'Articles',
        authOnly: true,
    },
]
