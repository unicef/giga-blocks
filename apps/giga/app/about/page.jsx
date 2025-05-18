'use client';
import Header from '../../components/about/header/Header';
import Blog from '../../components/about/blog/Blog';
import Metrics from '../../components/about/metrics/Metrics';
import Mission from '../../components/about/mission/Mission';
import Team from '../../components/about/team/Team';
import Artist from '../../components/about/artist/Artist';
import Contributors from '../../components/about/contributors/Contributors';
import { useContributorList } from '../hooks/useContributor';

const About = () => {
  const {data:contributorList} = useContributorList();
  return (
    <>
      <Header />
      <Blog />
      <Metrics />
      <Mission />
      <Team />
      <Artist />
      <Contributors  contributorList ={contributorList}/>
    </>
  );
};
export default About;
