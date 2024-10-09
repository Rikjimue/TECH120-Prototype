import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, BarChart3, CheckCircle, Shield } from "lucide-react"

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recentBreaches, setRecentBreaches] = useState([
    { service: "EmailProvider", date: "2023-05-15", severity: "high" },
    { service: "SocialMedia", date: "2023-05-10", severity: "medium" },
    { service: "OnlineStore", date: "2023-05-05", severity: "low" },
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Breaches Checked</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity Breaches</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Accounts</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,567</div>
            <p className="text-xs text-muted-foreground">+12.7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Breaches</CardTitle>
            <CardDescription>Latest data breaches detected</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentBreaches.map((breach, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    breach.severity === 'high' ? 'bg-red-500' :
                    breach.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{breach.service}</p>
                    <p className="text-xs text-muted-foreground">{breach.date}</p>
                  </div>
                  <span className="text-xs font-medium capitalize">{breach.severity}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Breach Trends</CardTitle>
            <CardDescription>Monthly breach statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground">Chart placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}