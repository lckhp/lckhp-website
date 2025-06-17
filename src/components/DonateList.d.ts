import { FC } from "react";

export interface DirectoryItem {
  id: string;
  name: string;
  type: string;
  location: string;
  contact_number: string;
  alt_contact_number?: string;
  needs?: string;
  attention_level?: string;
  last_updated?: string;
}

export interface UrgentNeedItem extends DirectoryItem {
  description?: string;
  slogan?: string;
  financial_details?: string;
  contact_person?: string;
  status?: string;
  view_more_redirect_url?: string;
}

export interface DonateListProps {
  category: string;
}

declare const DonateList: FC<DonateListProps>;

export default DonateList;
