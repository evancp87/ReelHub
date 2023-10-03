import { Schema, model } from 'mongoose';

export interface IMedia {
  title: string,
  thumbnail: {

    trending?: {
      small: string,
      large:  string, 
    },
    regular: {
      small: string,
      medium: string,
      large: string,
    }
  },
      year:  number, 
      category:  string,
      rating:  string,
      isBookmarked:  boolean,
      isTrending:  boolean,

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

