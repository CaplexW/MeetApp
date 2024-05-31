import Comment from "../models/Comment.js";

export default async function removeComments(userId) {
  let i = true;
  let y = true;

  while (i === true) {
      const result = await Comment.findOneAndDelete({ userId });
      if (!result) i = false;
  };
  while (y === true) {
      const result = await Comment.findOneAndDelete({ pageId: userId });
      if (!result) y = false;
  };
}
