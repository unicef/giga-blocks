const generateIdenticon = (image) => {
    const size = 50;
    const svgString = toSvg(image, size);
    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  };

export default generateIdenticon;