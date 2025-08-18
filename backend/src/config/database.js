// Simple in-memory data storage for small business website
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data storage file path
const dataPath = path.join(__dirname, '../../data');
const contactsFile = path.join(dataPath, 'contacts.json');
const projectsFile = path.join(dataPath, 'projects.json');
const servicesFile = path.join(dataPath, 'services.json');
const testimonialsFile = path.join(dataPath, 'testimonials.json');
const usersFile = path.join(dataPath, 'users.json');

// Initialize data storage
const initializeStorage = () => {
  try {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath, { recursive: true });
    }

    // Initialize files with empty arrays if they don't exist
    const files = [
      { path: contactsFile, default: [] },
      { path: projectsFile, default: [] },
      { path: servicesFile, default: [] },
      { path: testimonialsFile, default: [] },
      { path: usersFile, default: [] }
    ];

    files.forEach(({ path: filePath, default: defaultValue }) => {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
      }
    });

    console.log('✅ Local data storage initialized');
  } catch (error) {
    console.error('❌ Failed to initialize local storage:', error);
  }
};

// Data access functions
const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`❌ Error writing ${filePath}:`, error);
    return false;
  }
};

// Export data access functions
export const dataStore = {
  contacts: {
    read: () => readData(contactsFile),
    write: (data) => writeData(contactsFile, data)
  },
  projects: {
    read: () => readData(projectsFile),
    write: (data) => writeData(projectsFile, data)
  },
  services: {
    read: () => readData(servicesFile),
    write: (data) => writeData(servicesFile, data)
  },
  testimonials: {
    read: () => readData(testimonialsFile),
    write: (data) => writeData(testimonialsFile, data)
  },
  users: {
    read: () => readData(usersFile),
    write: (data) => writeData(usersFile, data)
  }
};

const connectDB = async () => {
  try {
    initializeStorage();
    console.log('✅ Local data storage ready');
  } catch (error) {
    console.error('❌ Failed to initialize local storage:', error);
    throw error;
  }
};

export { connectDB }; 