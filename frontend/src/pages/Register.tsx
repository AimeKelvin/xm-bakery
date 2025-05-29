import Navigation from "../components/Navigation"
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { Link } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from "../store/useAuthStore"

interface SignUpForm {
    fullName: string;
    email: string;
    password: string;
}

const Register = () => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<SignUpForm>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    })
    const navigate = useNavigate()
    const { signup, isSigningUp } = useAuthStore()

    const onSubmit = async (data: SignUpForm) => {
        try {
            await signup(data)
            navigate('/login')
        } catch(error) {
            console.log(error)
            setValue('password', '')
        }
    }
    return (
        <div>
            <Navigation />
            <div className="mt-[50px] w-full">
                <p className='font-black text-center text-[32px]'>Register</p>
                <p className='text-center text-gray-400 cursor-pointer'>Our latest collection, where classic and contemporary styles converge in<br></br> a perfect harmony</p>
                <div className="flex justify-center mt-[20px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col items-center space-y-[6px]'>
                            <Controller 
                                name="fullName"
                                control={control}
                                rules={{
                                    required: 'Full Name is required',
                                }}
                                render={({ field }) => (
                                    <Input value={field.value} onChange={field.onChange}  inputType='text' inputPlaceholder="Full Name" />
                                )}
                            />
                            {errors.fullName && (
                                <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.fullName.message}</p>
                            )} 
                            <Controller 
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input value={field.value} onChange={field.onChange}  inputType='text' inputPlaceholder="Email Address" />
                                )}
                            />
                            {errors.email && (
                                <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.email.message}</p>
                            )}
                            <Controller 
                                name="password"
                                control={control}
                                rules={{
                                    required: 'Password is required',
                                }}
                                render={({ field }) => (
                                    <Input value={field.value} onChange={field.onChange}  inputType='password' inputPlaceholder="Password" />
                                )}
                            />
                            {errors.password && (
                                <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.password.message}</p>
                            )}
                            <Button isDisabled={isSigningUp &&  true} buttonText={isSigningUp ? 'Loading...' : 'Sign Up'} buttonBG='bg-black' buttonTextColor='text-white' />
                        </div>
                    </form>
                </div>
                <p className='text-center text-gray-400 cursor-pointer'>Already Tenant? <Link to='/login' className='text-black'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register