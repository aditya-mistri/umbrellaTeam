// components/LandingPage.tsx
import React from 'react';
import { ChevronRight, CheckCircle, LayoutGrid, Users, Calendar, ListFilter, Target, ClipboardCheck, Mic, PenTool } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              />
              <path
                d="M9 22V12H15V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Umbrella Team</h1>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-blue-400 transition-colors">Dashboard</a>
          <a href="#getting-started" className="hover:text-blue-400 transition-colors">Get Started</a>
          <button onClick={onGetStarted} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            Sign In
          </button>
        </div>
        <button onClick={onGetStarted} className="md:hidden bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-16 pb-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Team Collaboration <span className="text-blue-400">Simplified</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              A comprehensive team management platform designed to streamline your workflow, boost productivity, and keep your projects on track.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center transition-colors"
              >
                Get Started <ChevronRight className="ml-2" size={20} />
              </button>
              <button
                onClick={() => window.location.href = '#features'}
                className="border border-gray-600 hover:border-blue-500 px-8 py-3 rounded-lg font-medium text-lg flex items-center justify-center transition-colors"
              >
                Explore Features
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-slate-800 p-2 rounded-2xl border border-slate-700 shadow-xl">
              <div className="bg-slate-900 rounded-xl overflow-hidden">
                <div className="h-8 bg-slate-800 flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="h-24 bg-blue-900/30 rounded-md mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded-full w-3/4"></div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="h-24 bg-purple-900/30 rounded-md mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded-full w-3/4"></div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <div className="h-24 bg-green-900/30 rounded-md mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded-full mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-slate-800 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Everything your team needs to plan, track, and deliver amazing results together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <LayoutGrid className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">In-Depth Dashboard</h3>
              <p className="text-gray-400">
                Get a comprehensive overview of your projects and team metrics with our intuitive dashboard.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Timeline</h3>
              <p className="text-gray-400">
                Visualize project progress with interactive Gantt charts and milestone tracking.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <LayoutGrid className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Board View</h3>
              <p className="text-gray-400">
                Organize tasks visually in customizable Kanban boards to track workflow stages.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <div className="bg-yellow-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ListFilter className="text-yellow-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">List View</h3>
              <p className="text-gray-400">
                View and sort tasks in a flexible list format with powerful filtering capabilities.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <div className="bg-red-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-red-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Priority-Based Projects</h3>
              <p className="text-gray-400">
                Prioritize tasks and projects to ensure your team focuses on what matters most.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
              <div className="bg-indigo-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ClipboardCheck className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Assignment</h3>
              <p className="text-gray-400">
                Easily assign tasks to team members with due dates, descriptions, and attachments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're constantly improving Umbrella Team with exciting new features to enhance your collaboration experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-xs text-white px-3 py-1 rounded-bl-lg">
                Coming Soon
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mic className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Live Voice Rooms</h3>
                  <p className="text-gray-400">
                    Jump into real-time voice conversations with your team members without leaving the platform. Hold quick standups, brainstorming sessions, or impromptu meetings with just one click.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-xs text-white px-3 py-1 rounded-bl-lg">
                Coming Soon
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PenTool className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Whiteboard</h3>
                  <p className="text-gray-400">
                    Collaborate in real-time with our interactive whiteboard feature. Sketch ideas, create diagrams, and visualize concepts together with your team, no matter where they're located.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="bg-slate-800 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Dashboard</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A glimpse of what you can do with our intuitive and comprehensive dashboard.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 border-b border-slate-700 pb-2">Team Members</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">JD</div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-gray-400">8 active tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">AS</div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Alice Smith</p>
                      <p className="text-xs text-gray-400">5 active tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">RJ</div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Robert Johnson</p>
                      <p className="text-xs text-gray-400">3 active tasks</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 border-b border-slate-700 pb-2">Current Sprint</h3>
                <div className="space-y-2">
                  <div className="bg-slate-700 p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Update user dashboard</p>
                      <p className="text-xs text-gray-400">Assigned to Alice Smith</p>
                    </div>
                    <div className="bg-yellow-500 text-xs text-black px-2 py-1 rounded">Medium</div>
                  </div>
                  <div className="bg-slate-700 p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Fix notification system</p>
                      <p className="text-xs text-gray-400">Assigned to John Doe</p>
                    </div>
                    <div className="bg-red-500 text-xs text-white px-2 py-1 rounded">High</div>
                  </div>
                  <div className="bg-slate-700 p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Implement new search feature</p>
                      <p className="text-xs text-gray-400">Assigned to Robert Johnson</p>
                    </div>
                    <div className="bg-green-500 text-xs text-white px-2 py-1 rounded">Low</div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 border-b border-slate-700 pb-2">Project Timeline</h3>
                <div className="h-16 flex">
                  <div className="w-1/4 bg-blue-900/30 rounded-l px-2 flex items-center">
                    Planning
                  </div>
                  <div className="w-1/4 bg-purple-900/30 px-2 flex items-center">
                    Development
                  </div>
                  <div className="w-1/4 bg-yellow-900/30 px-2 flex items-center">
                    Testing
                  </div>
                  <div className="w-1/4 bg-gray-700 rounded-r px-2 flex items-center">
                    Deployment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-6">
                Follow these simple steps to set up your team management workspace.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Create an account and set up your organization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Invite your team members to join the platform</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Create your first project and define tasks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Start collaborating with your team in real-time</span>
                </li>
              </ul>
              <div className="mt-8">
                <button
                  onClick={onGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
                >
                  Sign Up Now
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-700">
                <div className="bg-slate-800 p-4 border-b border-slate-700">
                  <h3 className="font-semibold">Create Your First Project</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-medium mb-2">Project Name</label>
                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3" placeholder="Website Redesign" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-medium mb-2">Description</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 h-24" placeholder="Redesign the company website with a modern look and improved UX"></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Start Date</label>
                      <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">End Date</label>
                      <input type="date" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Create Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Team Collaboration?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Umbrella Team to streamline their workflow.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="relative h-8 w-8">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path
                    d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold">Umbrella Team</h1>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Umbrella Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;