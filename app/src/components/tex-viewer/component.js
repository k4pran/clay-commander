import React, {useEffect, useState} from "react";
import {StyledTexViewer, StyledTexViewerArea} from "./style";
import TexViewerMenu from "../tex-viewer-menu/component";

const defaultFontSize = 18;

const TexViewer = ({className, tex}) => {

    const [mathJax, setMathJax] = useState();
    const [fontSize, setFontSize] = useState(defaultFontSize);

    useEffect(() => {
        window.MathJax = {
            options: {
                skipHtmlTags: [
                    'script', 'noscript', 'style', 'textarea',
                    'code', 'annotation', 'annotation-xml'
                ]
            },
            tex: {
                    inlineMath: [['$', '$'], ['\\(', '\\)']]
            },
            svg: {
                    fontCache: 'global'
            }
        };

        const script = document.createElement('script');

        script.type = "text/javascript";
        script.id = "MathJax-script";
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
        script.async = true;

        document.head.appendChild(script);

        script.onload = function () {
            setMathJax(() => window.MathJax);
        };

        return () => {
            document.head.removeChild(script);
        }
    },
        []
    );

    useEffect(() => {
        if (mathJax) {
            mathJax.typeset();
        }
    }, [tex, mathJax]);

    const handleFontSizeChange = (newFontSize) => {
        setFontSize(newFontSize);
    };

    return (
        <StyledTexViewer className={className} fontSize={fontSize}>
            <TexViewerMenu defaultFontSize={defaultFontSize} fontSizeChangeHandler={handleFontSizeChange}/>
            <StyledTexViewerArea>{tex}</StyledTexViewerArea>
        </StyledTexViewer>
    )
};

export default TexViewer;