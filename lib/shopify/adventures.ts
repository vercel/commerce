import { AdventureClient } from '../cf/adventures';

const baseImagePath = 'https://publish-p64257-e147834-cmstg.adobeaemcloud.com/';

const getAllAdventures = async () => {
  const client: AdventureClient = AdventureClient.fromEnv();
  const res = await client.getAllAdventures();
  const adventures = res?.data?.adventureList?.items || [];
  return adventures;
};

export async function getStaticCart() {
  const mockShopifyProduct = (await getAdventureProducts())[0];
  const mockCartItem = {
    id: 'item1',
    quantity: 1,
    cost: {
      totalAmount: {
        amount: '100.00',
        currencyCode: 'USD'
      }
    },
    merchandise: {
      id: 'merchandise1',
      title: 'WKND Adventure',
      selectedOptions: [
        {
          name: 'Duration',
          value: 'Normal'
        }
      ],
      product: mockShopifyProduct
    }
  };

  const cart = {
    id: 'cart1',
    checkoutUrl: 'https://example.com/checkout',
    cost: {
      subtotalAmount: {
        amount: '90.00',
        currencyCode: 'USD'
      },
      totalAmount: {
        amount: '100.00',
        currencyCode: 'USD'
      },
      totalTaxAmount: {
        amount: '10.00',
        currencyCode: 'USD'
      }
    },
    lines: { edges: [{ node: mockCartItem }] },
    totalQuantity: 1
  };

  return cart;
}

const adventuresOld = [
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/bali-surf-camp/bali-surf-camp',
    title: 'Basel Surf Camp',
    activity: 'Surfing',
    adventureType: 'Overnight Trip',
    price: '$3000 USD',
    tripLength: '6 Days',
    groupSize: '5-6',
    difficulty: 'Beginner',
    primaryImage: {
      _path: '/content/dam/aem-demo-assets/en/adventures/bali-surf-camp/AdobeStock_175749320.jpg',
      mimeType: 'image/jpeg',
      width: 1600,
      height: 899
    },
    description: {
      html: "<p>Surfing in Bali is on the bucket list of every surfer - whether you're a beginner or someone who's been surfing for decades, there will be a break to cater to your ability. Bali offers warm water, tropical vibes, awesome breaks and low cost expenses.</p>\n"
    },
    itinerary: {
      html: `<p style="text-align: start; padding: 0px;"><strong>Keramas</strong></p><p style="text-align: start; padding: 0px;">The most <em>famous</em> break in Bali is home to a WSL stop and features a fast barrelling right-hand reef break. One of Bali's most consistent waves, you'll have fun on waves from 2ft to 20 ft.</p><p style="text-align: start; padding: 0px;"><strong>Nusa Dua</strong></p><p style="text-align: start; padding: 0px;">Home to the best right handers in Bali, Nusa Dua is famous for big wave surfing and is suitable for the advanced surfers in the group. The Nusa Dua reef has numerous waves that break on different tides and slightly different conditions.</p><p style="text-align: start; padding: 0px;"><strong>Sanur</strong></p><p style="text-align: start; padding: 0px;">Located on the East coast, Sanur only breaks when there is a big swell and is at it's best when it's well overhead. Waves break over a very sharp reef so be prepared to leave some skin behind.</p>`
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/beervana-portland/beervana-in-portland',
    title: 'Beervana in Portland',
    activity: 'Social',
    adventureType: 'Day Trip',
    price: '$300 USD',
    tripLength: '1 Day',
    groupSize: '6-8',
    difficulty: 'Beginner',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/beervana-portland/AdobeStock_279232449.jpeg',
      mimeType: 'image/jpeg',
      width: 1381,
      height: 920
    },
    description: {
      html:
        '<h3>Experience the best craft breweries in the Pacific Northwest.</h3>\n' +
        '<p>Portland is often referred to as Beervana, and it’s easy to understand why once you get a sip of their delicious ales. &nbsp;This adventure will provide insider access to spectacular local breweries that define the taste and experience of Oregon beer culture and tradition.&nbsp; &nbsp;Our Brewery Tour takes you on a beer tasting adventure in hip and trendy Pearl District through Historic Old Town District in Portland, Oregon. Experience Portland’s vibrant history while you sample the best brews the city has to offer.</p>\n'
    },
    itinerary: {
      html:
        "<p>We will start with the education first and introduce you to the ingredients in beer and how they've contributed to the rise of craft beer in the Pacific Northwest. We'll walk you through the tasting process so you can better enjoy beers and explore new styles.</p>\n" +
        '<h3>Walt Brewing and Barrel House</h3>\n' +
        "<p>Our first stop for a tour and lunch will be&nbsp;Walt Brewing and Barrel House<b>.</b>&nbsp;Walt Brewing and Barrel House has become Oregon's premier Belgian-style brewpub and one of the fastest growing craft breweries in the country. Walt Brewing and Barrel House is growing by leaps and bounds, with six pubs located throughout the Pacific Northwest, and an impressive brand new production facility in Seattle.</p>\n" +
        '<h3>Amendola Brewing Company</h3>\n' +
        "<p>On our next stop in the hip Pearl District location on Portland, you'll get VIP access behind the scenes to see the brewing process and how the ingredients work together to produce the liquid love at Amendola Brewing Company.&nbsp; Amendola's is known for it's tasty full-bodied stouts and porters that feel like a feast in and of itself.</p>\n" +
        "<h3>Gordon's Hop and Scotch</h3>\n" +
        "<p>By the 3rd stop, let's get ready for some eats! Food paired with beer is the best way to enjoy both food and beer. Gordon's Hops and Scotch will be a great venue where you can connect with your new beer connoisseur friends, play some cornhole and bocce ball, all while sipping on some of the city's finest suds and snacks.&nbsp;</p>\n"
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/climbing-new-zealand/climbing-new-zealand',
    title: 'Climbing New Zealand',
    activity: 'Rock Climbing',
    adventureType: 'Overnight Trip',
    price: '$900 USD',
    tripLength: '2 Days',
    groupSize: '2-3',
    difficulty: 'Intermediate',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/climbing-new-zealand/AdobeStock_140634652.jpeg',
      mimeType: 'image/jpeg',
      width: 1293,
      height: 862
    },
    description: {
      html:
        '<h2><b>Let us take you on a spectacular climbing experience unique to New Zealand</b></h2>\n' +
        '<p>Feel the raw adventure and excitement of our guided rock climbing experience. Reach new heights under our professional instruction and feel your body and mind work together in harmony.&nbsp;Come join us for a guided rock climbing adventure in the mountains that trained Sir Edmund Hilary. Whether it is your first time thinking of putting on climbing shoes or you are an old hand looking for some new challenges, our guides can make your climbing adventure a trip you won’t soon forget. New Zealand has countless climbing routes to choose from and is known as one of the premiere climbing destinations in the world. With so many different routes and areas to choose from our guides can tailor each trip to your exact specifications. Let us help you make your New Zealand climbing vacation a memory you will cherish forever!</p>\n'
    },
    itinerary: {
      html:
        "<h2><b>Day 1 - It's climb time</b></h2>\n" +
        "<p>We depart and end from a central meeting spot in the town of Fauchere.&nbsp; From there we'll be driving 30-50 minutes to the climbing site. On our way there, we'll go over important safety and climbing procedures. After arriving at trailhead, we will confirm all safety and personal climbing equipment (shoes, harness, helmets, belay devises, and more). Our hike to the climbing area will be between 5 minutes to an hour based on where we decide to climb and the desires of the group. On the rock, we will spend about 6 hours climbing.&nbsp; We'll go over different bouldering and climbing techniques first, fundamentals of setting anchors, belay systems and hardware,. Then, we'll make our way to the top.&nbsp; Once we get there, you'll find the view to be spectactular and the sense of accomplishment even better.&nbsp; But as they say, what goes up must come down. We now face another challenge - rappelling back down. But after a day of learning and applying our skills, we will be very comfortable on the mountain and with our abilities.</p>\n" +
        "<h2><b>Day 2 - Up the world's highest waterfall climb</b></h2>\n" +
        "<p>Now it's time to satiate your inner-adrenaline junkie.&nbsp; We're going up behind a 60m waterfall to the top of Wanaka. You’ll be pushed to reach the highest point, both mentally and physically, with overhangs to get you there. Enjoy the incredible views of surrounding lakes and mountains once you reach summit.&nbsp;</p>\n"
    }
  },
  {
    _path:
      '/content/dam/aem-demo-assets/en/adventures/colorado-rock-climbing/colorado-rock-climbing',
    title: 'Overnight Colorado Rock Climbing',
    activity: 'Rock Climbing',
    adventureType: 'Overnight Trip',
    price: '$1000 USD',
    tripLength: '3 Days',
    groupSize: '8',
    difficulty: 'Advanced',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/colorado-rock-climbing/AdobeStock_241578158.jpg',
      mimeType: 'image/jpeg',
      width: 1000,
      height: 667
    },
    description: {
      html: "<p>With all of Colorado's beautiful peaks, rock formations and gorgeous mountain views, it's not hard for rock climbers to find a little slice of climbing paradise nearly everywhere they go. On this tour we'll take you to the top parks in Colorado so you can experience the diverse climbing landscape that has made Colorado a goto destination for rock climbers from around the world.</p>\n"
    },
    itinerary: {
      html:
        '<h2>Garden of the Gods</h2>\n' +
        '<p>A local favorite close to Colorado Springs, the Garden of the Gods features paved hiking trails that wind through a natural rock garden of red sandstone formed by 300 million years of geological activity..</p>\n' +
        '<h2>Rocky Mountain National Park</h2>\n' +
        '<p>Rocky Mountain National Park encompasses 415 square miles containing 300 miles of hiking trails, wildlife, alpine worlds and of course world class rock climbing. Keep an eye out for elk, bighorn sheep, moose and mule deer.</p>\n' +
        '<h2>Castlewood Canyon State Park</h2>\n' +
        "<p>This park offers something for all skill levels from 20 feet to 60 feet. The routes are short but we'll be able to get multiple climbs for the day. We'll enjoy a picnic at the Bridge Canyon Overlook.</p>\n"
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/cycling-southern-utah/cycling-southern-utah',
    title: 'Cycling Southern Utah',
    activity: 'Cycling',
    adventureType: 'Overnight Trip',
    price: '$3000',
    tripLength: '5 Days',
    groupSize: '12-14',
    difficulty: 'Advanced',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/cycling-southern-utah/AdobeStock_185324648.jpg',
      mimeType: 'image/jpeg',
      width: 1000,
      height: 667
    },
    description: {
      html: "<p>Join us as we explore the rugged, stunningly gorgeous landscape of southern Utah. Touch your soul as we ride through red rock canyons and sandstone cliffs in Bryce Canyon and Zion National Park, two of Utah's iconic national parks. These parks provide a stunning backdrop for a once in a lifetime cycling vacation.</p>\n"
    },
    itinerary: {
      html:
        '<h2>Welcome to Utah</h2>\n' +
        "<p>After a beautiful 2 hour shuttle ride to the Ridge Lodge, we'll have a delicious lunch at the Roundabout Saloon where we'll make introductions and discuss bike riding in a national park. Our first ride will be amongst the sandstone cliffs in Bryce Canyon.</p>\n" +
        '<h2>Bryce Canyon</h2>\n' +
        "<p>Ride along one of the most scenic byways in the world as you'll encounter views which stretch in every direction. Enjoy lunch amongst the red rock formations where you'll be able to hop off your bike and explore.</p>\n" +
        '<h2>Zion National Park</h2>\n' +
        '<p>Follow the route where ancient native people and pioneers walked while gazing at the steep red cliffs that Zion National Park is known for. Experience one of the highlights of Zion as we visit a 2000 feet deep canyon with opportunities to hike in an area known as the Narrows.</p>\n'
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/cycling-tuscany/cycling-tuscany',
    title: 'Cycling Tuscany',
    activity: 'Cycling',
    adventureType: 'Overnight Trip',
    price: '$4500 USD',
    tripLength: '4 Days',
    groupSize: '3-4',
    difficulty: 'Intermediate',
    primaryImage: {
      _path: '/content/dam/aem-demo-assets/en/adventures/cycling-tuscany/AdobeStock_261097343.jpeg',
      mimeType: 'image/jpeg',
      width: 1688,
      height: 1125
    },
    description: {
      html:
        '<h2><b>Experience Tuscany by Bicycle</b></h2>\n' +
        "<p>Visiting Tuscany on a bicycle is about experiencing the old world charm of Italy on your own terms. Your efforts on the climbs of Italy's rolling hills during this tour will be rewarded with sunny Mediterranean landscapes and unmatched Italian hospitality.&nbsp; Tuscany’s natural wonders have always been a well of inspiration for arts and culture. Find out why as you explore the Italian countryside and coastline on bicycle.</p>\n"
    },
    itinerary: {
      html:
        '<h2><b>Day 1:&nbsp;Radda to Siena</b></h2>\n' +
        '<p>On the first day, we’ll cycle from Radda to the medieval city of Siena, a beautiful Tuscan city distinguished by its medieval brick buildings.&nbsp;En-route, we’ll stop for lunch and a wine tasting at the Felsina Vineyard. The central piazza, known as Il Campo, is famous for the Palio run, a horse race run around the piazza two times every summer.&nbsp;</p>\n' +
        '<h2><b>Day 2:&nbsp;Siena &amp; Monteriggioni Loop</b></h2>\n' +
        "<p>Take a quick ride out of Siena to the medieval town of Monteriggioni in the morning. In the afternoon, we'll join a local family-owned vineyard for lunch. You’ll learn how to make pasta and pizza from scratch and enjoy their family's best wine. To really make your stay memorable, live, traditional Tuscan folk music will join after lunch for a small celebration.</p>\n" +
        '<h2><b>Day 3:&nbsp;Chianti</b></h2>\n' +
        "<p>On day 3, we explore the Chianti region of Italy on the Amendola road.&nbsp; If you love beautiful architechture, it's a real treat to cycle around it's cobblestone streets. This is a rural region of Tuscany in the provinces of Florence, Siena and Arezzo, composed mainly of hills and mountains, so there may be some more climbing through this region. Let's put some work in today!</p>\n" +
        '<h2><b>Day 4:&nbsp;Arrivederci!</b></h2>\n' +
        '<p>After breakfast at 9 am we offer a 45-min group shuttle to the nearest train station. From there, you can connect to Florence or Rome in less than 2 hours.</p>\n'
    }
  },
  {
    _path:
      '/content/dam/aem-demo-assets/en/adventures/downhill-skiing-wyoming/downhill-skiing-wyoming',
    title: 'Downhill Skiing in Jackson Hole, Wyoming',
    activity: 'Skiing',
    adventureType: 'Overnight Trip',
    price: '$400 USD',
    tripLength: '2-3 days',
    groupSize: '3-4',
    difficulty: 'Intermediate',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/downhill-skiing-wyoming/AdobeStock_185234795.jpeg',
      mimeType: 'image/jpeg',
      width: 1180,
      height: 787
    },
    description: {
      html:
        '<h2>Experience wild untamed, rolling, wide-open terrain of Wyoming in the winter.<br>\n' +
        '</h2>\n' +
        '<p>The spectacular Tetons of Wyoming provide a wonderous backdrop for your Jackson Hole ski vacation.&nbsp; Jackson Hole is unlike anywhere else in the US.&nbsp; A skiers paradise far from crowds and close to nature with terrain so vast it appears uncharted.&nbsp; With 2,500 acres of legendary terrain, unmatched levels of snowfall each winter, and unparalleled backcountry access, Jackson Hole offers a truly unique skiing experience.</p>\n'
    },
    itinerary: {
      html:
        '<h2>Day 1 - Hit the Slopes</h2>\n' +
        "<p>We get going bright and early in Wyoming.&nbsp; The lifts at Jackson Hole Mountain Resort start running at 8 am and we intend to be among the first up the slopes!&nbsp;With more than 2,500 acres of inbounds terrain and a nice&nbsp;blend of beginner, intermediate and expert-level terrain, there's so much to explore on the mountain. Once you're ready to call it a day, check out one of the cozy apres ski spots in Jackson.<br>\n" +
        '</p>\n' +
        '<h2><b>Day 2 - Keep it Going</b></h2>\n' +
        "<p>Now that you're acclimated to the glorious ski conditions of Northwestern Wyoming, let's really get after it.&nbsp; Spend the day skiing the world renowned steeps and deeps at Knoblach Mountain Resort.&nbsp; Find out why this place is known as the birthplace of big-mountain freeskiing and home to many of the pioneers of the sport.</p>\n" +
        '<h2><b>Day 3 - Snowmobile Tour</b></h2>\n' +
        "<p>Take a day off from skiing and head to Taneja Pass, just northeast of Jackson, to enjow a day on snowmobiles.&nbsp;&nbsp;It's a great way to enjoy views of the Tetons and explore the terrain on a sunny day.&nbsp; Weather permitting, we can make a trip to Granite Hot Spring and soak in all the goodness.</p>\n"
    }
  },
  {
    _path:
      '/content/dam/aem-demo-assets/en/adventures/gastronomic-marais-tour/gastronomic-marais-tour',
    title: 'Gastronomic Marais Tour',
    activity: 'Social',
    adventureType: 'Day Trip',
    price: '$95 USD',
    tripLength: '1 Day',
    groupSize: '4-6',
    difficulty: 'Beginner',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/gastronomic-marais-tour/AdobeStock_270835979.jpg',
      mimeType: 'image/jpeg',
      width: 1000,
      height: 667
    },
    description: {
      html: `<p style="text-align: start; padding: 0px;">Take a VIP gastronomic tour through the vibrant Marais, one of the oldest, colorful and historical areas of Paris. Our Marais expert, Marie Bernard will take food lovers to the top food shops, patisseries and chocolate shops as you take in Marais' unique atmosphere.</p>`
    },
    itinerary: {
      html: '<p>Meet your guide and small group (maximum 6 people) in the center of the Le Marais district. Learn from Marie about the artisanal French cuisine and culinary specialties from surrounding countries that make this one of the most fascinating and delicious destinations in Paris. Walk from shop to shop and experience the trendy district while sampling regional wines and cheese and, of course, patisseries. Continue past top neighborhood sights like the Maison de Victor Hugo&nbsp;and Place des Vosges, and browse Merci for vintage clothing and homeware accessories, gifts and stationary. Along the tour you’ll sample cured meats, craft cocktails, locally sourced foods and, of course, French wines. This tour offers convenient afternoon and evening start times, and includes all food and wine tastings and beverages..</p>\n'
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/napa-wine-tasting/napa-wine-tasting',
    title: 'Napa Wine Tasting',
    activity: 'Social',
    adventureType: 'Day Trip',
    price: '$150 USD',
    tripLength: '1 Day',
    groupSize: '6-8',
    difficulty: 'Beginner',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/napa-wine-tasting/AdobeStock_280313729.jpg',
      mimeType: 'image/jpeg',
      width: 1000,
      height: 563
    },
    description: {
      html:
        '<h3>Enjoy spectacular wine tasting in the Napa Valley</h3>\n' +
        '<p>Napa Valley is one of the most famous wine regions in the world. Located an hour north of San Francisco, Napa is renowned for their wine, pleasant temperatures and world class restaurants. This tasting will provide insider access to spectacular wineries and restaurants in Yountville, Calistoga and St. Helena.</p>\n'
    },
    itinerary: {
      html:
        "<h3>Dog's Bark Winery</h3>\n" +
        "<p>Our first stop will be at the family owned Dog's Bark Winery where you'll get a behind the scenes peak at the wine making process. Dog's Bark is one of Napa's first wineries, founded in 1875 by Pierre Martin an immigrant from Bordeaux.</p>\n" +
        '<h3>Spring Winery</h3>\n' +
        '<p>Since 1959, Spring Winery has been producing world-class wines that pair best with great food and great company. Their wines reflect the personality of their wine makers and the surrounding vineyards in the heart of Napa Valley</p>\n' +
        '<h3>Mountain Creek Winery</h3>\n' +
        "<p>For over 35 years, Mountain Creek Winery has produced award winning wines using organically grown grapes and traditional winemaking techniques. You won't just be tasting the wine, you'll get an inside look at the way wine is made —&nbsp;from the way the land is farmed to where the wine is made.</p>\n"
    }
  },
  {
    _path:
      '/content/dam/aem-demo-assets/en/adventures/riverside-camping-australia/riverside-camping-australia',
    title: 'Riverside Camping Australia',
    activity: 'Camping',
    adventureType: 'Overnight Trip',
    price: '$500 USD',
    tripLength: '3 Days',
    groupSize: '5-6',
    difficulty: 'Beginner',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/riverside-camping-australia/AdobeStock_257541512.jpeg',
      mimeType: 'image/jpeg',
      width: 1379,
      height: 776
    },
    description: {
      html: "<p>Escape the hustle and bustle of city life and recharge with a couple of peaceful days and return with tons of memories of camping in the bush and experiences that will last a lifetime. Learn how to pitch a tent by the Siegel River, catch local cod, and spot unique Australian wildlife on this retreat. Or, you can sit back in the shade with a cool beverage and a book until it's too dark to read, then tell stories around a campfire.&nbsp; &nbsp;&nbsp;</p>\n"
    },
    itinerary: {
      html:
        '<p><b>Day 1 - Leave the city behind</b></p>\n' +
        "<p>You'll disembark at the historic Chaikelson Town train station where you'll be greeted by your guides. We'll kick things off with a quick tour of the town made famous by Brian Mathias in his poem,&quot;The Man From Huesler&quot;, the name by which&nbsp;Chaikelson Town was formally known. The station building dates from the opening of the line to Chaikelson Town in 1880 and is a fine Victorian railway station building with original fabric and detailing typical of the period.</p>\n" +
        "<p>Leaving town behind, we'll take a short drive out to Knoblach. From there we'll jump in the boat and head up river in search of a remote and completely private campsite. Help light the fire or sit in the quiet and you enjoy leave the city behind. Enjoy a cold drink and some snacks as the colours change with the setting of the sun over the hills, before enjoying a meal cooked over the open fire. With dinner done, sit back and take part in the age old tradition of spinning a yarn (telling tales) around the camp fire. If you're feeling energetic, we'll take the spot lights out for a walk to see what nocturnal critters we can spot.</p>\n" +
        '<p><b>Day 2 - A morning on the water</b></p>\n' +
        "<p>After a hearty cooked breakfast including a freshly made Aussie damper, jump in the boat and explore the water. Your guides are fully licensed and know the area well. Try your luck chasing the famous Handke Cod and other natives or see if we can catch a delicious Red Fin. Or at very least, pick up a story of the one that got away. Search for eagles' nests, ride alongside pelicans and other water birds and spot a wide array of native animals, including kangaroos, emus, and wild goats and deer along with the sheep and cattle that graze along the waters edge. View the remnants of the pioneers; foundations of old homes, the old Kumar Post Office and roads build by hand along the side of the steep hills. As the sun gets higher, we'll find a spot to cool off with a swim in the Macquarie River.</p>\n" +
        "<p>A night under the stars where you can set the agenda. After another delicious bush meal, we'll roast some marshmallows, and maybe enjoy a cup of mulled wine. Listen to the sounds of the bush change to a nocturnal setting as you watch for shooting stars and satellites. Campers are always amazed by the brightness and abundance of the of the stars, a sight that can only be truly appreciated in the bush. Share stories, true or otherwise, or challenge each other to a friendly game of cards.</p>\n" +
        '<p><b>Day 3 - Do as you wish</b></p>\n' +
        '<p>Wake up once again to the sound of nature. Freshen up with a swim in the river before a cup of billy tea with breakfast. Learn to make damper yourself, a skill to impress your friends with, as well as a way to remember the taste of the Aussie bush in the comfort of your own home. All activities remain available for you, a ride in the boat, a bush walk, another crack at fishing, the morning is yours to do what you like. Make sure you have all the photos you want, if there is something you want to see or do again, just ask. If there is something you want to try, just ask. If you want to just sit in the shade and enjoy the quiet, go for your life.&nbsp;</p>\n'
    }
  },
  {
    _path:
      '/content/dam/aem-demo-assets/en/adventures/ski-touring-mont-blanc/ski-touring-mont-blanc',
    title: 'Ski Touring Mont Blanc',
    activity: 'Skiing',
    adventureType: 'Overnight Trip',
    price: '$2600 USD',
    tripLength: '5 Days',
    groupSize: '3-4',
    difficulty: 'Advanced',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/ski-touring-mont-blanc/AdobeStock_291339093.jpeg',
      mimeType: 'image/jpeg',
      width: 720,
      height: 480
    },
    description: {
      html: '<p>If you’re a slopes enthusiast, you know that one run in the backcountry is worth ten in the front country. This adventure includes 5 days of ski touring topped off with the ascent of Mont Blanc, the highest point in Western Europe. An acclimatization phase of the trip will prepare the team physically and mentally for a two-day summit attempt. &nbsp;During this phase, some of the classic routes around Chamonix will be explored. The final two days we’ll take the summit of Mont Blanc via the Arete Royal and Dome Du Goute.</p>\n'
    },
    itinerary: {
      html:
        '<p><b>Day 1</b></p>\n' +
        '<p>Arrive in Chamonix and meet up with our group at the chalet in the afternoon. Your guides will take you through the plan for the week and will discuss logistics, equipment, conditions and guidelines.</p>\n' +
        '<p><b>Day 2</b></p>\n' +
        '<p>Our first ski day is usually at the Grands Montets where there are some excellent runs from the top lift station. During the afternoon your guide will do a short ski tour and run a mountain awareness session on avalanche rescue.</p>\n' +
        '<p><b>Day 3</b></p>\n' +
        '<p>A second day ski tour from the Argentiere hut typically you will head to the Col du Tour Noir on the Glacier des Amethystes, usually a 4 hour run. Then we’ll return to the hut for a second night.</p>\n' +
        '<p><b>Day 4</b></p>\n' +
        '<p>Starting from the hut you will ski tour the Col du Passon and enjoy a long ski descent to the village of Le Tour. Return to the chalet for a well deserved shower and dinner.</p>\n' +
        '<p><b>Day 5</b></p>\n' +
        '<p>Summit ascent. A leisurely start before the Aiguille du Midi cable car and ascent to the Grand Mulets Refuge. This is a 3hr ski tour to the hut where you stay overnight.</p>\n'
    }
  },
  {
    _path:
      '/content/dam/aem-demo-assets/en/adventures/surf-camp-in-costa-rica/surf-camp-costa-rica',
    title: 'Surf Camp in Costa Rica',
    activity: 'Surfing',
    adventureType: 'Overnight Trip',
    price: '$3400 USD',
    tripLength: '5 Days',
    groupSize: '3-6',
    difficulty: 'Beginner',
    primaryImage: {
      _path: '/content/dam/aem-demo-assets/en/adventures/surf-camp-in-costa-rica/surfing_5.jpg',
      mimeType: 'image/jpeg',
      width: 1920,
      height: 1080
    },
    description: {
      html:
        "<h3><b>Experience Surfer's Paradise in Costa Rica</b></h3>\n" +
        '<p>Experienced local surf guides will take care of all the logistics and find the best spots for you to experience the best surfing Costa Rica has to offer. If you are a novice, we can take you to the right spot for your skill and preference.&nbsp; Costa Rica is the ideal location for a first surf trip. It is a safe place to travel and the locals are quite friendly and happy to see other surfers. Costa Rica is home to some incredible waves like Witch’s Rock, Ollies Point, Pavones, Playa Negra, Playa Hermosa, Salsa Brava and tons of lesser known world class waves.</p>\n'
    },
    itinerary: {
      html:
        '<p><b>Day 1</b><br>\n' +
        '</p>\n' +
        "<p>After arriving and settling in, take a minute to admire how lucky we are to be in this paradise for the next 6 days. Ok, once you're ready, it’s time for your very first lesson. Don’t worry, even if this is your first time surfing, we've instructed hundreds of beginners that are now surfing enthusiasts. After some training on-land, we'll head to some smaller waves and work closely with you to make sure you're comfortable in the water and on your board.</p>\n" +
        '<p><b>Day 2</b><br>\n' +
        '</p>\n' +
        "<p>Get up bright and early for a full day of surfing the world-famous breaks that make Costa Rica a surfing paradise. We'll provide food and refreshments throughout the day so that you can concentrate on enjoying yourself and improving your skills.</p>\n" +
        '<p><b>Day 3</b><br>\n' +
        '</p>\n' +
        "<p>Day 3 will be a short detour from the surf.&nbsp; We'll head into the rain forests of Costa Rica! This stunning forests and wildlife are one of Costa Rica’s top attractions. You can enjoy bird watching, canoeing, horseback riding, or participate in a hiking trail to find the park’s secret beaches.</p>\n" +
        '<p><b>Day 4</b><br>\n' +
        '</p>\n' +
        "<p>Back into the water and catching breaks. Now that you're more comfortable in the water and on your surfboard, it’s time to take it to the next level. After customized lessons based on your growth from the previous days from your surf coach, get back into the water and enjoy yourself.</p>\n" +
        '<p><b>Day 5</b><br>\n' +
        '</p>\n' +
        '<p>Time for a day of relaxation and refreshing your spirit. After a yoga session on the beach, you can stretch and revive your tired muscles with a deep tissue massage. Then explore the city and culture of Costa Rica.</p>\n' +
        '<p><b>Day 6</b><br>\n' +
        '</p>\n' +
        '<p>You can choose to get in another full day of surfing or take time out to explore the estuaries and pristine coastal waterways of Costa Rica.</p>\n' +
        '<h3>&nbsp;</h3>\n'
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/tahoe-skiing/tahoe-skiing',
    title: 'Tahoe Skiing',
    activity: 'Skiing',
    adventureType: 'Overnight Trip',
    price: '$1500',
    tripLength: '3-4 days',
    groupSize: '6-8',
    difficulty: 'Advanced',
    primaryImage: {
      _path: '/content/dam/aem-demo-assets/en/adventures/tahoe-skiing/AdobeStock_184591344.jpg',
      mimeType: 'image/jpeg',
      width: 1000,
      height: 722
    },
    description: {
      html: "<p>Great weather, crystal clear lake water, and a relaxed California attitude make Lake Tahoe&nbsp;one of the most desirable ski destinations in the world. Few ski areas rival Lake Tahoe for its excellent snow conditions, challenging terrain and state-of-the-art lift chairs. Lake Tahoe is home to dozens of resorts and we'll be your guide for the best of them.</p>\n"
    },
    itinerary: {
      html:
        '<h2>Mountain Springs Resort<br>\n' +
        '</h2>\n' +
        '<p>A world-renowned ski resort, Mountain Springs offers some of the best runs in Tahoe with gorgeous lake views. The resort offers 4,000 acres of skiable terrain, 40 ski lifts and more than 200 trails. A top-notch board park will satisfy the daredevils amongst us.</p>\n' +
        '<h2>Treeline Resort<br>\n' +
        '</h2>\n' +
        '<p>Treeline is the largest ski resort in Lake Tahoe with 5,000 acres of terrain including 150 trails accessed by 40 lifts. The resort offers wide-open, well groomed slopes for those learning to ski yet also offers double-black diamond runs for advanced skiers. Enjoy an&nbsp;après ski cocktail at the world famous Tips Up Lounge.</p>\n' +
        '<h2>Steeps</h2>\n' +
        "<p>Steeps is known for it's challenging terrain but also has 15% beginner runs and 25% intermediate runs. Steeps is also known for it's award winning terrain park with jumps and a half pipe. One of the highlights of Steeps is the village where there is an abundance of shops, restaurants and spas.</p>\n"
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/west-coast-cycling/west-coast-cycling',
    title: 'West Coast Cycling',
    activity: 'Cycling',
    adventureType: 'Overnight Trip',
    price: '$4500 USD',
    tripLength: '5 days',
    groupSize: '12',
    difficulty: 'Intermediate',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/west-coast-cycling/AdobeStock_151584995.jpg',
      mimeType: 'image/jpeg',
      width: 1000,
      height: 357
    },
    description: {
      html: '<p>Join us for this once in a lifetime bike trip traveling from San Francisco to Portland cycling along the Pacific Coast. Experience world class terrain as we head north through redwood forests, state parks, the Columbia river and the Pacific ocean.</p>\n'
    },
    itinerary: {
      html:
        '<h2>San Francisco to Eureka<br>\n' +
        '</h2>\n' +
        "<p>Start the tour by cycling across the iconic Golden Gate Bridge and then making our way to the coast to ride up Highway One &nbsp;where we'll go through Point Reyes National Seashore and the gorgeous Sonoma coast.</p>\n" +
        '<h2>Eureka to Bandon<br>\n' +
        '</h2>\n' +
        "<p>Be prepared for giant trees over 2,000 years old and over 300 feet tall as we start the day in Eureka. On our way to Bandon we'll visit&nbsp;quintessential quaint towns offering saltwater taffy shops, lovable harbors and the best clam chowder in the Pacific Northwest.</p>\n" +
        '<h2>Bandon to Portland<br>\n' +
        '</h2>\n' +
        "<p>For the golfers amongst us, we'll have some downtime to fit in golf at one of the top golf resorts in the country. We'll start our final leg along the Columbia River. After lunch in historic Astoria, we'll continue along a route featuring resort towns including Seaside and Cannon Beach.</p>\n"
    }
  },
  {
    _path:
      '/content/dam/aem-demo-assets/en/adventures/whistler-mountain-biking/whistler-mountain-biking',
    title: 'Whistler Mountain Biking Adventure',
    activity: 'Cycling',
    adventureType: 'Overnight Trip',
    price: '$1500',
    tripLength: '2 Days',
    groupSize: '2-3',
    difficulty: 'Advanced',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/whistler-mountain-biking/AdobeStock_122578479.jpeg',
      mimeType: 'image/jpeg',
      width: 1694,
      height: 1122
    },
    description: {
      html:
        "<h2><b>Explore Whistler's Epic Singletrack Trails</b></h2>\n" +
        "<p>Whistler is often considered North America’s preeminent mountain bike destination.&nbsp; Let us show you why Whistler has earned that designation by guiding you through the hidden spider web of the most epic single-track you've ever conquered. Our tours are primarily for hardcore moutain biking enthusiasts but can be specialized to the interests and abilities of each group. Ride fast rolling trails or attempt some of the world famous logs and ladders.</p>\n"
    },
    itinerary: {
      html:
        '<h2><b>Day 1 - Beginning on Lost Lake and Westside trails</b></h2>\n' +
        "<p>We get right into the epic trails by beginning our adventure on Whistler's Lost Lake Trails, some of the most famous single track in the world. There will be rocks and roots throughout the terrain so be alert and welcome the challenge. Leave it to our experts to build a plan that will cover the best trails based on the conditions at the time of the tour. Remember to stop every once in awhile and soak up the views and take a few pictures to bring home for bragging rights!&nbsp; We'll make our way to the Westside trails by the late afternoon.</p>\n" +
        '<h2><b>Day 2 - Experience the Incredibly Scenic Valley Trail</b></h2>\n' +
        "<p>On the second day, we'll get to enjoy another aspect of what separates Whistler from other moutain biking destinations: incredible vistas. The unmatched scenery of the Valley Trail is awe-inspiring. Put in work to get through some pretty tough climbs into some remote areas and you'll quickly understand why it'll all be worth it once you reach the summit: the views from the top are world-class.</p>\n"
    }
  },
  {
    _path: '/content/dam/aem-demo-assets/en/adventures/yosemite-backpacking/yosemite-backpacking',
    title: 'Yosemite Backpacking',
    activity: 'Camping',
    adventureType: 'Overnight Trip',
    price: '$1500 USD',
    tripLength: '5 Days',
    groupSize: '12',
    difficulty: 'Intermediate',
    primaryImage: {
      _path:
        '/content/dam/aem-demo-assets/en/adventures/yosemite-backpacking/AdobeStock_196967522.jpg',
      mimeType: 'image/jpeg',
      width: 1000,
      height: 667
    },
    description: {
      html: "<p>Yosemite National Park, designated a World Heritage Site in 1984, is best known for its granite cliffs, waterfalls and giant sequoias, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, glaciers and lakes. The majority of visitors spend their time in the Yosemite Valley, which we'll also explore, but on this trip we'll take you to the backcountry that inspired John Muir to lead a movement to have Congress establish Yosemite as we know it today.</p>\n"
    },
    itinerary: {
      html:
        '<p><b>Day 1</b></p>\n' +
        "<p>Our trip begins with introductions in the Curry Village at 9am. Look for your guide with the red flag in lot D. After the orientation meeting we'll distribute equipment for the next 5 days. Our first night will be in the Yosemite Valley.</p>\n" +
        '<p><b>Day 2</b></p>\n' +
        "<p>Today will feature 5 miles of hiking with 1000 feet of elevation. We'll depart the Ahwahnee Lodge and head along the Merced River as we climb to our first campsite at 4500 feet.</p>\n" +
        '<p><b>Day 3</b></p>\n' +
        "<p>Our longest day of hiking will feature 8 miles of hiking with 2500 feet of elevation as we make our way to Inspiration Point. At the summit you'll be treated to gorgeous views of El Capitan and Half Dome. The first half of the trail is steep but the second half is more of a gentle incline.</p>\n" +
        '<p><b>Day 4</b></p>\n' +
        "<p>Our shortest hike of the trip will feature 3 miles of hiking with 500 feet of elevation. As we make our way to Panorama Point you'll get once in a lifetime views of Half Dome, North and Basket Domes and the Royal Arches.</p>\n" +
        '<p><b>Day 5</b></p>\n' +
        "<p>A 6 mile hike back to the Yosemite Valley where we'll see the Cascades, a 600 foot waterfall, and stop at Glacier Point where you'll have unsurpassed views of Vernal Falls and Half Dome.</p>\n"
    }
  }
];

import { Money, Product, ProductVariant, SEO, Image, ProductOption } from './types'; // replace 'yourTypesFile' with the actual path to your types

// const mockShopifyProductOld = {
//   id: 'product1',
//   handle: 'sample-product',
//   availableForSale: true,
//   title: 'Sample Product',
//   description: 'This is a sample product.',
//   descriptionHtml: '<p>This is a sample product.</p>',
//   options: [mockProductOption],
//   priceRange: {
//     maxVariantPrice: mockMoney,
//     minVariantPrice: mockMoney
//   },
//   variants: { edges: [{ node: mockProductVariant }] },
//   featuredImage: mockImage,
//   images: { edges: [{ node: mockImage }] },
//   seo: {
//     title: 'Sample Product',
//     description: 'This is a sample product.'
//   },
//   tags: ['sample', 'product'],
//   updatedAt: '2023-08-10T00:00:00Z'
// };

export function transformToProduct(adventure: any): Product {
  const id = adventure._path; // Assuming the _path is unique enough to serve as an ID
  const handle = id.split('/').pop() || ''; // Extracting the last part of the _path
  const priceParts = adventure.price.split(' ');

  const price: Money = {
    amount: priceParts[0].substring(1), // Removing the dollar sign
    currencyCode: priceParts[1]
  };

  const variant: ProductVariant = {
    id,
    title: adventure.title,
    availableForSale: true, // We're assuming that all adventures are available for sale
    selectedOptions: [
      { name: 'Stay Duration', value: 'Normal' },
      { name: 'Group Size', value: 'Normal' }
    ],
    price
  };

  const groupSizeValues = ['Small', 'Normal', 'Large'];
  const durationValues = ['Short', 'Normal', 'Extended Stay'];

  const variants: ProductVariant[] = [];

  const groupSizeProductOption = {
    id: 'groupSizeProductOption',
    name: 'Group Size',
    values: ['Small', 'Normal', 'Large']
  };

  const durationProductOption = {
    id: 'durationProductOption',
    name: 'Stay Duration',
    values: ['Short', 'Normal', 'Extended Stay']
  };

  groupSizeValues.forEach((groupSize) => {
    durationValues.forEach((duration) => {
      variants.push({
        id: `${id}-${groupSize}-${duration}-variant`,
        title: `${groupSize} / ${duration}`,
        availableForSale: true, // We're assuming that all adventures are available for sale
        selectedOptions: [
          { name: 'Group Size', value: groupSize },
          { name: 'Stay Duration', value: duration }
        ],
        price: {
          amount:
            priceParts[0].substring(1) +
            (groupSize === 'Small' ? -100 : groupSize === 'Large' ? 600 : 0) +
            (duration === 'Short' ? -100 : duration === 'Extended Stay' ? 700 : 0),
          currencyCode: priceParts[1]
        }
      });
    });
  });

  const product: Product = {
    id,
    handle,
    availableForSale: true,
    title: adventure.title,
    description: adventure.description.html,
    descriptionHtml: adventure.itinerary.html,
    options: [groupSizeProductOption, durationProductOption],
    priceRange: {
      maxVariantPrice: price,
      minVariantPrice: price
    },
    featuredImage: {
      url: baseImagePath + adventure.primaryImage._path,
      // originalSrc: adventure.primaryImage._path,
      altText: adventure.title,
      width: adventure.primaryImage.width,
      height: adventure.primaryImage.height
    },
    images: [],
    seo: {
      title: adventure.title,
      description: adventure.description.html
    },
    tags: [],
    variants: variants,
    updatedAt: new Date().toISOString()
  };

  product.variants.push(variant);
  product.images.push(product.featuredImage);

  return product;
}

// export const adventureProducts: Product[] = adventures.map(transformToProduct) as Product[];

export async function getAdventureProducts() {
  const adventures = await getAllAdventures();
  const products = adventures.map(transformToProduct) as Product[];
  return products;
}

export async function getAdventureProductsNode() {
  const adventureProducts = await getAdventureProducts();
  const adventureProductNodes = adventureProducts.map((product) => ({
    node: product
  }));

  return adventureProductNodes;
}

export async function getProductNodesByKeyword(keyword: string | undefined) {
  return (await getProductsByKeyword(keyword)).map((product) => ({
    node: product
  }));
}

export async function getProductByHandle(handle: string) {
  const adventureProducts = await getAdventureProducts();
  const res = adventureProducts.find((product) => product.handle === handle);
  return res;
}

export async function getProductsByKeyword(keyword: string | undefined) {
  const adventureProducts = await getAdventureProducts();
  //if keyword is empty, return all products
  if (!keyword || keyword === undefined) {
    return adventureProducts;
  }

  keyword = keyword || '';

  if (keyword.includes('all')) {
    return adventureProducts;
  }

  if (keyword.includes('hidden-homepage-featured-items')) {
    // @ts-ignore
    return [
      adventureProducts[0] as Product,
      adventureProducts[1] as Product,
      adventureProducts[2] as Product
    ];
  }

  if (keyword.includes('hidden-homepage-carousel')) {
    // @ts-ignore
    return [
      adventureProducts[4] as Product,
      adventureProducts[5] as Product,
      adventureProducts[6] as Product,
      adventureProducts[7] as Product,
      adventureProducts[8] as Product
    ];
  }

  //if keyword contains a dash, split it into an array of words, and use the first word
  if (keyword.includes('-')) {
    // @ts-ignore
    keyword = keyword.split('-')[0];
  }

  keyword = keyword || '';
  keyword = keyword.toLowerCase();

  if (keyword.includes('winter')) {
    return adventureProducts.filter(
      (product) =>
        product.title.toLowerCase().includes('ski') ||
        product.title.toLowerCase().includes('winter')
    );
  }

  if (keyword.includes('summer')) {
    return adventureProducts.filter(
      (product) =>
        product.title.toLowerCase().includes('surf') ||
        product.title.toLowerCase().includes('climbing') ||
        product.title.toLowerCase().includes('summer') ||
        product.title.toLowerCase().includes('hiking') ||
        product.title.toLowerCase().includes('camping') ||
        product.title.toLowerCase().includes('rafting') ||
        product.title.toLowerCase().includes('tasting') ||
        product.title.toLowerCase().includes('cycling') ||
        product.title.toLowerCase().includes('gastro') ||
        product.title.toLowerCase().includes('backpacking')
    );
  }

  if (keyword.includes('europe')) {
    return adventureProducts.filter(
      (product) =>
        product.title.toLowerCase().includes('tuscany') ||
        product.title.toLowerCase().includes('marais') ||
        product.title.toLowerCase().includes('basel') ||
        product.title.toLowerCase().includes('mont')
    );
  }

  return adventureProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(<string>keyword) ||
      product.description.toLowerCase().includes(<string>keyword)
  );
}
