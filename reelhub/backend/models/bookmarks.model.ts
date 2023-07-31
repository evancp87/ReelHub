import { Schema, model } from 'mongoose';


interface IBookmark {

    user: Schema.Types.ObjectId,
    media: Schema.Types.ObjectId,
    category: Schema.Types.ObjectId,
    bookmarkedAt: Date
}


const bookmarkSchema = new Schema<IBookmark>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  media: { type: Schema.Types.ObjectId, ref: 'Media', required: true },
  category: { type: String, required: true },
  bookmarkedAt: { type: Date, default: Date.now },
});

const Bookmark = model<IBookmark>('Bookmark', bookmarkSchema);

export { Bookmark };
