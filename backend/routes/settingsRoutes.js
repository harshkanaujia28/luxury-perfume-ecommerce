import express from 'express'
import { getSettings, updateSettingsSection } from '../controllers/settingsController.js'
import {  isAdmin } from '../middlewares/roleMiddleware.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', protect, isAdmin, getSettings)
router.put('/:section', protect, isAdmin, updateSettingsSection)

export default router
