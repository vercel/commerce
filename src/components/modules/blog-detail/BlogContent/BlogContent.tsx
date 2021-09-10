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
                    <img  src="https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/An-%C4%91%E1%BA%B7c%20s%E1%BA%A3n%20v%C3%B9ng%20mi%E1%BB%81n/An-2-21%20%C4%91%E1%BA%B7c%20s%E1%BA%A3n%20SG%20ngon%20n%E1%BB%95i%20ti%E1%BA%BFng/tong-hop-21-dac-san-sai-gon-ngon-noi-tieng-khong-an-that-co-loi-2.jpg" alt="blog-detail" />
                  
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
