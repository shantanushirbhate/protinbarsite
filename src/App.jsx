
import React, { useEffect, useState } from "react";
import Swipereffect from "./components/Scrollingeffect";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  Card,
  CardContent,
  Stack,
  TextField,
  Drawer,
  ListItemButton,
  Divider,
  GlobalStyles,
} from "@mui/material";

import {
  Menu,
  ShoppingBag,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Facebook,
  Music2,
  Zap,
  Leaf,
  CandyOff,
  Wheat,
  Heart,
  X,
} from "lucide-react";

import { motion, useScroll, useTransform } from "framer-motion";

/* import ProteinScene from "./components/ProteinScene"; */

const MBox = motion.create(Box);

/* =========================================
   RESPONSIVE PAGE CONTAINER
   Symmetrical left and right spacing
========================================= */

const PAGE_GUTTER = {
  xs: "20px",
  sm: "32px",
  md: "48px",
  lg: "72px",
  xl: "96px",
};

function PageContainer({ children, sx = {}, ...props }) {
  return (
    <Container
      maxWidth={false}
      disableGutters
      {...props}
      sx={{
        width: "100%",
        maxWidth: "1920px",
        mx: "auto",
        px: PAGE_GUTTER,
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}

/* =========================================
   COLORS AND ASSETS
========================================= */

const COLORS = {
  brown: "#291711",
  dark: "#170D09",
  brownLight: "#48251D",
  cream: "#F8F3E9",
  white: "#FFFCF6",
  yellow: "#FFE45C",
  orange: "#E9682D",
  text: "#38251D",
  muted: "#88786E",
};

const photos = {
  ingredients:
    "https://www.nutraingredients.com/resizer/v2/EUH4GI3TRVNSZLYIOCXQKK3EJA.jpg?auth=14535aa377d22a2333df4ca8f4a3246646edecd07d3f0731a45aea898b886009",

  chocolate:
    "https://eatmush.com/cdn/shop/files/CRE053025_Website_Bars_PDP_DCC_DCC_Ingredients_Module-2.png?v=1750973591&width=1400",

  peanut:
    "https://oneto100.se/cdn/shop/files/7A0A6808-567A-4315-B4CF-0726D4016E4C_1200x.jpg?v=1751782423",

  bar: "https://cdn.shopify.com/s/files/1/0053/3322/files/carousel-3-ingredients_126cf0b2-1b32-4bbe-aba8-2543c0a5601e.png?v=1723027319",
};

const HERO_BACKGROUND_IMAGE = "/protein-bar-hero.png.png";
const STORY_GIF = "/protein-bar-gym-yellow.gif";

const flavours = [
  {
    name: "Chocolate Almond",
    detail: "Rich cocoa · roasted almond",
    price: "₹149",
    color: "#A9C94D",
    image: photos.chocolate,
  },
  {
    name: "Birthday Cake",
    detail: "Vanilla · soft cake crunch",
    price: "₹149",
    color: "#4B9ED5",
    image: photos.bar,
  },
  {
    name: "Maple Doughnut",
    detail: "Maple · sweet glaze",
    price: "₹149",
    color: "#F4B45C",
    image: photos.peanut,
  },
];

const benefits = [
  [Zap, "20g Grass-fed", "Whey Protein"],
  [CandyOff, "Zero Added", "Sugar"],
  [Wheat, "Tasted Dessert", "Protein"],
  [Heart, "Made with", "Quality Ingredients"],
  [Leaf, "No Fillers", "No Compromise"],
];

const typingPhrases = [
  "PURE PROTEIN.",
  "CLEAN INGREDIENTS.",
  "POWER EVERY BITE.",
  "FUEL YOUR FITNESS.",
];

/* =========================================
   GLOBAL STYLES
========================================= */

function GlobalDesign() {
  return (
    <GlobalStyles
      styles={{
        "@import":
          "url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap')",

        "*": {
          boxSizing: "border-box",
        },

        html: {
          scrollBehavior: "smooth",
          scrollPaddingTop: "90px",
        },

        body: {
          margin: 0,
          background: COLORS.cream,
          fontFamily: "'DM Sans', sans-serif",
          overflowX: "hidden",
        },

        "a, button": {
          WebkitTapHighlightColor: "transparent",
        },

        "::selection": {
          background: COLORS.yellow,
          color: COLORS.dark,
        },
      }}
    />
  );
}

/* =========================================
   TYPING TEXT
========================================= */

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];

    let speed = isDeleting ? 45 : 100;

    if (!isDeleting && text === currentPhrase) {
      speed = 1400;
    }

    if (isDeleting && text === "") {
      speed = 350;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text === currentPhrase) {
          setIsDeleting(true);
        } else {
          setText(currentPhrase.substring(0, text.length + 1));
        }
      } else if (text === "") {
        setIsDeleting(false);
        setPhraseIndex(
          (previous) => (previous + 1) % typingPhrases.length
        );
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <Box component="span">
      {text}
      <Box
        component="span"
        sx={{
          color: COLORS.yellow,
          animation: "blink 0.8s infinite",
          "@keyframes blink": {
            "50%": { opacity: 0 },
          },
        }}
      >
        |
      </Box>
    </Box>
  );
}

/* =========================================
   ANIMATED TEXT
========================================= */

const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.12,
    },
  },
};

const wordAnimation = {
  hidden: {
    opacity: 0,
    y: 35,
    rotateX: -45,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedText({
  text,
  component = "h2",
  sx = {},
  highlightWords = [],
}) {
  return (
    <Typography
      component={component}
      aria-label={text.replace(/\n/g, " ")}
      sx={sx}
    >
      <MBox
        component="span"
        variants={wordContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        sx={{ display: "inline" }}
      >
        {text.split("\n").map((line, lineIndex) => (
          <Box component="span" key={lineIndex} sx={{ display: "block" }}>
            {line.split(" ").map((word, wordIndex) => {
              const cleanWord = word.replace(/[.,!?]/g, "");

              const highlighted =
                highlightWords.includes(word) ||
                highlightWords.includes(cleanWord);

              return (
                <React.Fragment key={`${lineIndex}-${wordIndex}`}>
                  <MBox
                    component="span"
                    variants={wordAnimation}
                    sx={{
                      display: "inline-block",
                      color: highlighted ? COLORS.yellow : "inherit",
                      transformOrigin: "bottom",
                    }}
                  >
                    {word}
                  </MBox>{" "}
                </React.Fragment>
              );
            })}
          </Box>
        ))}
      </MBox>
    </Typography>
  );
}

/* =========================================
   REVEAL ANIMATION
========================================= */

function Reveal({ children, delay = 0, sx = {} }) {
  return (
    <MBox
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      sx={sx}
    >
      {children}
    </MBox>
  );
}

/* =========================================
   SECTION HEADING
========================================= */

function SectionHeading({ eyebrow, title, action }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "flex-end" }}
      gap={3}
      mb={6}
    >
      <Box>
        <Typography
          sx={{
            color: COLORS.orange,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </Typography>

        <AnimatedText
          text={title}
          sx={{
            mt: 1.5,
            color: COLORS.brown,
            fontFamily: "Anton, sans-serif",
            fontSize: {
              xs: 42,
              sm: 52,
              md: 65,
            },
            lineHeight: 1.08,
            textTransform: "uppercase",
          }}
        />
      </Box>

      {action}
    </Stack>
  );
}

/* =========================================
   MAIN APP
========================================= */

export default function App() {
  const [drawer, setDrawer] = useState(false);
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  const progressScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    ["Our products", "flavours"],
    ["Our proteins", "benefits"],
    ["Our story", "story"],
    ["Reviews", "reviews"],
    ["Contact", "footer"],
  ];

  const navButtonSx = {
    color: "rgba(255,255,255,0.86)",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1,
    textTransform: "uppercase",
    textDecoration: "none",
    position: "relative",
    transition: "color .25s ease",

    "&:after": {
      content: '""',
      position: "absolute",
      height: 2,
      width: 0,
      bottom: -8,
      left: 0,
      background: COLORS.yellow,
      transition: "width .25s ease",
    },

    "&:hover": {
      color: COLORS.yellow,
      background: "transparent",

      "&:after": {
        width: "100%",
      },
    },
  };

  const yellowButtonSx = {
    minHeight: 54,
    px: 3.5,
    borderRadius: "3px",
    background: COLORS.yellow,
    color: COLORS.dark,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    transition: "all .3s ease",

    "&:hover": {
      background: "#fff",
      transform: "translateY(-3px)",
      boxShadow: "0 12px 25px rgba(0,0,0,.2)",
    },
  };

  return (
    <>
      <GlobalDesign />

      {/* SCROLL PROGRESS */}
      <MBox
        className="scroll-progress"
        style={{ scaleX: progressScale }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: COLORS.yellow,
          transformOrigin: "left",
          zIndex: 1500,
        }}
      />

      {/* =====================================
          NAVBAR
      ===================================== */}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isScrolled ? "rgba(41,23,17,.96)" : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,.08)"
            : "1px solid transparent",
          boxShadow: isScrolled ? "0 8px 30px rgba(0,0,0,.2)" : "none",
          transition: "all .35s ease",
        }}
      >
        <PageContainer>
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 70, md: 86 },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component="a"
              href="#home"
              sx={{
                color: "#fff",
                fontFamily: "Anton, sans-serif",
                fontSize: { xs: 32, md: 38 },
                letterSpacing: -1.5,
                textDecoration: "none",

                "& span": {
                  color: COLORS.yellow,
                },
              }}
            >
              ONE<span>.</span>
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              spacing={4}
              sx={{
                display: { xs: "none", md: "flex" },
                mx: "auto",
              }}
            >
              {navLinks.map(([label, id]) => (
                <Button
                  key={id}
                  component="a"
                  href={`#${id}`}
                  sx={navButtonSx}
                >
                  {label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                href="#flavours"
                endIcon={<ShoppingBag size={16} />}
                sx={{
                  ...yellowButtonSx,
                  minHeight: 44,
                  px: 2.5,
                  fontSize: 10,
                }}
              >
                Shop now
              </Button>

              <IconButton
                onClick={() => setDrawer(true)}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  color: "#fff",
                }}
              >
                <Menu size={25} />
              </IconButton>
            </Stack>
          </Toolbar>
        </PageContainer>
      </AppBar>

      {/* =====================================
          MOBILE DRAWER
      ===================================== */}

      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => setDrawer(false)}
        PaperProps={{
          sx: {
            width: 290,
            background: COLORS.brown,
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography
              sx={{
                fontFamily: "Anton",
                fontSize: 34,
              }}
            >
              ONE<span style={{ color: COLORS.yellow }}>.</span>
            </Typography>

            <IconButton
              onClick={() => setDrawer(false)}
              sx={{ color: "#fff" }}
            >
              <X />
            </IconButton>
          </Stack>

          {navLinks.map(([label, id]) => (
            <ListItemButton
              key={id}
              component="a"
              href={`#${id}`}
              onClick={() => setDrawer(false)}
              sx={{
                py: 2,
                px: 1,
                color: "#fff",
                borderBottom: "1px solid rgba(255,255,255,.1)",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",

                "&:hover": {
                  color: COLORS.yellow,
                  background: "transparent",
                },
              }}
            >
              {label}
            </ListItemButton>
          ))}
        </Box>
      </Drawer>

      <Box component="main" id="home">
        {/* =====================================
            HERO
        ===================================== */}

        <Box
          component="section"
          sx={{
            position: "relative",
            minHeight: { xs: 700, md: 780 },
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            isolation: "isolate",
            background: COLORS.dark,
          }}
        >
          <Box
            component="img"
            src={HERO_BACKGROUND_IMAGE}
            alt=""
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background: {
                xs: "linear-gradient(90deg,rgba(20,12,8,.85),rgba(20,12,8,.48))",
                md: "linear-gradient(90deg,rgba(20,12,8,.85) 0%,rgba(20,12,8,.55) 48%,rgba(20,12,8,.08) 100%)",
              },
            }}
          />

          <PageContainer
            sx={{
              position: "relative",
              zIndex: 2,
              minHeight: { xs: 700, md: 780 },
              display: "flex",
              alignItems: "center",
              pt: { xs: 10, md: 8 },
              pb: 10,
            }}
          >
            <Box
              sx={{
                position: "relative",
                maxWidth: 700,
                width: "100%",
              }}
            >
              <MBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  mb={3}
                >
                  <Box
                    sx={{
                      width: 35,
                      height: 1,
                      background: COLORS.yellow,
                    }}
                  />

                  <Typography
                    sx={{
                      color: COLORS.yellow,
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    Fuel your everyday
                  </Typography>
                </Stack>
              </MBox>

              <MBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  component="h1"
                  sx={{
                    color: "#fff",
                    fontFamily: "Anton, sans-serif",
                    fontSize: {
                      xs: "clamp(56px, 12vw, 78px)",
                      sm: "clamp(75px, 9vw, 100px)",
                      md: "clamp(90px, 8vw, 118px)",
                    },
                    lineHeight: 0.98,
                    letterSpacing: -1.5,
                    textTransform: "uppercase",
                    minHeight: { xs: 120, md: 230 },
                    maxWidth: 720,
                  }}
                >
                  <TypingText />
                </Typography>
              </MBox>

              <MBox
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
              >
                <Typography
                  sx={{
                    maxWidth: 440,
                    mt: 3,
                    mb: 3.5,
                    color: "rgba(255,255,255,.76)",
                    fontSize: { xs: 13, md: 16 },
                    lineHeight: 1.9,
                  }}
                >
                  Big flavour. Real ingredients. Protein that keeps up with you.
                </Typography>

                <Button
                  href="#flavours"
                  endIcon={<ArrowRight size={18} />}
                  sx={yellowButtonSx}
                >
                  Grab yours
                </Button>
              </MBox>

              {/* QUALITY STAMP */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "auto", md: 470 },
                  right: { xs: 0, md: "auto" },
                  bottom: { xs: -150, md: -100 },
                  width: 115,
                  height: 115,
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,.65)",
                  borderRadius: "50%",
                  color: "#fff",
                  transform: "rotate(-12deg)",
                }}
              >
                <Typography sx={{ fontSize: 9, letterSpacing: 2 }}>
                  HIGH
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Anton",
                    fontSize: 23,
                  }}
                >
                  QUALITY
                </Typography>

                <Typography sx={{ fontSize: 6, letterSpacing: 1 }}>
                  GOODNESS IN EVERY BITE
                </Typography>
              </Box>

              {/* PROTEIN NOTE */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: { xs: -125, md: -115 },
                }}
              >
                <Typography
                  sx={{
                    color: COLORS.yellow,
                    fontFamily: "Anton",
                    fontSize: 44,
                  }}
                >
                  20G
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 900,
                    lineHeight: 1.5,
                    letterSpacing: 1,
                  }}
                >
                  PROTEIN
                  <br />
                  PER BAR
                </Typography>
              </Stack>
            </Box>

            {/* OPTIONAL 3D MODEL */}
            <MBox
              initial={{
                opacity: 0,
                scale: 0.7,
                rotate: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1.2,
                delay: 0.35,
              }}
              sx={{
                position: "absolute",
                right: { md: "3%", lg: "7%" },
                top: "12%",
                width: { md: "43%", lg: "42%" },
                height: "75%",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              {/* <ProteinScene /> */}
            </MBox>

            <Typography
              sx={{
                position: "absolute",
                right: { xs: 3, md: 30 },
                bottom: 30,
                color: "rgba(255,255,255,.72)",
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              SNACK BOLD. LIVE STRONG.
            </Typography>
          </PageContainer>
        </Box>

        {/* =====================================
            BENEFITS
        ===================================== */}

        <Box
          component="section"
          id="benefits"
          sx={{
            py: { xs: 7, md: 9 },
            background: COLORS.cream,
          }}
        >
          <PageContainer>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(5, minmax(0, 1fr))",
                },
                gap: { xs: 4, md: 3 },
                alignItems: "stretch",
              }}
            >
              {benefits.map(([Icon, title, detail], i) => (
                <Reveal
                  key={title}
                  delay={i * 0.08}
                  sx={{
                    gridColumn:
                      i === 4
                        ? { xs: "1 / -1", md: "auto" }
                        : "auto",
                  }}
                >
                  <Stack
                    alignItems="center"
                    textAlign="center"
                    spacing={2}
                    sx={{ height: "100%" }}
                  >
                    <Box
                      sx={{
                        width: 62,
                        height: 62,
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid rgba(56,37,29,.13)",
                        borderRadius: "50%",
                        color: COLORS.brown,
                        background: "rgba(255,255,255,.7)",
                        transition: "all .3s ease",

                        "&:hover": {
                          background: COLORS.yellow,
                          borderColor: COLORS.yellow,
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <Icon size={27} strokeWidth={1.7} />
                    </Box>

                    <Typography
                      sx={{
                        color: COLORS.muted,
                        fontSize: 12,
                        lineHeight: 1.7,
                      }}
                    >
                      {title}
                      <br />

                      <Box
                        component="b"
                        sx={{
                          color: COLORS.brown,
                          fontWeight: 900,
                        }}
                      >
                        {detail}
                      </Box>
                    </Typography>
                  </Stack>
                </Reveal>
              ))}
            </Box>
          </PageContainer>
        </Box>

        {/* =====================================
            SCROLL IMAGE SEQUENCE
        ===================================== */}

        <Swipereffect />

        {/* =====================================
            STORY — PREMIUM EDITORIAL SECTION
        ===================================== */}

        <Box
          component="section"
          id="story"
          sx={{
            position: "relative",
            py: { xs: 9, md: 14 },
            background: COLORS.brown,
            overflow: "hidden",
            isolation: "isolate",
          }}
        >
          {/* BACKGROUND DECORATION */}
          <Box
            sx={{
              position: "absolute",
              top: -180,
              left: -180,
              width: 450,
              height: 450,
              borderRadius: "50%",
              background: "rgba(255,228,92,.07)",
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              right: -150,
              bottom: -180,
              width: 450,
              height: 450,
              borderRadius: "50%",
              background: "rgba(233,104,45,.12)",
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          <PageContainer
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "repeat(2, minmax(0, 1fr))",
                },
                alignItems: "center",
                gap: { xs: 5, md: 9, lg: 12 },
              }}
            >
              {/* LEFT — STORY CONTENT */}
              <Reveal>
                <Box sx={{ maxWidth: 570 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    mb={3}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 2,
                        background: COLORS.yellow,
                      }}
                    />

                    <Typography
                      sx={{
                        color: COLORS.yellow,
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                      }}
                    >
                      More than just a protein bar
                    </Typography>
                  </Stack>

                  <AnimatedText
                    text={"GOOD FOOD.\nGOOD ENERGY.\nONE PURPOSE."}
                    highlightWords={["ONE", "PURPOSE."]}
                    sx={{
                      color: "#fff",
                      fontFamily: "Anton, sans-serif",
                      fontSize: {
                        xs: 53,
                        sm: 67,
                        md: 70,
                        lg: 86,
                      },
                      lineHeight: 0.99,
                      letterSpacing: -0.5,
                      textTransform: "uppercase",
                    }}
                  />

                  <Typography
                    sx={{
                      mt: 3.5,
                      maxWidth: 480,
                      color: "rgba(255,255,255,.68)",
                      fontSize: { xs: 13, md: 15 },
                      lineHeight: 2,
                    }}
                  >
                    We believe great nutrition should never feel like a
                    compromise. That's why ONE brings together bold flavours,
                    quality ingredients and protein-packed goodness in every
                    bite.
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      maxWidth: 480,
                      color: "rgba(255,255,255,.68)",
                      fontSize: { xs: 13, md: 15 },
                      lineHeight: 2,
                    }}
                  >
                    Whether you're chasing a fitness goal, powering through a
                    busy day or simply craving something delicious, we're here
                    to fuel your everyday.
                  </Typography>

                  {/* STORY HIGHLIGHTS */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2, minmax(0, 1fr))",
                      gap: 2,
                      mt: 4,
                      maxWidth: 430,
                    }}
                  >
                    {[
                      ["20G", "PROTEIN PER BAR"],
                      ["ZERO", "ADDED SUGAR"],
                    ].map(([value, label]) => (
                      <Box
                        key={label}
                        sx={{
                          p: 2.2,
                          borderLeft: `2px solid ${COLORS.yellow}`,
                          background: "rgba(255,255,255,.045)",
                        }}
                      >
                        <Typography
                          sx={{
                            color: COLORS.yellow,
                            fontFamily: "Anton",
                            fontSize: 34,
                            lineHeight: 1,
                          }}
                        >
                          {value}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 1,
                            color: "rgba(255,255,255,.65)",
                            fontSize: 8,
                            fontWeight: 900,
                            letterSpacing: 1.5,
                          }}
                        >
                          {label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    href="#flavours"
                    endIcon={<ArrowUpRight size={17} />}
                    sx={{
                      mt: 4,
                      ...yellowButtonSx,
                    }}
                  >
                    Explore our flavours
                  </Button>
                </Box>
              </Reveal>

              {/* RIGHT — PREMIUM STORY GIF */}
              <Reveal delay={0.15}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 560,
                    mx: "auto",
                    pt: 4,
                    pb: 4,
                    px: { xs: 1, sm: 1.5 },

                    "&:hover .story-gif-image": {
                      transform: "scale(1.075)",
                    },

                    "&:hover .story-main-frame": {
                      borderColor: COLORS.yellow,
                      boxShadow:
                        "0 30px 90px rgba(0,0,0,.5), 0 0 35px rgba(255,228,92,.12)",
                    },

                    "&:hover .story-corner": {
                      width: 52,
                      height: 52,
                      opacity: 1,
                    },

                    "&:hover .story-back-frame": {
                      transform: "translate(13px,-13px) rotate(2deg)",
                      borderColor: "rgba(255,228,92,.9)",
                    },
                  }}
                >
                  {/* AMBIENT GLOW */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: "5% -10%",
                      background:
                        "radial-gradient(ellipse,rgba(255,228,92,.24),rgba(233,104,45,.12) 42%,transparent 72%)",
                      filter: "blur(48px)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* BACKGROUND NUMBER */}
                  <Typography
                    sx={{
                      position: "absolute",
                      top: -15,
                      right: { xs: 0, sm: 8 },
                      fontFamily: "Anton",
                      fontSize: { xs: 90, sm: 130 },
                      lineHeight: 1,
                      color: "rgba(255,255,255,.055)",
                      zIndex: 0,
                      userSelect: "none",
                    }}
                  >
                    01
                  </Typography>

                  {/* OFFSET FRAME */}
                  <Box
                    className="story-back-frame"
                    sx={{
                      position: "absolute",
                      top: 22,
                      left: 20,
                      right: 0,
                      bottom: 22,
                      border: "1px solid rgba(255,228,92,.5)",
                      clipPath:
                        "polygon(0 0,90% 0,100% 12%,100% 100%,10% 100%,0 88%)",
                      transform: "translate(7px,-7px) rotate(1deg)",
                      transition: "all .55s cubic-bezier(.2,.7,.2,1)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* MAIN IMAGE FRAME */}
                  <Box
                    className="story-main-frame"
                    sx={{
                      position: "relative",
                      height: { xs: 330, sm: 410, md: 475 },
                      overflow: "hidden",
                      background: "#130A07",
                      border: "1px solid rgba(255,255,255,.35)",
                      clipPath:
                        "polygon(0 0,90% 0,100% 10%,100% 100%,10% 100%,0 90%)",
                      isolation: "isolate",
                      transition: "all .5s ease",
                      boxShadow: "0 25px 70px rgba(0,0,0,.4)",
                    }}
                  >
                    {/* GIF IMAGE */}
                    <Box
                      component="img"
                      className="story-gif-image"
                      src={STORY_GIF}
                      alt="ONE Protein fitness lifestyle"
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition:
                          "transform 1.1s cubic-bezier(.2,.7,.2,1)",
                        filter: "saturate(1.15) contrast(1.08)",
                      }}
                    />

                    {/* CINEMATIC OVERLAY */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg,rgba(10,5,3,.55) 0%,transparent 30%,rgba(10,5,3,.08) 45%,rgba(10,5,3,.96) 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* WARM SIDE LIGHTING */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(110deg,rgba(255,228,92,.17),transparent 35%,transparent 68%,rgba(233,104,45,.2))",
                        mixBlendMode: "screen",
                        pointerEvents: "none",
                      }}
                    />

                    {/* TOP CAMPAIGN LABEL */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        position: "absolute",
                        top: { xs: 18, sm: 25 },
                        left: { xs: 19, sm: 28 },
                        right: { xs: 19, sm: 28 },
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                      >
                        <Box
                          sx={{
                            width: 7,
                            height: 7,
                            background: COLORS.yellow,
                            transform: "rotate(45deg)",
                            boxShadow: `0 0 12px ${COLORS.yellow}`,
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize: 8,
                            fontWeight: 900,
                            letterSpacing: 2,
                          }}
                        >
                          ONE PERFORMANCE LAB
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          color: COLORS.yellow,
                          fontFamily: "Anton",
                          fontSize: 17,
                          letterSpacing: 1,
                        }}
                      >
                        NO. 001
                      </Typography>
                    </Stack>

                    {/* VERTICAL SIDE TEXT */}
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "35%",
                        left: { xs: 8, sm: 13 },
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        color: "rgba(255,255,255,.72)",
                        fontSize: 7,
                        fontWeight: 900,
                        letterSpacing: 3,
                      }}
                    >
                      STRENGTH / ENERGY / RECOVERY
                    </Typography>

                    {/* RIGHT TECHNICAL MARKER */}
                    <Stack
                      sx={{
                        position: "absolute",
                        top: "42%",
                        right: { xs: 14, sm: 23 },
                        display: { xs: "none", sm: "flex" },
                        alignItems: "center",
                        gap: 0.8,
                      }}
                    >
                      <Box
                        sx={{
                          width: 1,
                          height: 38,
                          background: "rgba(255,255,255,.6)",
                        }}
                      />

                      <Typography
                        sx={{
                          color: COLORS.yellow,
                          fontSize: 7,
                          fontWeight: 900,
                          writingMode: "vertical-rl",
                          letterSpacing: 2,
                        }}
                      >
                        KEEP MOVING
                      </Typography>

                      <Box
                        sx={{
                          width: 1,
                          height: 38,
                          background: "rgba(255,255,255,.6)",
                        }}
                      />
                    </Stack>

                    {/* BOTTOM CAMPAIGN CONTENT */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: { xs: 25, sm: 38 },
                        right: { xs: 22, sm: 36 },
                        bottom: { xs: 27, sm: 38 },
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 1.5 }}
                      >
                        <Box
                          sx={{
                            width: 25,
                            height: 2,
                            background: COLORS.yellow,
                          }}
                        />

                        <Typography
                          sx={{
                            color: COLORS.yellow,
                            fontSize: 9,
                            fontWeight: 900,
                            letterSpacing: 3,
                          }}
                        >
                          FUEL YOUR POTENTIAL
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="flex-end"
                        justifyContent="space-between"
                        gap={1}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontFamily: "Anton",
                              fontSize: { xs: 47, sm: 66, md: 76 },
                              lineHeight: 0.83,
                              letterSpacing: 1,
                              textShadow: "0 5px 25px rgba(0,0,0,.35)",
                            }}
                          >
                            MUSCLE
                          </Typography>

                          <Typography
                            sx={{
                              color: COLORS.yellow,
                              fontFamily: "Anton",
                              fontSize: { xs: 47, sm: 66, md: 76 },
                              lineHeight: 0.95,
                              letterSpacing: 1,
                            }}
                          >
                            FUEL.
                          </Typography>
                        </Box>

                        {/* PROTEIN SEAL */}
                        <Box
                          sx={{
                            flexShrink: 0,
                            width: { xs: 68, sm: 91 },
                            height: { xs: 68, sm: 91 },
                            mb: 0.5,
                            borderRadius: "50%",
                            background: COLORS.yellow,
                            color: COLORS.dark,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "4px solid rgba(255,255,255,.7)",
                            outline: "1px solid rgba(255,228,92,.8)",
                            outlineOffset: 4,
                            boxShadow: "0 10px 30px rgba(0,0,0,.45)",
                            transform: "rotate(9deg)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Anton",
                              fontSize: { xs: 25, sm: 33 },
                              lineHeight: 1,
                            }}
                          >
                            20G
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 7,
                              fontWeight: 900,
                              letterSpacing: 1.2,
                            }}
                          >
                            PROTEIN
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider
                        sx={{
                          my: 1.8,
                          borderColor: "rgba(255,255,255,.3)",
                        }}
                      />

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,.82)",
                            fontSize: { xs: 8, sm: 10 },
                            letterSpacing: 1,
                            fontWeight: 700,
                          }}
                        >
                          BIG ENERGY. BOLD FLAVOUR.
                        </Typography>

                        <Typography
                          sx={{
                            color: COLORS.yellow,
                            fontSize: 8,
                            fontWeight: 900,
                            letterSpacing: 1.5,
                          }}
                        >
                          MADE TO MOVE →
                        </Typography>
                      </Stack>
                    </Box>

                    {/* INNER CORNER ACCENTS */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: "10%",
                        width: 42,
                        height: 42,
                        borderTop: `2px solid ${COLORS.yellow}`,
                        borderRight: `2px solid ${COLORS.yellow}`,
                        opacity: 0.85,
                        pointerEvents: "none",
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: "10%",
                        width: 42,
                        height: 42,
                        borderBottom: `2px solid ${COLORS.yellow}`,
                        borderLeft: `2px solid ${COLORS.yellow}`,
                        opacity: 0.85,
                        pointerEvents: "none",
                      }}
                    />
                  </Box>

                  {/* OUTSIDE CORNER BRACKETS */}
                  {[
                    {
                      top: 0,
                      left: 0,
                      borderTop: `3px solid ${COLORS.yellow}`,
                      borderLeft: `3px solid ${COLORS.yellow}`,
                    },
                    {
                      top: 0,
                      right: 0,
                      borderTop: `3px solid ${COLORS.yellow}`,
                      borderRight: `3px solid ${COLORS.yellow}`,
                    },
                    {
                      bottom: 0,
                      left: 0,
                      borderBottom: `3px solid ${COLORS.yellow}`,
                      borderLeft: `3px solid ${COLORS.yellow}`,
                    },
                    {
                      bottom: 0,
                      right: 0,
                      borderBottom: `3px solid ${COLORS.yellow}`,
                      borderRight: `3px solid ${COLORS.yellow}`,
                    },
                  ].map((corner, index) => (
                    <Box
                      key={index}
                      className="story-corner"
                      sx={{
                        position: "absolute",
                        width: 35,
                        height: 35,
                        zIndex: 3,
                        opacity: 0.8,
                        pointerEvents: "none",
                        transition:
                          "all .4s cubic-bezier(.2,.7,.2,1)",
                        ...corner,
                      }}
                    />
                  ))}

                  {/* IMAGE FOOTER */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 3, px: 0.5 }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,.9)",
                          fontSize: 9,
                          fontWeight: 900,
                          letterSpacing: 2,
                        }}
                      >
                        REAL FUEL. REAL MOVEMENT.
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          color: "rgba(255,255,255,.45)",
                          fontSize: 7,
                          letterSpacing: 1.5,
                        }}
                      >
                        PERFORMANCE NUTRITION SERIES
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: COLORS.yellow,
                          boxShadow: `0 0 12px ${COLORS.yellow}`,
                        }}
                      />

                      <Typography
                        sx={{
                          color: COLORS.yellow,
                          fontSize: 8,
                          fontWeight: 900,
                          letterSpacing: 1.5,
                        }}
                      >
                        EST. FOR EVERYONE
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Reveal>
            </Box>
          </PageContainer>
        </Box>

        {/* =====================================
            FLAVOURS — PREMIUM 3D ANIMATED CARDS
        ===================================== */}

        <Box
          component="section"
          id="flavours"
          sx={{
            py: { xs: 9, md: 14 },
            background: COLORS.cream,
            position: "relative",
            overflow: "hidden",
            perspective: "1400px",

            "@keyframes floatBadge": {
              "0%, 100%": { transform: "translateY(0px) rotate(8deg)" },
              "50%": { transform: "translateY(-9px) rotate(12deg)" },
            },

            "@keyframes ambientFloat": {
              "0%, 100%": { transform: "translateY(0px) scale(1)" },
              "50%": { transform: "translateY(-15px) scale(1.04)" },
            },

            "@keyframes shine": {
              "0%": { transform: "translateX(-150%) skewX(-20deg)" },
              "100%": { transform: "translateX(250%) skewX(-20deg)" },
            },
          }}
        >
          {/* BACKGROUND GLOW */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "-120px",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(233,104,45,.10)",
              filter: "blur(90px)",
              animation: "ambientFloat 7s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              right: "-100px",
              bottom: "5%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(255,228,92,.16)",
              filter: "blur(90px)",
              animation: "ambientFloat 9s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          <PageContainer
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Reveal>
              <SectionHeading
                eyebrow="Find your favourite"
                title="Most popular flavours"
                action={
                  <Button
                    endIcon={<ArrowUpRight size={17} />}
                    sx={{
                      color: COLORS.orange,
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      borderBottom: `1px solid ${COLORS.orange}`,
                      borderRadius: 0,

                      "&:hover": {
                        background: "transparent",
                        color: COLORS.brown,
                      },
                    }}
                  >
                    View all flavours
                  </Button>
                }
              />
            </Reveal>

            {/* PRODUCT GRID */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: { xs: 3, md: 3.5 },
                alignItems: "stretch",
                perspective: "1400px",
              }}
            >
              {flavours.map((item, i) => (
                <Reveal
                  key={item.name}
                  delay={i * 0.12}
                  sx={{ height: "100%" }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      perspective: "1200px",
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10px",
                        background: COLORS.white,
                        border: "1px solid rgba(56,37,29,.09)",
                        transformStyle: "preserve-3d",
                        transform:
                          "perspective(1200px) rotateX(0deg) rotateY(0deg)",
                        transition:
                          "transform .55s cubic-bezier(.2,.8,.2,1), box-shadow .55s ease",
                        boxShadow: "0 8px 25px rgba(56,37,29,.06)",

                        "&:hover": {
                          transform:
                            "perspective(1200px) rotateX(2deg) rotateY(-2deg) translateY(-12px)",
                          boxShadow:
                            "0 30px 65px rgba(56,37,29,.18), 0 8px 20px rgba(233,104,45,.10)",
                        },

                        "&:hover .product-image": {
                          transform: "scale(1.12) translateZ(25px)",
                        },

                        "&:hover .product-glow": {
                          opacity: 1,
                          transform: "scale(1.2)",
                        },

                        "&:hover .product-shine": {
                          animation: "shine 1s ease forwards",
                        },

                        "&:hover .product-number": {
                          color: COLORS.yellow,
                          transform: "translateZ(35px) scale(1.1)",
                        },

                        "&:hover .protein-badge": {
                          transform:
                            "translateY(-8px) rotate(14deg) scale(1.08)",
                        },

                        "&:hover .cart-arrow": {
                          background: COLORS.yellow,
                          color: COLORS.dark,
                          transform: "rotate(45deg) scale(1.1)",
                        },
                      }}
                    >
                      {/* IMAGE AREA */}
                      <Box
                        sx={{
                          height: { xs: 310, md: 340 },
                          position: "relative",
                          overflow: "hidden",
                          background: "#E9DFD0",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <Box
                          className="product-glow"
                          sx={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 1,
                            opacity: 0,
                            background:
                              "radial-gradient(circle at 50% 45%, rgba(255,228,92,.3), transparent 65%)",
                            transition: "all .6s ease",
                            pointerEvents: "none",
                          }}
                        />

                        <Box
                          component="img"
                          className="product-image"
                          src={item.image}
                          alt={`${item.name} protein bar`}
                          loading="lazy"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition:
                              "transform .9s cubic-bezier(.2,.7,.2,1)",
                            transform: "translateZ(0)",
                          }}
                        />

                        {/* DARK IMAGE GRADIENT */}
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 1,
                            background:
                              "linear-gradient(180deg,rgba(23,13,9,.18),transparent 40%,rgba(23,13,9,.35))",
                            pointerEvents: "none",
                          }}
                        />

                        {/* SHINE EFFECT */}
                        <Box
                          className="product-shine"
                          sx={{
                            position: "absolute",
                            zIndex: 2,
                            top: 0,
                            left: 0,
                            width: "35%",
                            height: "100%",
                            opacity: 0,
                            background:
                              "linear-gradient(90deg,transparent,rgba(255,255,255,.24),transparent)",
                            pointerEvents: "none",
                          }}
                        />

                        {/* PRODUCT NUMBER */}
                        <Typography
                          className="product-number"
                          sx={{
                            position: "absolute",
                            zIndex: 3,
                            top: 18,
                            left: 20,
                            color: "#fff",
                            fontFamily: "Anton",
                            fontSize: 25,
                            letterSpacing: 2,
                            textShadow: "0 3px 12px rgba(0,0,0,.3)",
                            transition: ".4s ease",
                          }}
                        >
                          0{i + 1}
                        </Typography>

                        {/* FLOATING PROTEIN BADGE */}
                        <Box
                          className="protein-badge"
                          sx={{
                            position: "absolute",
                            zIndex: 4,
                            top: 17,
                            right: 17,
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            background: COLORS.yellow,
                            color: COLORS.dark,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow:
                              "0 8px 25px rgba(0,0,0,.22), inset 0 2px 5px rgba(255,255,255,.55)",
                            animation:
                              "floatBadge 3.5s ease-in-out infinite",
                            animationDelay: `${i * 0.5}s`,
                            transition: ".4s ease",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Anton",
                              fontSize: 25,
                              lineHeight: 1,
                            }}
                          >
                            20G
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 7,
                              fontWeight: 900,
                              letterSpacing: 1,
                            }}
                          >
                            PROTEIN
                          </Typography>
                        </Box>

                        {/* IMAGE LABEL */}
                        <Box
                          sx={{
                            position: "absolute",
                            zIndex: 3,
                            bottom: 18,
                            left: 18,
                            px: 1.5,
                            py: 0.8,
                            background: "rgba(23,13,9,.78)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,.2)",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: 9,
                              fontWeight: 900,
                              letterSpacing: 1.8,
                            }}
                          >
                            ONE PROTEIN
                          </Typography>
                        </Box>
                      </Box>

                      {/* PRODUCT DETAILS */}
                      <CardContent
                        sx={{
                          p: { xs: 2.5, md: 3 },
                          position: "relative",
                          background:
                            "linear-gradient(145deg,#FFFCF6 0%,#F8F3E9 100%)",
                        }}
                      >
                        <Typography
                          sx={{
                            color: COLORS.orange,
                            fontSize: 9,
                            fontWeight: 900,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                          }}
                        >
                          SIGNATURE FLAVOUR
                        </Typography>

                        <Typography
                          component="h3"
                          sx={{
                            mt: 1,
                            color: COLORS.brown,
                            fontFamily: "Barlow Condensed",
                            fontSize: { xs: 32, md: 36 },
                            fontWeight: 900,
                            lineHeight: 1,
                            textTransform: "uppercase",
                          }}
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 1,
                            mb: 2.5,
                            color: COLORS.muted,
                            fontSize: 12,
                          }}
                        >
                          {item.detail}
                        </Typography>

                        <Divider
                          sx={{
                            borderColor: "rgba(56,37,29,.12)",
                            mb: 2,
                          }}
                        />

                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography
                            sx={{
                              color: COLORS.brown,
                              fontFamily: "Anton",
                              fontSize: 31,
                            }}
                          >
                            {item.price}
                          </Typography>

                          <Button
                            endIcon={
                              <Box
                                className="cart-arrow"
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  display: "grid",
                                  placeItems: "center",
                                  background: COLORS.orange,
                                  color: "#fff",
                                  transition: ".35s ease",
                                }}
                              >
                                <ArrowUpRight size={17} />
                              </Box>
                            }
                            sx={{
                              color: COLORS.brown,
                              fontSize: 10,
                              fontWeight: 900,
                              letterSpacing: 0.5,
                              textTransform: "uppercase",

                              "&:hover": {
                                background: "transparent",
                              },
                            }}
                          >
                            Add to cart
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </PageContainer>
        </Box>

        {/* =====================================
            REVIEWS
        ===================================== */}

        <Box
          component="section"
          id="reviews"
          sx={{
            py: { xs: 9, md: 14 },
            background: COLORS.brown,
          }}
        >
          <PageContainer>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "minmax(0, .85fr) minmax(0, 1.15fr)",
                },
                alignItems: "center",
                gap: { xs: 5, md: 10 },
              }}
            >
              <Reveal>
                <Box
                  sx={{
                    p: { xs: 3, md: 5 },
                    background: COLORS.white,
                    borderRadius: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      color: COLORS.orange,
                      letterSpacing: 5,
                      mb: 3,
                    }}
                  >
                    ★★★★★
                  </Typography>

                  <Typography
                    component="h3"
                    sx={{
                      color: COLORS.brown,
                      fontFamily: "Barlow Condensed",
                      fontSize: 34,
                      fontWeight: 800,
                      lineHeight: 1.2,
                    }}
                  >
                    “The snack I actually look forward to.”
                  </Typography>

                  <Typography
                    sx={{
                      my: 2.5,
                      color: COLORS.muted,
                      fontSize: 13,
                      lineHeight: 1.9,
                    }}
                  >
                    Great texture, bold flavour and an easy protein boost for
                    my day.
                  </Typography>

                  <Typography
                    sx={{
                      color: COLORS.brown,
                      fontSize: 11,
                      fontWeight: 900,
                    }}
                  >
                    — ONE community member
                  </Typography>
                </Box>
              </Reveal>

              <Reveal delay={0.15}>
                <Typography
                  sx={{
                    color: COLORS.yellow,
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  }}
                >
                  Real people. Real energy.
                </Typography>

                <AnimatedText
                  text={"OUR ONE-DERFUL\nCOMMUNITY"}
                  highlightWords={["COMMUNITY"]}
                  sx={{
                    my: 2.5,
                    color: "#fff",
                    fontFamily: "Anton",
                    fontSize: {
                      xs: 50,
                      md: 78,
                    },
                    lineHeight: 1.05,
                  }}
                />

                <Typography
                  sx={{
                    maxWidth: 440,
                    color: "rgba(255,255,255,.7)",
                    fontSize: 14,
                    lineHeight: 1.9,
                  }}
                >
                  From early workouts to late-night projects, keep showing up
                  as your strongest self.
                </Typography>
              </Reveal>
            </Box>
          </PageContainer>
        </Box>

        {/* =====================================
            PROMO
        ===================================== */}

        <Box
          component="section"
          sx={{
            py: { xs: 9, md: 14 },
            background: COLORS.cream,
          }}
        >
          <PageContainer>
            <Reveal>
              <Box
                sx={{
                  maxWidth: 750,
                  mx: "auto",
                  mb: 7,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: COLORS.orange,
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  }}
                >
                  Made to move you
                </Typography>

                <AnimatedText
                  text={"THE CRUNCH THAT FUELS\nYOUR INNER FIRE"}
                  highlightWords={["FIRE"]}
                  sx={{
                    mt: 2,
                    mb: 3,
                    color: COLORS.brown,
                    fontFamily: "Anton",
                    fontSize: {
                      xs: 45,
                      md: 75,
                    },
                    lineHeight: 1.05,
                  }}
                />

                <Button
                  href="#flavours"
                  endIcon={<ArrowRight size={17} />}
                  sx={yellowButtonSx}
                >
                  Grab yours
                </Button>
              </Box>
            </Reveal>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2.5,
                alignItems: "stretch",
              }}
            >
              {[
                {
                  image: photos.bar,
                  title: "TRAINER TESTED",
                  subtitle: "Find your flavour",
                },
                {
                  image: photos.chocolate,
                  title: "REAL INGREDIENTS",
                  subtitle: "Big taste. No fuss.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <Box
                    sx={{
                      position: "relative",
                      minHeight: 290,
                      height: "100%",
                      overflow: "hidden",
                      background: "#352018",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: 3,

                      "&:hover img": {
                        transform: "scale(1.06)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform .6s ease",
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(0deg,rgba(22,12,8,.85),transparent 75%)",
                      }}
                    />

                    <Typography
                      sx={{
                        position: "relative",
                        color: "#fff",
                        fontFamily: "Barlow Condensed",
                        fontSize: 27,
                        fontWeight: 800,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        position: "relative",
                        color: "rgba(255,255,255,.8)",
                        fontSize: 12,
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Reveal>
              ))}

              <Reveal delay={0.2}>
                <Box
                  sx={{
                    minHeight: 290,
                    height: "100%",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: COLORS.orange,
                  }}
                >
                  <Zap size={30} color={COLORS.yellow} />

                  <Typography
                    sx={{
                      mt: 2,
                      color: "#fff",
                      fontFamily: "Anton",
                      fontSize: 38,
                    }}
                  >
                    20G PROTEIN
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,.85)",
                      fontSize: 12,
                    }}
                  >
                    Fuel your next move.
                  </Typography>
                </Box>
              </Reveal>
            </Box>
          </PageContainer>
        </Box>

        {/* =====================================
            NEWSLETTER
        ===================================== */}

        <Box
          component="section"
          sx={{
            py: { xs: 9, md: 12 },
            background: COLORS.dark,
          }}
        >
          <PageContainer>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "minmax(0, 1fr)",
                  md: "minmax(0, 1fr) minmax(0, .8fr)",
                },
                alignItems: "center",
                gap: 7,
              }}
            >
              <Reveal>
                <Typography
                  sx={{
                    color: COLORS.yellow,
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  }}
                >
                  Stay in the loop
                </Typography>

                <AnimatedText
                  text={"GOOD THINGS COME\nTO YOUR INBOX."}
                  highlightWords={["INBOX."]}
                  sx={{
                    mt: 2,
                    color: "#fff",
                    fontFamily: "Anton",
                    fontSize: {
                      xs: 48,
                      md: 68,
                    },
                    lineHeight: 1.05,
                  }}
                />

                <Typography
                  sx={{
                    mt: 2,
                    color: "rgba(255,255,255,.65)",
                    fontSize: 13,
                    lineHeight: 1.8,
                  }}
                >
                  Get first access to new flavours, drops and exclusive offers.
                </Typography>
              </Reveal>

              <Reveal delay={0.15}>
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEmail("");
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    gap: 1.5,
                  }}
                >
                  <TextField
                    fullWidth
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 54,
                        borderRadius: "3px",
                        background: "#fff",
                        fontSize: 12,
                      },

                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    sx={{
                      ...yellowButtonSx,
                      minWidth: 140,
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Reveal>
            </Box>
          </PageContainer>
        </Box>
      </Box>

      {/* =====================================
          FOOTER
      ===================================== */}

      <Box
        component="footer"
        id="footer"
        sx={{
          pt: 9,
          pb: 3,
          overflow: "hidden",
          background: "#130B08",
        }}
      >
        <PageContainer>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                md: "1.5fr repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 4, md: 6 },
              pb: 7,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Anton",
                  fontSize: 48,
                  lineHeight: 1,
                }}
              >
                ONE<span style={{ color: COLORS.yellow }}>.</span>
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "rgba(255,255,255,.45)",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  lineHeight: 2,
                }}
              >
                PURE PROTEIN.
                <br />
                NATURAL TASTE.
              </Typography>
            </Box>

            {[
              {
                heading: "SHOP",
                links: [
                  ["All flavours", "flavours"],
                  ["Why ONE", "benefits"],
                  ["Shop now", "flavours"],
                ],
              },
              {
                heading: "ABOUT US",
                links: [
                  ["Our story", "story"],
                  ["Community", "reviews"],
                  ["Contact", "footer"],
                ],
              },
              {
                heading: "HELP",
                links: [
                  ["FAQ", "footer"],
                  ["Privacy policy", "footer"],
                  ["Terms of service", "footer"],
                ],
              },
            ].map((group) => (
              <Stack key={group.heading} spacing={1.8}>
                <Typography
                  sx={{
                    mb: 0.5,
                    color: COLORS.yellow,
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 2,
                  }}
                >
                  {group.heading}
                </Typography>

                {group.links.map(([label, id]) => (
                  <Typography
                    key={label}
                    component="a"
                    href={`#${id}`}
                    sx={{
                      color: "rgba(255,255,255,.58)",
                      fontSize: 12,
                      textDecoration: "none",
                      transition: "color .25s ease",

                      "&:hover": {
                        color: COLORS.yellow,
                      },
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Stack>
            ))}
          </Box>

          {/* FOOTER BOTTOM */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{
              py: 3,
              borderTop: "1px solid rgba(255,255,255,.12)",
            }}
          >
            <Stack direction="row" spacing={2.5}>
              {[Instagram, Facebook, Music2].map((Icon, i) => (
                <Box
                  key={i}
                  sx={{
                    color: "#fff",
                    cursor: "pointer",
                    transition: "color .25s ease",

                    "&:hover": {
                      color: COLORS.yellow,
                    },
                  }}
                >
                  <Icon size={18} />
                </Box>
              ))}
            </Stack>

            <Typography
              sx={{
                color: "rgba(255,255,255,.42)",
                fontSize: 9,
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              © 2026 ONE PROTEIN. ALL RIGHTS RESERVED.
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,.42)",
                fontSize: 9,
                letterSpacing: 1,
              }}
            >
              MADE TO MOVE YOU.
            </Typography>
          </Stack>

          {/* GIANT BRAND TEXT */}
          <Typography
            sx={{
              mt: 5,
              color: "rgba(255,255,255,.045)",
              fontFamily: "Anton",
              fontSize: {
                xs: "18vw",
                md: "15vw",
              },
              lineHeight: 0.9,
              textAlign: "center",
              whiteSpace: "nowrap",
              letterSpacing: -5,
            }}
          >
            ONE PROTEIN
          </Typography>
        </PageContainer>
      </Box>
    </>
  );
}
