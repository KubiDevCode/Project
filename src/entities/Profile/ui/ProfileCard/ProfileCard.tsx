import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Loading } from 'shared/ui/Loading';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/ui/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Country } from 'entities/Country/index';
import { Currency, CurrencySelect } from 'entities/Currency/index';
import s from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';
import { CountrySelect } from '../../../Country';

interface ProfileCardProps {
    className?: string;
    data?: Profile
    error?: string
    isLoading?: boolean
    readonly?: boolean
    onChangeFirstName?: (value?: string) => void
    onChangeLastName?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (value: Currency) => void
    onChangeCountry?: (value: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeCity,
        onChangeAge,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(s.ProfileCard, {}, [className, s.error])}>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(s.ProfileCard, {}, [className, s.loading])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('loadErrorTitle')}
                    text={t('loadErrorText')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [s.editing]: !readonly,
    };

    return (
        <div className={classNames(s.ProfileCard, mods, [className])}>
            <div className={s.data}>
                {data?.avatar && (
                    <div className={s.avatarWrapper}>
                        <Avatar src={data.avatar} size={150} />
                    </div>
                )}

                <Input
                    value={data?.first}
                    placeholder={t('firstName')}
                    className={s.input}
                    onChange={onChangeFirstName}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('lastName')}
                    className={s.input}
                    onChange={onChangeLastName}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder={t('age')}
                    className={s.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('city')}
                    className={s.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('username')}
                    className={s.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('avatar')}
                    className={s.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />

                <CurrencySelect
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};