'use client';
import {
  ClickableTile,
  Column,
  Grid,
  Button,
  Toggletip,
  Loading,
  ToggletipContent,
  ToggletipButton,
} from '@carbon/react';
import './contributorCard.scss';

const ContributorCard = () => {
  return (
    <>
      <Grid fullWidth style={{ margin: '30px auto' }}>
        <Column sm={4}>
          <ClickableTile
            className="card"
            href={``}
            style={{ background: 'transparent' }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={'/landingPage/gravatar.png'}
                alt="SVG Image"
                style={{
                  marginBottom: '16px',
                  borderRadius: '50%',
                  width: '50%',
                }}
              />
              <h4>Contributor A</h4>
              <div>
                <p className="heading2 text-left">Contribution Mode</p>
              </div>
              <div>
                <h4 className="heading2 text-left">250</h4>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column sm={4}>
          <ClickableTile
            className="card"
            href={``}
            style={{ background: 'transparent' }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={'/landingPage/gravatar.png'}
                alt="SVG Image"
                style={{
                  marginBottom: '16px',
                  borderRadius: '50%',
                  width: '50%',
                }}
              />
              <h4>Contributor A</h4>
              <div>
                <p className="heading2 text-left">Contribution Mode</p>
              </div>
              <div>
                <h4 className="heading2 text-left">250</h4>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column sm={4}>
          <ClickableTile
            className="card"
            href={``}
            style={{ background: 'transparent' }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={'/landingPage/gravatar.png'}
                alt="SVG Image"
                style={{
                  marginBottom: '16px',
                  borderRadius: '50%',
                  width: '50%',
                }}
              />
              <h4>Contributor A</h4>
              <div>
                <p className="heading2 text-left">Contribution Mode</p>
              </div>
              <div>
                <h4 className="heading2 text-left">250</h4>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column sm={4}>
          <ClickableTile
            className="card"
            href={``}
            style={{ background: 'transparent' }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={'/landingPage/gravatar.png'}
                alt="SVG Image"
                style={{
                  marginBottom: '16px',
                  borderRadius: '50%',
                  width: '50%',
                }}
              />
              <h4>Contributor A</h4>
              <div>
                <p className="heading2 text-left">Contribution Mode</p>
              </div>
              <div>
                <h4 className="heading2 text-left">250</h4>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column sm={4}>
          <ClickableTile
            className="card"
            href={``}
            style={{ background: 'transparent' }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={'/landingPage/gravatar.png'}
                alt="SVG Image"
                style={{
                  marginBottom: '16px',
                  borderRadius: '50%',
                  width: '50%',
                }}
              />
              <h4>Contributor A</h4>
              <div>
                <p className="heading2 text-left">Contribution Mode</p>
              </div>
              <div>
                <h4 className="heading2 text-left">250</h4>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column sm={4}>
          <ClickableTile
            className="card"
            href={``}
            style={{ background: 'transparent' }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={'/landingPage/gravatar.png'}
                alt="SVG Image"
                style={{
                  marginBottom: '16px',
                  borderRadius: '50%',
                  width: '50%',
                }}
              />
              <h4>Contributor A</h4>
              <div>
                <p className="heading2 text-left">Contribution Mode</p>
              </div>
              <div>
                <h4 className="heading2 text-left">250</h4>
              </div>
            </div>
          </ClickableTile>
        </Column>
        <Column sm={4}>
          <ClickableTile
            className="card"
            href={``}
            style={{ background: 'transparent' }}
          >
            <div
              className="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={'/landingPage/gravatar.png'}
                alt="SVG Image"
                style={{
                  marginBottom: '16px',
                  borderRadius: '50%',
                  width: '50%',
                }}
              />
              <h4>Contributor A</h4>
              <div>
                <p className="heading2 text-left">Contribution Mode</p>
              </div>
              <div>
                <h4 className="heading2 text-left">250</h4>
              </div>
            </div>
          </ClickableTile>
        </Column>
      </Grid>
    </>
  );
};

export default ContributorCard;
