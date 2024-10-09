import React from 'react'
import { DataBreachChecker } from '@/components/DataBreachChecker'
import { SensitiveBreachChecker } from '@/components/SensitiveBreachChecker'

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <DataBreachChecker />
                <SensitiveBreachChecker />
            </div>
        </div>
    )
}

export default Home