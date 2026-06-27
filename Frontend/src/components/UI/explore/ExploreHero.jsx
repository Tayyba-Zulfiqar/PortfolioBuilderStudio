import Logo from '../../common/Logo';

const SparkleIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="54"
    height="54"
    viewBox="0 0 54 54"
    fill="none"
    aria-hidden="true"
  >
    <path d="M35 5l4.3 12.7L52 22l-12.7 4.3L35 39l-4.3-12.7L18 22l12.7-4.3L35 5z" fill="#FFC44D" />
    <path d="M13 9l2.1 6.1L21 17l-5.9 1.9L13 25l-2.1-6.1L5 17l5.9-1.9L13 9z" fill="#D8A812" />
    <path d="M10 28l1.7 4.8L16 34l-4.3 1.2L10 40l-1.7-4.8L4 34l4.3-1.2L10 28z" fill="#F19872" />
  </svg>
);

const ExploreHero = () => (
  <section className="explore-hero" aria-labelledby="explore-title">
    <Logo className="explore-hero__logo" />
    <div className="explore-hero__headline-row">
      <h1 id="explore-title">Explore Beautiful Portfolios</h1>
      <SparkleIcon className="explore-hero__sparkle" />
    </div>
    <p>Discover more creators like you in the Bloom community</p>
  </section>
);

export default ExploreHero;
