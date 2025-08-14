import { body, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Contact form validation
export const validateContactSubmission = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('service')
    .optional()
    .isIn(['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'maintenance', 'other'])
    .withMessage('Please select a valid service'),
  
  body('budget')
    .optional()
    .isIn(['under-10k', '10k-25k', '25k-50k', '50k-100k', 'over-100k', 'not-specified'])
    .withMessage('Please select a valid budget range'),
  
  body('timeline')
    .optional()
    .isIn(['asap', '1-2-weeks', '1-2-months', '3-6-months', '6-months-plus', 'not-specified'])
    .withMessage('Please select a valid timeline'),
  
  body('source')
    .optional()
    .isIn(['website', 'referral', 'social-media', 'email', 'other'])
    .withMessage('Please select a valid source'),
  
  handleValidationErrors
];

// Project validation
export const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Project title must be between 5 and 200 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Project description must be between 20 and 2000 characters'),
  
  body('category')
    .isIn(['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'other'])
    .withMessage('Please select a valid project category'),
  
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology must be selected'),
  
  body('technologies.*')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Technology names must be between 1 and 50 characters'),
  
  body('startDate')
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid end date')
    .custom((value, { req }) => {
      if (value && new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('budget')
    .optional()
    .isIn(['under-10k', '10k-25k', '25k-50k', '50k-100k', 'over-100k', 'not-disclosed'])
    .withMessage('Please select a valid budget range'),
  
  body('teamSize')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Team size must be between 1 and 50'),
  
  handleValidationErrors
];

// Service validation
export const validateService = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Service title must be between 5 and 200 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Service description must be between 20 and 2000 characters'),
  
  body('category')
    .isIn(['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'maintenance', 'other'])
    .withMessage('Please select a valid service category'),
  
  body('icon')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Service icon is required'),
  
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('features.*.title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Feature title must be between 1 and 100 characters'),
  
  body('features.*.description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Feature description must be between 1 and 300 characters'),
  
  body('pricing.startingPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Starting price must be a positive number'),
  
  handleValidationErrors
];

// Testimonial validation
export const validateTestimonial = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('role')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Role must be between 2 and 100 characters'),
  
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company must be between 2 and 100 characters'),
  
  body('content')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Testimonial content must be between 10 and 1000 characters'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('services')
    .optional()
    .isArray()
    .withMessage('Services must be an array'),
  
  body('services.*')
    .optional()
    .isIn(['web-development', 'app-development', 'ai-integration', 'consulting', 'ui-ux', 'maintenance', 'other'])
    .withMessage('Please select valid services'),
  
  handleValidationErrors
];

// User validation
export const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'editor', 'viewer'])
    .withMessage('Please select a valid role'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters'),
  
  body('department')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Department cannot exceed 100 characters'),
  
  body('position')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Position cannot exceed 100 characters'),
  
  handleValidationErrors
];

// Login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Password reset validation
export const validatePasswordReset = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  handleValidationErrors
];

// New password validation
export const validateNewPassword = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  
  handleValidationErrors
];

// File upload validation
export const validateFileUpload = [
  body('file')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Please upload a file');
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        throw new Error('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
      }
      
      const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB default
      if (req.file.size > maxSize) {
        throw new Error(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      }
      
      return true;
    }),
  
  handleValidationErrors
]; 