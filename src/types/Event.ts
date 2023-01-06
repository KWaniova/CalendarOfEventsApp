export type EventType = {
  userId: string;
  title: string;
  description: string;
  from: string;
  to: string;
  type: "PRIVATE" | "PUBLIC";
  id: string;
};
