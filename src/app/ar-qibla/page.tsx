
"use client"

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, CameraOff } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const content = {
    de: {
        pageTitle: "AR Qibla-Finder",
        pageDescription: "Richte deine Kamera aus, um die Richtung nach Mekka zu finden.",
        backToFeatures: "Zurück zu den Funktionen",
        cameraAccessRequired: "Kamerazugriff erforderlich",
        allowCameraAccess: "Bitte erlaube den Kamerazugriff, um diese Funktion zu nutzen.",
        cameraError: "Kamerazugriff verweigert",
        cameraErrorDesc: "Bitte aktiviere die Kameraberechtigungen in deinen Browsereinstellungen, um diese App zu nutzen.",
    },
    en: {
        pageTitle: "AR Qibla Finder",
        pageDescription: "Align your camera to find the direction to Mecca.",
        backToFeatures: "Back to Features",
        cameraAccessRequired: "Camera Access Required",
        allowCameraAccess: "Please allow camera access to use this feature.",
        cameraError: "Camera Access Denied",
        cameraErrorDesc: "Please enable camera permissions in your browser settings to use this app.",
    }
}

export default function ARQiblaPage() {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setHasCameraPermission(false);
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                setHasCameraPermission(true);

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: c.cameraError,
                    description: c.cameraErrorDesc,
                });
            }
        };

        getCameraPermission();
    }, [c.cameraError, c.cameraErrorDesc, toast]);

    return (
        <div className="relative flex-grow flex flex-col items-center justify-center bg-black text-white p-4">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
            <div className="absolute inset-0 bg-black/30"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col">
                <div className="absolute top-4 left-4">
                     <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {c.backToFeatures}
                        </Link>
                    </Button>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                    {hasCameraPermission === null && <Loader2 className="h-10 w-10 animate-spin" />}
                    
                    {hasCameraPermission === false && (
                         <Alert variant="destructive" className="bg-red-900/50 border-red-500 text-white max-w-sm">
                            <CameraOff className="h-4 w-4" />
                            <AlertTitle>{c.cameraAccessRequired}</AlertTitle>
                            <AlertDescription>{c.allowCameraAccess}</AlertDescription>
                        </Alert>
                    )}

                    {hasCameraPermission && (
                        <div>
                            {/* Qibla direction indicator will be implemented here */}
                            <p className="text-2xl font-bold">{c.pageTitle}</p>
                            <p className="text-lg">{c.pageDescription}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
