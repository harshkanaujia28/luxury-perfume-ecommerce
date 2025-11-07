import Settings from '../models/Settings.js'

// Get current settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        general: {},
        payment: {},
        shipping: {},
        email: {},
        security: {},
        appearance: {},
        notifications: {},
      });
    }

    // Ensure all sections are at least empty objects
    const sections = ['general', 'payment', 'shipping', 'email', 'security', 'appearance', 'notifications'];
    for (const section of sections) {
      if (!settings[section]) {
        settings[section] = {};
      }
    }

    await settings.save();

    res.json(settings);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to get settings', error: error.message });
  }
};


// Update specific section
export const updateSettingsSection = async (req, res) => {
  const { section } = req.params
  const data = req.body

  try {
    let settings = await Settings.findOne()
    if (!settings) settings = await Settings.create({})

    settings[section] = { ...settings[section], ...data }
    await settings.save()

    res.json({ message: `${section} settings updated`, settings: settings[section] })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update settings', error: error.message })
  }
}
