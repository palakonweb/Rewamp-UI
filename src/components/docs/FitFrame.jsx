import React from 'react';

// Measures a showcase's natural content size and scales it down (never up)
// to fit its container, so every preview stays responsive regardless of the
// fixed pixel widths individual showcases use internally.
export default function FitFrame({ children, preserveBg = false }) {
    const outerRef = React.useRef(null);
    const innerRef = React.useRef(null);
    const [scale, setScale] = React.useState(1);
    const [height, setHeight] = React.useState(null);

    React.useLayoutEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return undefined;

        const measure = () => {
            const containerWidth = outer.clientWidth;
            const contentWidth = inner.scrollWidth;
            const contentHeight = inner.scrollHeight;
            if (!containerWidth || !contentWidth || !contentHeight) return;
            const next = Math.min(1, containerWidth / contentWidth);
            setScale(next);
            setHeight(contentHeight * next);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(outer);
        ro.observe(inner);
        return () => ro.disconnect();
    }, [children]);

    return (
        <div
            ref={outerRef}
            className="w-full flex items-center justify-center overflow-hidden"
            style={{ height: height ?? 'auto' }}
        >
            <div
                ref={innerRef}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    width: scale < 1 ? `${100 / scale}%` : '100%',
                }}
                className={`flex justify-center prompt-embed${preserveBg ? ' preserve-bg' : ''}`}
            >
                {children}
            </div>
        </div>
    );
}
