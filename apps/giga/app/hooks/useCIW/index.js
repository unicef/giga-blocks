'use client'; 
import { useQuery } from '@tanstack/react-query';
import { apiGuest } from '../../utils/api';
import { ENDPOINTS } from '../../constants/api';

export const useGetAuthRequest = (id) =>{
    return useQuery(
        ['get-auth-request', id],
        async () => {
        const { data } = await apiGuest.get(
            `${ENDPOINTS.CIW.AUTHREQUEST}/${id}`
        );
        console.log('useGetAuthRequest', data);
        return data;
        },
        { retry: false }
    );
}