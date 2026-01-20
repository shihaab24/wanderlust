import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Eye, Trash2, PlusCircle, Download, Share2 } from 'lucide-react';

    const mockItineraries = [
      { id: 1, title: "10-Day Japan Adventure", destination: "Japan", budget: 150000, status: "Completed" },
      { id: 2, title: "Swiss Alps Honeymoon", destination: "Switzerland", budget: 250000, status: "Completed" },
      { id: 3, title: "Goa Group Trip", destination: "India", budget: 20000, status: "Draft" },
    ];

    const DashboardPage: React.FC = () => {
      const [itineraries, setItineraries] = useState(mockItineraries);

      const deleteItinerary = (id: number) => {
        setItineraries(itineraries.filter(it => it.id !== id));
      };

      const createNewItinerary = () => {
        // In a real app, this would navigate to the planner page
        alert("Navigating to planner to create a new trip!");
      };
      
      const handleDownload = (title: string) => {
        const content = `Itinerary for: ${title}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      };

      const handleShare = (title: string) => {
        if (navigator.share) {
          navigator.share({
            title: `My TravelGenie Itinerary: ${title}`,
            text: `Check out my trip to ${title}!`,
            url: window.location.href,
          });
        } else {
          alert('Share feature is not available on this device. Link copied to clipboard!');
          navigator.clipboard.writeText(window.location.href);
        }
      };

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Trips</h1>
            <button onClick={createNewItinerary} className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <PlusCircle size={20} />
              <span>New Trip</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((it, index) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 border border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white">{it.title}</h2>
                  <p className="text-gray-400">{it.destination}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-purple-400">â¹{it.budget.toLocaleString()}</span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${it.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {it.status}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-700/50 p-4 flex justify-end space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-600 transition-colors transform hover:scale-110"><Eye size={18} /></button>
                  <button onClick={() => handleDownload(it.title)} className="p-2 rounded-full hover:bg-gray-600 transition-colors transform hover:scale-110"><Download size={18} /></button>
                  <button onClick={() => handleShare(it.title)} className="p-2 rounded-full hover:bg-gray-600 transition-colors transform hover:scale-110"><Share2 size={18} /></button>
                  <button onClick={() => deleteItinerary(it.id)} className="p-2 rounded-full text-red-400 hover:bg-red-500/20 transition-colors transform hover:scale-110"><Trash2 size={18} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    };

    export default DashboardPage;