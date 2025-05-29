import Navigation from "../components/Navigation"
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { Link } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from "../store/useAuthStore"

interface SignInForm {
    email: string;
    password: string;
}

const Login = () => {

    const { control, handleSubmit, setValue, formState: { errors } } = useForm<SignInForm>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    })
    const navigate = useNavigate()
    const { signin, isSigningIn } = useAuthStore()

     const onSubmit = async (data: SignInForm) => {
        try {
            await signin(data)
            navigate('/control')
        } catch(error) {
            console.log(error)
            setValue('password', '')
        }
    }
    
    return (
        <div>
            <Navigation />
            <div className="mt-[50px] w-full">
                <p className='font-black text-center text-[32px]'>Login</p>
                <p className='text-center text-gray-400 cursor-pointer'>Our latest collection, where classic and contemporary styles converge in<br></br> a perfect harmony</p>
                <div className="flex justify-center mt-[20px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col items-center space-y-[6px]'>
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
                            <Button isDisabled={isSigningIn &&  true} buttonText={isSigningIn ? 'Loading...' : 'Sign In'} buttonBG='bg-black' buttonTextColor='text-white' />
                        </div>
                    </form>
                </div>
                <p className='text-center text-gray-400 cursor-pointer'>A new Tenant? <Link to='/register' className='text-black'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login