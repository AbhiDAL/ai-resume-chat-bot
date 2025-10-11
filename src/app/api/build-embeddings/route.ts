import { NextRequest, NextResponse } from "next/server";
import { buildEmbeddingIndexFromFiles } from "../../../../lib/embeddings";
import type { UploadedFile } from "../../../../lib/types";

export async function POST(req: NextRequest) {
  try {
    const { files }: { files: UploadedFile[] } = await req.json();
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Build embeddings from uploaded files
    const chunks = await buildEmbeddingIndexFromFiles(files);
    
    return NextResponse.json({ 
      success: true, 
      message: `Built embeddings for ${chunks.length} chunks from ${files.length} files` 
    });
  } catch (error) {
    console.error("Error building embeddings:", error);
    return NextResponse.json(
      { error: "Failed to build embeddings" }, 
      { status: 500 }
    );
  }
}