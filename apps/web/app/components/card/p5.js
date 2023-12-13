// import React, { useEffect } from 'react';

// const DynamicSketch = ({ dynamicScript }) => {
//   useEffect(() => {
//     const loadScript = (src, callback) => {
//       const script = document.createElement('script');
//       script.src = src;
//       script.onload = callback;
//       document.body.appendChild(script);
//     };

//     const loadDynamicScripts = () => {
//       // Load p5.js
//       loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js', () => {
//         // Load dynamic script
//         const sketchScript = document.createElement('script');
//         sketchScript.innerHTML = dynamicScript;
//         document.body.appendChild(sketchScript);
//         console.log('Dynamic script added:', dynamicScript);
//       });
//     };

//     // Call the function to load scripts
//     loadDynamicScripts();
//   }, [dynamicScript]);

//   return <div id="dynamicSketchContainer"></div>;
// };

// export default DynamicSketch;

import React, { useEffect } from 'react';

const DynamicSketch = ({ scriptContent }) => {
    useEffect(() => {
        console.log({ scriptContent })
        if (scriptContent) {
            // Load p5.js first
            const p5Script = document.createElement('script');
            p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js';
            document.body.appendChild(p5Script);

            // Load p5.js first
            const lodashScript = document.createElement('script');
            lodashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js';
            document.body.appendChild(lodashScript);

            // Load your custom script after p5.js is loaded
            p5Script.onload = () => {
                const script = document.createElement('script');
                script.text = scriptContent;
                document.body.appendChild(script);
            };

            return () => {
                document.body.removeChild(p5Script);
            };
        }
    }, [scriptContent]);

    return <div id="p5-canvas">P5 Canvas</div>;
};
export default DynamicSketch;
