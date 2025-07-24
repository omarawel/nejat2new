
"use client"

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft, MapPin, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const content = {
    de: {
        pageTitle: "Qibla-Kompass",
        pageDescription: "Finde die Richtung nach Mekka für dein Gebet.",
        backToFeatures: "Zurück zu den Funktionen",
        requestingPermissions: "Berechtigungen anfordern...",
        calculating: "Berechne Qibla-Richtung...",
        ready: "Bereit. Richte dein Gerät aus.",
        permissionError: "Fehler bei der Berechtigung",
        permissionErrorDesc: "Zugriff auf Standort und/oder Gerätesensoren verweigert. Bitte aktiviere die Berechtigungen in deinen Browsereinstellungen und lade die Seite neu.",
        unsupportedError: "Nicht unterstützt",
        unsupportedErrorDesc: "Dein Browser oder Gerät unterstützt die erforderlichen Sensoren nicht.",
        note: "Hinweis: Halte dein Gerät flach und fern von Metallgegenständen für eine bessere Genauigkeit.",
        qiblaDirection: "Qibla-Richtung",
        yourDirection: "Deine Richtung",
        qiblaFound: "Qibla gefunden!"
    },
    en: {
        pageTitle: "Qibla Compass",
        pageDescription: "Find the direction to Mecca for your prayer.",
        backToFeatures: "Back to Features",
        requestingPermissions: "Requesting permissions...",
        calculating: "Calculating Qibla direction...",
        ready: "Ready. Align your device.",
        permissionError: "Permission Error",
        permissionErrorDesc: "Location and/or device sensor access denied. Please enable permissions in your browser settings and reload the page.",
        unsupportedError: "Not Supported",
        unsupportedErrorDesc: "Your browser or device does not support the required sensors.",
        note: "Note: For best accuracy, hold your device flat and away from metal objects.",
        qiblaDirection: "Qibla Direction",
        yourDirection: "Your Direction",
        qiblaFound: "Qibla Found!"
    }
}

// Kaaba location
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export default function CompassPage() {
    const { language } = useLanguage();
    const c = content[language];

    const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
    const [heading, setHeading] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>(c.requestingPermissions);

    const calculateQiblaDirection = useCallback((lat: number, lng: number) => {
        const phiK = KAABA_LAT * Math.PI / 180.0;
        const lambdaK = KAABA_LNG * Math.PI / 180.0;
        const phi = lat * Math.PI / 180.0;
        const lambda = lng * Math.PI / 180.0;
        const psi = 180.0 / Math.PI * Math.atan2(Math.sin(lambdaK - lambda),
            Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda));
        setQiblaDirection(psi);
        setStatus(c.ready);
    }, [c.ready]);

    const handleOrientation = (event: DeviceOrientationEvent) => {
        const webkitHeading = (event as any).webkitCompassHeading;
        const alpha = event.alpha;
        
        let newHeading = 0;
        if (webkitHeading !== undefined && webkitHeading !== null) { // iOS
            newHeading = webkitHeading; 
        } else if (alpha !== null) { // Android
            newHeading = 360 - alpha;
        }
        setHeading(newHeading);
    };

    const requestPermissions = useCallback(async () => {
        setStatus(c.requestingPermissions);
        setError(null);
        try {
            // Request device orientation permission for iOS 13+
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

    const rotation = 360 - heading;
    const qiblaRotation = qiblaDirection ? rotation + qiblaDirection : 0;
    
    // Check if the user is facing the Qibla direction (with a tolerance of 2 degrees)
    const isQiblaAligned = qiblaDirection !== null && Math.abs(heading - qiblaDirection) < 2;

    return (
        <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
            <div className="w-full max-w-sm text-center">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {c.backToFeatures}
                    </Link>
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">{c.pageTitle}</CardTitle>
                        <CardDescription className="text-lg">{c.pageDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error ? (
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>{status}</AlertTitle>
                                <AlertDescription>
                                    {error}
                                    <Button onClick={requestPermissions} className="w-full mt-4">Try Again</Button>
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <div className="relative w-64 h-64 mx-auto rounded-full bg-muted border-4 border-accent flex items-center justify-center">
                                    <div className="absolute w-full h-full text-muted-foreground font-bold">
                                        <div className="absolute top-1 left-1/2 -translate-x-1/2">N</div>
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">S</div>
                                        <div className="absolute left-1 top-1/2 -translate-y-1/2">W</div>
                                        <div className="absolute right-1 top-1/2 -translate-y-1/2">E</div>
                                    </div>
                                    
                                    <div className="w-full h-full transition-transform duration-200" style={{ transform: `rotate(${rotation}deg)` }}>
                                        {qiblaDirection !== null && (
                                            <div className="absolute w-full h-full" style={{ transform: `rotate(${qiblaDirection}deg)` }}>
                                                <div className={cn(
                                                    "absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 transition-colors",
                                                    "border-l-[10px] border-l-transparent",
                                                    "border-r-[10px] border-r-transparent",
                                                    "border-b-[20px]",
                                                    isQiblaAligned ? "border-b-green-500" : "border-b-primary"
                                                )}>
                                                    <span className="absolute -bottom-6 -ml-2 text-primary font-bold">🕋</span>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0
                                            border-l-[8px] border-l-transparent
                                            border-r-[8px] border-r-transparent
                                            border-b-[16px] border-b-foreground">
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <Card className="p-2">
                                        <CardDescription>{c.yourDirection}</CardDescription>
                                        <CardTitle>{Math.round(heading)}°</CardTitle>
                                    </Card>
                                     <Card className="p-2">
                                        <CardDescription>{c.qiblaDirection}</CardDescription>
                                        <CardTitle>{qiblaDirection !== null ? `${Math.round(qiblaDirection)}°` : '...'}</CardTitle>
                                    </Card>
                                </div>
                                
                                <Card className={cn(
                                    "p-3 transition-colors",
                                    isQiblaAligned ? "bg-green-500/20 border-green-500/50" : "bg-accent/50"
                                    )}>
                                    <CardTitle className="text-xl flex items-center justify-center gap-2">
                                         {status === c.requestingPermissions || status === c.calculating ? <Loader2 className="h-5 w-5 animate-spin"/> : (
                                             isQiblaAligned ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Compass className="h-5 w-5" />
                                         )}
                                        {isQiblaAligned ? c.qiblaFound : status}
                                    </CardTitle>
                                </Card>
                                <p className="text-xs text-muted-foreground px-4">{c.note}</p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
