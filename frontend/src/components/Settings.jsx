import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@mui/material';
import { useState } from 'react';

const Settings = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Here you would typically dispatch an action to update notifications in your store
  };

  return (
    <div className={`p-6 ${isDark ? 'text-white' : 'text-black'}`}>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Notification Toggle */}
      <div className={`flex items-center justify-between p-4 rounded-lg mb-4 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div>
          <h2 className="font-semibold">Notifications</h2>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {notificationsEnabled ? 'Enabled' : 'Disabled'}
          </p>
        </div>
        <Switch
          checked={notificationsEnabled}
          onChange={handleNotificationToggle}
          color="success"
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: isDark ? '#22c55e' : '#16a34a',
            },
            '& .MuiSwitch-track': {
              backgroundColor: isDark ? '#374151' : '#d1d5db',
            },
          }}
        />
      </div>

      {/* Theme Toggle (consistent with Dashboard) */}
      <div className={`flex items-center justify-between p-4 rounded-lg ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div>
          <h2 className="font-semibold">Theme</h2>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </p>
        </div>
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`flex items-center gap-2 px-3 py-2 rounded-md ${
            isDark ? 'text-green-400 hover:bg-gray-700' : 'text-green-600 hover:bg-gray-200'
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default Settings;