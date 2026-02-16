import React from 'react';
import Hero from '@components/sections/Hero';
import FeaturesGrid from '@components/sections/FeaturesGrid';
import Projects from '@components/sections/Projects';
import TechStack from '@components/sections/TechStack';
import Testimonial from '@components/sections/Testimonial';
import BigCTA from '@components/sections/BigCTA';

const Home = () => {
  return (
    <>
      <Hero />
      <TechStack />
      <Projects />
      <FeaturesGrid />
      <Testimonial />
      <BigCTA />
    </>
  );
};

export default Home;
