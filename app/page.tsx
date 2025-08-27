import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedPosts } from '@/components/home/FeaturedPosts'
import { TechStack } from '@/components/home/TechStack'
import { GlimmerLabIntro } from '@/components/home/GlimmerLabIntro'
import { SocialLinks } from '@/components/social/SocialLinks'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPosts />
      <TechStack />
      <GlimmerLabIntro />
      <SocialLinks />
    </>
  )
}
