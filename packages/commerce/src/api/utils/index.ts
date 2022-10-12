import { NextRequest } from 'next/server'

export const getInput = (req: NextRequest) => req.json().catch(() => ({}))
