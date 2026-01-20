import React from 'react';
    import { motion } from 'framer-motion';
    import { MapPin, Calendar, Sun, Moon, Edit, MessageSquare } from 'lucide-react';

    const ItineraryPage: React.FC = () => {
      // This would typically be loaded based on a selected itinerary
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
              10-Day Japan Adventure
            </h1>
            <p className="text-gray-400 mt-2 text-lg">An unforgettable journey through the land of the rising sun.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><MessageSquare className="mr-3 text-purple-400"/>AI Chat Refinement</h2>
            <div className="h-48 bg-gray-900 rounded-lg p-4 mb-4 overflow-y-auto">
              <p className="text-gray-400">AI: Welcome! How can I refine this trip for you?</p>
            </div>
            <input
              type="text"
              placeholder="e.g., 'Add more anime spots in Tokyo'"
              className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>

          <div className="space-y-6">
            {/* Day 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 border border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center"><Calendar className="mr-2 text-purple-400"/> Day 1: Arrival in Tokyo</h3>
                    <p className="text-gray-400 flex items-center"><MapPin size={14} className="mr-1"/> Shinjuku, Tokyo</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-110"><Edit size={18} /></button>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <Sun className="text-yellow-400 mt-1 flex-shrink-0"/>
                    <p><span className="font-semibold">Morning:</span> Arrive at Narita/Haneda Airport, transfer to your hotel in Shinjuku. Check in and freshen up.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Moon className="text-indigo-400 mt-1 flex-shrink-0"/>
                    <p><span className="font-semibold">Evening:</span> Explore the vibrant Shinjuku Gyoen National Garden and then head to the Tokyo Metropolitan Government Building for panoramic city views.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Day 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 border border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center"><Calendar className="mr-2 text-purple-400"/> Day 2: Tradition & Tech</h3>
                    <p className="text-gray-400 flex items-center"><MapPin size={14} className="mr-1"/> Asakusa & Akihabara</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-110"><Edit size={18} /></button>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <Sun className="text-yellow-400 mt-1 flex-shrink-0"/>
                    <p><span className="font-semibold">Morning:</span> Visit the historic Senso-ji Temple in Asakusa. Explore Nakamise-dori street for traditional snacks.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Moon className="text-indigo-400 mt-1 flex-shrink-0"/>
                    <p><span className="font-semibold">Evening:</span> Dive into the electric town of Akihabara, the heart of anime and gaming culture.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default ItineraryPage;