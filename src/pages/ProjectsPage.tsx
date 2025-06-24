
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';
import { FolderCheck, Plus, Search, Filter } from 'lucide-react';

const ProjectsPage = () => {
  const projects = [
    { id: 'PRJ-001', name: 'Shopping Mall Renovation', client: 'ABC Construction', status: 'In Progress', progress: 65, dueDate: '2024-08-15' },
    { id: 'PRJ-002', name: 'Luxury Hotel Lobby', client: 'Modern Homes Ltd', status: 'Planning', progress: 20, dueDate: '2024-09-30' },
    { id: 'PRJ-003', name: 'Office Building Flooring', client: 'City Renovations', status: 'Completed', progress: 100, dueDate: '2024-06-20' },
    { id: 'PRJ-004', name: 'Residential Complex', client: 'Elite Builders', status: 'On Hold', progress: 45, dueDate: '2024-10-12' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FolderCheck className="w-6 h-6" />
                <h1 className="text-lg font-semibold">Project Management</h1>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>
            </div>
          </header>
          
          <main className="flex-1 space-y-6 p-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Active Projects</h3>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-blue-600">Currently running</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-sm text-green-600">This year</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Overdue</h3>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-red-600">Need attention</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Value</h3>
                <p className="text-2xl font-bold text-gray-900">$245K</p>
                <p className="text-sm text-purple-600">Active projects</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Current Projects</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                        <p className="text-gray-600 text-sm">{project.client}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>Due: {project.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProjectsPage;
