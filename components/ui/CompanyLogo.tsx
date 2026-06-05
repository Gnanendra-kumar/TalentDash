"use client";

import { useState } from "react";

/* ── Map company slugs to their actual website domains ── */
const SLUG_TO_DOMAIN: Record<string, string> = {
  google: "google.com",
  amazon: "amazon.com",
  apple: "apple.com",
  microsoft: "microsoft.com",
  meta: "meta.com",
  netflix: "netflix.com",
  adobe: "adobe.com",
  salesforce: "salesforce.com",
  infosys: "infosys.com",
  tcs: "tcs.com",
  ibm: "ibm.com",
  oracle: "oracle.com",
  sap: "sap.com",
  hcl: "hcltech.com",
  wipro: "wipro.com",
  nvidia: "nvidia.com",
  flipkart: "flipkart.com",
  razorpay: "razorpay.com",
  swiggy: "swiggy.com",
  zomato: "zomato.com",
  meesho: "meesho.com",
  zepto: "zeptonow.com",
  phonepe: "phonepe.com",
  cred: "cred.club",
  atlassian: "atlassian.com",
  uber: "uber.com",
  "uber-india": "uber.com",
  paytm: "paytm.com",
  dream11: "dream11.com",
  groww: "groww.in",
};

function getLogoUrl(slug: string): string {
  const domain = SLUG_TO_DOMAIN[slug] || `${slug}.com`;
  return `https://logo.clearbit.com/${domain}`;
}

export default function CompanyLogo({
  slug,
  name,
  bg,
  text,
  size = 32,
}: {
  slug: string;
  name: string;
  bg?: string;
  text?: string;
  size?: number;
}) {
  const [showImg, setShowImg] = useState(true);
  const logoUrl = getLogoUrl(slug);

  return (
    <div
      className="company-chip-logo"
      style={{ background: bg, color: text, width: size, height: size }}
    >
      <div className="company-chip-logo-fallback">{name.charAt(0)}</div>
      {showImg && (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="company-chip-logo-img"
          loading="lazy"
          onError={() => setShowImg(false)}
        />
      )}
    </div>
  );
}

/* ── Standalone helper for pages that render logos inline ── */
export function LogoImg({
  slug,
  name,
  size = 28,
  className = "",
}: {
  slug: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const [showImg, setShowImg] = useState(true);
  const logoUrl = getLogoUrl(slug);

  if (!showImg) {
    return (
      <div
        className={`logo-fallback ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: "#F0F0F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
          fontWeight: 700,
          color: "#717171",
          flexShrink: 0,
        }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: 8, objectFit: "contain", flexShrink: 0 }}
      loading="lazy"
      onError={() => setShowImg(false)}
    />
  );
}

export { getLogoUrl, SLUG_TO_DOMAIN };
