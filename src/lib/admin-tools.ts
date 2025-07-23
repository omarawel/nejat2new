
export interface AdminTool {
    key: string;
    name: string;
    description: string;
    href?: string;
}

export const allAdminTools: AdminTool[] = [
    {
        key: "user_management",
        name: "User Management",
        description: "Manage user roles and permissions.",
        href: "/admin/users"
    },
    {
        key: "ad_management",
        name: "Ad Management",
        description: "Create, edit, and manage advertisements.",
        href: "/admin/ads"
    },
    {
        key: "donation_projects",
        name: "Donation Projects",
        description: "Manage fundraising campaigns.",
        href: "/admin/donations"
    },
    {
        key: "quran_wonders",
        name: "Quran Wonders Content",
        description: "Content for the Quran Wonders page.",
        href: "/admin/content/quran-wonders"
    },
    {
        key: "prophetic_medicine",
        name: "Prophetic Medicine Content",
        description: "Content for the Prophetic Medicine page.",
        href: "/admin/content/prophetic-medicine"
    },
    {
        key: "daily_content",
        name: "Daily Content",
        description: "Generate Verse/Hadith of the Day.",
        href: "/admin/content/daily"
    },
    {
        key: "ad_analytics",
        name: "Ad Analytics",
        description: "View performance data for your ads.",
        href: "/admin/analytics/ads"
    },
    {
        key: "feedback_management",
        name: "Feedback Management",
        description: "Review and manage user feedback.",
        href: "/admin/feedback"
    },
    {
        key: "akhlaq_content",
        name: "Akhlaq Content",
        description: "Manage content for the Akhlaq page.",
        href: "/admin/content/akhlaq"
    },
    {
        key: "eating_etiquette_content",
        name: "Eating Etiquette Content",
        description: "Manage content for the Eating Etiquette page.",
        href: "/admin/content/eating-etiquette"
    },
    {
        key: "islamic_stories_content",
        name: "Islamic Stories Content",
        description: "Manage the collection of Islamic stories.",
        href: "/admin/content/stories"
    },
    {
        key: "fashion_page_content",
        name: "Fashion Page Content",
        description: "Manage text and images on the fashion page.",
        href: "/admin/content/fashion"
    },
    {
        key: "wudu_steps_content",
        name: "Wudu Steps Content",
        description: "Manage the step-by-step Wudu guide.",
        href: "/admin/content/wudu"
    },
    {
        key: "contact_feedback",
        name: "Contact & Feedback",
        description: "Manage feedback and contact information.",
        href: "/admin/contact"
    },
    {
        key: "tagebuch_content",
        name: "Tagebuch Content",
        description: "Manage diary entries or related content.",
        href: "/admin/content/diary"
    },
    {
        key: "khutbah_of_week",
        name: "Khutbah of the Week",
        description: "Manage the weekly sermon.",
        href: "/admin/content/khutbah"
    },
    {
        key: "footer_management",
        name: "Footer Management",
        description: "Edit footer links and social media.",
        href: "/admin/footer"
    },
    {
        key: "sharia_laws_content",
        name: "Sharia Laws Content",
        description: "Manage content for the Sharia Laws page.",
        href: "/admin/content/sharia"
    }
];
