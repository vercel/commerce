import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function ProductModel(props: {
    modelPath: string
}) {

    const [windowSize, setWindowSize] = useState({
        width: 600,
        height: 600,
      });
    
    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            });
        }
        
        // Add event listener
        window.addEventListener("resize", handleResize);
            
        // Call handler right away so state gets updated with initial window size
        handleResize();
    
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    const modelViewerTag = `

        <style>
            model-viewer {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: block;
                min-width: 100%;
                min-height: 100%;
                max-width: 100%;
                max-height: 100%;
                padding: 0;
                margin: auto;
                height: 0;
                width: 0;
                position: absolute;
                box-sizing: border-box
            }

            #productModelViewer {
                height: ${windowSize.width < 600 ? windowSize.width : 600}px;
                width: ${windowSize.width < 600 ? windowSize.width : 600}px;
            }
        </style>

        <model-viewer src="${props.modelPath}" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls enable-pan shadow-intensity="0" enviroment-image="neutral"></model-viewer>
    
    `;

    return (
        <>
            <Script type='module' src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'></Script>
            <div id="productModelViewer" dangerouslySetInnerHTML={{__html: modelViewerTag}} />
        </>
    );
}
    