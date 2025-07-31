export type Category = {
  _id: string;
  name: string;
  categoryColorCode: string;
  createdOn: string;
  updatedOn: string | null;
  createdBy: string;
  preDefined?: boolean;
};
