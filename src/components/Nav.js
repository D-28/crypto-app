import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function Nav() {
  return (
    <div role="presentation" onClick={(e) => e.preventDefault}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
      </Breadcrumbs>
    </div>
  );
}
