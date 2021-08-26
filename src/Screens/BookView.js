import React from "react";
import GoogleDocsViewer from "react-google-docs-viewer";

export default function BookView() {
  return (
    <div>
      <GoogleDocsViewer
        width="100%"
        height="100vh"
        fileUrl="http://www.africau.edu/images/default/sample.pdf"
      />
    </div>
  );
}
