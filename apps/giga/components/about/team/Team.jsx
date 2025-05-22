'use client';

import Image from 'next/image';
import './_team.scss';
import { position } from 'stylis';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Chris Fabian',
      position: 'Giga co-lead',
      image: '/images/teams/team-1.png',
    },
    {
      id: 2,
      name: 'Naroa Zurutuza',
      position: 'CTO',
      image: '/images/teams/team-2.png',
    },
    {
      id: 3,
      name: 'Gerben Kijne',
      position: 'Blockchain Product Lead',
      image: '/images/teams/team-3.png',
    },
    {
      id: 4,
      name: 'Vladimir Trkulja',
      position: 'Blockchain Advisor',
      image: '/images/teams/team-4.png',
    },
    {
      id: 5,
      name: 'Javier Shen',
      position: 'Blockchain Engineer',
      image: '/images/teams/team-5.png',
    },
    {
      id: 6,
      name: 'Jitesh Nayak',
      position: 'Design Lead',
      image: '/images/teams/team-6.png',
    },
    {
      id: 7,
      name: 'Akunna Ibe',
      position: 'Communications',
      image: '/images/teams/team-7.png',
    },
  ];

  return (
    <>
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">Giga Team</h2>
            <p className="team-subtitle">
              Some of the people who were involved in the creation of this
              project.
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
                      width={167}
                      height={167}
                      className="team-member-image"
                    />
                  </div>
                  <div>
                    <p className="team-member-name">{member.name}</p>
                    <p className="team-member-position">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <section className="team-section">
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
      </section> */}
    </>
  );
}
