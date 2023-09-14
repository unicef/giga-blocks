import React, { HTMLProps } from 'react';

import styles from './iframe.module.css';

interface IframeProps extends HTMLProps<HTMLIFrameElement> {
  src: string;
  title?: string;
  width?: string;
  height?: string;
}

const IFrame: React.FC<IframeProps> = ({
  src,
  title = 'Embedded Content',
  width,
  height,
  ...otherProps
}) => (
  <iframe
    className={styles.iframeContainer}
    title={title}
    src={src}
    width={width}
    height={height}
    {...otherProps}
  />
);

export default IFrame;
