
"use client"

import { useLanguage } from "./language-provider";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Star, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { UserQuota } from "@/lib/user-usage";

const content = {
    de: {
        noQuota: "Keine Anfragen mehr",
        noQuotaDesc: "Du hast dein monatliches Limit von {limit} KI-Anfragen erreicht.",
        upgradeButton: "Jetzt upgraden",
        loginRequired: "Anmeldung erforderlich",
        loginDesc: "Bitte melde dich an, um diese Funktion zu nutzen.",
        loginButton: "Anmelden"
    },
    en: {
        noQuota: "No Requests Left",
        noQuotaDesc: "You have reached your monthly limit of {limit} AI requests.",
        upgradeButton: "Upgrade Now",
        loginRequired: "Login Required",
        loginDesc: "Please log in to use this feature.",
        loginButton: "Login"
    }
};

interface UpgradeInlineAlertProps {
    quota: UserQuota | null;
    isLoggedIn: boolean;
}

export function UpgradeInlineAlert({ quota, isLoggedIn }: UpgradeInlineAlertProps) {
    const { language } = useLanguage();
    const c = content[language];

    if (!isLoggedIn) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{c.loginRequired}</AlertTitle>
                <AlertDescription className="flex flex-col items-start gap-2">
                   {c.loginDesc}
                    <Button asChild size="sm">
                        <Link href="/login">{c.loginButton}</Link>
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (quota && quota.remaining <= 0) {
        return (
            <Alert>
                <Star className="h-4 w-4" />
                <AlertTitle>{c.noQuota}</AlertTitle>
                <AlertDescription className="flex flex-col items-start gap-2">
                   {c.noQuotaDesc.replace('{limit}', quota.limit.toString())}
                   <Button asChild size="sm">
                       <Link href="/subscribe">{c.upgradeButton}</Link>
                   </Button>
                </AlertDescription>
            </Alert>
        )
    }

    return null;
}
