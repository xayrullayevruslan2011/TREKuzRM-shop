
export interface Order {
  id: string; // Internal RM code (e.g., RM8834024718545)
  customerName: string;
  customerPhone: string;
  chinaTrack: string | null;
  createdAt: number; // Timestamp
  linkedAt: number | null; // Timestamp when China track was added
  smsSent: boolean;
}

export enum View {
  DASHBOARD = 'dashboard',
  GENERATOR = 'generator',
  LINKER = 'linker',
  SEARCH = 'search',
  NOTIFICATIONS = 'notifications'
}
