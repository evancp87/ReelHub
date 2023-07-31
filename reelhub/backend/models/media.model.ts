import { Schema, model, connect } from 'mongoose';

export interface IMedia {
  title: string,
  thumbnail: {

    trending?: {
      small: String,
      large:  String, 
    },
    regular: {
      small: String,
      medium: String,
      large: String,
    }
  },
      year:  Number, 
      category:  String,
      rating:  String,
      isBookmarked:  Boolean,
      isTrending:  Boolean,

  }

const mediaSchema = new Schema<IMedia>({
  title: { type: String, required: true },
  thumbnail: {
    trending: {
      small: { type: String,},
      large: { type: String },
    },
    regular: {
      small: { type: String, required: true },
      medium: { type: String, required: true},
      large: { type: String, required: true },
    }
    },
      year: { type: Number, required: true }, 
      category: { type: String, required: true },
      rating: { type: String, required: true },
      isBookmarked: { type: Boolean, required: true },
      isTrending: { type: Boolean, required: true },

        
});



export const Media = model<IMedia>('Media', mediaSchema);

