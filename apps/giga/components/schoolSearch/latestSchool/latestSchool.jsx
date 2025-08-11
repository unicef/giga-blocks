import './_latestSchool.scss'
import SchoolCard from '../../schoolCard/SchoolCard';

export default function LatestSchool() {
  return (
    <section className="latest-schools">
      <div className="latest-schools__container">
        <div className='latest-schools__header'>
        <h2 className='latest-schools__title'>Latest Minted School</h2>
        <p className='latest-schools__description'>
          Go ahead, find a school and mint it's NFT. It's never been easier to
          make a lasting impact{' '}
        </p>
        </div>
        <SchoolCard
          key={1}
          id={1}
          schoolName={'name'}
          location={'pohara'}
          minted={'MINTED'}
          hashImage={true}
          imageHash={'dd'}
        />
      </div>
    </section>
  );
}
