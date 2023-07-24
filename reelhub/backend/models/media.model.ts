import { Schema, model, connect } from 'mongoose';

interface IMedia {
    trending: {
        small: String,
        large:  String, 
      },
      regular: {
        small: String,
        medium: String,
        large: String,
      },
      year:  Number, 
      category:  String,
      rating:  String,
      isBookmarked:  Boolean,
      isTrending:  Boolean,
w
  }

const mediaSchema = new Schema<IMedia>({
    trending: {
        small: { type: String, required: true },
        large: { type: String, required: true },
      },
      regular: {
        small: { type: String, required: true },
        medium: { type: String, required: true },
        large: { type: String, required: true },
      },
      year: { type: Number, required: true }, 
      category: { type: String, required: true },
      rating: { type: String, required: true },
      isBookmarked: { type: Boolean, required: true },
      isTrending: { type: Boolean, required: true },

        
});



const Media = model<IMedia>('Media', mediaSchema);

module.exports = Media;
