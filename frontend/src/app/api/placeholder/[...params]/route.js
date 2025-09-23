import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const dimensions = resolvedParams.params;
  
  // Extract width and height from params like ['640', '360']
  const [width = '400', height = '300'] = dimensions || [];
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#999" text-anchor="middle" dy=".3em">
        ${width} × ${height}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
