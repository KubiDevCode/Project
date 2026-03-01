import { useTranslation } from 'react-i18next';
import { DynamicModalLoader, ReducersList } from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { useEffect } from 'react';
import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage = () => {
    const { t } = useTranslation('about')
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <DynamicModalLoader reducers={reducers} removeAfterUnmount>
            <div>
                <ProfileCard />
            </div>
        </DynamicModalLoader>
    );
};

export default ProfilePage;
