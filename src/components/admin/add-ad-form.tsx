
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';

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
    'prophets-page-banner',
    'sahaba-page-banner',
    'dua-page-banner',
    'stories-page-inline',
    'prayer-times-bottom',
    'zakat-calculator-bottom',
    'tasbih-counter-bottom',
    'hisnul-muslim-top',
    'prophetic-medicine-inline',
    'reverts-corner-banner',
];

const content = {
    de: {
        titleLabel: "Titel",
        titlePlaceholder: "z.B. Lerne die Grundlagen des Islam",
        descriptionLabel: "Beschreibung",
        descriptionPlaceholder: "Eine kurze Beschreibung für die Anzeige...",
        slotIdsLabel: "Platzierungen (Slot IDs)",
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
        videoUrlLabel: "Video-URL",
        videoUrlPlaceholder: "https://example.com/video.mp4",
        createAd: "Anzeige erstellen",
        updateAd: "Anzeige aktualisieren",
        creatingAd: "Wird erstellt...",
        updatingAd: "Wird aktualisiert...",
        adCreated: "Anzeige erfolgreich erstellt",
        adUpdated: "Anzeige erfolgreich aktualisiert",
        errorCreating: "Fehler beim Erstellen der Anzeige",
        errorUpdating: "Fehler beim Aktualisieren der Anzeige",
        errorUploading: "Fehler beim Hochladen des Bildes",
        adType: "Anzeigentyp",
        image: "Bild",
        video: "Video",
    },
    en: {
        titleLabel: "Title",
        titlePlaceholder: "e.g. Learn the Basics of Islam",
        descriptionLabel: "Description",
        descriptionPlaceholder: "A short description for the ad...",
        slotIdsLabel: "Placements (Slot IDs)",
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
        videoUrlLabel: "Video URL",
        videoUrlPlaceholder: "https://example.com/video.mp4",
        createAd: "Create Ad",
        updateAd: "Update Ad",
        creatingAd: "Creating...",
        updatingAd: "Updating...",
        adCreated: "Ad created successfully",
        adUpdated: "Ad updated successfully",
        errorCreating: "Error creating ad",
        errorUpdating: "Error updating ad",
        errorUploading: "Error uploading image",
        adType: "Ad Type",
        image: "Image",
        video: "Video",
    }
}

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  slotIds: z.array(z.string()).min(1, "At least one placement is required."),
  linkUrl: z.string().url({ message: "Please enter a valid URL." }),
  actionButtonText: z.string().min(1, "Button text is required."),
  type: z.enum(['image', 'video']),
  imageSource: z.enum(['upload', 'url']),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
}).refine(data => {
    if (data.type === 'image') {
        if (data.imageSource === 'upload') {
            // For update, imageUrl might already exist
            return !!data.imageFile || !!data.imageUrl;
        }
        if (data.imageSource === 'url') {
            return !!data.imageUrl && z.string().url().safeParse(data.imageUrl).success;
        }
    }
    if (data.type === 'video') {
         return !!data.videoUrl && z.string().url().safeParse(data.videoUrl).success;
    }
    return true; // Let the backend handle more complex validation if needed
}, {
    message: "Please provide a valid file or URL based on the ad type.",
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
            slotIds: ad?.slotIds || [],
            linkUrl: ad?.linkUrl || "",
            actionButtonText: ad?.actionButtonText || "",
            type: ad?.type || 'image',
            imageSource: ad?.imageUrl ? 'url' : 'upload',
            imageUrl: ad?.imageUrl || "",
            videoUrl: ad?.videoUrl || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       setIsSubmitting(true);
       let finalImageUrl = values.type === 'image' ? (ad?.imageUrl || "") : undefined;
       let finalVideoUrl = values.type === 'video' ? (ad?.videoUrl || values.videoUrl) : undefined;

       try {
           if (values.type === 'image') {
               if (values.imageSource === 'upload' && values.imageFile) {
                   const imageFile = values.imageFile;
                   const storageRef = ref(storage, `ads/${Date.now()}-${imageFile.name}`);
                   const uploadResult = await uploadBytes(storageRef, imageFile);
                   finalImageUrl = await getDownloadURL(uploadResult.ref);
               } else if (values.imageSource === 'url' && values.imageUrl) {
                   finalImageUrl = values.imageUrl;
               }
           } else { // video
                if (values.videoUrl) {
                    finalVideoUrl = values.videoUrl;
                }
           }
           
           const adData = {
               slotIds: values.slotIds,
               title: values.title || '',
               description: values.description || '',
               linkUrl: values.linkUrl,
               actionButtonText: values.actionButtonText,
               type: values.type,
               imageUrl: finalImageUrl,
               videoUrl: finalVideoUrl,
           };

           if (ad) {
               await updateAd(ad.id, adData);
               toast({ title: c.adUpdated });
           } else {
               await addAd(adData as Omit<Ad, 'id' | 'createdAt'>);
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

    const adType = form.watch('type');
    const imageSource = form.watch('imageSource');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                    control={form.control}
                    name="slotIds"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                               <FormLabel className="text-base">{c.slotIdsLabel}</FormLabel>
                            </div>
                            <div className="max-h-60 overflow-y-auto pr-4 grid grid-cols-2 gap-2">
                                {adPlacements.map((item) => (
                                    <FormField
                                    key={item}
                                    control={form.control}
                                    name="slotIds"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...field.value, item])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item
                                                        )
                                                    )
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                            {item}
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                 <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                         <FormItem className="space-y-3">
                            <FormLabel>{c.adType}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                                >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="image" />
                                    </FormControl>
                                    <FormLabel className="font-normal">{c.image}</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="video" />
                                    </FormControl>
                                    <FormLabel className="font-normal">{c.video}</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{c.titleLabel} (optional)</FormLabel>
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
                
                {adType === 'image' && (
                    <>
                    <FormField
                        control={form.control}
                        name="imageSource"
                        render={({ field }) => (
                            <FormItem className="pt-2">
                                <FormLabel>{c.imageSource}</FormLabel>
                                 <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4 pt-2"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="upload" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{c.upload}</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="url" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{c.fromUrl}</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
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
                    </>
                )}
                {adType === 'video' && (
                     <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{c.videoUrlLabel}</FormLabel>
                                <FormControl>
                                    <Input placeholder={c.videoUrlPlaceholder} {...field} />
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
