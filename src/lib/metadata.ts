import type { Metadata } from "next";

import { siteConfig } from "@/constants/site";

export function createPageMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description: description ?? siteConfig.description
  };
}
