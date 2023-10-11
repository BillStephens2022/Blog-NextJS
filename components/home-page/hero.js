import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/bill.jpeg"
          alt="An image showing Bill"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Bill</h1>
      <p>
        I blog about web development - especially front end frameworks like
        Angular or React
      </p>
    </section>
  );
}

export default Hero;
