import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const parsePdfBuffer = async (fileBuffer) => {
  const parsedPdf = await pdfParse(fileBuffer);
  return parsedPdf.text || "";
};

export default parsePdfBuffer;
