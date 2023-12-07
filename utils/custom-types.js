import mongoose from "mongoose";

export const courseContentType = {
  enum: [
    "heading1",
    "heading2",
    "heading3",
    "paragraph",
    "divider",
    "domain",
    "image",
    "audio",
    "video",
    "unorderedlist",
    "orderedlist",
    "link",
    "quote",
    "code",
    "file",
    "document",
    "table",
    "html",
    "math",
    "h1",
    "h2",
    "h3",
  ],
};

export const contentTypes = {
  enum: [
    "Pdf",
    "Ppt",
    "Image",
    "Word",
    "Excel",
    "Document",
    "Audio",
    "Video",
    "H5P",
  ],
};
