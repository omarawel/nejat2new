
"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { addSubscriptionPlan, updateSubscriptionPlan, type SubscriptionPlan } from '@/lib/subscriptions';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';

const content = {
    de: {
        nameLabel: "Planname",
        namePlaceholder: "z.B. Nejat Pro",
        priceLabel: "Preis",
        pricePlaceholder: "z.B. 4,99€/Monat",
        priceIdLabel: "Stripe Preis-ID",
        priceIdPlaceholder: "price_123abc...",
        stripeLinkLabel: "Stripe Zahlungslink",
        stripeLinkPlaceholder: "https://buy.stripe.com/...",
        featuresLabel: "Features (eins pro Zeile)",
        featuresPlaceholder: "Exklusive KI-Funktionen\nWerbefrei\n...",
        aiRequestLimitLabel: "KI-Anfragen-Limit (monatlich)",
        activeLabel: "Plan ist aktiv",
        createButton: "Plan erstellen",
        updateButton: "Plan aktualisieren",
        submittingButton: "Wird gespeichert...",
        successCreate: "Plan erfolgreich erstellt",
        successUpdate: "Plan erfolgreich aktualisiert",
        error: "Fehler beim Speichern des Plans",
    },
    en: {
        nameLabel: "Plan Name",
        namePlaceholder: "e.g., Nejat Pro",
        priceLabel: "Price",
        pricePlaceholder: "e.g., €4.99/month",
        priceIdLabel: "Stripe Price ID",
        priceIdPlaceholder: "price_123abc...",
        stripeLinkLabel: "Stripe Payment Link",
        stripeLinkPlaceholder: "https://buy.stripe.com/...",
        featuresLabel: "Features (one per line)",
        featuresPlaceholder: "Exclusive AI features\nAd-free experience\n...",
        aiRequestLimitLabel: "AI Request Limit (monthly)",
        activeLabel: "Plan is active",
        createButton: "Create Plan",
        updateButton: "Update Plan",
        submittingButton: "Submitting...",
        successCreate: "Plan created successfully",
        successUpdate: "Plan updated successfully",
        error: "Error saving plan",
    }
}

const formSchema = z.object({
  id: z.string().min(1, "ID is required. Use lowercase, e.g., 'pro' or 'supporter'."),
  name: z.string().min(3, "Name must be at least 3 characters."),
  price: z.string().min(1, "Price is required."),
  priceId: z.string().min(1, "Stripe Price ID is required.").startsWith('price_', "Must be a valid Stripe Price ID"),
  stripeLink: z.string().url("Must be a valid Stripe payment link."),
  features: z.string().min(1, "At least one feature is required."),
  aiRequestLimit: z.coerce.number().int().min(0, "AI request limit must be a positive number."),
  active: z.boolean().default(true),
});

interface SubscriptionPlanFormProps {
    plan: SubscriptionPlan | null;
    onFinished: () => void;
}

export function SubscriptionPlanForm({ plan, onFinished }: SubscriptionPlanFormProps) {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: plan?.id || "",
            name: plan?.name || "",
            price: plan?.price || "",
            priceId: plan?.priceId || "",
            stripeLink: plan?.stripeLink || "",
            features: plan?.features.join('\n') || "",
            aiRequestLimit: plan?.aiRequestLimit ?? 0,
            active: plan?.active ?? true,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        const planData = {
            ...values,
            features: values.features.split('\n').filter(f => f.trim() !== ''),
        };

        try {
            if (plan) {
                // Update existing plan
                await updateSubscriptionPlan(plan.id, planData);
                toast({ title: c.successUpdate });
            } else {
                // Create new plan
                await addSubscriptionPlan(planData.id, planData);
                toast({ title: c.successCreate });
            }
            form.reset();
            onFinished();
        } catch (error) {
            console.error("Error saving subscription plan:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.error,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Plan ID</FormLabel>
                            <FormControl><Input placeholder="e.g. pro, supporter" {...field} disabled={!!plan} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.nameLabel}</FormLabel>
                            <FormControl><Input placeholder={c.namePlaceholder} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{c.priceLabel}</FormLabel>
                                <FormControl><Input placeholder={c.pricePlaceholder} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="aiRequestLimit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{c.aiRequestLimitLabel}</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                 </div>
                <FormField
                    control={form.control}
                    name="priceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.priceIdLabel}</FormLabel>
                            <FormControl><Input placeholder={c.priceIdPlaceholder} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="stripeLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.stripeLinkLabel}</FormLabel>
                            <FormControl><Input placeholder={c.stripeLinkPlaceholder} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.featuresLabel}</FormLabel>
                            <FormControl><Textarea rows={4} placeholder={c.featuresPlaceholder} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>{c.activeLabel}</FormLabel>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full !mt-6" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {c.submittingButton}</>
                    ) : (plan ? c.updateButton : c.createButton)}
                </Button>
            </form>
        </Form>
    );
}
