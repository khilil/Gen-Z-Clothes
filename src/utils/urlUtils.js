export const ensureAbsoluteUrl = (url) => {
    if (!url) return "";

    // If it's already an absolute URL, return it
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    // If it's a Cloudinary public ID or relative path from the backend
    const backendRoot = `http://${window.location.hostname}:5000`;

    // If it starts with / we assume it's from the backend root
    if (url.startsWith("/")) {
        return `${backendRoot}${url}`;
    }

    // Default: assume it's an uploaded file path or static asset from backend
    return `${backendRoot}/${url}`;
};
