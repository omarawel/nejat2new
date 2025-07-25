
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
import { addAd, updateAd, type Ad } from '@/lib/ads';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const adPlacements = [
    'homepage-top-banner',
    'homepage-bottom',
    'homepage-sidebar',
    'quran-page-bottom',
    'hadith-page-bottom',
    'feature-page-sidebar',
    'feature-page-top-banner',
    'feature-page-bottom',
    'profile-page-sidebar',
    'dashboard-page-banner',
];

const content = {
    de: {
        titleLabel: "Titel",
        titlePlaceholder: "z.B. Lerne die Grundlagen des Islam",
        descriptionLabel: "Beschreibung",
        descriptionPlaceholder: "Eine kurze Beschreibung für die Anzeige...",
        slotIdLabel: "Platzierung (Slot ID)",
        slotIdPlaceholder: "Wähle einen Platzierungsort",
        linkUrlLabel: "Link URL",
        linkUrlPlaceholder: "https://example.com/learn-islam",
        actionButtonLabel: "Aktions-Button Text",
        actionButtonPlaceholder: "z.B. 'Jetzt lernen'",
        imageSource: "Bildquelle",
        upload: "Hochladen",
        fromUrl: "Von URL",
        imageLabel: "Bilddatei",
        imageSubtext: "PNG, JPG, WEBP bis zu 2MB",
        imageUrlLabel: "Bild-URL",
        imageUrlPlaceholder: "https://example.com/image.png",
        createAd: "Anzeige erstellen",
        updateAd: "Anzeige aktualisieren",
        creatingAd: "Wird erstellt...",
        updatingAd: "Wird aktualisiert...",
        adCreated: "Anzeige erfolgreich erstellt",
        adUpdated: "Anzeige erfolgreich aktualisiert",
        errorCreating: "Fehler beim Erstellen der Anzeige",
        errorUpdating: "Fehler beim Aktualisieren der Anzeige",
        errorUploading: "Fehler beim Hochladen des Bildes",
    },
    en: {
        titleLabel: "Title",
        titlePlaceholder: "e.g. Learn the Basics of Islam",
        descriptionLabel: "Description",
        descriptionPlaceholder: "A short description for the ad...",
        slotIdLabel: "Placement (Slot ID)",
        slotIdPlaceholder: "Select a placement",
        linkUrlLabel: "Link URL",
        linkUrlPlaceholder: "https://example.com/learn-islam",
        actionButtonLabel: "Action Button Text",
        actionButtonPlaceholder: "e.g. 'Learn Now'",
        imageSource: "Image Source",
        upload: "Upload",
        fromUrl: "From URL",
        imageLabel: "Image File",
        imageSubtext: "PNG, JPG, WEBP up to 2MB",
        imageUrlLabel: "Image URL",
        imageUrlPlaceholder: "https://example.com/image.png",
        createAd: "Create Ad",
        updateAd: "Update Ad",
        creatingAd: "Creating...",
        updatingAd: "Updating...",
        adCreated: "Ad created successfully",
        adUpdated: "Ad updated successfully",
        errorCreating: "Error creating ad",
        errorUpdating: "Error updating ad",
        errorUploading: "Error uploading image",
    }
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  slotId: z.string().min(1, "Placement is required."),
  linkUrl: z.string().url({ message: "Please enter a valid URL." }),
  actionButtonText: z.string().min(1, "Button text is required."),
  imageSource: z.enum(['upload', 'url']),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
}).refine(data => {
    if (data.imageSource === 'upload') {
        // For updates, the file is optional if a URL already exists
        return !!data.imageFile || !!data.imageUrl;
    }
    if (data.imageSource === 'url') {
        return !!data.imageUrl && z.string().url().safeParse(data.imageUrl).success;
    }
    return false;
}, {
    message: "Please provide a valid image file or URL.",
    path: ['imageFile']
});

interface AddAdFormProps {
    ad?: Ad | null;
    onFinished: () => void;
}


export function AddAdForm({ ad, onFinished }: AddAdFormProps) {
    const { language } = useLanguage();
    const c = content[language];
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ad?.title || "",
            description: ad?.description || "",
            slotId: ad?.slotId || "",
            linkUrl: ad?.linkUrl || "",
            actionButtonText: ad?.actionButtonText || "",
            imageSource: ad?.imageUrl ? 'url' : 'upload',
            imageUrl: ad?.imageUrl || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       setIsSubmitting(true);
       let finalImageUrl = ad?.imageUrl || "";

       try {
           if (values.imageSource === 'upload' && values.imageFile) {
               const imageFile = values.imageFile;
               const storageRef = ref(storage, `ads/${Date.now()}-${imageFile.name}`);
               const uploadResult = await uploadBytes(storageRef, imageFile);
               finalImageUrl = await getDownloadURL(uploadResult.ref);
           } else if (values.imageSource === 'url' && values.imageUrl) {
               finalImageUrl = values.imageUrl;
           }

           if (!finalImageUrl) {
               throw new Error("Image URL could not be determined.");
           }
           
           const adData = {
               slotId: values.slotId,
               title: values.title,
               description: values.description || '',
               linkUrl: values.linkUrl,
               imageUrl: finalImageUrl,
               actionButtonText: values.actionButtonText,
           };

           if (ad) {
               await updateAd(ad.id, adData);
               toast({ title: c.adUpdated });
           } else {
               await addAd(adData);
               toast({ title: c.adCreated });
           }

           form.reset();
           onFinished();

       } catch (error) {
           console.error("Error saving ad:", error);
           toast({
               variant: 'destructive',
               title: 'Error',
               description: ad ? c.errorUpdating : c.errorCreating,
           });
       } finally {
           setIsSubmitting(false);
       }
   };

    const imageSource = form.watch('imageSource');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="slotId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.slotIdLabel}</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={c.slotIdPlaceholder} />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {adPlacements.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.titleLabel}</FormLabel>
                            <FormControl>
                                <Input placeholder={c.titlePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.descriptionLabel}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={c.descriptionPlaceholder} {...field} />
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
                    name="actionButtonText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.actionButtonLabel}</FormLabel>
                            <FormControl>
                                <Input placeholder={c.actionButtonPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="imageSource"
                    render={({ field }) => (
                         <FormItem className="pt-2">
                            <FormLabel>{c.imageSource}</FormLabel>
                            <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="upload">{c.upload}</TabsTrigger>
                                    <TabsTrigger value="url">{c.fromUrl}</TabsTrigger>
                                </TabsList>
                            </Tabs>
                         </FormItem>
                    )}
                />

                {imageSource === 'upload' ? (
                     <FormField
                        control={form.control}
                        name="imageFile"
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
                ) : (
                     <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{c.imageUrlLabel}</FormLabel>
                                <FormControl>
                                    <Input placeholder={c.imageUrlPlaceholder} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit" className="w-full !mt-6" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {ad ? c.updatingAd : c.creatingAd}
                        </>
                    ) : (ad ? c.updateAd : c.createAd)}
                </Button>
            </form>
        </Form>
    );
}
