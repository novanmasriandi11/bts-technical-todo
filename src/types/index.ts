import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface SidebarItemProps {
   icon: LucideIcon;
   title: string;
   path: string;
   extraPaths?: string[];
   alert?: boolean;
   isCollapsed?: boolean;
}

export interface HeaderItemProps {
   title: string;
   path: string;
   active?: boolean;
}

export interface LayoutProps {
   children: ReactNode;
}

export type ThemeType = "light" | "dark";

export interface ThemeContextType {
   theme: ThemeType;
   toggleTheme: () => void;
}

export interface ChecklistItem { 
   id                  : number;
   name                : string;
   itemCompletionStatus: boolean;
}

export interface Note {
   id                      : number;
   name                    : string;
   items                   : ChecklistItem[] | null;
   cheklistCompletionStatus: boolean;
}