import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
    isPro: boolean
}

const SubscriptionButton = ({ isPro = false }: Props) => {
    return (
        <>
            {!isPro &&
                <Button
                    variant="premium"
                >
                    Upgrade
                </Button>}
        </>
    )
}

export default SubscriptionButton