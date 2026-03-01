import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile, profileActions } from 'entities/Profile';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchProfileData = createAsyncThunk<
    Profile, void,
    ThunkConfig<string>>(

        'profile/fetchProfileData',
        async (_, { dispatch, extra, rejectWithValue }) => {
            try {
                const response = await extra.api.get<Profile>('/profile')
                console.log(extra)
                if (!response.data) {
                    throw new Error()
                }

                return response.data
            } catch (e) {
                return rejectWithValue('Введен неправильный логин или пароль')
            }
        },
    )
