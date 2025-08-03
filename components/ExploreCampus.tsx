import { CSSProperties, memo, useState, useEffect } from 'react';

// --- Configuration Data ---
const CAMPUS_MAP_IMAGE_URL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAGSQojwgPdWZNSn8j0fyRPOBqyc6j_s1RffjDRCkMU_3_gc71PKrBemCQlLPtX6ZufIb-Mg_XFV8tXKoPY6yJk2e9srh8QM8fJFsZYPXvEDwJuoTcH4k5nIxDHc7LqfjKqyJ88JPJaoFZypi2sLkS3QdWFo7Qx2rWxYIZBGIi4SuYifYkwwynsWLRyzU/s9375/DRONE%20copy.jpg';

const pointsOfInterest = [
    { 
        id: 1,
        name: "Dharithri Block", 
        x: 33.7, y: 23.4,
        description: 'Home to several key engineering departments, Dharithri Block is a hub of innovation and learning, featuring modern classrooms and collaborative spaces.',
        imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRCLu2lI3rmKkPSXLO-xiQeRkz3CNNLGwreLGUFJaOgUZg455iBVncWD-hQBO1wjQ5r7cjpvkjZmZsuDq7A8kWnVn8SVi5s_8sLHawtravta6V3qXGuL8X96H5eEe6C3TXgyi65t33FxQ92X1nFXXBZW3MMaEuQpgh9wKb-vQDslDwOfTkBkmWtTo1qkw/s4032/dharithri.jpeg'
    },
    { 
        id: 2,
        name: "VIIT Ground", 
        x: 24.3, y: 33.6,
        description: 'A sprawling multi-purpose sports ground that hosts various athletic events, promoting physical fitness and a spirit of sportsmanship among students.',
        imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4ujBdFkTBOboN63UwnxBqtu-sQQkdWkvbM31dZrmr_ghNkuB9FlBKiHz9TJeuBExKlWE8l9vyOU0EfKvpt3QkZZuLtyZHJcMBQI3fw_246fC_PFPO9qu7U34YNhhuTxfpUhLfQ3-UUcR0R5LeySliLTwJl8I2FgvrA5492q_pwDeFZF9xMAEX4G08TPA/s4000/ground.jpeg'
    },
    { 
        id: 3,
        name: "VIIT Main Block", 
        x: 50, y: 44,
        description: 'The administrative and academic heart of the campus, featuring the central library, administrative offices, and state-of-the-art lecture halls.',
        imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhVAaDBo9wFKsf8rppX8ZVyEJzfZquRA7eVA0DEQi51uAe1DynaRiJdNcIVaAjTpFtvW0IZ5oGKW69PFpwCllhoFeFmxo57BPzyX7gxfBRPqRENjPnYRCHPW58qj22n4ACFX98EZKmXu-AoyWilFYvX-7WAtctez90fmmRxMr1kBInirKzBM-w80tp_3w/s4032/main1.jpeg'
    },
    { 
        id: 4,
        name: "Ladies Hostel", 
        x: 63.9, y: 15.1,
        description: 'A secure and comfortable residential facility for female students, offering all necessary amenities for a conducive living and learning environment.',
        imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijHv_UdGT906oomvRnDXKz0ERc_fL4tAM9ppj9JimIXR2Bz6bsANb3_jHNiYqwTZJA0LnBYJg2rwNB6_tCc1W9w0aHQeWL_c2UFMwKIBzCYkiPQKoX5KBM0kdK1AvFXdb-lsnz9UIAViUiUHhvHSrPZLOkl7AKkI6lT3VFgoFaR6dhCcQAFbspk0TVvow/s4032/hostel.jpeg'
    },
    { 
        id: 5,
        name: "Vignan's Solar Park", 
        x: 65.1, y: 41.5,
        description: 'A dedicated solar energy park showcasing the institution\'s commitment to renewable energy and sustainable campus practices.',
        imageUrl: 'https://images.unsplash.com/photo-1508515053969-7b94594e62c4?q=80&w=2070&auto=format&fit=crop'
    },
    { 
        id: 6,
        name: "Main Entrance", 
        x: 9.6, y: 99.7,
        description: 'The grand entrance to the campus, welcoming students, faculty, and visitors to our vibrant community of learning and excellence.',
        imageUrl: 'https://images.unsplash.com/photo-1590650424388-77c6f3f07a27?q=80&w=2070&auto=format&fit=crop'
    },
    { 
        id: 7,
        name: "Ground 2", 
        x: 67.6, y: 82.8,
        description: 'An additional sports facility used for various outdoor games and practice sessions, ensuring ample space for all athletic activities.',
        imageUrl: 'https://images.unsplash.com/photo-1540205257002-c996836d525b?q=80&w=2070&auto=format&fit=crop'
    },
    { 
        id: 8,
        name: "Ground 3", 
        x: 94.5, y: 72,
        description: 'A dedicated ground for specific sports like cricket, complete with practice nets and well-maintained pitches.',
        imageUrl: 'https://images.unsplash.com/photo-1593341642345-5428a883933c?q=80&w=2070&auto=format&fit=crop'
    },
];

// --- Custom Hooks ---
const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        if (media.matches !== matches) setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

// --- Style Objects ---
const styles: { [key: string]: CSSProperties } = {
    // Enhanced container styling
    pageContainer: { 
        fontFamily: "'Inter', sans-serif", 
        padding: '1rem 1rem', 
        backgroundColor: '#f7fafc',
        backgroundImage: 'linear-gradient(to bottom, #f7fafc, #edf2f7)'
    },
    headerContainer: { 
        textAlign: 'center', 
        marginBottom: '3rem',
        position: 'relative'
    },
    mainTitle: { 
        fontSize: '2.75rem', 
        fontWeight: 'bold', 
        color: '#1a202c',
        position: 'relative',
        display: 'inline-block'
    },
    subtitle: { 
        marginTop: '0.75rem', 
        fontSize: '1.125rem', 
        color: '#4a5568', 
        maxWidth: '650px', 
        margin: '0.75rem auto 0',
        lineHeight: '1.6'
    },
    mainLayout: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '2.5rem', 
        maxWidth: '1400px', 
        margin: '0 auto' 
    },
    mainLayoutMobile: { gridTemplateColumns: '1fr', gap: '1.5rem' },
    mapContainer: {
        gridColumn: 'span 3',
        position: 'relative',
        width: '100%',
        borderRadius: '1.25rem',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: 'translateY(0)',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.2), 0 15px 15px -5px rgba(0, 0, 0, 0.05)',
        }
    },
    mapContainerMobile: { gridColumn: 'span 1' },
    mapImage: { 
        display: 'block', 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        transition: 'transform 10s ease',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    pin: {
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        animationName: 'float',
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))',
    },
    pinIcon: {
        width: '38px',
        height: '38px',
        filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))',
        transition: 'transform 0.3s ease, filter 0.3s ease',
    },
    pinLabel: {
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        color: '#1a202c',
        padding: '0.5rem 1rem',
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '1rem',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        marginTop: '10px',
        whiteSpace: 'pre-line',
        transition: 'all 0.3s ease',
        opacity: 0,
        transform: 'translateY(-5px) scale(0.95)',
    },
    activePinRing: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
        animation: 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        zIndex: -1,
    },
    activePin: {
        position: 'absolute',
        top: '-3px',
        left: '-3px',
        right: '-3px',
        bottom: '-3px',
        borderRadius: '50%',
        border: '3px solid #3b82f6',
        animation: 'spin 10s linear infinite',
    },
    detailsContainer: {
        gridColumn: 'span 2',
        backgroundColor: '#fff',
        borderRadius: '1.25rem',
        boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: 'translateY(0)',
    },
    detailsContainerMobile: { gridColumn: 'span 1' },
    detailsImage: { 
        width: '100%', 
        height: '300px', 
        objectFit: 'cover',
        transition: 'transform 0.5s ease',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    detailsTextContent: { padding: '2rem' },
    detailsTitle: { 
        fontSize: '1.75rem', 
        fontWeight: 'bold', 
        color: '#1a202c', 
        marginBottom: '1rem',
        position: 'relative',
        paddingBottom: '0.75rem',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '60px',
            height: '3px',
            backgroundColor: '#3b82f6',
            borderRadius: '3px'
        }
    },
    detailsDescription: { 
        fontSize: '1.1rem', 
        color: '#4a5568', 
        lineHeight: 1.7,
        letterSpacing: '0.01em'
    },
};

// --- Child Components ---
const MapPin = memo(({ point, onPinClick, isActive }: { point: typeof pointsOfInterest[0], onPinClick: (point: typeof pointsOfInterest[0]) => void; isActive: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    const pinStyle: CSSProperties = {
        ...styles.pin,
        left: `${point.x}%`,
        top: `${point.y}%`,
        animationDelay: `${point.id * 0.15}s`,
        transform: isHovered || isActive ? 'translate(-50%, -100%) scale(1.15)' : 'translate(-50%, -100%) scale(1)',
        animationPlayState: isHovered || isActive ? 'paused' : 'running',
        zIndex: isActive ? 10 : 1,
    };

    const iconContainerStyle: CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: styles.pinIcon.width,
        height: styles.pinIcon.height,
    };

    // Enhanced label styling
    const labelStyle: CSSProperties = {
        ...styles.pinLabel,
        opacity: isHovered || isActive ? 1 : 0,
        transform: isHovered || isActive ? 'translateY(0) scale(1)' : 'translateY(-5px) scale(0.95)',
    };

    // Pin color based on active state
    const pinColor = isActive ? '#3b82f6' : '#e53e3e';

    return (
        <div 
            style={pinStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onPinClick(point)}
        >
            <div style={iconContainerStyle}>
                {isActive && <div style={styles.activePinRing}></div>}
                {isActive && <div style={styles.activePin}></div>}
                <svg style={{
                    ...styles.pinIcon,
                    transform: (isHovered || isActive) ? 'scale(1.15)' : 'scale(1)',
                    filter: (isHovered || isActive) ? 'drop-shadow(0 8px 15px rgba(0,0,0,0.5))' : 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))'
                }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0 C9.383 0 4 5.383 4 12 c 0 8.75 12 20 12 20 s 12 -11.25 12 -20 C 28 5.383 22.617 0 16 0 z M 16 18 C 13.791 18 12 16.209 12 14 s 1.791 -4 4 -4 s 4 1.791 4 4 S 18.209 18 16 18 z" 
                    fill={pinColor}
                    />
                </svg>
            </div>
            <div style={labelStyle}>
                {point.name}
            </div>
        </div>
    );
});

const DetailsPanel = memo(({ point }: { point: typeof pointsOfInterest[0] | null }) => {
    if (!point) return null;
    
    return (
        <div key={point.id} className="animate-fade-in-up">
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={point.imageUrl} alt={point.name} style={styles.detailsImage} />
                <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: '40px 20px 15px', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                    color: 'white'
                }}>
                    <span style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 600, 
                        backgroundColor: '#3b82f6', 
                        color: 'white', 
                        padding: '5px 10px', 
                        borderRadius: '4px' 
                    }}>
                        Location {point.id}
                    </span>
                </div>
            </div>
            <div style={styles.detailsTextContent}>
                <h3 style={styles.detailsTitle}>{point.name}</h3>
                <p style={styles.detailsDescription}>{point.description}</p>
                <div style={{ 
                    marginTop: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}>
                    <span style={{ 
                        fontSize: '0.875rem', 
                        color: '#718096' 
                    }}>
                        Coordinates: {point.x}°N, {point.y}°E
                    </span>
                    <button style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <span>View Details</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
});


// --- Main Component ---
const ExploreCampusWithPins = () => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const [activePin, setActivePin] = useState(pointsOfInterest[0]);

    useEffect(() => {
        const styleSheet = document.createElement("style");
        // Enhanced animations
        styleSheet.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            @keyframes float {
                0% { transform: translate(-50%, -100%) translateY(0px); }
                50% { transform: translate(-50%, -100%) translateY(-10px); }
                100% { transform: translate(-50%, -100%) translateY(0px); }
            }
            
            @keyframes pulse-ring {
                0% { transform: scale(0.33); opacity: 1; }
                80%, 100% { transform: scale(2.2); opacity: 0; }
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            
            .animate-fade-in-up {
                animation: fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .title-gradient {
                background: linear-gradient(90deg, #3b82f6, #1e40af, #3b82f6);
                background-size: 200% auto;
                color: transparent;
                -webkit-background-clip: text;
                background-clip: text;
                animation: shimmer 10s linear infinite;
            }
        `;
        document.head.appendChild(styleSheet);
        return () => { document.head.removeChild(styleSheet) };
    }, []);

    return (
        <div style={{
            ...styles.pageContainer,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative background elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
                zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '7%',
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0) 70%)',
                zIndex: 0
            }}></div>
            
            <header style={styles.headerContainer}>
                <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#3b82f6',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    marginBottom: '0.5rem',
                    display: 'block'
                }}>Interactive Map</span>
                <h2 style={styles.mainTitle} className="title-gradient">Explore Our Campus</h2>
    
                <div style={{
                    width: '80px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #3b82f6, #1e40af)',
                    borderRadius: '3px',
                    margin: '1.5rem auto 0'
                }}></div>
            </header>

            <div style={isMobile ? {...styles.mainLayout, ...styles.mainLayoutMobile} : styles.mainLayout}>
                <div style={isMobile ? {...styles.mapContainer, ...styles.mapContainerMobile} : styles.mapContainer}>
                    <img 
                        src={CAMPUS_MAP_IMAGE_URL} 
                        alt="Vignan Campus Map" 
                        style={styles.mapImage}
                    />
                    {pointsOfInterest.map((point) => (
                        <MapPin 
                            key={point.id}
                            point={point}
                            onPinClick={setActivePin}
                            isActive={activePin.id === point.id}
                        />
                    ))}
                </div>
                
                <div style={isMobile ? 
                    {...styles.detailsContainer, ...styles.detailsContainerMobile} : 
                    {...styles.detailsContainer, boxShadow: '0 20px 40px -5px rgba(59, 130, 246, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'}
                }>
                    <DetailsPanel point={activePin} />
                </div>
            </div>
            
            {/* Additional information section */}
            <div style={{
                maxWidth: '900px',
                margin: '3rem auto 0',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                zIndex: 1
            }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#1a202c',
                    marginBottom: '1rem'
                }}>Experience VIIT's Campus Virtually</h3>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#4a5568',
                    lineHeight: 1.6,
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    Our campus spans over 120 acres of lush greenery, featuring state-of-the-art facilities,
                    modern architecture, and vibrant learning spaces designed to inspire innovation and academic excellence.
                </p>
            </div>
        </div>
    );
};

export default ExploreCampusWithPins;