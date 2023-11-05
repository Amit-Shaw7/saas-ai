"use client";
import { signupSchema } from '@/app/(dashboard)/(routes)/code/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from "@/store/actions/AuthActions";
import { useState } from 'react';
import { registerUserType } from '@/types';
import Link from 'next/link';

const Login = () => {
    const { data, status } = useSession();
    const router = useRouter();
    const [error, setError] = useState<string>("");

    if (status === "loading") {
        <div>Loading</div>
    } else if (status === "authenticated") {
        router.push("/");
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isLoading },
    } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
    });


    const onSubmit = async (values: z.infer<typeof signupSchema>) => {
        const parameters: registerUserType = {
            data: {
                email: values.email,
                name: values.name,
                password: values.password
            },
            setError,
            router
        }
        await registerUser(parameters);
        reset();
    }

    return (
        <div className='relative w-full h-full flex items-center justify-center'>
            <Card className='w-[320px] md:w-[400px] flex items-center justify-center flex-col'>
                <CardHeader className='space-y-4'>
                    <CardDescription className='text-md font-bold text-center'>
                        Hey Welcome to
                        <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'> OriginAI</span>
                        , sign in to increase your productivity using AI tools.
                    </CardDescription>
                </CardHeader>

                <CardContent className='w-full flex flex-col gap-y-3'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="rounded-lg w-full focus-within:shadow-sm flex flex-col gap-y-3"
                    >

                        <Input
                            className={cn("border outline-none focus-visible:ring-0 focus-visible:ring-transparent", errors.email ? "border-red-500" : "border-gray-300")}
                            disabled={isLoading}
                            placeholder="Email"
                            {...register("email")}
                            type='email'
                            name='email'
                            aria-label='email'
                        />
                        {errors?.email?.message && <span className='text-red-500 text-xs'>
                            {errors.email?.message}
                        </span>}

                        <Input
                            className={cn("border outline-none focus-visible:ring-0 focus-visible:ring-transparent", errors.name ? "border-red-500" : "border-gray-300")}
                            disabled={isLoading}
                            placeholder="Name"
                            {...register("name")}
                            type='name'
                            name='name'
                            aria-label='name'
                        />
                        {errors?.email?.message && <span className='text-red-500 text-xs'>
                            {errors.name?.message}
                        </span>}

                        <Input
                            className={cn("border outline-none focus-visible:ring-0 focus-visible:ring-transparent", errors.password ? "border-red-500" : "border-gray-300")}
                            disabled={isLoading}
                            placeholder="Password"
                            {...register("password")}
                            type='password'
                            name='password'
                            aria-label='password'
                        />
                        {errors?.password?.message && <span className='text-red-500 text-xs'>
                            {errors.password?.message}
                        </span>}

                        <Button
                            variant="premium"
                            disabled={isLoading || isSubmitting}
                            className="col-span-12 lg:col-span-2 w-full"
                            type="submit"
                        >
                            Submit
                        </Button>

                    </form>

                    <p className='text-center text-sm'>OR</p>

                    <div className='flex flex-col gap-y-3'>
                        <Button
                            onClick={() => signIn('google')}
                            variant="outline"
                            className='rounded-sm w-full'
                        >
                            <Image
                                className='mr-2'
                                height="30"
                                width="30"
                                src="/google.png"
                                alt='Login with Google'
                            />
                            Sign up with Google
                        </Button>
                        {/* <Button
                            onClick={() => signIn('github')}
                            variant="outline"
                            className='rounded-sm w-full'
                        >
                            <Image
                                className='mr-2'
                                height="35"
                                width="35"
                                src="/github.png"
                                alt='Login with Google'
                            />
                            Sign up with Github
                        </Button> */}
                    </div>
                    <p className='text-xs text-gray-500 text-center'>
                        By signing up you agreed to our terms and condition
                    </p>
                </CardContent>

                <CardFooter className='text-gray-500 text-center font-semibold text-sm'>
                    Already have an account?<Link href="/login" className='text-primary underline'>&nbsp;Login</Link>
                </CardFooter>
            </Card>

            <div className='absolute top-4 left-4'>
                <Link href="/" className='flex items-center gap-x-3'>
                    <Image
                        className='mx-auto'
                        height="60"
                        width="60"
                        src="/Logo.png"
                        alt='Login'
                    />
                    <h3 className='text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent border-0'>
                        OriginAI
                    </h3>
                </Link>
            </div>
        </div>
    );
};

export default Login;



