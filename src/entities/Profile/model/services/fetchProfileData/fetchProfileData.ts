import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchProfileData = createAsyncThunk<
    Profile, string,
    ThunkConfig<string>>(

        'profile/fetchProfileData',
        async (profileId, { dispatch, extra, rejectWithValue }) => {
            try {
                const response = await extra.api.get<Profile>(`/profile/${profileId}`)
                if (!response.data) {
                    throw new Error()
                }

                return response.data
            } catch (e) {
                return rejectWithValue('Введен неправильный логин или пароль')
            }
        },
    )
