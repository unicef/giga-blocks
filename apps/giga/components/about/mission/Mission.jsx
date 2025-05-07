'use client';

import Image from 'next/image';
import './_mission.scss';

export default function Mission() {
  return (
    <section className="mission-vision">
      <div className="mission-vision__container">
        <div className="mission-vision__grid">
          {/* Mission Block */}
          <div className="mission-section">
            <h2 className="mission-vision__title">Mission</h2>
            <div className="mission-vision__content">
              <p className="mission-vision__text">
                Our mission is to shine a global spotlight on schools that would
                otherwise remain unseen and underserved. By placing each school
                on a permissionless blockchain, we create an irrefutable,
                long-lasting record of its existence and connectivity status.
                This transparent data empowers governments, NGOs, private-sector
                partners, and local communities to coordinate efforts and
                deliver essential resources where they are most needed. Through
                Giga Blocks, we seek to elevate every student’s right to
                information, opportunity, and choice, no matter the school’s
                location or current level of connectivity.
              </p>
              <p className="mission-vision__text">
                At the core of this mission is the belief that, when armed with
                accurate information, the global community can mobilize faster
                and invest more strategically. Each “activated” school becomes a
                rallying point for collaboration, opening up doors for
                innovative funding mechanisms, technology partnerships, and
                community-led initiatives.
              </p>
            </div>
          </div>

          {/* Mission Quote Block */}
          <div className="quote-section quote-section--left">
            <div className="quote-section__image">
              <Image
                src="/images/earth.png"
                alt="Children working with a globe"
                width={200}
                height={200}
              />
            </div>
            <div className="quote-section__text">
              <p>
                Giga Blocks seeks to lay the groundwork for an equitable
                education system where technology acts as a catalyst and not a
                roadblock to every child’s pursuit of information, opportunity
                and choice.
              </p>
            </div>
          </div>

          {/* Mission Image Block */}
          <div className="mission-vision__image-container">
            <Image
              src="/images/children-education.png"
              alt="Children in a classroom"
              width={600}
              height={300}
              className="mission-vision__image"
            />
          </div>

          {/* Vision Visual Block */}
          <div className="vision-visual">
            <Image
              src="/images/globe.png"
              alt="Earth at night"
              width={600}
              height={300}
              className="mission-vision__image"
            />
            <div className="vision-visual__overlay">
              <p>
                Giga Blocks aims to redefine how we collectively tackle one of
                the greatest challenges in education: the digital divide.
              </p>
              <Image
                src="/images/earth-hand.png"
                alt="Hand holding globe"
                width={200}
                height={200}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Vision Block */}
          <div className="vision-section">
            <h2 className="mission-vision__title">Vision</h2>
            <div className="mission-vision__content">
              <p className="mission-vision__text">
                We envision a world in which every student can step into a
                classroom, whether it’s in a bustling city or a remote village,
                knowing that the internet is a guaranteed gateway to learning,
                discovery, and personal growth.
              </p>
              <p className="mission-vision__text">
                Our vision extends beyond simply providing internet access; we
                aim to cultivate a global learning network where resources,
                knowledge, and support flow freely. Ultimately, Giga Blocks
                seeks to lay the groundwork for an equitable education system
                where technology acts as a catalyst and not a roadblock to every
                child’s pursuit of information, opportunity and choice.
              </p>
              <p className="mission-vision__text">
                Our vision extends beyond simply providing internet access; we
                aim to cultivate a global learning network where resources,
                knowledge, and support flow freely. Ultimately, Giga Blocks
                seeks to lay the groundwork for an equitable education system
                where technology acts as a catalyst and not a roadblock to every
                child’s pursuit of information, opportunity and choice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
