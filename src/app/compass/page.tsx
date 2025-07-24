
"use client"

import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft, MapPin, AlertTriangle, Loader2, CheckCircle, Navigation } from 'lucide-react';
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
        calculating: "Berechne Qibla-Richtung...",
        ready: "Bereit. Richte dein Gerät aus.",
        permissionError: "Fehler bei der Berechtigung",
        permissionErrorDesc: "Zugriff auf Gerätesensoren verweigert. Bitte aktiviere die Berechtigungen in deinen Browsereinstellungen und lade die Seite neu.",
        unsupportedError: "Nicht unterstützt",
        unsupportedErrorDesc: "Dein Browser oder Gerät unterstützt die erforderlichen Sensoren nicht.",
        note: "Hinweis: Halte dein Gerät flach und fern von Metallgegenständen für eine bessere Genauigkeit.",
        qiblaDirection: "Qibla-Richtung",
        yourDirection: "Deine Richtung",
        qiblaFound: "Qibla gefunden!",
    },
    en: {
        pageTitle: "Qibla Compass",
        pageDescription: "Align your device to find the direction to Mecca.",
        backToFeatures: "Back to Features",
        requestingPermissions: "Requesting permissions...",
        calculating: "Calculating Qibla direction...",
        ready: "Ready. Align your device.",
        permissionError: "Permission Error",
        permissionErrorDesc: "Device sensor access denied. Please enable permissions in your browser settings and reload the page.",
        unsupportedError: "Not Supported",
        unsupportedErrorDesc: "Your browser or device does not support the required sensors.",
        note: "Note: For best accuracy, hold your device flat and away from metal objects.",
        qiblaDirection: "Qibla Direction",
        yourDirection: "Your Direction",
        qiblaFound: "Qibla Found!",
    }
}

// Kaaba location
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians: number) {
    return radians * 180 / Math.PI;
}

export default function CompassPage() {
    const { language } = useLanguage();
    const c = content[language];
    
    const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
    const [heading, setHeading] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>(c.requestingPermissions);

    const calculateQiblaDirection = useCallback((lat: number, lng: number) => {
        const userLatRad = toRadians(lat);
        const userLngRad = toRadians(lng);
        const kaabaLatRad = toRadians(KAABA_LAT);
        const kaabaLngRad = toRadians(KAABA_LNG);

        const deltaLng = kaabaLngRad - userLngRad;
        
        const y = Math.sin(deltaLng) * Math.cos(kaabaLatRad);
        const x = Math.cos(userLatRad) * Math.sin(kaabaLatRad) - Math.sin(userLatRad) * Math.cos(kaabaLatRad) * Math.cos(deltaLng);
        
        let bearing = toDegrees(Math.atan2(y, x));
        bearing = (bearing + 360) % 360;

        setQiblaDirection(bearing);
        setStatus(c.ready);
    }, [c.ready]);

    const handleOrientation = (event: DeviceOrientationEvent) => {
        const webkitHeading = (event as any).webkitCompassHeading;
        let newHeading = 0;
        
        if (webkitHeading !== undefined && webkitHeading !== null) { // iOS
            newHeading = webkitHeading; 
        } else if (event.alpha !== null) { // Android
            newHeading = 360 - event.alpha;
        }
        setHeading(newHeading);
    };

    const requestPermissions = useCallback(async () => {
        setStatus(c.requestingPermissions);
        setError(null);
        try {
            if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission !== 'granted') {
                    setError(c.permissionErrorDesc);
                    setStatus(c.permissionError);
                    return;
                }
            }

            if (!("geolocation" in navigator)) {
                setError(c.unsupportedErrorDesc);
                setStatus(c.unsupportedError)
                return;
            }

            window.addEventListener('deviceorientation', handleOrientation);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setStatus(c.calculating);
                    calculateQiblaDirection(position.coords.latitude, position.coords.longitude);
                },
                (err) => {
                    setError(c.permissionErrorDesc);
                    setStatus(c.permissionError)
                }
            );

        } catch (e) {
            setError(c.permissionErrorDesc);
            setStatus(c.permissionError)
            console.error(e);
        }
    }, [calculateQiblaDirection, c]);
    
    useEffect(() => {
        requestPermissions();
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isQiblaAligned = qiblaDirection !== null && Math.abs(heading - qiblaDirection) < 2.5;

    return (
        <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
            <div className="w-full max-w-sm text-center">
                 <Button asChild variant="ghost" className="mb-8">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToFeatures}
                    </Link>
                </Button>
                <Card className="overflow-hidden">
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                        <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 relative h-[450px] bg-card flex flex-col justify-center items-center">
                        {error ? (
                            <Alert variant="destructive" className="text-foreground">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>{status}</AlertTitle>
                                <AlertDescription>
                                    {error}
                                    <Button onClick={requestPermissions} className="w-full mt-4">Try Again</Button>
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Navigation className="w-8 h-8 text-primary" style={{transform: 'rotate(180deg)'}}/>
                                </div>
                                <div className="relative w-64 h-64 mx-auto rounded-full flex items-center justify-center" style={{
                                    border: '4px solid hsl(var(--border))',
                                    background: 'hsl(var(--muted))',
                                    transform: `rotate(${-heading}deg)`,
                                    transition: 'transform 0.2s ease-out'
                                }}>
                                    <div className="absolute w-full h-full font-bold text-lg text-muted-foreground">
                                        <div className="absolute top-1 left-1/2 -translate-x-1/2">N</div>
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">S</div>
                                        <div className="absolute left-1 top-1/2 -translate-y-1/2">W</div>
                                        <div className="absolute right-1 top-1/2 -translate-y-1/2">E</div>
                                    </div>
                                    
                                    {qiblaDirection !== null && (
                                        <div className="absolute w-full h-full" style={{ transform: `rotate(${qiblaDirection}deg)` }}>
                                            <div className={cn(
                                                "absolute -top-5 left-1/2 -translate-x-1/2 transition-colors duration-500",
                                                isQiblaAligned ? "text-green-500" : "text-primary"
                                            )}>
                                                <span className="text-4xl">🕋</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center mt-6 w-full">
                                    <div className="p-2 rounded-lg bg-muted">
                                        <p className="text-sm text-muted-foreground">{c.yourDirection}</p>
                                        <p className="text-xl font-bold">{Math.round(heading)}°</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-muted">
                                        <p className="text-sm text-muted-foreground">{c.qiblaDirection}</p>
                                        <p className="text-xl font-bold">{qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : '...'}</p>
                                    </div>
                                </div>
                                
                                <div className={cn(
                                    "p-3 mt-4 rounded-lg transition-colors w-full",
                                    isQiblaAligned ? "bg-green-500/80 text-white" : "bg-accent text-accent-foreground"
                                    )}>
                                    <p className="text-xl font-semibold flex items-center justify-center gap-2">
                                        {status === c.requestingPermissions || status === c.calculating ? <Loader2 className="h-5 w-5 animate-spin"/> : (
                                            isQiblaAligned ? <CheckCircle className="h-5 w-5" /> : <Compass className="h-5 w-5" />
                                        )}
                                        {isQiblaAligned ? c.qiblaFound : status}
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
