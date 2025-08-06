import mongoose from 'mongoose';

const appearanceSchema = new mongoose.Schema(
  {
    // primaryColor: { type: String, default: '#000000' },
    // secondaryColor: { type: String, default: '#ffffff' },
    // accentColor: { type: String, default: '#ff0000' },
    // darkMode: { type: Boolean, default: false },
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
   
  },
  { _id: false } // prevent separate _id for sub-schema
);

const settingsSchema = new mongoose.Schema(
  {
    general: { type: Object, default: {} },
    payment: { type: Object, default: {} },
    shipping: { type: Object, default: {} },
    email: { type: Object, default: {} },
    security: { type: Object, default: {} },
    appearance: { type: appearanceSchema, default: {} },
    notifications: { type: Object, default: {} },
  },
  {
    timestamps: true,
    minimize: false, // Ensure empty nested objects are saved
  }
);

export default mongoose.model('Settings', settingsSchema);
