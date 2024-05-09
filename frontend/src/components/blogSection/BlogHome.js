import React from "react";
import { Card } from "react-bootstrap";

const BlogHome = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
        <Card style={{ width: '90%', padding: '1rem' }}>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        Hello, Welcome to my Blog
      </h1>
      <p className='mx-auto leading-relaxed text-base mb-4'>
      Welcome to my blog, where engineering meets career guidance!
       As an engineering student with a passion for helping others
        navigate their professional journeys, I'm here to offer you 
        the best of both worlds. Whether you're a fellow engineer
         seeking insights into your career path or someone looking 
         for guidance on building a fulfilling career, you've come to
          the right place.
      </p>
      <p className='mx-auto leading-relaxed text-base mb-4'>
      In this blog, you'll find a unique blend of technical expertise
       and career development advice. From tips on mastering engineering 
       concepts to strategies for networking, resume building, and interview
        preparation, I'll provide you with practical insights and resources
         to excel in both your academic and professional pursuits.
      </p>
      <p className='mx-auto leading-relaxed text-base mb-4'>
      Join me on this journey as we explore the intersection of
       engineering and career development, and embark on a path 
       towards realizing your full potential. Let's bridge the gap
        between theory and practice, and build a future where your
         engineering skills are not only valued but also leveraged 
         to create meaningful impact in your chosen field. 
        Welcome to my blog, where engineering meets career guidance! 
        As an engineering student passionate about both technology and
         personal development, I'm here to share insights, tips, and
          resources to help fellow students and professionals navigate
           the intersection of engineering and career advancement.

          In this space, you'll find a wealth of articles, guides, 
          and discussions covering a wide range of topics, from technical 
          skills and project management to resume building, interview preparation,
           and career planning. Whether you're a student seeking internship 
           opportunities, a recent graduate entering the workforce, or an
            experienced engineer looking to take your career to the next 
             level, you'll find valuable resources tailored to your needs.

          Join me on this journey as we explore the diverse and dynamic world 
          of engineering careers. Let's work together to unlock your full potential
          , overcome challenges, and pave the way for a successful and fulfilling 
          career in engineering. Welcome aboard!
      </p>
      </Card>
    </div>
  );
};

export default BlogHome;