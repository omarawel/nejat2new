
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
import { Loader2, UploadCloud } from 'lucide-react';
import { addAd } from '@/lib/ads';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const content = {
    de: {
        slotIdLabel: "Slot ID",
        slotIdPlaceholder: "z.B. homepage-banner",
        linkUrlLabel: "Link URL",
        linkUrlPlaceholder: "https://example.com",
        imageLabel: "Bilddatei",
        imageSubtext: "PNG, JPG, WEBP bis zu 2MB",
        createAd: "Anzeige erstellen",
        creatingAd: "Wird erstellt...",
        adCreated: "Anzeige erfolgreich erstellt",
        errorCreating: "Fehler beim Erstellen der Anzeige",
        errorUploading: "Fehler beim Hochladen des Bildes",
    },
    en: {
        slotIdLabel: "Slot ID",
        slotIdPlaceholder: "e.g. homepage-banner",
        linkUrlLabel: "Link URL",
        linkUrlPlaceholder: "https://example.com",
        imageLabel: "Image File",
        imageSubtext: "PNG, JPG, WEBP up to 2MB",
        createAd: "Create Ad",
        creatingAd: "Creating...",
        adCreated: "Ad created successfully",
        errorCreating: "Error creating ad",
        errorUploading: "Error uploading image",
    }
}

const formSchema = z.object({
  slotId: z.string().min(3, { message: "Slot ID must be at least 3 characters." }).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed."),
  linkUrl: z.string().url({ message: "Please enter a valid URL." }),
  image: z.instanceof(File).refine(file => file.size < 2 * 1024 * 1024, "File size must be less than 2MB").refine(file => ['image/png', 'image/jpeg', 'image/webp'].includes(file.type), "Only PNG, JPG, and WEBP formats are allowed."),
});


export function AddAdForm({ onFinished }: { onFinished: () => void }) {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slotId: "",
            linkUrl: "",
            image: undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            // 1. Upload image to Firebase Storage
            const imageFile = values.image;
            const storageRef = ref(storage, `ads/${Date.now()}-${imageFile.name}`);
            const uploadResult = await uploadBytes(storageRef, imageFile);
            const imageUrl = await getDownloadURL(uploadResult.ref);

            // 2. Add ad data to Firestore
            await addAd({
                slotId: values.slotId,
                linkUrl: values.linkUrl,
                imageUrl: imageUrl,
            });

            toast({ title: c.adCreated });
            form.reset();
            onFinished();

        } catch (error) {
            console.error("Error creating ad:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: c.errorCreating,
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
                    name="slotId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.slotIdLabel}</FormLabel>
                            <FormControl>
                                <Input placeholder={c.slotIdPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="linkUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.linkUrlLabel}</FormLabel>
                            <FormControl>
                                <Input placeholder={c.linkUrlPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel>{c.imageLabel}</FormLabel>
                            <FormControl>
                                <Input 
                                    type="file" 
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) onChange(file);
                                    }}
                                    className="pt-2"
                                    {...rest}
                                 />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {c.creatingAd}
                        </>
                    ) : c.createAd}
                </Button>
            </form>
        </Form>
    );
}

