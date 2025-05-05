'use client';

import Image from 'next/image';
import './_team.scss';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Talan Rhiel Madsen',
      image: '/images/teams/team-1.png',
    },
    {
      id: 2,
      name: 'Kierra Ekstrom Bothman',
      image: '/images/teams/team-2.png',
    },
    {
      id: 3,
      name: 'Alena Westervelt',
      image: '/images/teams/team-3.png',
    },
    {
      id: 4,
      name: 'Phillip Calzoni',
      image: '/images/teams/team-4.png',
    },
    {
      id: 5,
      name: 'Jakob Aminoff',
      image: '/images/teams/team-5.png',
    },
    {
      id: 6,
      name: 'Chance Septimus',
      image: '/images/teams/team-6.png',
    },
    {
      id: 7,
      name: 'Marcus Saris',
      image: '/images/teams/team-7.png',
    },
    {
      id: 8,
      name: 'Emerson Westervelt',
      image: '/images/teams/team-8.png',
    },
  ];

  return (
    <>
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">Giga Team</h2>
            <p className="team-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie
            </p>
          </div>

          <div className="team-grid-container">
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                  <div className="team-member-image-container">
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={`Photo of ${member.name}`}
                      width={142}
                      height={142}
                      className="team-member-image"
                    />
                  </div>
                  <h3 className="team-member-name">{member.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">Special Considerations</h2>
            <p className="team-subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie
            </p>
          </div>

          <div className="team-grid-container">
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                  <div className="team-member-image-container">
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={`Photo of ${member.name}`}
                      width={142}
                      height={142}
                      className="team-member-image"
                    />
                  </div>
                  <h3 className="team-member-name">{member.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
