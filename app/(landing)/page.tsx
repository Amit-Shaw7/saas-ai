import LandingContent from '@/components/LandingContent';
import LandingHero from '@/components/LandingHero';
import LandingNavbar from '@/components/landingNavbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const LandingPage = () => {
  return (
    <div className='h-full'>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}

export default LandingPage;