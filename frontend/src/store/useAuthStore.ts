import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../utils/axios';


interface AuthUser {
    id: number;
    fullName: string;
    email: string;
}

interface useAuthStoreTypes {
    isSigningUp: boolean;
    isSigningIn: boolean;
    isCheckingAuth: boolean;
    authUser: AuthUser | null;
    signup: (data: { fullName: string; email: string; password: string; }) => Promise<void>;
    signin: (data: { email: string; password: string; }) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<useAuthStoreTypes>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckingAuth: false,

    signup: async (data) => {
        set({ isSigningUp: true })

        try {
            const res = await axiosInstance.post("/register", data);
            toast.success(res.data.message, { 
                position: 'bottom-center',
                duration: 5000,            
                className: 'font-afacadFlux text-[12px] font-bold cursor-pointer',
                style: {
                    color: '#fff',        
                    backgroundColor: '#15B392',
                    padding: '6px 20px', 
                },
            });
        } catch(error) {
            console.log(`Error ${error}`)
        } finally {
            set({ isSigningUp: false })
        }

    },

    signin: async (data) => {
        set({ isSigningIn: true })

        try {
            const res = await axiosInstance.post("/login", data);
            await get().checkAuth();
            toast.success(res.data.message, { 
                position: 'bottom-center',
                duration: 5000,            
                className: 'font-afacadFlux text-[12px] font-bold cursor-pointer',
                style: {
                    color: '#fff',        
                    backgroundColor: '#15B392',
                    padding: '6px 20px', 
                },
            });
        } catch(error) {
            console.log(`Error ${error}`)
        } finally {
            set({ isSigningIn:false })
        }

    },

    logout: async () => {
        try {
            await axiosInstance.post('/logout');
            set({ authUser: null });
        } catch (error: any) {
            console.error(`Logout error: ${error}`);
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get('/logged-in-user');
            set({ authUser: res.data });
        } catch (error: any) {
            console.error(`Check auth error: ${error}`);
            set({ authUser: null });
        if (error.response?.data?.message === 'Token expired') {
            console.log('Login token expired')
        }
        } finally {
            set({ isCheckingAuth: false });
        }
    },

}))