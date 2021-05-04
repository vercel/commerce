import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

//-----Homepage-----//

const Home = () => (
  <div className={styles.container}>
    <main className={styles.main}>
      <div className={styles.grid}>
        <div className={styles.square}></div>
        <div className={styles.info}>
          <h1>
            Featuring <i>Grain</i>changing Technology
          </h1>
          <btn>
            <h6>Try The Better Bagel</h6>
          </btn>
        </div>
      </div>
      <div className={styles.featured}>
        <h2>Featured In</h2>
        <div className={styles.mags}>
          <span>Forbes</span>
          <span>BuzzFeed</span>
          <span>Food</span>
        </div>
      </div>
      <div className={styles.banana}>
        <h2>
          The Better Bagel features the same net carb content as two banana
          slices.
        </h2>
        <div className={styles.bananagif}></div>
      </div>
      <div className={styles.nutrition}>
        <h2>
          Featuring Less Carbs. More Protein. Chef-Crafted Flavor. Plant-Based
          Ingredients. Proprietary Food Technology.
        </h2>
        <btn>
          <h6>Nutrition</h6>
        </btn>
        <div className={styles.table}></div>
      </div>
      <div className={styles.mission}>
        <h2>
          We are on a mission to make the most carb-heavy foods into the least
          and allow you to indulge, and feel good about it.
        </h2>
        <div className="expand"></div>
      </div>
      <div className={styles.instagram}>
        <div className={styles.image}></div>
        <div className={styles.image}></div>
        <div className={styles.image}></div>
      </div>
    </main>
  </div>
)

export default Home
