
"use client"

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft, MapPin, AlertTriangle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const content = {
    de: {
        pageTitle: "Qibla-Kompass",
        pageDescription: "Finde die Richtung nach Mekka für dein Gebet.",
        backToFeatures: "Zurück zu den Funktionen",
        requestingPermissions: "Berechtigungen werden angefordert...",
        calculating: "Berechne Qibla-Richtung...",
        ready: "Bereit. Richte dein Gerät aus.",
        permissionError: "Fehler bei der Berechtigung",
        permissionErrorDesc: "Zugriff auf Standort und/oder Gerätesensoren verweigert. Bitte aktiviere die Berechtigungen in deinen Browsereinstellungen.",
        unsupportedError: "Nicht unterstützt",
        unsupportedErrorDesc: "Dein Browser oder Gerät unterstützt die erforderlichen Sensoren nicht.",
        note: "Hinweis: Halte dein Gerät flach und fern von Metallgegenständen für eine bessere Genauigkeit."
    },
    en: {
        pageTitle: "Qibla Compass",
        pageDescription: "Find the direction to Mecca for your prayer.",
        backToFeatures: "Back to Features",
        requestingPermissions: "Requesting permissions...",
        calculating: "Calculating Qibla direction...",
        ready: "Ready. Align your device.",
        permissionError: "Permission Error",
        permissionErrorDesc: "Location and/or device sensor access denied. Please enable permissions in your browser settings.",
        unsupportedError: "Not Supported",
        unsupportedErrorDesc: "Your browser or device does not support the required sensors.",
        note: "Note: For best accuracy, hold your device flat and away from metal objects."
    }
}

// Kaaba location
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

export default function CompassPage() {
    const { language } = useLanguage();
    const c = content[language];

    const [qiblaDirection, setQiblaDirection] = useState(0);
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
        // webkitCompassHeading is for iOS
        const webkitHeading = (event as any).webkitCompassHeading;
        const alpha = event.alpha;
        
        let newHeading = 0;
        if (webkitHeading !== undefined && webkitHeading !== null) {
            newHeading = webkitHeading; 
        } else if (alpha !== null) {
            // For Android
            newHeading = 360 - alpha;
        }
        setHeading(newHeading);
    };

    const requestPermissions = useCallback(async () => {
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

            // Get location
            if (!("geolocation" in navigator)) {
                setError(c.unsupportedErrorDesc);
                setStatus(c.unsupportedError)
                return;
            }

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

            window.addEventListener('deviceorientation', handleOrientation);

        } catch (e) {
            setError(c.permissionErrorDesc);
            setStatus(c.permissionError)
            console.error(e);
        }
    }, [calculateQiblaDirection, c.calculating, c.permissionError, c.permissionErrorDesc, c.unsupportedError, c.unsupportedErrorDesc]);
    
    useEffect(() => {
        requestPermissions();
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rotation = 360 - heading;
    const qiblaRotation = rotation + qiblaDirection;

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
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <div className="relative w-64 h-64 mx-auto rounded-full bg-muted border-4 border-accent flex items-center justify-center">
                                    {/* Compass Background */}
                                    <div className="absolute w-full h-full text-muted-foreground font-bold">
                                        <div className="absolute top-1 left-1/2 -translate-x-1/2">N</div>
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">S</div>
                                        <div className="absolute left-1 top-1/2 -translate-y-1/2">W</div>
                                        <div className="absolute right-1 top-1/2 -translate-y-1/2">E</div>
                                    </div>

                                    {/* Main Compass Dial */}
                                    <div className="w-full h-full transition-transform duration-300" style={{ transform: `rotate(${rotation}deg)` }}>
                                         {/* Qibla Pointer */}
                                        <div className="absolute w-full h-full" style={{ transform: `rotate(${qiblaDirection}deg)` }}>
                                             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0
                                                border-l-[10px] border-l-transparent
                                                border-r-[10px] border-r-transparent
                                                border-b-[20px] border-b-primary">
                                                <span className="absolute -bottom-6 -ml-2 text-primary font-bold">🕋</span>
                                            </div>
                                        </div>

                                        {/* Device Direction Pointer */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0
                                            border-l-[8px] border-l-transparent
                                            border-r-[8px] border-r-transparent
                                            border-b-[16px] border-b-foreground">
                                        </div>
                                    </div>
                                </div>
                                
                                <Card className="bg-accent/50 p-3">
                                    <CardTitle className="text-xl flex items-center justify-center gap-2">
                                         {status === c.requestingPermissions || status === c.calculating ? <Loader2 className="h-5 w-5 animate-spin"/> : <Compass className="h-5 w-5" />}
                                        {status}
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
