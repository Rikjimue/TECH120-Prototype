import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Trash2, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchField {
    id: string
    type: string
    label: string
}
  
interface BreachResult {
    service: string
    breachedData: string[]
    date: string
    severity: 'low' | 'medium' | 'high'
}
  
const availableFields = [
    { type: 'text', label: 'Username' },
    { type: 'text', label: 'First Name' },
    { type: 'text', label: 'Last Name' },
    { type: 'text', label: 'Middle Name' },
    { type: 'email', label: 'Email' },
    { type: 'tel', label: 'Phone Number' },
    { type: 'text', label: 'Address' },
]

export function Home() {
    const [searchFields, setSearchFields] = useState<SearchField[]>([
        { id: '1', type: 'email', label: 'Email' },
      ])
    const [searchValues, setSearchValues] = useState<Record<string, string>>({})
    const [results, setResults] = useState<BreachResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedField, setSelectedField] = useState<string | undefined>(undefined)
    const [sensitiveType, setSensitiveType] = useState('password')
    const [sensitiveValue, setSensitiveValue] = useState('')
    const [sensitiveResults, setSensitiveResults] = useState<BreachResult[]>([])
    const [isSensitiveLoading, setIsSensitiveLoading] = useState(false)
    
      const remainingFields = useMemo(() => {
        const usedLabels = new Set(searchFields.map(field => field.label))
        return availableFields.filter(field => !usedLabels.has(field.label))
      }, [searchFields])
    
      const handleAddField = (label: string) => {
        const fieldToAdd = availableFields.find(field => field.label === label)
        if (fieldToAdd) {
          const newField: SearchField = {
            id: Date.now().toString(),
            type: fieldToAdd.type,
            label: fieldToAdd.label,
          }
          setSearchFields([...searchFields, newField])
          setSelectedField('') // Reset the select after adding a field
        }
      }
    
      const handleRemoveField = (id: string) => {
        if (searchFields.length > 1) {
          setSearchFields(searchFields.filter(field => field.id !== id))
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...rest } = searchValues
          setSearchValues(rest)
        }
      }
    
      const handleFieldChange = (id: string, value: string) => {
        setSearchValues({ ...searchValues, [id]: value })
      }
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // TODO: Implement actual API call to check for breaches
        // This is a mock response
        await new Promise(resolve => setTimeout(resolve, 1500))
        setResults([
          {
            service: 'ExampleService',
            breachedData: ['email', 'password'],
            date: '2023-01-15',
            severity: 'high'
          },
          {
            service: 'AnotherService',
            breachedData: ['username'],
            date: '2022-11-03',
            severity: 'low'
          }
        ])
        setIsLoading(false)
      }
    
      const handleCloseResults = () => {
        setResults([])
      }
    
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
      <div className="container mx-auto p-4">

        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Data Breach Checker</CardTitle>
            <CardDescription>Check if your personal information has been compromised in a data breach.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {searchFields.map(field => (
                <div key={field.id} className="flex items-center space-x-2">
                  <div className="flex-grow space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      value={searchValues[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      required
                    />
                  </div>
                  {searchFields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveField(field.id)}
                      className="mt-6"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex justify-between items-center">
                <Select
                  value={selectedField}
                  onValueChange={(value) => {
                    setSelectedField(value)
                    handleAddField(value)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Add field" />
                  </SelectTrigger>
                  <SelectContent>
                    {remainingFields.map((field) => (
                      <SelectItem key={field.label} value={field.label}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Checking...' : 'Check for Breaches'}
                </Button>
              </div>
            </form>
          </CardContent>
          {results.length > 0 && (
            <CardFooter>
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Breach Results:</h3>
                  <Button variant="ghost" size="sm" onClick={handleCloseResults}>
                    <X className="h-4 w-4 mr-2" />
                    Close Results
                  </Button>
                </div>
                {results.map((result, index) => (
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
    </div>
    )
}
