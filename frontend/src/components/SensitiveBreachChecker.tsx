import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, X, } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BreachResult {
  service: string
  breachedData: string[]
  date: string
  severity: 'low' | 'medium' | 'high'
}

export function SensitiveBreachChecker() {
    const [sensitiveType, setSensitiveType] = useState('password')
    const [sensitiveValue, setSensitiveValue] = useState('')
    const [sensitiveResults, setSensitiveResults] = useState<BreachResult[]>([])
    const [isSensitiveLoading, setIsSensitiveLoading] = useState(false)
    
      const handleSensitiveSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSensitiveLoading(true)
        // TODO: Implement actual API call to check for sensitive information breaches
        // This is a mock response
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSensitiveResults([
          {
            service: 'SensitiveDataService',
            breachedData: [sensitiveType],
            date: '2023-03-20',
            severity: 'high'
          }
        ])
        setIsSensitiveLoading(false)
        setSensitiveValue('')
      }
    
      const handleCloseSensitiveResults = () => {
        setSensitiveResults([])
      }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Sensitive Information Search</CardTitle>
            <CardDescription>Securely check for breaches of highly sensitive information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSensitiveSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-grow space-y-2">
                  <Label htmlFor="sensitiveType">Type of Sensitive Information</Label>
                  <Select value={sensitiveType} onValueChange={setSensitiveType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="password">Password</SelectItem>
                      <SelectItem value="ssn">Social Security Number</SelectItem>
                      <SelectItem value="other">Other Sensitive Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-grow space-y-2">
                  <Label htmlFor="sensitiveValue">
                    {sensitiveType === 'password' && 'Password Check'}
                    {sensitiveType === 'ssn' && 'SSN Check'}
                    {sensitiveType === 'other' && 'Sensitive Information Check'}
                  </Label>
                  <Input
                    id="sensitiveValue"
                    type={sensitiveType === 'password' ? 'password' : 'password'}
                    placeholder={`Enter ${sensitiveType === 'ssn' ? 'SSN' : sensitiveType.charAt(0).toUpperCase() + sensitiveType.slice(1)}`}
                    value={sensitiveValue}
                    onChange={(e) => setSensitiveValue(e.target.value)}
                    maxLength={sensitiveType === 'ssn' ? 9 : undefined}
                    pattern={sensitiveType === 'ssn' ? '\\d{9}' : undefined}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSensitiveLoading}>
                  {isSensitiveLoading ? 'Checking...' : 'Check for Breaches'}
                </Button>
              </div>
            </form>
          </CardContent>
          {sensitiveResults.length > 0 && (
            <CardFooter>
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Sensitive Information Breach Results:</h3>
                  <Button variant="ghost" size="sm" onClick={handleCloseSensitiveResults}>
                    <X className="h-4 w-4 mr-2" />
                    Close Results
                  </Button>
                </div>
                {sensitiveResults.map((result, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {result.severity === 'high' ? (
                          <AlertCircle className="text-red-500" />
                        ) : (
                          <CheckCircle className="text-green-500" />
                        )}
                        {result.service}
                      </CardTitle>
                      <CardDescription>Breach Date: {result.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Compromised Data: {result.breachedData.join(', ')}</p>
                      <p className="mt-2">
                        Severity:{' '}
                        <span className={`font-semibold ${
                          result.severity === 'high' ? 'text-red-500' :
                          result.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardFooter>
          )}
        </Card>
    )
}