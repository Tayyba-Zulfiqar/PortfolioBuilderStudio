// Painter's palette icon (Choose Your Style)
const PaletteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12c0 2.2.8 4.2 2.1 5.7.5.5 1.2.6 1.7.2.5-.4.5-1.1.1-1.6C5.3 15.4 5 14.2 5 13c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7h-.5c-.6 0-1.1.4-1.2 1-.1.6.2 1.2.7 1.6.8.6 1.3 1.6 1.3 2.6 0 .4-.3.8-.8.8z" />
        <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
        <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
        <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
    </svg>
);

// Magic wand icon (Make It Yours)
const MagicWandIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m19 2-5.5 5.5" />
        <path d="m2 19 11.5-11.5" />
        <path d="m19 7 3-3" opacity="0.8" />
        <path d="M15 3h3v3" opacity="0.8" />
        <path d="M11 2v2M12 9h2" opacity="0.6" />
    </svg>
);

// Globe icon (Share With The World)
const GlobeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </svg>
);

const featuresData = [
    {
        icon: <PaletteIcon />,
        title: 'Choose Your Style',
        description: 'Hand-picked templates with that perfect soft, dreamy aesthetic. Pick one and make it yours.',
        iconBgClass: 'feature-bg-pink',
        iconColorClass: 'feature-icon-pink',
    },
    {
        icon: <MagicWandIcon />,
        title: 'Make It Yours',
        description: 'Customize colors, fonts, and sections without ever touching code. Drag, click, sparkle.',
        iconBgClass: 'feature-bg-lavender',
        iconColorClass: 'feature-icon-lavender',
    },
    {
        icon: <GlobeIcon />,
        title: 'Share With The World',
        description: 'Get a pretty bloomportfolio.com URL and share your story with the world in one click.',
        iconBgClass: 'feature-bg-mint',
        iconColorClass: 'feature-icon-mint',
    },
];

export default featuresData;