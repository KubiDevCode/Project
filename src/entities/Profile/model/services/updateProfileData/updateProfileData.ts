import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileForm, Profile, profileActions } from 'entities/Profile';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { ValidateProfileError } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
    Profile, void,
    ThunkConfig<ValidateProfileError[]>>(

        'profile/updateProfileData',
        async (_, {
            dispatch, extra, rejectWithValue, getState,
        }) => {
            const formData = getProfileForm(getState())

            const errors = validateProfileData(formData)

            if (errors.length) {
                return rejectWithValue(errors)
            }

            try {
                const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)
                if (!response.data) {
                    throw new Error()
                }

                return response.data
            } catch (e:any) {
                return rejectWithValue(e)
            }
        },
    )
