import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { User, Mail, Phone, Save, Briefcase, Utensils, Accessibility, Star, Plane } from 'lucide-react';

    const travelStyles = [
      { name: 'Luxury', icon: Star },
      { name: 'Budget', icon: Briefcase },
      { name: 'Adventure', icon: Plane },
      { name: 'Family', icon: User },
    ];

    const ProfilePage: React.FC = () => {
      const [isSaving, setIsSaving] = useState(false);
      const [selectedStyle, setSelectedStyle] = useState('Adventure');

      const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        // Here you would typically show a success toast
      };

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" className="w-32 h-32 rounded-full mx-auto ring-4 ring-purple-500 shadow-lg" />
            <h1 className="text-3xl font-bold mt-4">Alex Doe</h1>
            <p className="text-gray-400">alex.doe@example.com</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" defaultValue="Alex Doe" className="w-full pl-10 p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" defaultValue="alex.doe@example.com" className="w-full pl-10 p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="tel" defaultValue="+1 234 567 890" className="w-full pl-10 p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Travel Preferences</h2>
            <div>
              <label className="block text-gray-400 mb-4">Travel Style</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {travelStyles.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => setSelectedStyle(name)}
                    className={`p-4 flex flex-col items-center justify-center space-y-2 rounded-lg border-2 transition-all transform hover:scale-105 ${selectedStyle === name ? 'bg-purple-600 border-purple-500' : 'bg-gray-700 border-gray-600 hover:border-purple-500'}`}
                  >
                    <Icon className="h-8 w-8" />
                    <span className="font-semibold">{name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Utensils />
                  <label>Dietary Preferences</label>
                </div>
                <input type="text" placeholder="e.g., Vegetarian" className="bg-gray-600 p-2 rounded-md w-1/2 text-right" />
              </div>
              <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Accessibility />
                  <label>Accessibility Needs</label>
                </div>
                <input type="text" placeholder="e.g., Wheelchair access" className="bg-gray-600 p-2 rounded-md w-1/2 text-right" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {isSaving ? <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </motion.div>
      );
    };

    export default ProfilePage;