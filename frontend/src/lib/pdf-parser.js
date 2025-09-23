// This file isolates the pdf-parse library to handle bundling issues.

export default async function parsePdf(buffer) {
    // Use a dynamic import to load pdf-parse at runtime, bypassing the bundler.
    const pdf = (await import('pdf-parse')).default;
    return await pdf(buffer, {
        max: 0, // No page limit
        normalizeWhitespace: true,
        disableCombineTextItems: false
    });
}
