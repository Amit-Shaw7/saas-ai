import SubscriptionButton from '@/components/SubscriptionButton';
import Heading from '@/components/heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import User from '@/components/user';
import { checkIsPro } from '@/lib/subscriptions';
import { FileIcon } from 'lucide-react'
import React from 'react'

const Account = async () => {
    const isPro = await checkIsPro();
    return (
        <div>
            <Heading
                title="Account"
                description="Manage your account"
                icon={FileIcon}
                iconColor='text-gray-700'
                bgColor='bg-gray-700/10'
            />



            <div className='px-4 lg:px-8 space-y-4'>
                <p className='text-gray-500 text-sm'>
                    {
                        isPro ?
                            "You are currently on a pro plan"
                            :
                            "You are currently on  a free plan"

                    }
                </p>
                <SubscriptionButton isPro={isPro} />
            </div>
            <User />
        </div>
    )
}

export default Account