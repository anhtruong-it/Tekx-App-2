import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import axios from 'axios';
import { issues } from '@/components/issue';


export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const projectId = searchParams.get('projectId');

  try {
    // Find an existing image in Vercel Blob
    const blobs = await list();
    const matchingBlob = blobs.blobs.find((blob) => blob.pathname == filename);

    // ML to recognize an image by text
    const apiMLIssueType = `https://alt-text-generator.vercel.app/api/generate?imageUrl=${matchingBlob.url}`;
    const responseIssueType = await axios.get(apiMLIssueType);
    const issueType = responseIssueType.data;
    let updateIssueType = issueType.replace("Caption: ");

    // Make a random issue
    const getRandomIssue = () => {
      const randomIndex = Math.floor(Math.random() * issues.length);
      return issues[randomIndex];
    }

    const randomIssue = getRandomIssue();

    // Filter out essential attributes
    const { pathname, size, uploadedAt, ...updatedBlob } = matchingBlob;
    updatedBlob.filename = matchingBlob.pathname;
    updatedBlob.projectId = projectId;
    updatedBlob.issue = {
      issueType: updateIssueType,
      riskRating: randomIssue.riskRating,
      action: randomIssue.action,
      rectificationPrice: randomIssue.rectificationPrice,
    };

    return NextResponse.json(updatedBlob);
  } catch (error) {
    console.error('Error listing blobs: ', error);
    return NextResponse.error('Internal Server Error', { status: 500 });
  }
}
