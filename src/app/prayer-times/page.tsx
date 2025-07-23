import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sunrise, Sun, Sunset, Moon, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const prayerTimes = [
  { name: "Fajr", time: "04:30 AM", icon: Sunrise },
  { name: "Dhuhr", time: "01:15 PM", icon: Sun },
  { name: "Asr", time: "05:00 PM", icon: Sun },
  { name: "Maghrib", time: "07:45 PM", icon: Sunset },
  { name: "Isha", time: "09:15 PM", icon: Moon },
];

export default function PrayerTimesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Prayer Times</h1>
        <p className="text-muted-foreground mt-2">Daily prayer schedule. Timings are for demonstration.</p>
      </header>
      
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertTitle>Location Needed</AlertTitle>
        <AlertDescription>
          For accurate prayer times, please enable location services in your browser.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Based on placeholder location.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {prayerTimes.map((prayer, index) => (
              <li key={index} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <prayer.icon className="h-6 w-6 text-primary" />
                  <span className="text-lg font-medium">{prayer.name}</span>
                </div>
                <span className="text-lg font-mono text-muted-foreground">{prayer.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
