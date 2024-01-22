import Image from "next/image";
import UploadForm from "./image/uploadForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadForm />
    </main>
  );
}
