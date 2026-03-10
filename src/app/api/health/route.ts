import { NextResponse } from 'next/server'

/**
 * Health check endpoint for monitoring
 * Returns 200 if server is healthy
 * Access at: /api/health
 */
export async function GET() {
  try {
    // Try to check database connection if mongoose is available
    let dbState = 0
    let isDbConnected = false

    try {
      const mongoose = await import('mongoose')
      dbState = mongoose.default.connection.readyState
      isDbConnected = dbState === 1 // 1 = connected
    } catch {
      // Mongoose not available or not connected yet
      isDbConnected = false
    }

    const health = {
      status: isDbConnected ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      version: process.env.npm_package_version || '1.0.0',
      database: {
        status: isDbConnected ? 'connected' : 'disconnected',
        state: dbState, // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      },
      memory: {
        used: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
        total: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
        unit: 'MB',
      },
      environment: process.env.NODE_ENV || 'development',
    }

    // Return 200 even if DB is disconnected (server is still running)
    // Use 503 only if there's a critical error
    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
