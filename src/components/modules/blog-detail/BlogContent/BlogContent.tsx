import React from 'react';
import { Author, DateTime } from "src/components/common";
import IconFacebook from 'src/components/icons/IconFacebook';
import IconInstagram from 'src/components/icons/IconInstagram';
import IconTwitter from 'src/components/icons/IconTwitter';
import s from './BlogContent.module.scss';
import imageAuthor from '../../../common/Author/img/author.png';
import Link from 'next/link';
interface BlogContentProps {
    className?: string
    children?: any,
}
const BlogContent = ({}:BlogContentProps) => {
    return (
        <>
             <div className={s.blogContentWrapper}>
                <DateTime date="APRIL 30, 2021"/>
                <h1>The Best Sesame Soy Broccoli Salad</h1>
                <div className={s.author}>
                    <Author image={imageAuthor.src} name="Alessandro Del Piero" />
                </div>
                <section className={s.content}>
               
                    <p> When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.
                    <br/>
                    <br/>

                    Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.
                    <br/>
                    <br/>
                    This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.
                    </p>

                    <br/>
                    <br/>

                    <h2 className={s.heading2}>What is broccoli salad</h2>
                    <br/>
                    <p> When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.
                    <br/>
                    <br/>

                    Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.
                    <br/>
                    <br/>
                    This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.
                    </p>

                    <br/>
                    <br/>

                    <h2 className={s.heading2}>What about broccoli stems?</h2>
                    <br/>
                    <p>
                    You can eat broccoli stems. In fact, they are delicious. Just use a peeler to peel off the outsides and then trim the stalks into small 1/4”-1/2” cubes.
                    </p>
                    <br/>
                    <img  src="https://i.pinimg.com/236x/f0/bd/a6/f0bda6a9ed04a6c4ac9453be80c95f75.jpg" alt="blog-detail" />
                  
                </section>
                  
               <div className={s.boxShare}>
                   <div className={s.share}>
                     Share to:
                   </div>
                    <div className={s.listIcon}>
                        <ul>
                            <li><Link href="/"><a> <IconFacebook/></a></Link></li>
                            <li><Link href="/"><a> <IconTwitter/></a></Link></li>
                            <li><Link href="/"><a> <IconInstagram/></a></Link></li>
                        </ul>
                    </div>
                </div> 
             </div>
          
        </>
    )
}

export default BlogContent
