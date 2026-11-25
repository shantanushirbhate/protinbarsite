
import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const MotionBox = motion.create(Box);

const COLORS = {
  dark: "#170D09",
  brown: "#291711",
  brownLight: "#48251D",
  cream: "#F8F3E9",
  white: "#FFFCF6",
  yellow: "#FFE45C",
  orange: "#E9682D",
  muted: "#B7A69B",
};

const slides = [
  {
    image: "/swiperi1.jpg",
    eyebrow: "01 / THE PERFECT FUEL",
    title: "FUEL YOUR",
    highlight: "LIMITS.",
    description:
      "Power your everyday hustle with delicious protein-packed nutrition. Made for people who never settle.",
    number: "01",
    tag: "ENERGY FOR EVERY DAY",
  },
  {
    image: "/swiperi2.jpg",
    eyebrow: "02 / BUILT DIFFERENT",
    title: "POWER",
    highlight: "EVERY MOVE.",
    description:
      "Whether you're training hard or chasing your next goal, bring the energy to make every moment count.",
    number: "02",
    tag: "MADE TO MOVE",
  },
  {
    image: "/swiperi3.jpg",
    eyebrow: "03 / YOUR NEXT LEVEL",
    title: "NO LIMITS.",
    highlight: "JUST POWER.",
    description:
      "Great taste. Powerful nutrition. One simple choice to keep moving forward and becoming stronger.",
    number: "03",
    tag: "BECOME YOUR BEST",
  },
];

export default function Swipereffect() {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // TEXT SLIDE CONTROL
  // Only one text slide is active at any moment.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.34) {
      setActiveSlide(0);
    } else if (latest < 0.68) {
      setActiveSlide(1);
    } else {
      setActiveSlide(2);
    }
  });

  // IMAGE OPACITY ANIMATIONS
  const firstOpacity = useTransform(
    scrollYProgress,
    [0, 0.23, 0.29, 0.34],
    [1, 1, 0, 0]
  );

  const secondOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.39, 0.57, 0.63, 0.68],
    [0, 1, 1, 0, 0]
  );

  const thirdOpacity = useTransform(
    scrollYProgress,
    [0.68, 0.73, 1],
    [0, 1, 1]
  );

  // IMAGE SCALE ANIMATIONS
  const firstScale = useTransform(
    scrollYProgress,
    [0, 0.29],
    [1, 1.035]
  );

  const secondScale = useTransform(
    scrollYProgress,
    [0.34, 0.63],
    [1.035, 1]
  );

  const thirdScale = useTransform(
    scrollYProgress,
    [0.68, 1],
    [1.035, 1]
  );

  // BOTTOM PROGRESS
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const images = [
    {
      src: slides[0].image,
      opacity: firstOpacity,
      scale: firstScale,
    },
    {
      src: slides[1].image,
      opacity: secondOpacity,
      scale: secondScale,
    },
    {
      src: slides[2].image,
      opacity: thirdOpacity,
      scale: thirdScale,
    },
  ];

  const currentSlide = slides[activeSlide];

  return (
    <Box
      component="section"
      ref={sectionRef}
      id="protein-campaign"
      sx={{
        height: "300vh",
        position: "relative",
        backgroundColor: COLORS.dark,
      }}
    >
      {/* STICKY CAMPAIGN */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100svh",
          minHeight: { xs: 580, md: 600 },
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          background: `
            radial-gradient(
              ellipse at 15% 50%,
              rgba(105, 48, 25, 0.28),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 90% 10%,
              rgba(255, 228, 92, 0.07),
              transparent 35%
            ),
            ${COLORS.dark}
          `,
        }}
      >
        {/* BACKGROUND DECORATION */}
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            right: "-100px",
            width: { xs: 170, md: 380 },
            height: { xs: 170, md: 380 },
            border: "1px solid rgba(255,228,92,.10)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "8%",
            left: "-100px",
            width: 230,
            height: 230,
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* MAIN LAYOUT */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1450,
            mx: "auto",
            px: { xs: 2.5, sm: 5, md: 9, lg: 11 },
            py: { xs: 4, md: 5 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.05fr 0.95fr",
            },
            alignItems: "center",
            gap: { xs: 2, md: 8, lg: 10 },
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* LEFT IMAGE */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: {
                xs: "34svh",
                sm: "40svh",
                md: "65svh",
              },
              minHeight: { xs: 200, md: 420 },
              maxHeight: 650,
              order: 1,
            }}
          >
            {/* ORANGE SHADOW */}
            <Box
              sx={{
                position: "absolute",
                inset: "12px -12px -12px 12px",
                backgroundColor: COLORS.orange,
                opacity: 0.75,
                clipPath:
                  "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 0 100%)",
              }}
            />

            {/* IMAGE FRAME */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                p: { xs: 1, md: 1.5 },
                backgroundColor: COLORS.brown,
                border: "1px solid rgba(255,228,92,.45)",
                clipPath:
                  "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 0 100%)",
              }}
            >
              {/* IMAGE AREA */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  backgroundColor: COLORS.brownLight,
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 90%, 88% 100%, 0 100%)",
                }}
              >
                {/* IMAGE SLIDES */}
                {images.map((image, index) => (
                  <MotionBox
                    key={image.src}
                    component="img"
                    src={image.src}
                    alt={`One Protein campaign ${index + 1}`}
                    loading="eager"
                    style={{
                      opacity: image.opacity,
                      scale: image.scale,
                    }}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      p: { xs: 1, sm: 2, md: 3 },
                      willChange: "transform, opacity",
                    }}
                  />
                ))}

                {/* IMAGE OVERLAY */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(0deg, rgba(23,13,9,.42), transparent 35%)",
                    pointerEvents: "none",
                  }}
                />

                {/* TOP LABEL */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 10, md: 20 },
                    left: { xs: 10, md: 20 },
                    backgroundColor: COLORS.yellow,
                    color: COLORS.dark,
                    px: 1.5,
                    py: 0.8,
                    zIndex: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 9,
                      fontWeight: 900,
                      letterSpacing: 2,
                    }}
                  >
                    ONE PROTEIN
                  </Typography>
                </Box>

                {/* BOTTOM LABEL */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 12, md: 25 },
                    left: { xs: 12, md: 25 },
                    zIndex: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: COLORS.white,
                      fontFamily: "Anton, sans-serif",
                      fontSize: { xs: 20, md: 36 },
                      lineHeight: 1,
                      letterSpacing: 1,
                    }}
                  >
                    STRONGER EVERY DAY.
                  </Typography>

                  <Typography
                    sx={{
                      color: COLORS.yellow,
                      fontSize: 8,
                      letterSpacing: 3,
                      fontWeight: 800,
                      mt: 1,
                    }}
                  >
                    MADE FOR MORE.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* CORNER DETAIL */}
            <Box
              sx={{
                position: "absolute",
                top: -10,
                left: -10,
                width: 38,
                height: 38,
                borderTop: `3px solid ${COLORS.yellow}`,
                borderLeft: `3px solid ${COLORS.yellow}`,
                zIndex: 4,
              }}
            />
          </Box>

          {/* RIGHT TEXT */}
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: 230, sm: 250, md: 420 },
              display: "flex",
              alignItems: "center",
              order: 2,
              pl: { xs: 0, md: 1 },
            }}
          >
            {/* SECTION LABEL */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: -5, md: -25 },
                left: 0,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 25,
                  height: 2,
                  backgroundColor: COLORS.orange,
                }}
              />

              <Typography
                sx={{
                  color: COLORS.muted,
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                THE ONE PROTEIN EXPERIENCE
              </Typography>
            </Box>

            {/* ONLY ONE TEXT SLIDE AT A TIME */}
            <AnimatePresence mode="wait" initial={false}>
              <MotionBox
                key={currentSlide.number}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -35,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                {/* EYEBROW */}
                <Typography
                  sx={{
                    color: COLORS.yellow,
                    fontSize: { xs: 9, md: 11 },
                    fontWeight: 900,
                    letterSpacing: { xs: 2, md: 3 },
                    mb: { xs: 1.5, md: 3 },
                  }}
                >
                  {currentSlide.eyebrow}
                </Typography>

                {/* HEADING */}
                <Typography
                  sx={{
                    color: COLORS.cream,
                    fontFamily: "Anton, sans-serif",
                    fontSize: {
                      xs: 43,
                      sm: 58,
                      md: 75,
                      lg: 96,
                    },
                    lineHeight: 0.94,
                    letterSpacing: -1,
                    textTransform: "uppercase",
                  }}
                >
                  {currentSlide.title}

                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      color: COLORS.yellow,
                    }}
                  >
                    {currentSlide.highlight}
                  </Box>
                </Typography>

                {/* ORANGE DIVIDER */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: { xs: 2, md: 3 },
                    mb: { xs: 1.5, md: 2.5 },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 42, md: 65 },
                      height: 4,
                      backgroundColor: COLORS.orange,
                    }}
                  />

                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: COLORS.yellow,
                    }}
                  />
                </Box>

                {/* DESCRIPTION */}
                <Typography
                  sx={{
                    color: COLORS.muted,
                    fontSize: { xs: 12, sm: 13, md: 15 },
                    lineHeight: 1.85,
                    maxWidth: 420,
                  }}
                >
                  {currentSlide.description}
                </Typography>

                {/* SLIDE FOOTER */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: { xs: 2.5, md: 4 },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Anton, sans-serif",
                      fontSize: { xs: 32, md: 43 },
                      color: COLORS.yellow,
                      lineHeight: 1,
                    }}
                  >
                    {currentSlide.number}
                  </Typography>

                  <Box
                    sx={{
                      width: 35,
                      height: 1,
                      backgroundColor: "rgba(255,255,255,.35)",
                    }}
                  />

                  <Typography
                    sx={{
                      color: COLORS.cream,
                      fontSize: 9,
                      fontWeight: 900,
                      letterSpacing: 2,
                    }}
                  >
                    {currentSlide.tag}
                  </Typography>
                </Box>
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Box>

        {/* BOTTOM PROGRESS */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 12, md: 22 },
            left: { xs: 22, md: 75 },
            right: { xs: 22, md: 75 },
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 2,
              backgroundColor: "rgba(255,255,255,.18)",
              overflow: "hidden",
            }}
          >
            <MotionBox
              style={{ width: progressWidth }}
              sx={{
                height: "100%",
                backgroundColor: COLORS.yellow,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1.2,
            }}
          >
            <Typography
              sx={{
                color: COLORS.muted,
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              SCROLL TO EXPLORE
            </Typography>

            <Typography
              sx={{
                color: COLORS.yellow,
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              ONE PROTEIN — 2026
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
