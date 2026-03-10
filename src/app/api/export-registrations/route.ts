import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Export Registration collection data as CSV
 * Access at: /api/export-registrations
 */
export async function GET(_request: Request) {
    try {
        // Get Payload instance
        const payload = await getPayload({
            config: configPromise,
        })

        // Fetch all registrations
        const result = await payload.find({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- collection may exist at runtime
            collection: 'registration' as any,
            limit: 10000, // Large limit to get all records
            pagination: false,
            sort: '-createdAt',
        })

        const registrations = result.docs as Array<Record<string, unknown>>

        // Define CSV headers
        const headers = [
            'Reg No.',
            'Name',
            'Email',
            'Phone',
            'Date of Birth',
            'Age',
            'Gender',
            'Address',
            'School Name',
            'Category Display',
            'Training Days & Time',
            'T-Shirt Size',
            'Transportation Need',
            'Drop-off Location',
            'Payment Status',
        ]

        // Helper function to format date as YYYY-MM-DD
        const formatDate = (date: string | Date | undefined): string => {
            if (!date) return ''
            try {
                const d = new Date(date)
                const year = d.getFullYear()
                const month = String(d.getMonth() + 1).padStart(2, '0')
                const day = String(d.getDate()).padStart(2, '0')
                return `${year}-${month}-${day}`
            } catch {
                return String(date)
            }
        }

        // Helper function to format phone number (ensure it's readable)
        const formatPhone = (phone: string | undefined): string => {
            if (!phone) return ''
            // Remove any leading/trailing whitespace and ensure it's a string
            return String(phone).trim()
        }

        // Convert data to CSV rows
        const csvRows = registrations.map((reg: Record<string, unknown>) => {
            return [
                (reg.registrationNumber as string)?.toString() || '',
                (reg.name as string) || '',
                (reg.email as string) || '',
                formatPhone(reg.phone as string),
                formatDate(reg.dob as string | Date),
                (reg.age as number)?.toString() || '',
                (reg.gender as string) || '',
                (reg.address as string) || '',
                (reg.schoolName as string) || '',
                (reg.categoryDisplay as string) || '',
                (reg.trainingDaysAndTime as string) || '',
                (reg.tShirtSize as string) || '',
                (reg.transportationNeed as string) || '',
                (reg.dropoffLocation as string) || '',
                (reg.status as string) || '',
            ]
        })

        // Helper function to escape CSV values
        const escapeCSV = (value: string): string => {
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                return `"${value.replace(/"/g, '""')}"`
            }
            return value
        }

        // Build CSV content
        const csvContent = [
            headers.map(escapeCSV).join(','),
            ...csvRows.map((row) => row.map((cell) => escapeCSV(String(cell))).join(',')),
        ].join('\n')

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0]
        const filename = `registrations_${timestamp}.csv`

        // Return CSV file
        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        })
    } catch (error) {
        console.error('Error exporting registrations:', error)
        return NextResponse.json(
            {
                error: 'Failed to export registrations',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        )
    }
}
