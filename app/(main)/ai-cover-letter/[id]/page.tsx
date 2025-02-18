import React from "react";
import { useParams } from "next/navigation";

function CoverLetter() {
  const { id } = useParams();
  return <div>CoverLetter</div>;
}

export default CoverLetter;
