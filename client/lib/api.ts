export const baseUrl = "http://localhost:8000";

export const uploadData = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${baseUrl}/upload`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error((await response.json()).message ||"Failed to upload the file");
    }

    return await response.json();
};
