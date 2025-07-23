
// In a real application, you would fetch this from a secure source,
// like a 'roles' collection in Firestore, and implement proper security rules.
// For this example, we'll use a hardcoded list of admin UIDs.
const ADMIN_UIDS = [
    'DEINE_BENUTZER_ID_HIER', // Ersetzen Sie dies mit Ihrer tatsächlichen Firebase User ID
    'RXf4Jk9dIqgGIqS0YXIYkSrwJb83', // Example UID
    'another-admin-uid-here',
];

export const isAdmin = async (uid: string | null): Promise<boolean> => {
    if (!uid) {
        return false;
    }
    return ADMIN_UIDS.includes(uid);
}
