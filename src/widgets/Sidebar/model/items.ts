import React from 'react';
import { RouthPath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg'

export interface SidebarItemType {
    path: string
    text: string
    icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemList: SidebarItemType[] = [
    {
        path: RouthPath.main,
        icon: MainIcon,
        text: 'MainPage',
    },
    {
        path: RouthPath.about,
        icon: AboutIcon,
        text: 'AboutPage',
    },
    {
        path: RouthPath.profile,
        icon: ProfileIcon,
        text: 'ProfilePage',
    },
]
