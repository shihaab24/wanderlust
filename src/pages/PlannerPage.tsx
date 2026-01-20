import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Wand2, Send, Download, Share2, Loader, X } from 'lucide-react';

    const PlannerPage: React.FC = () => {
      const [prompt, setPrompt] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
      const [shareModalOpen, setShareModalOpen] = useState(false);

      const handleGeneratePlan = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setGeneratedPlan(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        const plan = `### Your 5-Day Trip to Bali

**Budget:** Approx. 40,000 INR

**Day 1: Arrival in Seminyak**
- Arrive at Ngurah Rai International Airport (DPS).
- Transfer to your hotel in Seminyak.
- Relax and explore Seminyak Beach.
- Enjoy sunset drinks at La Favela.

**Day 2: Culture in Ubud**
- Visit the Sacred Monkey Forest Sanctuary.
- Explore the Tegalalang Rice Terraces.
- Discover the Tirta Empul Temple.

...and so on.`;
        setGeneratedPlan(plan);
        setIsLoading(false);
      };

      const handleDownload = () => {
        if (!generatedPlan) return;
        const blob = new Blob([generatedPlan], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "TravelGenie-Itinerary.txt";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      };

      const handleShare = () => {
        if (!generatedPlan) return;
        if (navigator.share) {
          navigator.share({
            title: 'My TravelGenie Itinerary',
            text: 'Check out this awesome travel plan I generated!',
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          setShareModalOpen(true);
          setTimeout(() => setShareModalOpen(false), 2000);
        }
      };

      return (
        <div className="flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Plan a 5-day solo trip to Bali under 40k INR"
              className="w-full p-4 pr-32 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg resize-none"
              rows={3}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              {prompt && (
                <button
                  onClick={() => setPrompt('')}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
                  aria-label="Clear input"
                >
                  <X size={20} />
                </button>
              )}
              <button
                onClick={handleGeneratePlan}
                disabled={isLoading || !prompt.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader className="animate-spin" /> : <Send />}
              </button>
            </div>
          </motion.div>

          <div className="flex-grow mt-6 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Wand2 className="h-16 w-16 text-purple-400 animate-pulse" />
                <p className="mt-4 text-xl font-semibold">Generating your magical trip...</p>
                <p className="text-gray-400">Our AI is exploring the best options for you.</p>
              </div>
            )}
            {generatedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">Your Generated Itinerary</h2>
                  <div className="flex space-x-2">
                    <button onClick={handleDownload} className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors transform hover:scale-105"><Download size={20} /></button>
                    <button onClick={handleShare} className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 transition-colors transform hover:scale-105"><Share2 size={20} /></button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-gray-300">{generatedPlan}</pre>
              </motion.div>
            )}
          </div>
          {shareModalOpen && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
              Link copied to clipboard!
            </div>
          )}
        </div>
      );
    };

    export default PlannerPage;