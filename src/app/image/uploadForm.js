"use client";
import LoadingButton from "@/components/loadingButton";
import { useState, useRef } from "react";

export default function UploadForm() {
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [projectId, setProjectId] = useState("");

  const handleUpload = async (event) => {
    event.preventDefault();

    const file = inputFileRef.current.files[0];

    try {
      setUploading(true);

      // Merge file data and project ID
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);

      // Upload an image
      await fetch(`/api/image-upload?filename=${file.name}`, {
        method: "POST",
        body: formData,
      });

      // Make a POST request to API endpoint with the filename and projectId as a query parameter
      const responseClassify = await fetch(
        `/api/image-classification?filename=${file.name}&projectId=${projectId}`,
        {
          method: "POST",
        }
      );

      if (responseClassify.ok) {
        const data = await responseClassify.json();
        setImage(data);
      } else {
        console.error("Error fetching blob:", responseClassify.statusText);
      }
    } catch (error) {
      console.error("Error fetching blob:", error.message);
    } finally {
      setProjectId(null);
      setUploading(false);
    }
  };

  return (
    <>
      { //Information image table
        image && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Classified Image</h2>
            <table className="min-w-full border border-gray-300">
              <tbody>
                <tr>
                  <td className="border p-2">
                    <strong>URL:</strong>
                  </td>
                  <td className="border p-2">{image.url}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <strong>Filename:</strong>
                  </td>
                  <td className="border p-2">{image.filename}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <strong>Project ID:</strong>
                  </td>
                  <td className="border p-2">{image.projectId}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <strong>Issue Type:</strong>
                  </td>
                  <td className="border p-2">{image.issue.issueType}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <strong>Risk Rating:</strong>
                  </td>
                  <td className="border p-2">{image.issue.riskRating}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <strong>Action:</strong>
                  </td>
                  <td className="border p-2">{image.issue.action}</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <strong>Rectification Price:</strong>
                  </td>
                  <td className="border p-2">{image.issue.rectificationPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      <h1>Mini Classification Image Project</h1>

      {
        // Upload form
        uploading ? (
          <LoadingButton variant="blue" text="Uploading..." />
        ) : (
          <form onSubmit={handleUpload}>
            <input
              name="projectId"
              type="number"
              placeholder="Enter Project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 text-black"
            />

            <input
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/*"
              required
            />

            <button type="submit">Upload</button>
          </form>
        )
      }
    </>
  );
}
