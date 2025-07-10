'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { format, startOfWeek, addDays, getDay } from 'date-fns'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionCalendarProps {
  contributions: ContributionDay[]
  className?: string
}

export function ContributionCalendar({ contributions, className = '' }: ContributionCalendarProps) {
  const { weeks, totalContributions, months } = useMemo(() => {
    if (!contributions || contributions.length === 0) {
      return { weeks: [], totalContributions: 0, months: [] }
    }

    // Sort contributions by date
    const sortedContributions = [...contributions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // Group contributions into weeks
    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []
    
    // Create a map for quick lookup
    const contributionMap = new Map(
      sortedContributions.map(c => [c.date, c])
    )

    // Get the start and end dates
    const startDate = new Date(sortedContributions[0].date)
    const endDate = new Date(sortedContributions[sortedContributions.length - 1].date)
    
    // Find the start of the first week (Sunday)
    const firstWeekStart = startOfWeek(startDate, { weekStartsOn: 0 })
    
    // Generate all days from first week start to end date
    let currentDate = new Date(firstWeekStart)
    
    while (currentDate <= endDate) {
      const dateStr = format(currentDate, 'yyyy-MM-dd')
      const contribution = contributionMap.get(dateStr) || {
        date: dateStr,
        count: 0,
        level: 0 as const
      }
      
      currentWeek.push(contribution)
      
      // If we've completed a week (7 days), start a new week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
      
      currentDate = addDays(currentDate, 1)
    }
    
    // Add the last partial week if it exists
    if (currentWeek.length > 0) {
      // Fill the rest of the week with empty days
      while (currentWeek.length < 7) {
        const nextDate = addDays(new Date(currentWeek[currentWeek.length - 1].date), 1)
        currentWeek.push({
          date: format(nextDate, 'yyyy-MM-dd'),
          count: 0,
          level: 0
        })
      }
      weeks.push(currentWeek)
    }

    // Calculate total contributions
    const totalContributions = sortedContributions.reduce((sum, c) => sum + c.count, 0)

    // Generate month labels
    const months: { name: string; weekIndex: number }[] = []
    weeks.forEach((week, index) => {
      const firstDay = new Date(week[0].date)
      const monthName = format(firstDay, 'MMM')
      
      // Only add month label if it's the first week or if the month has changed
      if (index === 0 || format(firstDay, 'MM') !== format(new Date(weeks[index - 1][0].date), 'MM')) {
        months.push({ name: monthName, weekIndex: index })
      }
    })

    return { weeks, totalContributions, months }
  }, [contributions])

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted'
      case 1: return 'bg-green-200 dark:bg-green-900'
      case 2: return 'bg-green-300 dark:bg-green-700'
      case 3: return 'bg-green-400 dark:bg-green-500'
      case 4: return 'bg-green-500 dark:bg-green-400'
      default: return 'bg-muted'
    }
  }

  if (weeks.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Contribution Calendar
          </CardTitle>
          <CardDescription>Your coding activity over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            No contribution data available
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Contribution Calendar
        </CardTitle>
        <CardDescription>
          {totalContributions} contributions in the last year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Month labels */}
          <div className="flex text-xs text-muted-foreground">
            {months.map((month, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ marginLeft: index === 0 ? 0 : `${(month.weekIndex - (months[index - 1]?.weekIndex || 0)) * 11}px` }}
              >
                {month.name}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex gap-1 overflow-x-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const date = new Date(day.date)
                  const dayName = format(date, 'EEEE')
                  const formattedDate = format(date, 'MMM dd, yyyy')
                  
                  return (
                    <div
                      key={day.date}
                      className={`
                        w-2.5 h-2.5 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-offset-1 hover:ring-primary
                        ${getContributionColor(day.level)}
                      `}
                      title={`${day.count} contributions on ${formattedDate} (${dayName})`}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 