
"use client"

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LocateFixed, AlertTriangle, Loader2, CheckCircle, Navigation, Camera } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const content = {
    de: {
        pageTitle: "Qibla Kompass",
        pageDescription: "Richte dein Gerät aus, um die Richtung nach Mekka zu finden.",
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
        arQibla: "AR Qibla"
    },
    en: {
        pageTitle: "Qibla Compass",
        pageDescription: "Align your device to find the direction to Mecca.",
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
        arQibla: "AR Qibla"
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

interface CustomDeviceOrientationEvent extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
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
        const userLatRad = toRadians(lat);
        const kaabaLatRad = toRadians(KAABA_LAT);
        const deltaLng = toRadians(KAABA_LNG - lng);
        
        const y = Math.sin(deltaLng) * Math.cos(kaabaLatRad);
        const x = Math.cos(userLatRad) * Math.sin(kaabaLatRad) - Math.sin(userLatRad) * Math.cos(kaabaLatRad) * Math.cos(deltaLng);
        let bearing = toDegrees(Math.atan2(y, x));
        bearing = (bearing + 360) % 360;
        setQiblaDirection(bearing);
        
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

    const handleOrientation = (event: CustomDeviceOrientationEvent) => {
        let alpha = event.alpha;
        if (typeof event.webkitCompassHeading !== 'undefined') {
            alpha = event.webkitCompassHeading;
        }
        if (alpha !== null) {
            setHeading(alpha);
        }
    };

    const requestPermissions = useCallback(async () => {
        setStatus(c.requestingPermissions);
        setError(null);

        if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<PermissionState> }).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<PermissionState> }).requestPermission();
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
        
        window.addEventListener('deviceorientation', handleOrientation as (e: Event) => void);

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
            window.removeEventListener('deviceorientation', handleOrientation as (e: Event) => void);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deviation = useMemo(() => {
        if (qiblaDirection === null) return 360;
        const diff = Math.abs(qiblaDirection - heading);
        return Math.min(diff, 360 - diff);
    }, [qiblaDirection, heading]);


    return (
        <div className="flex-grow flex flex-col items-center justify-center bg-background text-foreground p-4">
            <div className="w-full max-w-sm text-center">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Button asChild variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {c.backToFeatures}
                        </Link>
                    </Button>
                </div>
                
                 <div className="absolute top-4 right-4">
                    <Button asChild variant="outline" className="bg-background/50 hover:bg-accent hover:text-accent-foreground">
                        <Link href="/ar-qibla">
                            <Camera className="mr-2 h-4 w-4" />
                            {c.arQibla}
                        </Link>
                    </Button>
                </div>

                <header className="my-8">
                    <h1 className="text-3xl font-bold">{c.pageTitle}</h1>
                    <p className="text-muted-foreground mt-1">{c.pageDescription}</p>
                </header>

                <main className="flex-grow flex flex-col items-center justify-center gap-8">
                    {error ? (
                         <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
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
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-primary">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0L22 22H2L12 0z" transform="rotate(180 12 12)"/>
                                    </svg>
                                </div>
                                
                                <div className="relative w-64 h-64 sm:w-80 sm:h-80 transition-transform duration-200" style={{ transform: `rotate(${-heading}deg)` }}>
                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                        <circle cx="100" cy="100" r="98" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
                                        {Array.from({ length: 120 }).map((_, i) => (
                                            <line
                                                key={i}
                                                x1="100" y1="2" x2="100"
                                                y2={i % 30 === 0 ? "14" : (i % 5 === 0 ? "10" : "6")}
                                                stroke="hsl(var(--muted-foreground))"
                                                strokeWidth={i % 30 === 0 ? "1.5" : (i % 5 === 0 ? "1" : "0.5")}
                                                transform={`rotate(${i * 3}, 100, 100)`}
                                            />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-muted-foreground">
                                        <span className="absolute top-4">N</span>
                                        <span className="absolute bottom-4">S</span>
                                        <span className="absolute left-4">W</span>
                                        <span className="absolute right-4">E</span>
                                    </div>
                                    <div className="absolute w-full h-full" style={{ transform: `rotate(${qiblaDirection}deg)` }}>
                                        <div
                                            className="absolute top-1/2 left-1/2 -translate-y-[calc(50%_+_1rem)] -translate-x-1/2 text-primary"
                                            title="Kaaba"
                                        >
                                           <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="32"
                                                height="32"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M4 10.13V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-10.87M2 10.13l10 7.88L22 10.13M18.5 3.19 5.5 12.81"/>
                                                <path d="M12 22V18"/>
                                            </svg>
                                        </div>
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
