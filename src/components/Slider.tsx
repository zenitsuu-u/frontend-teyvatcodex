import React, { useEffect, useRef, useState } from "react";

type SliderItem = {
    image: string;
    title: string;
    subtitle: string;
};

type SliderProps = {
    items: SliderItem[];
    autoPlay?: boolean;
    interval?: number;
    height?: number;
};

export default function Slider({
                                   items,
                                   autoPlay = true,
                                   interval = 8000,
                                   height = 160,
                               }: SliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    // AUTO PLAY
    useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, interval);

        return () => clearInterval(timer);
    }, [items.length, autoPlay, interval]);

    // SCROLL
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        requestAnimationFrame(() => {
            const card = slider.children[index] as HTMLElement;

            if (!card) return;

            slider.scrollTo({
                left: card.offsetLeft - 20,
                behavior: "smooth",
            });
        });
    }, [index]);

    const isDesktop =
        typeof window !== "undefined" && window.innerWidth > 900;

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
            }}
        >
            {/* SLIDER */}
            <div
                ref={sliderRef}
                style={{
                    display: "flex",
                    overflowX: "hidden",
                    scrollSnapType: "x mandatory",
                    gap: "20px",
                    padding: "0 20px",
                    boxSizing: "border-box",
                    scrollBehavior: "smooth",
                }}
            >
                {items.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            flex: "0 0 calc(100% - 40px)",
                            height: isDesktop ? height * 4 : height,
                            borderRadius: "20px",
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                            scrollSnapAlign: "center",
                            overflow: "hidden",
                            transition: "all 0.4s ease",
                        }}
                    >
                        {/* OVERLAY */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                padding: "12px",
                                background: "rgba(0,0,0,0.55)",
                                backdropFilter: "blur(4px)",
                                textAlign: "center",
                                borderBottomLeftRadius: "20px",
                                borderBottomRightRadius: "20px",
                                boxSizing: "border-box",
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    color: "white",
                                    fontSize: "18px",
                                }}
                            >
                                {item.title}
                            </h3>

                            <p
                                style={{
                                    margin: "4px 0 0",
                                    fontSize: "13px",
                                    opacity: 0.85,
                                    color: "white",
                                }}
                            >
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* DOTS */}
            <div
                style={{
                    position: "absolute",
                    bottom: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "6px",
                    zIndex: 10,
                }}
            >
                {items.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: index === i ? 10 : 8,
                            height: index === i ? 10 : 8,
                            borderRadius: "50%",
                            background:
                                index === i
                                    ? "#facc15"
                                    : "rgba(255,255,255,0.5)",
                            cursor: "pointer",
                            transition: "0.2s",
                        }}
                    />
                ))}
            </div>

            {/* LEFT ARROW */}
            <button
                onClick={() =>
                    setIndex(
                        (prev) => (prev - 1 + items.length) % items.length
                    )
                }
                style={arrowLeft}
            >
                ‹
            </button>

            {/* RIGHT ARROW */}
            <button
                onClick={() =>
                    setIndex((prev) => (prev + 1) % items.length)
                }
                style={arrowRight}
            >
                ›
            </button>
        </div>
    );
}

const arrowBase: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.45)",
    border: "none",
    color: "white",
    fontSize: "22px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    zIndex: 20,
};

const arrowLeft: React.CSSProperties = {
    ...arrowBase,
    left: "10px",
};

const arrowRight: React.CSSProperties = {
    ...arrowBase,
    right: "10px",
};