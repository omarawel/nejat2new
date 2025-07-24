
"use client"

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LocateFixed, AlertTriangle, Loader2, CheckCircle, Navigation } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const content = {
    de: {
        pageTitle: "Qibla Richtung",
        pageDescription: "Finde die Richtung zur Kaaba von deinem aktuellen Standort.",
        backToFeatures: "Zurück zu den Funktionen",
        requestingPermissions: "Berechtigungen anfordern...",
        calculating: "Berechne...",
        permissionError: "Fehler bei der Berechtigung",
        permissionErrorDesc: "Zugriff auf Gerätesensoren verweigert. Bitte aktiviere die Berechtigungen in deinen Browsereinstellungen und lade die Seite neu.",
        unsupportedError: "Nicht unterstützt",
        unsupportedErrorDesc: "Dein Browser oder Gerät unterstützt die erforderlichen Sensoren nicht.",
        qiblaDirection: "Qibla-Richtung",
        distance: "Distanz",
        perfectlyAligned: "Perfekt ausgerichtet!",
        alignDevice: "Gerät ausrichten",
    },
    en: {
        pageTitle: "Qibla Direction",
        pageDescription: "Find the direction to the Kaaba from your current location.",
        backToFeatures: "Back to Features",
        requestingPermissions: "Requesting permissions...",
        calculating: "Calculating...",
        permissionError: "Permission Error",
        permissionErrorDesc: "Device sensor access denied. Please enable permissions in your browser settings and reload the page.",
        unsupportedError: "Not Supported",
        unsupportedErrorDesc: "Your browser or device does not support the required sensors.",
        qiblaDirection: "Qibla Direction",
        distance: "Distance",
        perfectlyAligned: "Perfectly Aligned!",
        alignDevice: "Align Device",
    }
}

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians: number) {
    return radians * 180 / Math.PI;
}

function Compass({ heading, qiblaDirection }: { heading: number, qiblaDirection: number | null }) {
    const rotation = 360 - heading;
    const qiblaRelative = qiblaDirection !== null ? (qiblaDirection - heading + 360) % 360 : null;
    const deviation = qiblaDirection !== null ? Math.round(180 - Math.abs(Math.abs(qiblaDirection - heading) - 180)) : null;

    return (
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto transition-transform duration-200" style={{ transform: `rotate(${rotation}deg)` }}>
            {/* Dial background and ticks */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="98" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" />
                {Array.from({ length: 120 }).map((_, i) => (
                    <line
                        key={i}
                        x1="100"
                        y1="2"
                        x2="100"
                        y2={i % 5 === 0 ? "10" : "6"}
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={i % 5 === 0 ? "1" : "0.5"}
                        transform={`rotate(${i * 3}, 100, 100)`}
                    />
                ))}
            </svg>
             {/* Cardinal points */}
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-muted-foreground" style={{ transform: `rotate(${-rotation}deg)` }}>
                <span className="absolute -top-1">N</span>
                <span className="absolute -bottom-1 rotate-180">S</span>
                <span className="absolute -left-1 -rotate-90">W</span>
                <span className="absolute -right-1 rotate-90">E</span>
            </div>

            {/* Qibla Indicator Arrow */}
            {qiblaRelative !== null && (
                 <div
                    className="absolute top-0 left-1/2 w-0 h-0 -translate-x-1/2 -translate-y-4"
                    style={{
                        transform: `rotate(${qiblaRelative}deg) translateY(-88px)`,
                        transformOrigin: '50% 100px',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(var(--primary))" className="transition-colors duration-500">
                        <path d="M12 2L2 22h20L12 2z" transform="rotate(180 12 12)" />
                    </svg>
                </div>
            )}
            
            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${-rotation}deg)` }}>
                {deviation !== null && (
                    <span className={cn("text-5xl font-mono font-bold", Math.abs(deviation) < 5 && "text-primary")}>
                        {deviation}°
                    </span>
                )}
            </div>
        </div>
    );
}

export default function CompassPage() {
    const { language } = useLanguage();
    const c = content[language];
    
    const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [heading, setHeading] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>(c.requestingPermissions);

    const calculateQibla = useCallback((lat: number, lng: number) => {
        // Bearing
        const userLatRad = toRadians(lat);
        const kaabaLatRad = toRadians(KAABA_LAT);
        const deltaLng = toRadians(KAABA_LNG - lng);
        
        const y = Math.sin(deltaLng) * Math.cos(kaabaLatRad);
        const x = Math.cos(userLatRad) * Math.sin(kaabaLatRad) - Math.sin(userLatRad) * Math.cos(kaabaLatRad) * Math.cos(deltaLng);
        let bearing = toDegrees(Math.atan2(y, x));
        bearing = (bearing + 360) % 360;
        setQiblaDirection(bearing);
        
        // Distance (Haversine formula)
        const R = 6371; // Radius of Earth in kilometers
        const dLat = toRadians(KAABA_LAT - lat);
        const dLon = toRadians(KAABA_LNG - lng);
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRadians(lat)) * Math.cos(toRadians(KAABA_LAT)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
        const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        setDistance(R * centralAngle);
    }, []);

    const handleOrientation = (event: DeviceOrientationEvent) => {
        let alpha = event.alpha;
        // For iOS devices
        if (typeof (event as any).webkitCompassHeading !== 'undefined') {
            alpha = (event as any).webkitCompassHeading;
        }
        if (alpha !== null) {
            setHeading(alpha);
        }
    };

    const requestPermissions = useCallback(async () => {
        setStatus(c.requestingPermissions);
        setError(null);

        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission !== 'granted') {
                    setError(c.permissionErrorDesc);
                    setStatus(c.permissionError);
                    return;
                }
            } catch (e) {
                setError(c.permissionErrorDesc);
                setStatus(c.permissionError);
                return;
            }
        }
        
        window.addEventListener('deviceorientation', handleOrientation);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setStatus(c.calculating);
                calculateQibla(position.coords.latitude, position.coords.longitude);
                setStatus(c.alignDevice);
            },
            () => {
                setError(c.permissionErrorDesc);
                setStatus(c.permissionError);
            }
        );

    }, [calculateQibla, c]);
    
    useEffect(() => {
        requestPermissions();
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deviation = useMemo(() => {
        if (qiblaDirection === null) return 360;
        const diff = Math.abs(qiblaDirection - heading);
        return Math.min(diff, 360 - diff);
    }, [qiblaDirection, heading]);


    return (
        <div className="flex-grow flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-sm text-center">
                 <Button asChild variant="ghost" className="absolute top-4 left-4 text-white hover:bg-white/10 hover:text-white">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToFeatures}
                    </Link>
                </Button>

                <header className="my-8">
                    <h1 className="text-3xl font-bold">{c.pageTitle}</h1>
                    <p className="text-gray-400 mt-1">{c.pageDescription}</p>
                </header>

                <main className="flex-grow flex flex-col items-center justify-center gap-8">
                    {error ? (
                         <Alert variant="destructive" className="bg-red-900/50 border-red-500 text-white">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <AlertTitle>{status}</AlertTitle>
                            <AlertDescription>
                                {error}
                                <Button onClick={requestPermissions} variant="secondary" className="w-full mt-4">Try Again</Button>
                            </AlertDescription>
                        </Alert>
                    ) : qiblaDirection === null ? (
                        <div className="flex flex-col items-center gap-4">
                             <Loader2 className="h-10 w-10 animate-spin text-primary" />
                             <p>{status}...</p>
                        </div>
                    ) : (
                        <>
                            <p className={cn("text-2xl font-semibold transition-colors duration-500", deviation < 2.5 && "text-primary")}>
                                {deviation < 2.5 ? c.perfectlyAligned : `${Math.round(deviation)}°`}
                            </p>
                            
                            <div className="relative">
                                {/* Top fixed pointer */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="hsl(var(--primary))">
                                        <path d="M12 2L2 22h20L12 2z"/>
                                    </svg>
                                </div>
                                
                                <div className="relative w-64 h-64 sm:w-80 sm:h-80 transition-transform duration-200" style={{ transform: `rotate(${-heading}deg)` }}>
                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                        <circle cx="100" cy="100" r="98" fill="#1f1f1f" stroke="#444" strokeWidth="1" />
                                        {Array.from({ length: 120 }).map((_, i) => (
                                            <line
                                                key={i}
                                                x1="100" y1="2" x2="100"
                                                y2={i % 30 === 0 ? "14" : (i % 5 === 0 ? "10" : "6")}
                                                stroke="#888"
                                                strokeWidth={i % 30 === 0 ? "1.5" : (i % 5 === 0 ? "1" : "0.5")}
                                                transform={`rotate(${i * 3}, 100, 100)`}
                                            />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-400">
                                        <span className="absolute top-4">N</span>
                                        <span className="absolute bottom-4">S</span>
                                        <span className="absolute left-4">W</span>
                                        <span className="absolute right-4">E</span>
                                    </div>
                                    <div className="absolute w-full h-full" style={{ transform: `rotate(${qiblaDirection}deg)` }}>
                                         <div className="absolute top-1/2 left-1/2 w-0.5 h-12 bg-primary -translate-y-full origin-bottom" style={{ transform: "rotate(180deg)"}} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <p>{c.qiblaDirection}: <span className="font-bold">{qiblaDirection.toFixed(1)}°</span></p>
                                {distance !== null && <p>{c.distance}: <span className="font-bold">{Math.round(distance).toLocaleString()} km</span></p>}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
