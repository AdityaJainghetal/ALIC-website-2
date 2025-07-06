import React from "react";
import { Layout } from "../../layouts/Layout";
// import { HeroOne } from "../../components/hero/HeroOne";
// import { AboutOne } from "../../components/about/AboutOne";
import { WhyChooseOne } from "../../components/why_choose/WhyChooseOne";
import { FunfactTwo } from "../../components/fun_facts/FunfactTwo";
import { TeamOne } from "../../components/teams/TeamOne";
import { CallbackPopup } from "../../components/popup/CallbackPopup";
import { TestimonialTwo } from "../../components/testimonials/TestimonialTwo";
import { FaqOne } from "../../components/faqs/FaqOne";
import { Slider } from "../../components/videos/Slider";
import { EventOne } from "../../components/events/EventOne";
import { BlogOne } from "../../components/blogs/BlogOne";
import { CoursesOne } from "../../components/courses/CoursesOne";
import { SuccessStory } from "../../components/success/Stories"
import MarqueeStrike from "../../components/popup/MarqueeStrike";
import AdPopup from "../../components/popup/AdPopup";
import WhatsNew from "../../components/fun_facts/WhatsNew";
import { HeroThree } from "../../components/hero/HeroThree";
import PriceTag from "../../components/hero/PriceTag";
// import { HomeTwo } from "./HomeTwo";


export const HomeOne = () => {
  return (
    <Layout header={9} footer={1}>
      {/* hero */}
 <HeroThree />

      {/* <HeroOne /> */}

      <MarqueeStrike />



          {/* <PriceTag /> */}


          {/* <HomeTwo /> */}

      {/* popular */}
      <CoursesOne />


      {/* popular */}
      <WhatsNew />

      <SuccessStory />
   {/* feature */}
   <FunfactTwo />
      <Slider />

       {/* event schedule */}
 <EventOne />

      {/* team */}
      <TeamOne />

   {/* why choose */}
   <WhyChooseOne />

      {/* blog */}
      <BlogOne />

  {/* faqs */}
  <FaqOne />

      <CallbackPopup />

      {/* <AdPopup/> */}

    </Layout>
  );
};
