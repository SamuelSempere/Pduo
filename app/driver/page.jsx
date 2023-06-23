'use client'
import Map from '../components/map';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Garajes from './../components/garajes'

const Page = () => {
  const address = 'Torrellano, 03320, av illice 5';
  return (
    <div>
       <Map address={address} />
      <Garajes/>
    </div>
  );
};
export default withPageAuthRequired(Page);