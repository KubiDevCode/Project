import { useTranslation } from 'react-i18next';
import { DynamicModalLoader, ReducersList } from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';
import { useCallback, useEffect } from 'react';
import {
    fetchProfileData,
    getProfileError, getProfileForm, getProfileIsLoading,
    getProfileReadonly, getProfileValidateErrors, profileActions,
    ProfileCard, profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ProfillePageHeader } from 'entities/Profile/ui/ProfillePageHeader/ProfillePageHeader';
import { useParams } from 'react-router-dom';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text } from 'shared/ui/Text';
import { TextTheme } from 'shared/ui/Text/ui/Text';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '../../../shared/ui/Page/Page';

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage = () => {
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)
    const validateErrorsTranslate = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('validation.incorrectUserData'),
        [ValidateProfileError.INCORRECT_USER_AGE]: t('validation.incorrectUserAge'),
        [ValidateProfileError.INCORRECT_USER_COUNTRY]: t('validation.incorrectUserCountry'),
        [ValidateProfileError.NO_DATA]: t('validation.noData'),
        [ValidateProfileError.SERVER_ERROR]: t('validation.serverError'),
    }
    const { id } = useParams<{ id: string }>()

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id))
        }
    })

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.upadateProfile({ first: value }))
    }, [dispatch])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.upadateProfile({ lastname: value }))
    }, [dispatch])

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.upadateProfile({ age: Number(value) }))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.upadateProfile({ city: value }))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.upadateProfile({ username: value }))
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.upadateProfile({ avatar: value }))
    }, [dispatch])

    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.upadateProfile({ currency: value }))
    }, [dispatch])

    const onChangeCountry = useCallback((value: Country) => {
        dispatch(profileActions.upadateProfile({ country: value }))
    }, [dispatch])

    return (
        <DynamicModalLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <ProfillePageHeader />
                {validateErrors?.length && validateErrors.map((err) => (
                    <Text theme={TextTheme.ERROR} text={validateErrorsTranslate[err]} key={err} />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    readonly={readonly}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </Page>
        </DynamicModalLoader>
    );
};

export default ProfilePage;
