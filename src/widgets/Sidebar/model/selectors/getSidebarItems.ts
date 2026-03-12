import { createSelector } from '@reduxjs/toolkit';
import MainIcon from 'shared/assets/icons/main.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg'
import Articles from 'shared/assets/icons/articles.svg'
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../types/sidebarItems';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemList: SidebarItemType[] = [
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
        ]

        if (userData) {
            sidebarItemList.push(
                {
                    path: `${RoutePath.profile}${userData.id}`,
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
            )
        }

        return sidebarItemList
    },
)
