
"use client"

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { getUserQuota, type UserQuota } from "@/lib/user-usage";
import { Sparkles, Loader2, ShieldCheck, Star } from "lucide-react";
import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const content = {
    de: {
        remaining: "übrig",
        upgrade: "Upgrade",
        tooltip: "KI-Anfragen diesen Monat"
    },
    en: {
        remaining: "remaining",
        upgrade: "Upgrade",
        tooltip: "AI requests this month"
    }
}

interface QuotaDisplayProps {
    className?: string;
    showUpgradeButton?: boolean;
}

export function QuotaDisplay({ className, showUpgradeButton = false }: QuotaDisplayProps) {
    const [user] = useAuthState(auth);
    const [quota, setQuota] = useState<UserQuota | null>(null);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();
    const c = content[language];

    useEffect(() => {
        const fetchQuota = async () => {
            setLoading(true);
            const userQuota = await getUserQuota(user?.uid || null);
            setQuota(userQuota);
            setLoading(false);
        };
        fetchQuota();
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
            </div>
        );
    }
    
    if (!quota) return null;

    if (user && quota.limit > 3) { // User has a paid plan
        return (
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                            <ShieldCheck className="h-4 w-4" />
                            <span>{quota.remaining} / {quota.limit}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{c.tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
           
        );
    }
    
    // Free tier user (logged in or out)
    return (
         <div className="flex items-center gap-2 text-sm">
            <span>
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <span className="flex items-center gap-1">
                                <Sparkles className="h-4 w-4" />
                                {quota.remaining} / {quota.limit} {c.remaining}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{c.tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </span>
             {showUpgradeButton && (
                <Button size="sm" asChild variant="secondary">
                    <Link href="/subscribe">
                        <Star className="mr-2 h-4 w-4" />
                        {c.upgrade}
                    </Link>
                </Button>
             )}
        </div>
    );
}
