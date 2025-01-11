import { Server, AlertTriangle } from 'lucide-react'

export function Legend() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Legend</h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                    <Server className="text-green-500 mr-2" size={20} />
                    <span>Healthy Server</span>
                </div>
                <div className="flex items-center">
                    <Server className="text-yellow-500 mr-2" size={20} />
                    <span>Unhealthy Server</span>
                </div>
                <div className="flex items-center">
                    <Server className="text-gray-400 mr-2" size={20} />
                    <span>Offline Server</span>
                </div>
                <div className="flex items-center">
                    <AlertTriangle className="text-red-500 mr-2" size={20} />
                    <span>Server Issue</span>
                </div>
            </div>
        </div>
    )
}

