'use client';
import { useEffect, useState } from 'react';
import { Grid, Column, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import './header.scss';
import '../table/datatable.scss';
import { metaMaskLogout,checkWalletAddress } from '../../utils/metaMaskUtils';

const PageHeader = ({ name, breadcrumbs }) => {
  const [isAddress, setIsAddress] = useState(false);
 
  useEffect(()=>{
    if(!name) return;
    const checkAddress = async()=>{
      const address = await checkWalletAddress(name);
      setIsAddress(address);
    }
    checkAddress();
  },[name])

   const disconnect = ()=>{
    metaMaskLogout();
    
  }

  return (
    <>
      <div className="headerBackground">
        <Grid>
          <Column sm={8} md={10} lg={16} style={{ marginTop: '32px' }}>
            <Breadcrumb>
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={index} href={breadcrumb.link}>
                  {breadcrumb.text}
                </BreadcrumbItem>
              ))}
              <BreadcrumbItem isCurrentPage>
                <p style={{ color: 'white' }}>{name}</p>
              </BreadcrumbItem>
            </Breadcrumb>
          </Column>
          <Column sm={4} md={10} lg={16}>
            <h1
              className="heading8"
              style={{ marginBottom: '16px', marginTop: '32px' }}
            >
              {name}
            </h1>
            {isAddress && <a 
             style={{cursor:'pointer', color:'blue', textDecoration: 'underline'}}
             onClick={disconnect}>
              Disconnect
             </a>}
          </Column>
        </Grid>
      </div>
    </>
  );
};

export default PageHeader;
